import pool from '../database/client';
import action from '../models/action';

class ActionService {
    getAll = async (cond : string = null) => {
        let sql : string = "SELECT * FROM `action`";
        if (cond) {
            sql += ` WHERE ${cond}`;
        }
        try {
            const [rows, fields] = await pool.execute(sql);
            const rowArray = rows as Array<any>
            return rowArray.map(row => {
                return new action(Number(row[0]), <string>row[1], <string>row[2]);
            });
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    find = async (id : number) => {
        const sql : string = "SELECT * FROM `action` WHERE id = ?";
        try {
            const [result, fields] = await pool.execute(sql, [id]);
            const newRow = result as Array<any>
            const rs : Array<action> =  newRow.map( row => {
                return  new action(row[0], row[1], row[2])
            });
            if(rs.length == 0) {
                return null;
            }
            return rs[0];
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}

export default new ActionService();