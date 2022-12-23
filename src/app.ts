const { Stats } = require('./model')
const express = require('express')

const app = express()
const port: number = 3000
const stats = new Stats

app.use(express.json())
app.use(express.urlencoded({extended: true}))

interface StatsResp {
    "operation": string,
    "value": number
}

// Index
app.get('/', (req, resp) => {
    return resp.send('<h1>Hi!</h1>')
})

app.get('/mean', (req, resp) => {
    const { nums } = req.body
    console.log(stats.mean(nums))
    const json: StatsResp = {
        "operation": "mean",
        "value": stats.mean(nums)
    }
    
    return resp.json(json)
})

app.get('/median', (req, resp) => {
    const { nums } = req.body
    const json: StatsResp = {
        "operation": "median",
        "value": stats.median(nums)
    }
    
    return resp.json(json)
})

app.get('/mode', (req, resp) => {
    const { nums } = req.body
    const json: StatsResp = {
        "operation": "mode",
        "value": stats.mode(nums)
    }
    return resp.json(json)
})

app.get('/all', (req, resp) => {
    const { nums } = req.body
    const json = {
        "mean": stats.mean(nums),
        "median": stats.median(nums),
        "mode": stats.mode(nums)
    }
    return resp.json(json)
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})