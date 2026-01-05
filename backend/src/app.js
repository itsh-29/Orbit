import express from "express";
import {createServer} from "node:http";

import {Server} from "socket.io";

import mongoose  from "mongoose";

import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from"./routes/users.rotues.js"

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port",(process.env.PORT|| 8000));
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:"true"}));

app.use("/api/v1/users",userRoutes);

const start = async()=>{
    app.set("mongo_user")
    const connectionDB = await mongoose.connect("mongodb+srv://vasuishumeduri_db_user:jDS5yF5XcgkJXlgg@zoomclonecluster.rdj94hk.mongodb.net/")
    console.log(`Mongo Conncted DB Host :${connectionDB.connection.host}` )
    server.listen(8000,()=>{
        console.log("Listening on port 8000");
    });
}



start ();
