import l from '../common/logger';

class Seeds {

    private connection = null;

    constructor(connection) {
        this.connection = connection;
    }

    public async accountSeeding() {
        return new Promise((resolve, reject) => {
            try {
                if (this.connection) {
                    let query = 'CREATE TABLE IF NOT EXISTS account (id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), firstname VARCHAR(100) NOT NULL, lastname VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, password VARCHAR(50) NOT NULL, birthday DATE NOT NULL, createdDate DATE DEFAULT CURRENT_DATE, last_modified DATE DEFAULT CURRENT_DATE)';

                    this.connection.query(query, (err, result) => {
                        resolve({})
                    });
                } else {
                    l.error('No Connection Found');
                    return reject({ message: 'No Connection Found' });
                }
            } catch (err) {
                return reject(err);
            }
        })
    }

}


export default Seeds;