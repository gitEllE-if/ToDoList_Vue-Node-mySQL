module.exports = async (dbConnection, tableName) => {
    try {
        const sql = `CREATE TABLE if not exists ??(
            id int primary key auto_increment,
            name varchar(255) not null,
            done bool not null DEFAULT false
          )`;
        await dbConnection.query(sql, [`${tableName}`]);
        console.log(`==> table "${tableName}" created/used`);
        return true;
    }
    catch (err) {
        console.log(`==> table "${tableName}" create fail ` + err);
        dbConnection.end()
        return false;
    }
}
