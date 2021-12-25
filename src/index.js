const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const handlebars = require('express-handlebars');
const exphbs = require('express-handlebars');
const path = require('path')
const dotenv = require("dotenv");
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const socket = require("./socket")
const io = new Server(server, {
  cors: {
    origin: "https://xoanen.surge.sh",
    methods: ["GET", "POST" ,"PUT" , "PATCH" , "HEAD" , "DELETE"] , 
    credentials: true,
  }, 
});
dotenv.config();
const route = require('./routers')
const db = require('./config/db')
const nodemailer = require("nodemailer");
const methodOverride = require('method-override')
app.use(methodOverride('X-HTTP-Method-Override'))
socket(io);
//conneact DB
db.connect();
const corsOptions ={
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}
app.use(cors(corsOptions))
app.use(morgan('combined'))
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.static(path.join(__dirname, 'public')))
app.engine('hbs', handlebars({
  extname: '.hbs'
}));
route(app);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
server.listen(process.env.PORT || 3001, () => {
  console.log('Server đang chay tren cong ' + process.env.PORT);
  console.log("app");
});
