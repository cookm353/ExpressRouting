const { Stats, RequestHandler, ExpressError } = require('./models')
const express = require('express')
const fs = require('fs')
const process = require('process')

const app = express()
const port: number = 3000
const stats = new Stats

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const handler = new RequestHandler

app.get('/mean', (req, resp, next) => {
    let json
    try {
        const err = handler.validateInput(req.body)
        if (err) {
            throw err
        } else {
            const { nums } = req.body
            json = handler.buildResponse("mean", nums)
        }
    } catch (err) {
        return next(err)
    }
    return resp.json(json)
})

app.get('/median', (req, resp, next) => {
    
    try {    
        const { nums } = req.body
        if (!nums) {
            throw new ExpressError("Numbers are required", 400)
        } else if (!handler.validateInput(nums)) {
            throw new ExpressError("Array must contain only numbers", 400)
        }
    } catch (err) {
        return next(err)
    }

    const json = handler.buildResponse("median", nums)
    return resp.json(json)
})

app.get('/mode', (req, resp, next) => {
    try {    
        const { nums } = req.body
        if (!nums) {
            throw new ExpressError("Numbers are required", 400)
        } else if (!handler.validateInput(nums)) {
            throw new ExpressError("Array must contain only numbers", 400)
        }
    } catch (err) {
        return next(err)
    }

    const json = handler.buildResponse("mode", nums)
    return resp.json(json)
})

app.get('/all', (req, resp, next) => {
    try {    
        const { nums } = req.body
        if (!nums) {
            throw new ExpressError("Numbers are required", 400)
        } else if (!handler.validateInput(nums)) {
            throw new ExpressError("Array must contain only numbers", 400)
        }
    } catch (err) {
        return next(err)
    }

    const json = handler.buildResponse("all", nums)
    return resp.json(json)
})

app.use((req, resp, next) => {
    const err = new ExpressError("Page Not Found", 404)
    next(err)
})

app.use((err, req, resp, next) => {
    const status = err.status || 500
    const msg = err.msg

    return resp.status(status).json({
        error: { msg, status }
    })
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})