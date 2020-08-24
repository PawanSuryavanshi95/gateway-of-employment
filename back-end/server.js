var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors')
var bodyParser = require('body-parser')

var authRouter = require('./routes/authRouter');
var userRouter = require('./routes/userRouter');
var offerRouter = require('./routes/offerRouter');
var adminRouter = require('./routes/adminRouter');

const config = require('./configs/server');

var app = express();
const port = config.port;
const mongoURI = config.mongoURI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    }, () => console.log('MongoDB Connected')).catch((error) => console.log(error.reason) );


const cors_white_list = ["https://www.findpathway.com/"];

app.use(express.json());
app.use(bodyParser.json())
app.use(cors({
  origin:cors_white_list,
  credentials:true
}))
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

console.log(process.env);
/*
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://www.findpathway.com');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
*/

app.use('/api/auth', authRouter);

app.use('/api/admin', adminRouter);

app.use('/api/user', userRouter);

app.use('/api/offer', offerRouter);

app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
});