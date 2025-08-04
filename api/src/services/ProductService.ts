// const product = require('../models/product');
// const pool = require('../database/client');

import product from '../models/product';
import pool from '../database/client';
import { ResultSetHeader } from 'mysql2';


class ProductService {
    getAll = async (cond : string = null) => {
        let sql : string = `SELECT
	product.*, 
	brand.name_brand, 
	category.name_category
FROM
	product
	INNER JOIN
	brand
	ON 
		product.id_brand = brand.id
	INNER JOIN
	category
	ON 
		product.id_category = category.id`;

        if (cond) {
            sql += ` WHERE ${cond}`;
        }

        try {
            const [result, fields] = await pool.execute(sql);
            const newRow = result as Array<any>;

            return newRow.map(row => {
                return new product(
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

    findByID = async (id : number) => {
        const cond : string = ` product.id = ${id}`;

        const tmp : product[]  =  await this.getAll(cond);

        if(tmp.length) {
            return tmp[0];
        }
        
        return null;
    }


    save = async (data : product) => {
        const sql : string = 'INSERT INTO product (product_name, id_category, description, image , created_date, id_brand, type_buffet) VALUES (? , ? , ? , ? , ? , ? , ?)';
        try {
            const [result] = await pool.execute(sql, [data.product_name , data.id_category , data.description , data.image , data.created_date , data.id_brand , data.type_buffet]) as [ResultSetHeader , any];
            
            return result.affectedRows > 0;
        }
        catch(err) {
            console.log(err);
            return false;
        }
    }

    delete = async (id : number) => {
        const sql : string = 'DELETE FROM product WHERE id = ?';
        try {
            const [result] = await pool.execute(sql, [id]) as [ResultSetHeader , any];
            return result.affectedRows > 0;
        }catch (err) {
            console.log(err);
            return false;
        }
    }


    update = async (data : product) => {
        const sql : string  = 'UPDATE product SET product_name = ? , id_category = ? , description = ?, image = ?, created_date = ?, id_brand = ? , type_buffet = ? WHERE id = ?';

        try {
            const [result] = await pool.execute(sql , [data.product_name , data.id_category , data.description , data.image , data.created_date , data.id_brand, data.type_buffet , data.id ]) as [ResultSetHeader , any];
            return result.affectedRows > 0;
        }
        catch (err) {
            return false;
        }
    }
}

export default new ProductService();