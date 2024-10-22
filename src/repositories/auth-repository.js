import DBConfig from "../configs/db-config.js";
import pkg from 'pg';
import jwt from "jsonwebtoken";
const { Client } = pkg;
const secretKey = 'mysecretkey';

export default class AuthRepository {
  loginAsync = async (entity) => {
    const client = new Client(DBConfig);
    try {
      await client.connect();
      const sql = 'SELECT * FROM users WHERE username = $1';
      const values = [entity.username];
      const result = await client.query(sql, values);
      await client.end();
      if (result.rows.length > 0) {
        const user = result.rows[0];
        if (user.password === entity.password) {
          return { id: user.id, username: user.username };
        }
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  

  registerAsync = async (entity) => {
    const client = new Client(DBConfig);
    try {
      await client.connect();
      const sql = 'INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING id, username';
      const values = [entity.first_name, entity.last_name, entity.username, entity.password];
      const result = await client.query(sql, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return null;
    } finally {
      await client.end();
    }
  }
}