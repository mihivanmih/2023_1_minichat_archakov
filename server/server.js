import express from "express"
import { createServer } from "http";
import { Server } from "socket.io";

const app = express() //фреймворк для приложений Node.js

//подключили сервер http через express приложение
const httpServer = createServer(app)

// работаем с сервером через socket
// теперь вся информация хранится в io
const io = new Server(httpServer, {
    cors: { //фиксим cors запросы
        origin: '*'
    }
});

app.use(express.json()) // можем получать json с клиента, без этой строки будет undefined

const rooms = new Map() // Map навороченный объект - Коллекция

// get запрос на rooms через express
app.get('/rooms', (req, res) => {
    res.json(rooms) // res (response) ответ клиента в формате json
})

app.post('/rooms', (req, res) => {
    const { roomId, userName } = req.body //вытаскиваем post данные
    if(!rooms.has(roomId)) { // если нету комнаты, создаем
        rooms.set(roomId, new Map([ // создаем коллекцию комнаты
            ['users', new Map()], // создаем коллекцию юзеров
            ['messages',[]]
        ]))
    }
    res.send()
    //res.send([...rooms.values()])
})

// как только любой пользователь подключится io, connection
io.on('connection', socket => {
    console.log('socket connected', socket.id)
})

// порт на котором запускается приложение в браузере
httpServer.listen(8888, (err) => {
    if(err) {
        throw Error(err)
    }
    console.log("Севрер запущен")
})

//https://socket.io/