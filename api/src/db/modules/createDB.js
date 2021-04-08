module.exports = async (dbConnection, dbName) => {
    try {
        await dbConnection.query('CREATE DATABASE if not exists ??', [`${dbName}`]);
        await dbConnection.query('USE ??', [`${dbName}`]);
        console.log(`==> dataBase "${dbName}" created (or used if exist)`);
        return true;
    }
    catch (err) {
        console.log(`==> dataBase "${dbName}" create/use fail ` + err);
        dbConnection.end();
        return false;
    }
}
