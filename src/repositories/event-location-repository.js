import DBConfig from "../configs/db-config.js";
import pkg from 'pg';
const { Client } = pkg;

export default class EventLocationRepository {
  getAllAsync = async() => {
    let returnArray = null;
    const client = new Client(DBConfig);
    try {
      await client.connect();
      const sql = "SELECT * FROM event_locations";
      console.log("Executing SQL:", sql);

      const result = await client.query(sql);
      await client.end();
      returnArray = result.rows;
    } catch (error) {
      console.log("Error in getByIdAsync:", error);
    }

    return returnArray;
  }

  getByIdAsync = async (id) => {
    let returnArray = null;
    const client = new Client(DBConfig);
    try {
      await client.connect();
      const sql = "SELECT * FROM event_locations WHERE id = $1";
      console.log("Executing SQL:", sql);
      const values = [id];
      const result = await client.query(sql, values);
      await client.end();
      returnArray = result.rows;
    } catch (error) {
      console.log("Error in getByIdAsync:", error);
    }

    return returnArray;
  }

  createAsync = async (entity) => {
    const client = new Client(DBConfig);
    await client.connect();
    try {
      const sql = `INSERT INTO event_locations (id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user)
                   VALUES ($1, $2, $3, $4, $5, $6, $7)`;
      const values = [
        entity.id_location,
        entity.name,
        entity.full_address,
        entity.max_capacity,
        entity.latitude,
        entity.longitude,
        entity.id_creator_user
      ];
      const result = await client.query(sql, values);
      return result.rows;
    } finally {
      await client.end();
    }
  }

  updateAsync = async (entity) => {
    let resultado = 0;
    const client = new Client(DBConfig);
    console.log("Entity", entity);
    await client.connect();
    try {
      const sql = "UPDATE event_locations SET id_location = $1, name = $2, full_address = $3, max_capacity = $4, latitude = $5, longitude = $6, id_creator_user = $7 WHERE id = $8";
      const values = [
        entity.id_location,
        entity.name,
        entity.full_address,
        entity.max_capacity,
        entity.latitude,
        entity.longitude,
        entity.id_creator_user,
        entity.id
      ];
      const result = await client.query(sql, values);
      resultado = result.rowCount;
    } finally {
      await client.end();
      console.log("ERROR")
    }
    return resultado;
  }

  deleteAsync = async (id) => {
    const client = new Client(DBConfig);
    await client.connect();
    try {
      const sql = "DELETE FROM event_locations WHERE id = $1";
      const values = [id];
      const result = await client.query(sql, values);
      return result.rows;
    } finally {
      await client.end();
    }
  }
}
