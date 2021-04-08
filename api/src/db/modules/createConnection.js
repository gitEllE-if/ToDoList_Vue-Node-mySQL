const mysql2 = require('mysql2/promise');

module.exports = async () => {
    try {
        const connection = await mysql2.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'pass'
        });
        return connection;
    }
    catch (err) {
        console.log("==> create connection fail " + err);
        return null;
    }
};
