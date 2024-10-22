import DBConfig from "../configs/db-config.js";
import pkg from 'pg';
const { Client, Pool } = pkg;

export default class LocationRepository {
    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);

        try {
            await client.connect();
            const sql = 'SELECT * FROM locations';
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
          const sql = 'SELECT * FROM locations WHERE id = $1';
          const values = [id];
          const result = await client.query(sql, values);
          await client.end();
          returnArray = result.rows;
        } catch (error) {
          console.log(error);
        }
        return returnArray;
      }

      getEventLocationByIdAsync = async (id) => {
        let returnArray = null;
        const client = new Client(DBConfig);
    
        try {
          await client.connect();
          const sql = 'SELECT * FROM event_locations WHERE id_location = $1';
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