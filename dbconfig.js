const { Pool } = require("pg");

const pool = new Pool({
  user: "toeicdata_user", 
  host: "dpg-cv988blumphs73fluv20-a.oregon-postgres.render.com",
  database: "toeicdata",
  password: "MuxxNDZFhdtBpe0tDRdg2ezggx2X2HeQ",
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

class Database {
  constructor() {
    if (!Database.instance) {
      this.pool = pool;
      Database.instance = this;
    }
    return Database.instance;
  }

  async getPool() {
    return this.pool;
  }
}

module.exports = new Database();
