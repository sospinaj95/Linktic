import mongoose from 'mongoose';
import env from '../env.mjs';
import params from '../params.mjs';

export class MongoConn {
    url = null;

    constructor() {
        mongoose.Promise = global.Promise;
        this.url = `mongodb://${env.dbMongo.mongo_host}:${env.dbMongo.mongo_port}/${env.dbMongo.mongo_database}`;
    }

    connectionMDb() {
        return new Promise(async (resolve) => {

            const tryC = async (t) => {
                return new Promise(retry => {
                    setTimeout(() => {
                        this.getConn().then(res => {
                            if (res) {
                                return retry(true);
                            }
                            return retry(false);
                        });
                    }, (Math.min(params.delayTime * t, params.mongo.maxTimeout)));
                });

            };

            let i = 0;
            let stop = false;
            do {
                const c = await tryC(i);
                if (c) {
                    stop = true;
                    return resolve(c);
                } else {
                    console.log('Reintento conexión ' + i);
                }
                i++;
            } while (stop === false);

            resolve(false);
        });
    }

    // private methods
    getConn() {
        return new Promise((resolve) => {
            mongoose.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 30000,  keepAlive: 1})
                .then(() => {
                    resolve(true);
                })
                .catch(err => {
                    console.log(err.name, err.message);
                    resolve(false);
                });
        });
    }
}