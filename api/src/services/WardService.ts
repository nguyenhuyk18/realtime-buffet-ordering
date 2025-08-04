import pool from '../database/client';
import ward from '../models/ward';
class WardService {
    getAll = async (cond : string = null) => {
        try {
            let query : string  = `SELECT * FROM ward`;
            if (cond) {
                query += cond;
            }
            // console.log(query);
            const [result, fields] = await pool.execute(query);
            const newRow = result as Array<any>;
            return newRow.map(row => {
                return new ward(
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

    // tìm kiếm tất cả phường xã với điều kiện
    find = async (id : string) => {
        const cond : string = ` WHERE id = '${id}'`;
        const tmp : Array<ward> = await this.getAll(cond);
        if (tmp.length == 0) {
            return null;
        }

        return tmp[0];
    }

    findByDistrictID = async (id : string)  => {
        const cond : string = ` WHERE \`district_id\` = '${id}'`;
        const tmp : Array<ward> = await this.getAll(cond);
        if (tmp.length == 0) {
            return null;
        }
        return tmp;
    }


}

export default new WardService();
