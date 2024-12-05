import { Document } from "mongoose"
export type DBResp<T> = (Document<unknown, any, T> & Omit<T & Required<{
    _id: string;
}>, never>)