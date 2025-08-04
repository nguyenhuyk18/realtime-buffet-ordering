import { Request, Response } from "express";
import call_food from "../models/call_food";
import pool from "../database/client";
import { ResultSetHeader } from "mysql2";

class CallFoodService {
    // lấy danh sách gọi món
    getAll = async (cond : string = null) => {
        let sql : string = `SELECT
	call_food.*, product.product_name, 
	\`table\`.name_table, 
	floor.name_floor
    FROM call_food INNER JOIN product ON call_food.id_food = product.id
	INNER JOIN \`table\` ON call_food.id_table = \`table\`.id INNER JOIN floor ON \`table\`.floor_id = floor.id`;
        if(cond) {
            sql += ` WHERE ${cond}`;
        }

        try {
            const [result , fields] = await pool.execute(sql);
            const newArrow = result as Array<any>;
            return newArrow.map(row => new call_food(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7]) )
        }catch (err) {
            console.log(err);
            return []
        }
    }

    // tìm gọi món mới
    find = async (id : number) => { 
        const cond : string = ` call_food.id = ${id}`;
        const listCallFood : call_food[] = await this.getAll(cond);
        if(listCallFood.length == 0) {
            return null;
        }
        return listCallFood[0];
    }



    save = async (data : call_food) => {
        const sql = 'INSERT INTO call_food (id_food , id_table , status , number) VALUES (? , ? , ? , ?)';

        try {
            const [result , fields] = await pool.execute(sql , [data.id_food , data.id_table , data.status , data.number])  as [ResultSetHeader, any];
            return result.affectedRows > 0;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }



    delete = async (id : number ) => {
        const sql = 'DELETE FROM call_food WHERE id = ?';
        try {
            const [result , fields] = await pool.execute(sql , [id]) as [ResultSetHeader, any];
            return result.affectedRows > 0;
        }catch (err) {
            console.log(err);
            return false;
        }
    }


    update = async ( data : call_food ) => {
        const sql = 'UPDATE call_food SET id_food = ? , id_table = ? , status = ? , number = ? WHERE id = ?';

        try {
            const [result , fields ] = await pool.execute(sql , [data.id_food , data.id_table , data.status , data.number, data.id])  as [ResultSetHeader, any];; 
            return result.affectedRows > 0;
        }catch (err) {
            console.log(err);
            return false;
        }
    }

}

export default new CallFoodService();