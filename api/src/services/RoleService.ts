import role from '../models/role';
import pool from '../database/client';
import { QueryResult, ResultSetHeader } from 'mysql2';
class RoleService {
    getAll = async (cond : string = null) => {
        let sql : string = "SELECT * FROM `role`";
        if (cond) {
            sql += ` WHERE ${cond}`;
        }

        try {
            const [result, fields] = await pool.execute(sql) ;
            const newRow = result as Array<any>
            return newRow.map(row => {
                return new role(row[0], row[1]);
            })
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    find = async (id : number) => {
        const cond = `id = ${id}`;
        const tmp : Array<role> = await this.getAll(cond);
        if (tmp.length == 0) {
            return null;
        }
        return tmp[0];

    }

    save = async (data : role) => {
        try {
            const [result, fields] = await pool.execute('INSERT INTO `role` (name_role) VALUES (?)', [data.name_role]) as [ResultSetHeader, any];
            return result.affectedRows > 0;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    destroy = async (id : number) => {
        try {
            const [result, fields] = await pool.execute('DELETE FROM `role` WHERE id = ?', [id]) as [ResultSetHeader, any];
            return result.affectedRows > 0;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    update = async (data : role) => {
        try {
            const [result, fields] = await pool.execute('UPDATE `role` SET name_role = ? WHERE id = ?', [data.name_role, data.id]) as [ResultSetHeader, any];
            return result.affectedRows > 0;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
}

export default new RoleService();