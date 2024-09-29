import pool from "../config/db";

export interface IUser {
  email: string;
  password: string;
}

export interface UserResponse {
  rowCount: number;
  message: string;
  data: any;
}

class User {
  static createTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        username VARCHAR(50)  UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'user',
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        );`;

    try {
      const respnse = await pool.query(query);
      console.log("Response: ", respnse);
      console.log("users table created");
    } catch (err) {
      console.error("Error creating users table: ", err);
    }
  };

  // create a new user
  static createUser = async (user: IUser): Promise<UserResponse> => {
    const username = user.email.split("@")[0];
    const query = `
        INSERT INTO users(email, username, password)
        VALUES ($1, $2 ,$3)
        RETURNING *;
        `;

    try {
      const response = await pool.query(query, [
        user.email,
        username,
        user.password,
      ]);
      if (response.rowCount === 0) {
        return {
          rowCount: response.rowCount || 0,
          message: "User not created",
          data: response.rows || [],
        };
      }
      return {
        rowCount: response.rowCount || 0,
        message: "User created",
        data: response.rows[0] || {},
      };
    } catch (err) {
      console.error("Error creating user: ", err);
      return {
        rowCount: 0,
        message: "Error creating user",
        data: { rows: [] },
      };
    }
  };

  // get all users
  static getUsers = async (): Promise<UserResponse> => {
    const query = `
          SELECT * FROM users;
          `;

    try {
      const response = await pool.query(query);
      return {
        rowCount: response.rowCount || 0,
        message: response.rowCount === 0 ? "No users found" : "Users found",
        data: response.rows,
      };
    } catch (err) {
      console.error("Error getting users: ", err);
      return {
        rowCount: 0,
        message: "Error getting users",
        data: { rows: [] },
      };
    }
  };

  // get a user by id
  static getUserById = async (id: number): Promise<UserResponse> => {
    const query = `
                SELECT * FROM users
                WHERE id = $1;
                `;
    try {
      const response = await pool.query(query, [id]);
      return {
        rowCount: response.rowCount || 0,
        message: response.rowCount === 0 ? "User not found" : "User found",
        data: response.rows[0] || {},
      };
    } catch (err) {
      console.error("Error getting user: ", err);
      return {
        rowCount: 0,
        message: "Error getting user",
        data: {},
      };
    }
  };

  // delete a user by id
  static deleteUser = async (id: number): Promise<UserResponse> => {
    const query = `
            DELETE FROM users
            WHERE id = $1
            RETURNING *;
            `;
    try {
      const response = await pool.query(query, [id]);

      return {
        rowCount: response.rowCount || 0,
        message: response.rowCount === 0 ? "User not found" : "User deleted",
        data: response.rows[0] || {},
      };
    } catch (err) {
      console.error("Error deleting user: ", err);
      return {
        rowCount: 0,
        message: "Error deleting user",
        data: [],
      };
    }
  };
}

export default User;
