const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const pg = require('pg');
const superagent = require('superagent');
// const methodoverride = require('method-override');
const PORT = process.env.PORT
DATABASE_URL = process.env.DATABASE_URL
app.use(cors());
const client = new pg.Client(DATABASE_URL);
app.use('/public', express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engin', 'ejs');


app.get('/', handleIndex);
app.get('/searches/new', handleNew);
app.post('/search', handleSearch);

function handleSearch(req, res) {
    let info = req.body;
    console.log('saearches info is ... ', info);

    let sub = info.search;
    let type = info.type;

    let url = `https://www.googleapis.com/books/v1/volumes?q=${type}${sub}`;

    superagent.get(url).then(data => {

        // console.log('data is ... ', data.body.items);


        let objArr = data.body.items.map(val => {

            return new Book(val.volumeInfo);

        })
        console.log(objArr);
        res.render('pages/searches/show.ejs', { result: objArr })

    }).catch(err => res.send(`theere an error in handleSearch... ${err}`))
}

function handleNew(req, res) {
    res.render('pages/searches/new.ejs');
}

function Book(val) {
    this.title = val.title ? val.title : ' No Title ';
    this.author = val.authors ? val.authors : ' No Author '
    this.img = val.imageLinks ? val.imageLinks.thumbnail : 'No Image '
    this.ISBN = val.industryIdentifiers ? val.industryIdentifiers[0].identifier : ' No ISBN'
    this.description = val.description ? val.description : ' No Description '
}


function handleIndex(req, res) {

    res.render('pages/index.ejs')
}


app.listen(PORT, () => {
    console.log('the port is ...', PORT)
});