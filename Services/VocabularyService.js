const db = require("../dbconfig");
const IVocabularyService = require("../interface/IVocabularyService");

class VocabularyService extends IVocabularyService {
    async getAllVocabulary() {
        try {
            const pool = await db.getPool();
            const result = await pool.query("SELECT * FROM Vocabulary");
            return result.rows; // PostgreSQL trả về `rows`
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getWordById(id) {
        try {
            console.log("Dữ liệu ID:", id);
            const pool = await db.getPool();
            const result = await pool.query(
                "SELECT * FROM Vocabulary WHERE WordID = $1", 
                [id] // Sử dụng tham số `$1`
            );
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getVocabularyByTopic(topicId) {
        try {
            const pool = await db.getPool();
            const result = await pool.query(
                "SELECT * FROM Vocabulary WHERE TopicID = $1", 
                [topicId]
            );
            return result.rows;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async createWord(word) {
        try {
            const pool = await db.getPool();
            const result = await pool.query(
                "INSERT INTO Vocabulary (Wordid,Word, Translation, TopicID, Image) VALUES ($1, $2, $3, $4,$5) RETURNING *",
                [word.WordID,word.Word, word.Translation, word.TopicID, word.Image]
            );
            return `Từ đã được thêm: ${word.Word}`;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async updateWord(id, word) {
        try {
            const pool = await db.getPool();
            const result = await pool.query(
                "UPDATE Vocabulary SET Word = $1, Translation = $2, TopicID = $3, Image = $4 WHERE WordID = $5 RETURNING *",
                [word.Word, word.Translation, word.TopicID, word.Image, id]
            );

            if (result.rowCount === 0) {
                throw new Error("Không tìm thấy từ để sửa.");
            }

            return "Từ đã được sửa thành công.";
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async deleteWord(id) {
        try {
            const pool = await db.getPool();
            const result = await pool.query(
                "DELETE FROM Vocabulary WHERE WordID = $1 RETURNING *",
                [id]
            );

            if (result.rowCount === 0) {
                throw new Error("Không tìm thấy từ để xóa.");
            }

            return "Từ đã được xóa thành công.";
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = new VocabularyService();
