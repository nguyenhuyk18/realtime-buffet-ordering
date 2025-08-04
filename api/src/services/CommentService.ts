import { ResultSetHeader } from 'mysql2';
import pool from '../database/client';
import comment from '../models/comment';

class CommentService {
    getAll = async (cond : string = null) => {
        let sql : string = `SELECT * FROM comment`;
        if (cond) {
            sql += ` WHERE ${cond}`;
        }

        try {
            const [result, field] = await pool.execute(sql);
            const newRow = result as Array<any>

            return newRow.map(row => {
                return new comment(row[0], row[1], row[2], row[3], row[4], row[5], row[6]);
            })
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    update = async (data : comment) => {
        try {
            const [result] = await pool.execute("UPDATE `comment` SET `email` = ? , `fullname` = ? , `star` = ?  , `description` = ? WHERE id = ?", [data.email, data.fullname, data.star, data.description, data.id]) as [ResultSetHeader, any];
            return result.affectedRows > 0;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    save = async (data : comment) => {
        try {
            const [result] = await pool.execute("INSERT INTO `comment` (`product_id`, `email`, `fullname`, `star`, `created_date` , `description` ) VALUES (? , ? , ? , ? , ? , ?)", [data.product_id, data.email, data.fullname, data.star, data.created_date, data.description]) as [ResultSetHeader, any];
            return result.affectedRows > 0;
        } catch (err) {
            console.log(err);
            return false;
        }
    }


    destroy = async (id : number) => {
        try {
            const [result] = await pool.execute('DELETE FROM `comment` WHERE id = ?', [id]) as [ResultSetHeader, any];
            return result.affectedRows > 0;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    find = async (id : number) => {
        const cond : string = ` comment.id = ${id}`;
        const tmp : Array<comment> = await this.getAll(cond);
        // console.log(tmp);
        if (tmp.length == 0) {
            return null;
        }
        // const comment = tmp[0];
        return tmp[0];
    }


    findByProductID = async (product_id : number) => {
        const cond : string = ` product_id = ${product_id} ORDER BY \`comment\`.created_date DESC`;
        const tmp : Array<comment> = await this.getAll(cond);
        if (tmp.length == 0) {
            return [];
        }
        return tmp;
    }

}


export default new CommentService();