import floor from "../models/floor";
// import { Request, Response } from "express";
import pool from "../database/client";
import { ResultSetHeader } from "mysql2";

class FloorService {
    getAll = async (cond : string = null) => {
        try {
            let sql : string = "SELECT * FROM floor";
            if(cond) {
                sql += ` WHERE ${cond}`;
            }
            const [rows] = await pool.execute(sql);
            const newRows = rows as Array<any>;
            return newRows.map(row => {
                return new floor(row[0], row[1]);
            });

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    find = async (id : number) => {
        const cond : string = `id = ${id}`;
        const floors : floor[] = await this.getAll(cond);
        if(floors.length == 0) {
            return null;
        }
        return floors[0];
    }

    save = async (data : floor) => {
        try {
            const sql = `INSERT INTO floor (name_floor) VALUES (?)`;
            const [result] = await pool.execute(sql, [data.name_floor]) as [ResultSetHeader , any];
            
            return result.affectedRows > 0;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    update = async (data : floor) => {
        try {
            const sql = `UPDATE floor SET name_floor = ? WHERE id = ?`;
            const [result] = await pool.execute(sql, [data.name_floor, data.id]) as [ResultSetHeader , any];
            
            return result.affectedRows > 0;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    delete = async (id : number) => {
        try {
            const sql = `DELETE FROM floor WHERE id = ?`;
            const [result] = await pool.execute(sql, [id]) as [ResultSetHeader , any];
            
            return result.affectedRows > 0;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default new FloorService();