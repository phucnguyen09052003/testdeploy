const db = require("../dbconfig");
const IUserService = require('../interface/IUserService');

class UserService extends IUserService {
    async getUser() {
        try {
            const pool = await db.getPool();
            const result = await pool.query("SELECT * FROM Users");
            return result.rows;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getUserByName(username) {
        try {
            console.log("Dữ liệu username:", username);
            const pool = await db.getPool();

            // Truy vấn PostgreSQL, dùng tham số `$1`
            const result = await pool.query(
                'SELECT * FROM Users WHERE Username = $1', 
                [username]
            );

            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (err) {
            console.error('Lỗi khi lấy thông tin người dùng:', err.message);
            throw err;
        }
    }
}

module.exports = new UserService();
