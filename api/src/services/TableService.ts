import table from "../models/table";
import pool from "../database/client";
import { ResultSetHeader } from "mysql2";

class TableService {
    getAll = async (cond : string = null) => {
        let sql : string = "SELECT * FROM \`table\`";
        if(cond) {
            sql += ` WHERE ${cond}`;
        }
        try {
            const [rows] = await pool.execute(sql);
            const newRows = rows as Array<any>;
            return newRows.map(row => {
                return new table(row[0], row[1], row[2], row[3], row[4]);
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    find = async (id : number) => {
        const cond : string = `id = ${id}`;
        const tables : table[] = await this.getAll(cond);
        if(tables.length == 0) {
            return null;
        }
        return tables[0];
    }

    findByFloorID = async (floor_id : number) => {
        const cond : string = `floor_id = ${floor_id}`;
        const tmp : table[] = await this.getAll(cond);
        if(tmp.length == 0) {
            return [];
        }
        return tmp;
    }

    save = async (data : table) => {
        try {
            const sql = `INSERT INTO \`table\` (name_table, capacity, floor_id, status) VALUES (?, ?, ?, ?)`;
            const [result] = await pool.execute(sql, [data.name_table, data.capacity, data.floor_id, data.status]) as [ResultSetHeader , any];
            return result.affectedRows > 0;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    update = async (data : table) => {
        console.log(data)
        try {
            const sql = `UPDATE \`table\` SET name_table = ?, capacity = ?, floor_id = ?, status = ? WHERE id = ?`;
            const [result] = await pool.execute(sql, [data.name_table, data.capacity, data.floor_id, data.status, data.id]) as [ResultSetHeader , any];
            return result.affectedRows > 0;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    delete = async (id : number) => {
        try {
            const sql = `DELETE FROM \`table\` WHERE id = ?`;
            const [result] = await pool.execute(sql, [id]) as [ResultSetHeader , any];
            return result.affectedRows > 0;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default new TableService();