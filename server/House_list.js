const mongoose = require('mongoose')

const DB_URL = 'mongodb://127.0.0.1:27017/haha'

mongoose.connect(DB_URL, { useNewUrlParser: true })
//新建app
var bodyParser = require('body-parser');
const app = express()
app.use(express.static("../src/static"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


const House_list = mongoose.model('house_list', new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
})
)

app.post('/file_upload', function (req, res) {
    fs.readFile('./2.jpg' , (err,  data)=>{
        console.log( 'err' , err , ' data' ,  data.toString()) 
    })
})