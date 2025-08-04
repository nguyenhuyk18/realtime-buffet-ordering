import { ResultSetHeader } from 'mysql2';
import pool from '../database/client';
import category from '../models/category';

class CategoryService {
    getAll = async (cond : string = null) => {
        let sql : string = `SELECT * FROM \`category\``;

        if (cond) {
            sql += ` WHERE ${cond}`;
        }

        try {
            const [result, field] = await pool.execute(sql);
            const newRow = result as Array<any>

            return newRow.map(row => {
                return new category(row[0], row[1]);
            })
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    save = async (data : category) => {
        const { name_category } = data;

        try {
            const [result] = await pool.execute("INSERT INTO `category` (name_category) VALUES (?) ", [name_category])  as [ResultSetHeader, any];
            return result.affectedRows > 0;
        } catch (err) {
            console.log(err);
            return false;
        }
    }


    destroy = async (id : number) => {
        try {
            const [result] = await pool.execute('DELETE FROM  `category` WHERE id = ?', [id]) as [ResultSetHeader, any];
            return result.affectedRows > 0;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    find = async (id : number) => {
        const cond : string = ` id = ${id}`;
        const tmp : category[] = await this.getAll(cond);
        if (tmp.length == 0) {
            return null;
        }
        // const brand = tmp[0];
        return tmp[0];
    }

    update = async (data : category) => {
        const { id, name_category } = data;
        try {
            const [result] = await pool.execute('UPDATE `category` SET `name_category` = ? WHERE id = ?', [name_category, id]) as [ResultSetHeader, any];

            return result.affectedRows > 0;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

}

export default new CategoryService();