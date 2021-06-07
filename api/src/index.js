const express = require('express');
const dataBaseCreate = require('./db');
const dataBaseQuery = require('./db/modules/query');

const app = express();
const port = 3000;
const DB_NAME = 'todo_db';
const TABLE_NAME = 'todo_list';

app.use(express.json());

let dataBase;
dataBaseCreate(DB_NAME, TABLE_NAME).then((res) => (dataBase = res));

app.get('/todo', async (req, res) => {
    try {
        const sql = `SELECT * FROM ??;`;
        const result = await dataBaseQuery(dataBase, sql, [`${DB_NAME}.${TABLE_NAME}`]);
        res.json(result[0]);
        console.log('==> successfull get from db');
    }
    catch (err) {
        console.log('==> failed get from db ' + err);
    }
});

app.post('/todo', async (req, res) => {
    try {
        const { name, done } = req.body;
        const sql = `INSERT INTO ??(??, ??) VALUES (?, ?);`;
        const result = await dataBaseQuery(dataBase, sql,
            [`${DB_NAME}.${TABLE_NAME}`, 'name', 'done', name, done]);
        if (result) res.json({ status: 'ok' });
        console.log('==> successfull post to db');
    }
    catch (err) {
        console.log('==> failed post to db ' + err);
        res.send({ status: 'fail' });
    }
});

app.delete('/todo/:id', async (req, res) => {
    try {
        const sql = `DELETE FROM ?? WHERE (?? = ?);`;
        const result = await dataBaseQuery(dataBase, sql,
            [`${DB_NAME}.${TABLE_NAME}`, 'id', req.params.id]);
        if (result) res.json({ status: 'ok' });
        console.log('==> successfull delete from db');
    }
    catch (err) {
        console.log('==> failed delete from db ' + err);
        res.send({ status: 'fail' });
    }
});

app.put('/todo/:id', async (req, res) => {
    try {
        const sql = `UPDATE ?? SET ?? = ? WHERE (?? = ?);`;
        const result = await dataBaseQuery(dataBase, sql,
            [`${DB_NAME}.${TABLE_NAME}`, 'done', req.body.done, 'id', req.params.id]);
        if (result) res.json({ status: 'ok' });
        console.log('==> successfull put to db');
    }
    catch (err) {
        console.log('==> failed delete from db ' + err);
        res.send({ status: 'fail' });
    }
});

app.listen(port, () => { console.log(`listen at port ${port}...`); });
