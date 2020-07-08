var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors')
var bodyParser = require('body-parser')

var userRouter = require('./routes/userRouter');

var app = express();
var port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/abcdefghi', {
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

app.use('/api/user',userRouter);

app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
});