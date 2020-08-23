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

app.use(express.json());
app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

app.use('/auth', authRouter);

app.use('/admin', adminRouter);

app.use('/user', userRouter);

app.use('/offer', offerRouter);

app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
});