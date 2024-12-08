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

---

# API 規格說明

- GET /api/v1/user/findAll (取得全部學生資料)
- POST /api/v1/user/insertOne (新增一筆學生資料)
- PUT /api/v1/user/updateByID (使用 ID 為索引更新學生資料)
- DELETE /api/v1/user/deleteByID (使用 ID 刪除學生)

---

# 架構圖

---

# 流程圖

---

# Project Demo