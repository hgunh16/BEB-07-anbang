const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const session = require('express-session');

const apiRouter = require('./router/api');

const http = require('http').createServer(app);
http.listen(8080, function () {
  console.log(`listening port 8080`);
});


// 세션을 사용해서 로그인
app.use(
  session({
    secret:'AnBang',
    resave: false,
    saveUninitialized: true,
    // cookie:{
    //   // domain: 'localhost',
    //   path:'/',
    //   maxAge: 24*6*60*10000,
    //   sameSite: 'NONE',
    //   httpOnly: false,
    //   secure: true
    // }
  })
)

app.use(express.json());
// app.use(cors());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname, `../client/build`)));

app.use('/', apiRouter);

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, `../client/build/index.html`));
// });
