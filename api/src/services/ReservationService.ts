import reservation from "../models/reservation";
import pool from "../database/client";
import { ResultSetHeader } from "mysql2";

class ReservationService {
    getAll = async (cond : string = null) => {
        let sql : string = 'SELECT * FROM reservation';
        if(cond) {
            sql += ` WHERE ${cond}`;
        }

        try {
            const [result] = await pool.execute(sql);
            const newRows = result as Array<any>;
            return newRows.map(row => {
                // id : number = null, customer_id : number = null, table_id : number = null, staff_id : number = null, reservation_date : string = null, amount_cus : number = null, note : string = null, status : number = null
                return new reservation( row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7] , row[8] , row[9] , row[10]);
            })
        }
        catch (err) {
            console.log(err);
            return [];
        }
    }

    find = async (id : number) => {
        const cond : string = `id = ${id}`;
        const reservations : reservation[] = await this.getAll(cond);
        if(reservations.length == 0) {
            return null;
        }
        return reservations[0];
    }

    save = async (data : reservation) => {
        try {
            const sql = `INSERT INTO reservation (customer_id, table_id, staff_id, reservation_date, amount_cus, note, status , type_buffet , total_price , is_cancle) VALUES (?, ?, ?, ?, ?, ?, ? , ? , ? , ?)`;
            const [result] = await pool.execute(sql, [data.customer_id, data.table_id, data.staff_id, data.reservation_date, data.amount_cus, data.note, data.status , data.type_buffet , data.total_price , data.is_cancle]) as [ResultSetHeader , any];
            return result.affectedRows > 0;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    update = async (data : reservation) => {
        // console.log(data);
        try {
            const sql = `UPDATE reservation SET customer_id = ?, table_id = ?, staff_id = ?, reservation_date = ?, amount_cus = ?, note = ?, status = ? , type_buffet = ? , total_price = ? , is_cancle = ?  WHERE id = ?`;
            const [result] = await pool.execute(sql, [data.customer_id, data.table_id, data.staff_id, data.reservation_date, data.amount_cus, data.note, data.status, data.type_buffet , data.total_price ,  data.is_cancle , data.id]) as [ResultSetHeader , any];
            return result.affectedRows > 0;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    delete = async (id : number) => {
        try {
            const sql : string = "DELETE FROM reservation WHERE id = ?";
            const [result] = await pool.execute(sql , [id]) as [ResultSetHeader , any];
            return result.affectedRows > 0;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    
}

export default new ReservationService()