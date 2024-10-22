import DBConfig from "../configs/db-config.js";
import pkg from "pg";
const { Client, Pool } = pkg;

export default class EventListRepository {
  getAllAsync = async () => {
    let returnArray = null;
    const client = new Client(DBConfig);

    try {
      await client.connect();
      const sql = "SELECT * FROM events";
      const result = await client.query(sql);
      await client.end();
      returnArray = result.rows;
    } catch (error) {
      console.log(error);
    }
    return returnArray;
  };

  getByIdAsync = async (id) => {
    let returnArray = null;
    const client = new Client(DBConfig);

    try {
      await client.connect();
      const sql = "SELECT * FROM events WHERE id = $1";
      const values = [id];
      const result = await client.query(sql, values);
      await client.end();
      returnArray = result.rows;
    } catch (error) {
      console.log(error);
    }
    return returnArray;
  };

  getByNameAsync = async (name) => {
    let returnArray = null;
    const client = new Client(DBConfig);

    try {
      await client.connect();
      const sql = "SELECT * FROM events WHERE name = $1";
      const values = [name];
      const result = await client.query(sql, values);
      await client.end();
      returnArray = result.rows;
    } catch (error) {
      console.log(error);
    }
    return returnArray;
  };

  getDetailsAsync = async (id) => {
    let returnObject = null;
    const client = new Client(DBConfig);

    try {
      await client.connect();
      const sql = `
                SELECT e.id, e.name, e.description, e.id_event_category, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, e.id_creator_user,
                    el.id as event_location_id, el.name as event_location_name, el.full_address as event_location_full_address, el.max_capacity as event_location_max_capacity, el.latitude as event_location_latitude, el.longitude as event_location_longitude,
                    l.id as location_id, l.name as location_name, l.latitude as location_latitude, l.longitude as location_longitude,
                    p.id as province_id, p.name as province_name, p.full_name as province_full_name, p.latitude as province_latitude, p.longitude as province_longitude,
                    u.id as creator_user_id, u.first_name as creator_user_first_name, u.last_name as creator_user_last_name, u.username as creator_user_username,
                    c.id as event_category_id, c.name as event_category_name, c.display_order as event_category_display_order,
                    array_agg(json_build_object('id', t.id, 'name', t.name)) as tags
                FROM events e
                JOIN event_locations el ON e.id_event_location = el.id
                JOIN locations l ON el.id_location = l.id
                JOIN provinces p ON l.id_province = p.id
                JOIN users u ON e.id_creator_user = u.id
                JOIN event_categories c ON e.id_event_category = c.id
                LEFT JOIN event_tags et ON e.id = et.id_event
                LEFT JOIN tags t ON et.id_tag = t.id
                WHERE e.id = $1
                GROUP BY e.id, el.id, l.id, p.id, u.id, c.id;
            `;
      const values = [id];
      const result = await client.query(sql, values);
      await client.end();

      if (result.rows.length > 0) {
        const row = result.rows[0];
        returnObject = {
          id: row.id,
          name: row.name,
          description: row.description,
          id_event_category: row.id_event_category,
          id_event_location: row.event_location_id,
          start_date: row.start_date,
          duration_in_minutes: row.duration_in_minutes,
          price: row.price,
          enabled_for_enrollment: row.enabled_for_enrollment,
          max_assistance: row.max_assistance,
          id_creator_user: row.id_creator_user,
          event_location: {
            id: row.event_location_id,
            id_location: row.location_id,
            name: row.event_location_name,
            full_address: row.event_location_full_address,
            max_capacity: row.event_location_max_capacity,
            latitude: row.event_location_latitude,
            longitude: row.event_location_longitude,
            id_creator_user: row.id_creator_user,
            location: {
              id: row.location_id,
              name: row.location_name,
              id_province: row.province_id,
              latitude: row.location_latitude,
              longitude: row.location_longitude,
              province: {
                id: row.province_id,
                name: row.province_name,
                full_name: row.province_full_name,
                latitude: row.province_latitude,
                longitude: row.province_longitude,
                display_order: null,
              },
            },
            creator_user: {
              id: row.creator_user_id,
              first_name: row.creator_user_first_name,
              last_name: row.creator_user_last_name,
              username: row.creator_user_username,
              password: "******",
            },
          },
          tags: row.tags,
          creator_user: {
            id: row.creator_user_id,
            first_name: row.creator_user_first_name,
            last_name: row.creator_user_last_name,
            username: row.creator_user_username,
            password: "******",
          },
          event_category: {
            id: row.event_category_id,
            name: row.event_category_name,
            display_order: row.event_category_display_order,
          },
        };
      }
    } catch (error) {
      console.log(error);
    }
    return returnObject;
  };

  getParticipantsAsync = async (eventId, filters) => {
    let returnObject = null;
    const client = new Client(DBConfig);
    const { first_name, last_name, username, attended, rating } = filters || {}; // Asegurarse de que los filtros estén definidos o usar un objeto vacío
    const conditions = [];
    const values = [eventId];

    if (first_name) {
      values.push(`%${first_name}%`);
      conditions.push(`u.first_name ILIKE $${values.length}`);
    }
    if (last_name) {
      values.push(`%${last_name}%`);
      conditions.push(`u.last_name ILIKE $${values.length}`);
    }
    if (username) {
      values.push(`%${username}%`);
      conditions.push(`u.username ILIKE $${values.length}`);
    }
    if (attended !== undefined) {
      values.push(attended);
      conditions.push(`e.attended = $${values.length}`);
    }
    if (rating) {
      values.push(rating);
      conditions.push(`e.rating >= $${values.length}`);
    }

    const whereClause = conditions.length
      ? `AND ${conditions.join(" AND ")}`
      : "";

    try {
      await client.connect();
      const sql = `
            SELECT 
                e.id, e.id_event, e.id_user, e.description, e.registration_date_time, e.attended, e.observations, e.rating,
                u.id as user_id, u.first_name, u.last_name, u.username, u.password
            FROM event_enrollments e
            JOIN users u ON e.id_user = u.id
            WHERE e.id_event = $1 ${whereClause}
        `;
      const result = await client.query(sql, values);
      await client.end();

      returnObject = {
        collection: result.rows.map((row) => ({
          id: row.id,
          id_event: row.id_event,
          id_user: row.id_user,
          user: {
            id: row.user_id,
            first_name: row.first_name,
            last_name: row.last_name,
            username: row.username,
            password: "******", // Ocultar el password en la respuesta
          },
          description: row.description,
          registration_date_time: row.registration_date_time,
          attended: row.attended,
          observations: row.observations,
          rating: row.rating,
        })),
        pagination: {
          limit: 0, // Este valor deberá ser actualizado según la lógica de paginación que implementes
          offset: 0, // Este valor deberá ser actualizado según la lógica de paginación que implementes
          nextPage: "", // Este valor deberá ser actualizado según la lógica de paginación que implementes
          total: result.rowCount,
        },
      };
    } catch (error) {
      console.log(error);
    }

    return returnObject;
  };

  getEventsAsync = async (filters) => {
    const client = new Client(DBConfig);
    const { name, category, startdate, tag, limit = 100, offset = 0 } = filters || {};
    const conditions = [];
    const values = [];

    if (name) {
        values.push(`%${name}%`);
        conditions.push(`e.name ILIKE $${values.length}`);
    }
    if (category) {
        values.push(`%${category}%`);
        conditions.push(`c.name ILIKE $${values.length}`);
    }
    if (startdate) {
        values.push(startdate);
        conditions.push(`DATE(e.start_date) = $${values.length}`);
    }
    if (tag) {
        values.push(`%${tag}%`);
        conditions.push(`t.name ILIKE $${values.length}`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const query = `
        SELECT 
            e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, el.max_capacity,
            u.id as creator_user_id, u.first_name as creator_user_first_name, u.last_name as creator_user_last_name, u.username as creator_user_username,
            c.id as category_id, c.name as category_name,
            el.id as location_id, el.name as location_name, el.full_address as location_full_address
        FROM events e
        JOIN users u ON e.id_creator_user = u.id
        JOIN event_categories c ON e.id_event_category = c.id
        JOIN event_locations el ON e.id_event_location = el.id
        LEFT JOIN event_tags et ON e.id = et.id_event
        LEFT JOIN tags t ON et.id_tag = t.id
        ${whereClause}
        ORDER BY e.start_date DESC
        LIMIT $${values.length + 1} OFFSET $${values.length + 2}
    `;
    values.push(limit, offset);

    try {
      await client.connect();
      const res = await client.query(query, values);

      const countQuery = `
          SELECT COUNT(*)
          FROM events e
          JOIN event_categories c ON e.id_event_category = c.id
          LEFT JOIN event_tags et ON e.id = et.id_event
          LEFT JOIN tags t ON et.id_tag = t.id
          ${whereClause}
      `;
      const countRes = await client.query(countQuery, values.slice(0, values.length - 2));
      const total = parseInt(countRes.rows[0].count, 10);

      return {
        events: res.rows,
        total
      };
    } finally {
      await client.end();
    }
  };
}
