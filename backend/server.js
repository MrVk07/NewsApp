import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import fetch from 'node-fetch'
import path from 'path'

const app = express()
dotenv.config()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.PORT || 5000

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

app.get('/', (req, res) => {
    res.send("From backend")
})

app.post('/postreq', async (req, res) => {
    let { country, category, page, pageSize } = req.body
    let apiKey = process.env.REACT_APP_NEWS_API
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`
    let data = await fetch(url)
    let textData = await data.text()
    console.log(textData);
    res.send(textData)
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})