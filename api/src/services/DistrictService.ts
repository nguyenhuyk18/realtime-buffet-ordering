import pool from '../database/client';
import district from '../models/district';

class DistrictService {
    getAll = async (cond : string = null) => {
        try {
            let query : string = `SELECT * FROM district`;

            if (cond) {
                query += cond;
            }
            // console.log(query);
            const [result, fields] = await pool.execute(query);
            const newRow = result as Array<any>;
            return newRow.map(row => {
                return new district(
                    row[0],
                    row[1],
                    row[2],
                    row[3]
                );
            });
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    // tìm kiếm tất cả quận huyện với điều kiện
    find = async (id : string) => {
        const cond : string = ` WHERE id = '${id}'`;
        const tmp : Array<district> = await this.getAll(cond);
        if (tmp.length == 0) {
            return null;
        }
        return tmp[0];
    }

    findByProvinceID = async (id : string) => {
        const cond : string = ` WHERE \`province_id\` = '${id}'`;
        const tmp : Array<district> = await this.getAll(cond);
        if (tmp.length == 0) {
            return null;
        }
        return tmp;
    }
}

export default new DistrictService();
