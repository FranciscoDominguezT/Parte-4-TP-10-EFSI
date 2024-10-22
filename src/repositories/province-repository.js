import DBConfig from "../configs/db-config.js";
import pkg from 'pg';
const { Client, Pool } = pkg;

export default class ProvinceRepository {
    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);

        try {
            await client.connect();
            const sql = 'SELECT * FROM provinces';
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    getByIdAsync = async (id) => {
        let returnArray = null;
        const client = new Client(DBConfig);
    
        try {
          await client.connect();
          const sql = 'SELECT * FROM provinces WHERE id = $1';
          const values = [id];
          const result = await client.query(sql, values);
          await client.end();
          returnArray = result.rows;
        } catch (error) {
          console.log(error);
        }
        return returnArray;
      }
    
      createAsync = async (entity) => {
        let returnArray = null;
        const client = new Client(DBConfig);

        try{
            await client.connect();
            const sql = 'INSERT INTO provinces (name, full_name, latitude, longitude, display_order) VALUES ($1, $2, $3, $4, $5)';
            const values = [entity.name, entity.full_name, entity.latitude, entity.longitude, entity.display_order];
            const result = await client.query(sql, values);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        
        return returnArray;
      }
    
      updateAsync = async (entity) => {
        let returnArray = null;
        const client = new Client(DBConfig);
    
        try {
          await client.connect();
          const sql = 'UPDATE provinces SET name = $1, full_name = $2, latitude = $3, longitude = $4, display_order = $5 WHERE id = $6';
          const values = [entity.name, entity.full_name, entity.latitude, entity.longitude, entity.display_order, entity.id];
          const result = await client.query(sql, values);
          await client.end();
          returnArray = result.rows;
        } catch (error) {
          console.log(error);
        }
        return returnArray;
      }
    
      deleteByIdAsync = async (id) => {
        let returnArray = null;
        const client = new Client(DBConfig);
    
        try {
          await client.connect();
          const sql = 'DELETE FROM provinces WHERE id = $1';
          const values = [id];
          const result = await client.query(sql, values);
          await client.end();
          returnArray = result.rows;
        } catch (error) {
          console.log(error);
        }
        return returnArray;
      }
}