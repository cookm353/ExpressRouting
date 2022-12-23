const { Stats } = require('./model');
const express = require('express');
const app = express();
const port = 3000;
const stats = new Stats;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Index
app.get('/', (req, resp) => {
    return resp.send('<h1>Hi!</h1>');
});
app.get('/dog', (req, resp) => {
    return resp.send('Doggo go arf');
});
app.get('/mean', (req, resp) => {
    const { nums } = req.body;
    console.log(stats.mean(nums));
    const json = {
        "operation": "mean",
        "value": stats.mean(nums)
    };
    return resp.json(json);
});
app.get('/median', (req, resp) => {
    const { nums } = req.body;
    const json = {
        "operation": "median",
        "value": stats.median(nums)
    };
    return resp.json(json);
});
app.get('/mode', (req, resp) => {
    const { nums } = req.body;
    const json = {
        "operation": "mode",
        "value": stats.mode(nums)
    };
    return resp.json(json);
});
app.get('/all', (req, resp) => {
    const { nums } = req.body;
    const json = {
        "mean": stats.mean(nums),
        "median": stats.median(nums),
        "mode": stats.mode(nums)
    };
    return resp.json(json);
});
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
