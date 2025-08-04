import pool from '../database/client';
import province from '../models/province';

class ProvinceService {
    getAll = async (cond : string = null) => {
        try {
            let query : string = `SELECT * FROM province`;
            if (cond) {
                query += cond;
            }
            const [result, fields] = await pool.execute(query);
            const newRow = result as Array<any>;
            return newRow.map(row => {
                return new province(
                    row[0],
                    row[1],
                    row[2]
                );
            });
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    find = async (id : string) => {
        // console.log(id)
        const cond : string = ` WHERE  id = '${id}'`;
        const tmp : Array<province> = await this.getAll(cond);
        if (tmp.length == 0) {
            return null;
        }
        return tmp[0];
    }
}

export default new ProvinceService();