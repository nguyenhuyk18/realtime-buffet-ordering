import { ResultSetHeader } from "mysql2";
import pool from "../database/client";
import staff from "../models/staff";

class StaffService {
    getAll = async (cond : string = null) => {
        let sql : string = `SELECT
                            staff.*, 
                            role.name_role
                            FROM
                            staff
                            INNER JOIN
                            role
                            ON 
                            staff.role_id = role.id `;
        if (cond) {
            sql += ` WHERE ${cond}`;
        }
        try {
            const [result, fields] = await pool.execute(sql);
            const newRows = result as Array<any>;

            return newRows.map(row => {
                return new staff(
                    row[0],
                    row[1],
                    row[2],
                    row[3],
                    row[4],
                    row[5],
                    row[6],
                    row[7],
                    row[8],
                    row[9]
                );
            });
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    save = async (data : staff) => {
        // console.log(data);
        const sql : string = 'INSERT INTO `staff` (role_id, name, mobile, username, password, email, is_active , avatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        try {
            const [result] = await pool.execute(sql, [
                data.role_id,
                data.name,
                data.mobile,
                data.username,
                data.password,
                data.email,
                data.is_active,
                data.avatar
            ]) as [ResultSetHeader , any];
            return result.affectedRows > 0;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    update = async (data : staff) => {
        const sql : string = 'UPDATE `staff` SET role_id = ?, name = ?, mobile = ?, username = ?, password = ?, email = ?, is_active = ?, avatar = ? WHERE id = ?';
        try {
            const [result] = await pool.execute(sql, [
                data.role_id,
                data.name,
                data.mobile,
                data.username,
                data.password,
                data.email,
                data.is_active,
                data.avatar,
                data.id
            ]) as [ResultSetHeader, any];
            return result.affectedRows > 0;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    delete = async (id : number) => {
        const sql : string = 'DELETE FROM `staff` WHERE id = ?';
        try {
            const [result] = await pool.execute(sql, [id]) as [ResultSetHeader, any];
            return result.affectedRows > 0;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    find = async (id : number) => {
        const cond : string = `staff.id = ${id}`;
        const rs = await this.getAll(cond);
        if (rs.length > 0) {
            return rs[0];
        }
        return null;
    }

    findByEmail = async (email : string) => {
        const cond : string = `staff.email = '${email}'`;
        const rs = await this.getAll(cond);
        if (rs.length > 0) {
            return rs[0];
        }
        return null;
    }

    findByUsername = async (username : string) => {
        const cond : string = `staff.username = '${username}'`;
        const rs = await this.getAll(cond);
        if (rs.length > 0) {
            return rs[0];
        }
        return null;
    }
}

export default new StaffService();