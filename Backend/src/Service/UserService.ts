import { Service } from "../abstract/Service";
import { Student } from "../interfaces/Student";
import { logger } from "../middlewares/log";
import { studentsModel } from "../orm/schemas/studentSchemas";
import { Document } from "mongoose"
import { MongoDB } from "../utils/MongoDB";
import { DBResp } from "../interfaces/DBResp";
import { resp } from "../utils/resp";
import { DeleteResult } from "mongodb";

type seatInfo = {
    schoolName: string,
    department: string,
    seatNumber: string
}

export class UserService extends Service {

    public async getAllStudents(): Promise<Array<DBResp<Student>> | undefined> {
        try {
            const res: Array<DBResp<Student>> = await studentsModel.find({}).sort({ sid: 1 });
            return res;
        } catch (error) {
            return undefined;
        }
    }

    /**
     * 新增學生
     * @param info 學生資訊
     * @returns resp
     */
    public async insertOne(info: Student): Promise<resp<DBResp<Student> | undefined>> {

        const current = await this.getAllStudents()
        const resp: resp<DBResp<Student> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        }

        if (current && current.length > 0) {
            try {
                const nameValidator = await this.userNameValidator(info.userName);
                if (current.length >= 200) {
                    resp.message = "student list is full";
                    resp.code = 403;
                } else {
                    if (nameValidator === "驗證通過") {
                        info.sid = String(current.length + 1);
                        info._id = undefined;
                        const res = new studentsModel(info);
                        resp.body = await res.save();
                    } else {
                        resp.code = 403;
                        resp.message = nameValidator;
                    }
                }
            } catch (error) {
                resp.message = "server error";
                resp.code = 500;
            }
        } else {
            resp.message = "server error";
            resp.code = 500;
        }

        return resp;

    }

    /**
     * 學生名字驗證器
     * @param userName 學生名字
     * tku ee 0787
     * ee 科系縮寫
     *  0787 四碼
     * 座號檢查，跟之前有重複就噴錯  只能寫沒重複的號碼
     */
    public async userNameValidator(userName: string): Promise<
        '學生名字格式不正確，應為 tku + 科系縮寫 + 四碼帳號，例如: tkubm1760' | '帳號已存在' | '校名必須為 tku' | '帳號格式不正確，必須為四位數字。' | '驗證通過'
    > {

        if (userName.length < 7) {
            return ('學生名字格式不正確，應為 tku + 科系縮寫 + 四碼帳號，例如: tkubm1760');
        }

        const info = this.userNameFormator(userName);

        if (info.schoolName !== 'tku') {
            return '校名必須為 tku';
        }

        // 驗證座號(正則不想寫可以給 gpt 寫, 記得測試就好)
        const seatNumberPattern = /^\d{4}$/; // 驗證4個數字

        if (!seatNumberPattern.test(info.seatNumber)) {
            return '帳號格式不正確，必須為四位數字。';
        }

        if (await this.existingSeatNumbers(info.seatNumber)) {
            return '帳號已存在'
        }

        return '驗證通過'

    }

    /**
     * 用戶名格式化
     * @param userName 用戶名
     * @returns seatInfo
     */
    public userNameFormator(userName: string) {
        const info: seatInfo = {
            schoolName: userName.slice(0, 3),
            department: userName.slice(3, userName.length - 4),
            seatNumber: userName.slice(-4)
        }
        return info
    }

    /**
     * 檢查用戶名是否存在
     * @param SeatNumber 
     * @returns boolean
     */
    public async existingSeatNumbers(SeatNumber: string): Promise<boolean> {
        const students = await this.getAllStudents();
        let exist = false
        if (students) {
            students.forEach((student) => {
                const info = this.userNameFormator(student.userName)
                if (info.seatNumber === SeatNumber) {
                    exist = true;
                }
            })
        }
        return exist
    }


    /**
     * 用 ID 刪除用戶
     * @param id: 用戶_id 
     * @returns resp<any>
     */

    public async deleteByID(id: string): Promise<resp<DeleteResult>> {
        const resp: resp<DeleteResult> = {
            code: 200,
            message: "",
            body: {
                acknowledged: false,
                deletedCount: 0,
            },
        };
        try {
            const result = await studentsModel.deleteOne({ _id: id });
            resp.body = {
                acknowledged: result.acknowledged || true,
                deletedCount: result.deletedCount || 0,
            };

            if (resp.body.deletedCount === 0) {
                resp.code = 404;
                resp.message = "No student found with the provided ID";
            } else {
                resp.message = "success";
            }
        } catch (error) {
            resp.code = 500;
            resp.message = `Server error: ${error}`;
        }
        return resp;
    }



    /**
     * 用 ID 更新用戶
     * @param id
     * @param info
     * @returns resp
     */
    public async updateByID(id: string, info: Student): Promise<resp<DBResp<Student> | string>> {
        const resp: resp<DBResp<Student> | string> = {
            code: 200,
            message: "",
            body: ""
        }

        try {
            const user = await studentsModel.findById(id);

            if (!user) {
                resp.code = 404;
                resp.message = "user not found";
                return resp;
            }

            const originalUserName = user.userName;
            const originalSid = user.sid;

            if (info.userName !== originalUserName) {
                const nameValidator = await this.userNameValidator(info.userName);
                if (nameValidator !== '驗證通過') {
                    resp.code = 403;
                    resp.message = nameValidator;
                    return resp;
                }
            }

            if (info.sid !== originalSid) {
                const sidExists = await this.checkSidExists(info.sid as string);
                if (sidExists) {
                    resp.code = 403;
                    resp.message = 'sid already exists';
                    return resp;
                }
            }

            user.userName = info.userName || user.userName;
            user.sid = info.sid || user.sid;
            user.name = info.name;
            user.department = info.department;
            user.grade = info.grade;
            user.class = info.class;
            user.Email = info.Email;
            user.absences = info.absences;

            await user.save();
            resp.body = user;
            resp.message = "update success";
        } catch (error) {
            resp.code = 500;
            resp.message = "server error: " + error;
        }
        return resp;
    }

    private async checkSidExists(sid: string): Promise<boolean> {
        const students = await this.getAllStudents();
        return students && students.some(student => student.sid === sid) || false;
    }
}