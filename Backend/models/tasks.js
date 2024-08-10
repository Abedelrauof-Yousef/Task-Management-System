const pool = require("../db/db");
class Tasks {
  static async makeTasks({ description, title, user_id }) {
    try {
      let result = await pool.query(
        `INSERT INTO tasks (task_title,task_description,user_id) VALUES ($1,$2,$3) RETURNING *`,
        [title, description, user_id]
      );
      return result.rows[0];
    } catch (e) {
      return e;
    }
  }

  static async getTasks({ user_id }) {
    try {
      let result = await pool.query(`SELECT * FROM tasks WHERE user_id = $1`, [
        user_id,
      ]);

      return result.rows;
    } catch (e) {
      return e;
    }
  }

  static async updateTask({ task_id, description, title }) {
    try {
      let result = await pool.query(
        `UPDATE tasks SET task_title = $1, task_description=$2 WHERE task_id=$3 RETURNING *`,
        [title, description, task_id]
      );
      return result.rows[0];
    } catch (e) {
      return e;
    }
  }

  static async deleteTask({ task_id, isDeleted }) {
    try {
      let result = await pool.query(
        `UPDATE tasks SET isDeleted=$1 WHERE task_id=$2 RETURNING *`,
        [isDeleted, task_id]
      );
      return result.rows[0];
    } catch (e) {
      return e;
    }
  }
}

module.exports = Tasks;
