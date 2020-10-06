require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.g0cgl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


client.connect(err => {
    const menuItems = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_TABLE_ONE}`);
    const whyChooseUs = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_TABLE_TWO}`);
    const foodOrder = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_TABLE_THREE}`);
    console.log("Database is connected");

    app.get('/', (req, res) => res.send("<h1>Read Onion Foods</h1>"))

    app.get('/menuItems', (req, res) => {
        menuItems.find({})
            .toArray((err, result) => res.send(result))
    })

    app.get('/whyChooseUs', (req, res) => {
        whyChooseUs.find({}).toArray((err, result) => res.send(result))
    })

    app.post('/foodOrderConfirm', (req, res) => {
        foodOrder.insertOne(req.body)
            .then(result => res.send(result))
    })
});


app.listen(process.env.PORT || 4000, () => {
    console.log("Server is running")
})