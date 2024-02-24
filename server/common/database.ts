import { Pool } from "pg";
import l, { logger } from "./logger";


async function getPool(): Promise<Pool> {
    return new Promise((resolve, reject) => {
        try {
            const pool = new Pool({
                connectionString: process.env.DATABASE_URI,
            });
            return resolve(pool);
        } catch (err) {
            return reject(err);
        }
    })
}

async function connectDB() {
    return new Promise(async (resolve, reject) => {
        try {
            const myPool: Pool = await getPool();

            myPool.connect((err, client, done) => {
                if (err) {
                    logger.error(err);
                    l.error(`Postgress SQL default connection has occured error ${err}`);
                } else {
                    l.info('Postgress SQL successfully connected');
                    resolve(myPool);
                }
            });
        }
        catch (err) {
            logger.error(err);
            console.log(err);
        }
    })
}

export { getPool, connectDB }