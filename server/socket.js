const SocketIO = require('socket.io');

module.exports = (http, app) => {
    const io = SocketIO(http,{
        cors : {
            origin : "http://localhost:3000"
        }
    });
    // app.set('io', io);
    // const chat = io.of('/dm');

    let users = [];
    
    const addUser = (userId, socketId) =>{
        !users.some(user=>user.userId === userId) && 
            users.push({userId, socketId})
    }

    const removeUser = (socketId)=>{
        users = users.filter((user)=>{
            user.socketId !== socketId
        })
    }

    const getUser = (userId)=>{
        return users.find((user)=> user.userId === userId)
    }

    io.on("connection", (socket)=> {
        //접속했을 때
        console.log("a user connected.")
        //접속한 유저 아이디와 소켓id 가져오기
        socket.on("addUser", userId =>{
            addUser(userId,socket.id)
            io.emit("getUsers", users);
        });
        //메세지 보내기
        socket.on("sendMessage",({senderId,receiverId,text})=>{
            const user = getUser(receiverId);
            io.to(user.socketId).emit("getMessage",{
                senderId,
                text,
            })
        })


        //나갔을때
        socket.on("disconnect", ()=>{
            console.log("a user disconnected");
            removeUser(socket.id);
            io.emit("getUsers", users);
        })
    })


}