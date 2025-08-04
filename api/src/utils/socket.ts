import http from "http";
import dayjs from "dayjs";
import { Server, Socket } from 'socket.io';
import CallFoodService from "../services/CallFoodService";
import { Jwt } from "jsonwebtoken";

import call_food from "../models/call_food";
import { Express } from "express";

let ioInstance = null;

const initSocket = (app: Express) => {

    const server = http.createServer(app);

    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173", // hoặc domain frontend của bạn
            methods: ["GET", "POST", "PUT", "PATCH"],
            credentials: true
        }
    });

    ioInstance = io;

    io.on('connection', (socket: Socket) => {
        // mới vào đầu bếp và ng dùng đều emit vào room này hết
        socket.on('connect-call-food', () => {
            // console.log('ây dô')
            socket.join('call-food-to-chef');
        });

        // CLient Gửi DÔ cho chef // cần phải bảo mật ***********
        socket.on('call-food-from-client', async (data) => {
            // console.log(data);
            const dataParse = JSON.parse(data);

            const foods = dataParse.foods;
            const table_id = dataParse.table_id;
            const status = dataParse.status;

            // const floor_id = dataParse.floor_id;

            for (const tmp of foods) {
                const tmp1: call_food = new call_food(null, tmp.id, table_id, status, tmp.amount, null, null, null);
                await CallFoodService.save(tmp1);
            }

            socket.broadcast.emit('call-food-from-client-process');
        })


        // chef gửi cho nhân viên giao món 
        socket.on('call-to-chef', async () => {
            socket.broadcast.emit('call-food-chef-staff');
        })


        // nhân viên giao món gửi lại cho chef vì món ăn không đúng 
        socket.on('call-back-food', () => {
            socket.broadcast.emit('call-back-food-process');
        })

        // update bàn realtime
        socket.on('place-table', () => {
            socket.broadcast.emit('place-table-process');
            socket.broadcast.emit('new-reservation-process')
        });


        socket.on('cap-nhat-trang-thai-ban', (table_id, status) => {
            socket.broadcast.emit('cap-nhat-trang-thai-ban-process', table_id, status);
        })


    });

    return { io, server }
}

export {
    ioInstance,
    initSocket
}