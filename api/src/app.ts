import express from "express";
import bodyParser from "body-parser";
import 'dotenv/config';
import router from "./routers/IndexRouters";
import cors from 'cors';
import { ioInstance , initSocket } from "./utils/socket";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";

declare module "express-serve-static-core" {
  interface Request {
    io?: Server;
  }
}

// app.use()

const app = express();


app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173', // URL của ứng dụng React
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức HTTP được phép
  allowedHeaders: ['Content-Type', 'Authorization' , 'refresh-token' , 'is-login-call-food' ,'is-login-site'], // Các header được phép
  credentials: true, // Cho phép gửi cookie hoặc credentials (nếu cần)

}));

app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());
const PORT : number = Number(process.env.PORT);


app.use(express.static('public'));


app.use('/' , router);


// khởi tạo socket
// const { initSocket } = require('./util/socket');
const { io, server } = initSocket(app);

app.use((req, res, next) => {
    req.io = io; // gán io vào req để sử dụng trong các route
    next();
});


server.listen(PORT, () => {
  console.log(`Example app listening on port http://127.0.0.1:${PORT}`)
})