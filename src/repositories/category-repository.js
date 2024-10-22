import DBConfig from "../configs/db-config.js";
import pkg from 'pg';
const { Client, Pool } = pkg;

export default class CategoryRepository {
    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);

        try {
            await client.connect();
            const sql = 'SELECT * FROM event_categories';
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
          const sql = 'SELECT * FROM event_categories WHERE id = $1';
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
            const sql = 'INSERT INTO event_categories (name, display_order) VALUES ($1, $2)';
            const values = [entity.name, entity.display_order];
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
          const sql = 'UPDATE event_categories SET name = $1, display_order = $2 WHERE id = $3';
          const values = [entity.name, entity.display_order, entity.id];
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
          const sql = 'DELETE FROM event_categories WHERE id = $1';
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