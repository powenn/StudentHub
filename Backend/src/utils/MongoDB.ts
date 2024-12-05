import { Schema, model, connect, Mongoose } from 'mongoose';
import { logger } from '../middlewares/log';
import { MongoInfo } from '../interfaces/MongoInfo';
export class MongoDB {
    
    DB: Mongoose | void | undefined
    isConneted : boolean = false;

    constructor(info: MongoInfo) {

        const url = `mongodb://${info.name}:${encodeURIComponent(info.password)}@${info.host}:${info.port}/${info.dbName}`;

        this.init(url).then(() => {

            logger.info(`suscess: connet to mongoDB @${url}`);
            this.isConneted = true;

        }).catch(() => {

            logger.error(`error: cannt connet to mongoDB @${url}`);

        })

    }

    async init(url: string) {
        this.DB = await connect(url).catch(err=>{
            logger.error(`error: cannt connet to mongoDB ${err}`);
        });
    }

    getState():boolean{
        return this.isConneted;
    }
}

