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
        "message": "server error",
        "body": []
        }
        ```
- POST /api/v1/user/insertOne (新增一筆學生資料)
    ```
    public async insertOne(info: Student): Promise<resp<DBResp<Student> | undefined>>
    ```
- PUT /api/v1/user/updateByID (使用 ID 為索引更新學生資料)
- DELETE /api/v1/user/deleteByID (使用 ID 刪除學生)

---

# 架構圖

---

# 流程圖

---

# Project Demo