// event-enrollment-repository.js

import DBConfig from "../configs/db-config.js";
import pkg from 'pg';
const { Client } = pkg;

export default class EventEnrollmentRepository {
  // ...

  getByIdAsync = async (id) => {
    const client = new Client(DBConfig);
    try {
      await client.connect();
      const sql = "SELECT * FROM event_enrollments WHERE id = $1";
      const values = [id];
      const result = await client.query(sql, values);
      return result.rows[0] || null;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await client.end();
    }
  }

  updateRatingAndObservations = async (id, rating, observations) => {
    const client = new Client(DBConfig);
    try {
      await client.connect();
      const sql = "UPDATE event_enrollments SET rating = $1, observations = $2 WHERE id = $3 RETURNING *";
      const values = [rating, observations, id];
      const result = await client.query(sql, values);
      return result.rows[0] || null;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await client.end();
    }
  }
}