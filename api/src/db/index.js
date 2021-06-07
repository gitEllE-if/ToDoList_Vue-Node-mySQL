const connectDB = require('./modules/createConnection');
const createDB = require('./modules/createDB');
const createTable = require('./modules/createTable');

module.exports = async (dbName, tableName) => {
    try {
        const dbConnection = await connectDB();
        if (dbConnection) {
            if (await createDB(dbConnection, dbName)) {
                await createTable(dbConnection, tableName);
            }
        }
        return dbConnection;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}
