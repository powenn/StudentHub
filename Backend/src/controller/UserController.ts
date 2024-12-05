import { Contorller } from "../abstract/Contorller";
import { Request, response, Response } from "express";
import { UserService } from "../Service/UserService";
import { resp } from "../utils/resp";
import { DBResp } from "../interfaces/DBResp";
import { Student } from "../interfaces/Student";
require('dotenv').config()

export class UserController extends Contorller {
    protected service: UserService;

    constructor() {
        super();
        this.service = new UserService();
    }

    public async findAll(Request: Request, Response: Response) {

        const res: resp<Array<DBResp<Student>> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        }

        const dbResp = await this.service.getAllStudents();
        if (dbResp) {
            res.body = dbResp;
            res.message = "find sucess";
            Response.send(res);
        } else {
            res.code = 500;
            res.message = "server error";
            Response.status(500).send(res);
        }
    }

    public async insertOne(Request: Request, Response: Response) {
        const resp = await this.service.insertOne(Request.body)
        Response.status(resp.code).send(resp)
    }

    public async deleteByID(Request:Request , Response:Response) {
        const resp = await this.service.deleteByID(Request.query.id as string)
        Response.status(resp.code).send(resp)
    }

    public async updateByID(Request:Request , Response:Response) {
        const resp = await this.service.updateByID(Request.query.id as string,Request.body)
        Response.status(resp.code).send(resp)
    }
}