const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const pg = require('pg');
const superagent = require('superagent');
const PORT = process.env.PORT
DATABASE_URL = process.env.DATABASE_URL
app.use(cors());
const client = new pg.Client(DATABASE_URL);

app.use('./public', express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engin', 'ejs')


app.get('/', handle)


function handle(req, res) {
    // let sql = 'SELECT * from people;';
    // client.query(sql).then(result => {
    //     console.log('...index...', result);

    //     res.send(result)

    // });
    res.render('pages/index.ejs')
}


app.listen(PORT, () => {
    console.log('the port is ...', PORT)
});