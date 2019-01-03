const express = require('express');

const port = process.env.PORT || 8008;

const app = express();

app.get('/', (req, res) => {
    res.send('index')
});

app.listen(port, () => {
    console.log(`Server started at port ${port}...`)
})