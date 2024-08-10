const pool = require("../db/db");
const bcrypt = require("bcryptjs");

class User {
  static async createUser({ email, password, username }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (email, user_password,username) VALUES ($1,$2,$3) RETURNING *",
      [email, hashedPassword, username]
    );
    console.log("No error");
    return result.rows[0];
  }

  static async findUser({ email, password }) {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    const user = result.rows[0];

    if (await bcrypt.compare(password, user.user_password)) return user;
    else {
      return { message: "invalid credentials" };
    }
  }
}

module.exports = User;
