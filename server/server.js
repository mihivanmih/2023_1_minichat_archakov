
import express from "express"
import { createServer } from "http";
import { Server } from "socket.io";

//const express = require('express')
//const useSocket = require('socket.io')

//const Server = require('socket.io')


const app = express() //фреймворк для приложений Node.js

//подключили сервер и теперь он работает через express приложение
//const server = require('http').createServer(app)

// работаем с сервером через socket
// теперь вся информация хранится в io
//const io = useSocket(server)

// const rooms = {
//     'rooms': [],
//     'messages': ['hello'],
// }


//const server = require('http').createServer(app)

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

const rooms = new Map() // Map навороченный объект

app.get('/rooms', (req, res) => {
    res.json(rooms)
})

io.on('connection', socket => {
    console.log('socket connected', socket.id)
})

// // get запрос на users
// app.get('/users',  (req, res) => {
//     // res.send(rooms) // res (response) ответ клиента
//     rooms.set('hello', '')
//     res.json(rooms) // возвращаем json
// })

// порт на котором запускается приложение в браузере
httpServer.listen(8888, (err) => {
    err ? Error(err) : console.log("Севрер запущен")
})


//https://socket.io/