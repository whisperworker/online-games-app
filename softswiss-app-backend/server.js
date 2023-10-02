const express = require('express');
var cors = require('cors')
const app = express();
const data = require('./games-db.json');

app.use(cors())


app.get('/api/games', (req, res, next) => {
    setTimeout(() => {
        const convertedResult = Object.keys(data).map((gameKey) => ({
            gameKey,
            gameImageUrl: `https://cdn2.softswiss.net/i/s2/${gameKey}.png`,
            ...data[gameKey],
        }));
        convertedResult.sort(
            (a, b) => a.collections.popularity - b.collections.popularity,
        );
        res.json(convertedResult)
    }, 1000)
})


app.listen(3001, () => {
    console.log('Сервер запущен')
})
