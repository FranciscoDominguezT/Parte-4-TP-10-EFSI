import DBConfig from "../configs/db-config.js";
import pkg from 'pg';
const { Client, Pool } = pkg;

export default class EventRepository {
  createAsync = async (entity) => {
    let returnArray = null
    const client = new Client(DBConfig);
    try {
      await client.connect();
      const sql = `INSERT INTO events (name, description, id_event_category, id_event_location, start_date,duration_in_minutes,price,enabled_for_enrollment,max_assistance,id_creator_user) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10)`;
      const values = [
        entity.name,
        entity.description,
        entity.id_event_category,
        entity.id_event_location,
        entity.start_date,
        entity.duration_in_minutes,
        entity.price, 
        entity.enabled_for_enrollment ? '1': '0', 
        entity.max_assistance,
        entity.id_creator_user
      ]
      const result = await client.query(sql, values);
      await client.end();
      returnArray = result.rows;
    } catch (error) {
      console.log("Error in createAsync:", error);
    }

    return returnArray;
  }

  updateAsync = async(entity) => {
    let returnArray = null;
    const client = new Client(DBConfig);
    try {
      await client.connect();
      const sql = `
      UPDATE events
      SET name = $1, description = $2, id_event_category = $3, id_event_location = $4, start_date = $5, duration_in_minutes = $6, price = $7, enabled_for_enrollment = $8, max_assistance = $9, id_creator_user = $10 WHERE id = $11;`;
      const values = [
        entity.name,
        entity.description,
        entity.id_event_category,
        entity.id_event_location,
        entity.start_date,
        entity.duration_in_minutes,
        entity.price,
        entity.enabled_for_enrollment ? '1': '0',
        entity.max_assistance,
        entity.id_creator_user,
        entity.id
      ]

      console.log("Executing SQL:", sql);
      console.log("With values:", values);


      const result = await client.query(sql, values);
      await client.end();

      returnArray = result.rows
    } catch (error) {
      console.log("Error in updateAsync:", error);
    }

    return returnArray;
  }

  deleteAsync = async(id) => {
    let returnArray = null;
    const client = new Client(DBConfig);

    try {
      await client.connect();
      const sql = "DELETE FROM events WHERE id = $1";
      const values = [id];
      console.log("Executing SQL:", sql);
      console.log("With values:", values);

      const result = await client.query(sql, values);
      await client.end();
      returnArray = result.rows;
    } catch (error) {
      console.log("Error in deleteAsync:", error);
    }

    return returnArray;
  }

  getByIdAsync = async(id) => {
    let returnEntity = null;
    const client = new Client(DBConfig);
    try {
      await client.connect();
      const sql = "SELECT * FROM events WHERE id = $1";
      const values = [id];
      console.log("Executing SQL:", sql);
      console.log("With values:", values);

      const result = await client.query(sql, values);
      await client.end();
      if (result.rows.length > 0 ){
        returnEntity = result.rows[0];
      }
      
    } catch (error) {
      console.log("Error in getByIdAsync:", error);
    }

    return returnEntity;
  }

  getAllAsync = async() => {
    let returnArray = null;
    const client = new Client(DBConfig);
    try {
      await client.connect();
      const sql = "SELECT * FROM events";
      console.log("Executing SQL:", sql);
      const result = await client.query(sql);
      await client.end();
      returnArray = result.rows;
    } catch (error) {
      console.log("Error in getAllAsync:", error);
    }
    return returnArray;
  }

  registrationAsync = async(id) => {
    let returnArray = null;
    const client = new Client(DBConfig);

    try {
      await client.connect();
      const sql = "SELECT COUNT(*) FROM event_enrollments WHERE id_event = $1;";
      const values = [id];
      console.log("Executing SQL:", sql);
      console.log("With values:", values);

      const result = await client.query(sql, values);
      await client.end();
      returnArray = result.rows[0].count > 0;
    } catch (error) {
      console.log("Error in registrationAsync:", error);
    }
    return returnArray;
  }
}