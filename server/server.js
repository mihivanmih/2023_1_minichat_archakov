import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"

const app = express() //фреймворк для приложений Node.js

//подключили сервер http через express приложение
const httpServer = createServer(app)

// работаем с сервером через socket
// теперь вся информация хранится в io
const io = new Server(httpServer, {
    cors: { //фиксим cors запросы
        origin: '*'
    }
})

app.use(express.json()) // можем получать json с клиента, без этой строки будет undefined
app.use(express.urlencoded({extended: true})) //можем парсить query параметры

const rooms = new Map() // Map навороченный объект - Коллекция

// get запрос на rooms через express
app.get('/rooms/:id', (req, res) => {
    const {id: roomId} = req.params
    const obj = rooms.has(roomId) ?
        {
            users: [...rooms.get(roomId).get('users').values()],
            messages: [...rooms.get(roomId).get('messages').values()]
        }
        : {users: [], messages: []}
    res.json(obj) // res (response) ответ клиента в формате json
})

app.post('/rooms', (req, res) => {
    const {roomId, userName} = req.body //вытаскиваем post данные
    if (!rooms.has(roomId)) { // если нету комнаты, создаем
        rooms.set(roomId, new Map([ // создаем коллекцию комнаты
            ['users', new Map()], // создаем коллекцию юзеров
            ['messages', []]
        ]))
    }
    res.send()
})

// как только любой пользователь подключится io, connection
io.on('connection', socket => {
    // следим за сокетом ROOM:JOIN
    socket.on('ROOM:JOIN', ({roomId, userName}) => {
        socket.join(roomId)
        rooms.get(roomId).get('users').set(socket.id, userName) // 1. находим комнату 2. находим юзеров 3. подключаем пользователя
        const users = [...rooms.get(roomId).get('users').values()] // получаем всех пользователей
        socket.broadcast.to(roomId).emit("ROOM:SET_USERS", users) // запрос ко всем пользователям в комнате
    })
    
    socket.on('ROOM:NEW_MESSAGE', ({roomId, userName, text}) => {
        const obj = {
            userName,
            text
        }
        rooms.get(roomId).get('messages').push(obj)
        socket.broadcast.to(roomId).emit("ROOM:NEW_MESSAGE", obj)
    })
    
    socket.on('disconnect', () => {
        rooms.forEach((value, roomId) => {
            if (value.get('users').delete(socket.id)) {
                const users = [...value.get('users').values()] // получаем всех пользователей
                socket.broadcast.to(roomId).emit("ROOM:SET_USERS", users) // пользователь ушел
            }
        })
    })
    
    console.log('socket connected', socket.id)
})

// порт на котором запускается приложение в браузере
httpServer.listen(8888, (err) => {
    if (err) {
        throw Error(err)
    }
    console.log("Севрер запущен")
})

//https://socket.io/