require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to the MySQL database.');
});

function generateQuery(baseSql, query) {
    let sql = baseSql + ' WHERE 1=1';
    let queryParams = [];

    if (query.search) {
        sql += ' AND name LIKE ?';
        queryParams.push('%' + query.search + '%');
    }

    
    // You can add more conditions based on other filters (state, city, etc.)
    
    if (query.state) {
        sql += ' AND address LIKE ?';
        queryParams.push('%, ' + query.state + '%');
    }
    
    

    return { sql, queryParams };
}

app.get('/api/activities', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { sql, queryParams } = generateQuery('SELECT * FROM activities', req.query);

    // Calculate the offset based on the current page and limit
    const offset = (page - 1) * limit;

    // Modify the query to include LIMIT and OFFSET
    const paginatedSql = sql + ' LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    db.query(paginatedSql, queryParams, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Something went wrong');
        }
        res.send(result);
    });
});

app.get('/api/restaurants', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { sql, queryParams } = generateQuery('SELECT * FROM restaurants', req.query);

    // Calculate the offset based on the current page and limit
    const offset = (page - 1) * limit;

    // Modify the query to include LIMIT and OFFSET
    const paginatedSql = sql + ' LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    db.query(paginatedSql, queryParams, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Something went wrong');
        }
        res.send(result);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
