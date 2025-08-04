import brand from "../models/brand";
import pool from '../database/client';
import { ResultSetHeader } from "mysql2";

class BrandService {
    // lấy toàn bộ
    getAll = async (cond : string = null) => {
        let sql : string = `SELECT * FROM brand`;

        if (cond) {
            sql += ` WHERE ${cond}`;
        }

        try {
            const [result, field] = await pool.execute(sql) ;
            const newRow = result as Array<any>

            return newRow.map(row => {
                return new brand(row[0], row[1]);
            });

        } catch (err) {
            console.log(err);
            return [];
        }

    }

    save = async (data : brand) => {
        try {
            const [result , fields] = await pool.execute('INSERT INTO `brand` (name_brand) VALUES (?)', [data.name_brand])  as [ResultSetHeader, any];
            return result.affectedRows > 0;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    destroy = async (id : number) => {
        try {
            const [result] = await pool.execute('DELETE FROM `brand` WHERE `id` = ?', [id]) as [ResultSetHeader, any];
            return result.affectedRows > 0;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    find = async (id : number) => {
        const cond : string = ` id = ${id}`;
        const tmp : brand[] = await this.getAll(cond);
        if (tmp.length == 0) {
            return null;
        }
        return tmp[0];
    }

    update = async (data : brand) => {
        // const { id, name_brand } = data;
        try {
            const [result] = await pool.execute('UPDATE `brand` SET `name_brand` = ? WHERE `id` = ?', [data.name_brand, data.id]) as [ResultSetHeader, any];

            return result.affectedRows > 0;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
}

export default new BrandService();