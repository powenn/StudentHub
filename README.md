# 安裝與執行指引

clone 專案 或 下載專案 .zip

```
git clone https://github.com/powenn/StudentHub.git
```

切換到專案目錄

```
cd StudentHub
```

## 前端

`Frontend` 目錄下  
複製 `.env.example` 到 `.env`  

本地運行:  
```
cd Frontend
npm install
npm run dev
```

Expose:
```
npm run dev -- --host
```
修改 `VITE_API_BASE_URL` 成 expose 的網路介面


## 後端

`Backend` 目錄下  
複製 `.env.example` 到 `.env`  
修改變數配置  
運行  
```
npm run dev
```


## 資料庫

設置 mongogb , DB , Collection , 指定 Collection name : `students`  
範例資料 `studentslist.csv`

```
{
  "_id": {
    "$oid": "6751b29a94a899c352e189f1"
  },
  "userName": "tkuee0787",
  "sid": 1,
  "name": "張佳慧",
  "department": "電機工程系",
  "grade": "四年級",
  "class": "A",
  "Email": "tkuee0787@tkuim.com"
}
```

---

# API 規格說明

`Backend/src/Service/UserService.ts`  
- GET /api/v1/user/findAll (取得全部學生資料，且按 sid (座號) 排序)  
    ```
    public async getAllStudents(): Promise<Array<DBResp<Student>> | undefined>
    ```
    response example  
    - 200
        ```
        {
            "code": 200,
            "message": "find sucess",
            "body": [
                {
                    "_id": "6751b29a94a899c352e189f1",
                    "userName": "tkuee0787",
                    "sid": "1",
                    "name": "張佳慧",
                    "department": "電機工程系",
                    "grade": "四年級",
                    "class": "A",
                    "Email": "tkuee0787@tkuim.com"
                },
                {
                    "_id": "6751b29a94a899c352e189f2",
                    "userName": "tkubm9553",
                    "sid": "2",
                    "name": "蔡文杰",
                    "department": "企業管理系",
                    "grade": "二年級",
                    "class": "A",
                    "Email": "tkubm9553@tkuim.com"
                },
            ]
        }
        ```
    - 500
        ```
        {
            "code": 500,
            "message": "server error"
        }
        ```
- POST /api/v1/user/insertOne (新增一筆學生資料)
    ```
    public async insertOne(info: Student): Promise<resp<DBResp<Student> | undefined>>
    ```
    request example
    - body
        ```
        {
            "userName":"tkuim0312",
            "name":"測試用戶",
            "department":"資訊管理系",
            "grade":"3",
            "class":"C",
            "Email":"test@mail.com",
            "absences":10
        }
        ```
    response example
    - 200
        ```
        {
            "code": 200,
            "message": "",
            "body": {
                "userName": "tkuim0312",
                "sid": "52",
                "name": "測試用戶",
                "department": "資訊管理系",
                "grade": "3",
                "class": "C",
                "Email": "test@mail.com",
                "absences": 10,
                "_id": "6756812efb244feeea3bad83",
                "__v": 0
            }
        }
        ```
    - 403
        ```
        {
            "code": 403,
            "message": "student list is full"
        }
        ```
    - 500
        ```
        {
            "code": 500,
            "message": "server error"
        }
        ```
- PUT /api/v1/user/updateByID (使用 ID 為索引更新學生資料)
    ```
    public async updateByID(id: string, info: Student): Promise<resp<DBResp<Student> | string>>
    ```
    request example
    - id
        ```
        id=6756812efb244feeea3bad83
        ```
    - body
        ```
        {
            "_id":"6756812efb244feeea3bad83",
            "userName":"tkuim0312",
            "sid":"52",
            "name":"測試用戶",
            "department":"資訊管理系",
            "grade":"3",
            "class":"C",
            "Email":"test@mail.com",
            "absences":11,
            "__v":0
        }
        ```
    response example
    - 200
        ```
        {
            "code": 200,
            "message": "update success",
            "body": {
                "_id": "6756812efb244feeea3bad83",
                "userName": "tkuim0312",
                "sid": "52",
                "name": "測試用戶",
                "department": "資訊管理系",
                "grade": "3",
                "class": "C",
                "Email": "test@mail.com",
                "absences": 11,
                "__v": 0
            }
        }
        ```
    - 404
        ```
        {
            "code": 404,
            "message": "user not found"
        }
        ```
    - 403 (座號已存在)
        ```
        {
            "code": 403,
            "message": "sid already exists"
        }
        ```
    - 403 (用戶名驗證失敗)
        ```
        {
            "code": 403,
            "message": ${驗證失敗資訊}
        }
        ```
        驗證失敗資訊 :   
        `'學生名字格式不正確，應為 tku + 科系縮寫 + 四碼帳號，例如: tkubm1760' | '帳號已存在' | '校名必須為 tku' | '帳號格式不正確，必須為四位數字。'`
    - 500
        ```
        {
            "code": 500,
            "message": "server error"
        }
        ```
- DELETE /api/v1/user/deleteByID (使用 ID 刪除學生)
    ```
    public async deleteByID(id: string): Promise<resp<DeleteResult>>
    ```
    request example
    - id
        ```
        id=6756812efb244feeea3bad83
        ```
    response example
    - 200
        ```
            {
                "code":200,
                "message":"success",
                "body":{
                    "acknowledged":true,
                    "deletedCount":1
                }
            }
        ```
    - 404
        ```
            {
                "code": 404,
                "message": "No student found with the provided ID",
                "body":{
                    "acknowledged":false,
                    "deletedCount":0
                }
            }
        ```
    - 500
        ```
            {
                "code": 500,
                "message": `Server error: ${error}`,
                "body":{
                    "acknowledged":false,
                    "deletedCount":0
                }
            }
        ```

---

# 架構圖 / 流程圖

![](/Imgs/arch-flow-chart.png)

---

# Project Demo

https://youtu.be/KbEKRr7Lshc