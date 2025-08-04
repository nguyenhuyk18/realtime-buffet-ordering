import permission from '../models/permission';
import pool from '../database/client';
import { ResultSetHeader } from 'mysql2';

class PermissionService {
    getAll = async (cond: string = null) => {
        let sql: string = "SELECT * FROM `action_role`";
        if (cond) {
            sql += ` WHERE ${cond}`;
        }
        try {
            const [result, fields] = await pool.execute(sql);
            const newRows = result as Array<any>;
            return newRows.map(row => new permission(row[0] , row[1]))
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    findByRoleID = async (id_role : number) => {
        const cond : string = ` role_id = ${id_role}`;
        const tmp : permission[] = await this.getAll(cond);
        // console.log(tmp)
        if (!tmp.length) {
            return [];
        }
        return tmp;
    }


    save = async (data : permission) => {
        // console.log(data)
        try {
            const [result, fields] = await pool.execute('INSERT INTO `action_role` (role_id, action_id) VALUES (?, ?)', [data.role_id, data.action_id]) as [ ResultSetHeader , any];
            return result.affectedRows > 0;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    deleteByRoleID = async (id : number) => {
        try {
            const [result, fields] = await pool.execute('DELETE FROM `action_role` WHERE role_id = ?', [id]) as [ResultSetHeader , any] ;
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
}

export default new PermissionService()
