const db = require("../dbconfig");
const ITopicService = require("../interface/ITopicService");

class TopicService extends ITopicService {
    async getAllTopics() {
        try {
            const pool = await db.getPool();
            const result = await pool.query("SELECT * FROM Topics");
            return result.rows; // PostgreSQL trả về `rows`, không phải `recordset`
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async addTopic(topic) {
        try {
            console.log("Dữ liệu nhận được:", topic);
            const pool = await db.getPool();
            await pool.query(
                "INSERT INTO Topics (TopicID, Name) VALUES ($1, $2)", 
                [topic.TopicID, topic.Name] // PostgreSQL dùng `$1, $2` để tránh SQL Injection
            );
            return `Chủ đề đã được thêm với ID: ${topic.TopicID}, tên: ${topic.Name}`;
        } catch (err) {
            console.error("Lỗi:", err.message);
            throw new Error(err.message);
        }
    }

    async updateTopic(topicID, topic) {
        try {
            const pool = await db.getPool();
            const result = await pool.query(
                "UPDATE Topics SET Name = $1 WHERE TopicID = $2",
                [topic.Name, topicID]
            );

            if (result.rowCount === 0) {
                throw new Error("Topic not found");
            }

            return "Topic updated successfully";
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async deleteTopic(topicID) {
        try {
            console.log("Dữ liệu nhận:", topicID);
            const pool = await db.getPool();
            const result = await pool.query(
                "DELETE FROM Topics WHERE TopicID = $1",
                [topicID]
            );

            if (result.rowCount === 0) {
                throw new Error("Topic not found");
            }

            return "Topic deleted successfully";
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = new TopicService();
