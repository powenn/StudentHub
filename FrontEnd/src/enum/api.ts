export enum api{
    base = "http://127.0.0.1:3000",
    findAll = base+"/api/v1/user/findAll",
    insertOne = base+"/api/v1/user/insertOne", 
    deleteByID = base+"/api/v1/user/deleteByID",
    updateNameByID = base+"/api/v1/user/updateNameByID"
}