const pool = require('./database');
const bcrypt = require('bcrypt');

const initializeDatabase = async () => {
  try {

    // Always use lowercase schema
    const schema = process.env.DB_SCHEMA || 'drugapp';

    // Create schema if not exists
    await pool.query(`CREATE SCHEMA IF NOT EXISTS ${schema}`);

    console.log(`Schema ensured: ${schema}`);

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${schema}.users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Users table ensured');

    // Check users count (with schema)
    const result = await pool.query(
      `SELECT COUNT(*) FROM ${schema}.users`
    );

    const userCount = parseInt(result.rows[0].count, 10);

    // Insert default users if empty
    if (userCount === 0) {

      const hashedPassword1 = await bcrypt.hash('vipin2005', 10);
      const hashedPassword2 = await bcrypt.hash('vikas2005', 10);
      const hashedPassword3 = await bcrypt.hash('madhan2005', 10);

      await pool.query(`
        INSERT INTO ${schema}.users (username, password, role)
        VALUES
        ($1, $2, $3),
        ($4, $5, $6),
        ($7, $8, $9)
      `, [
        'Vipin', hashedPassword1, 'inspector',
        'Vikas', hashedPassword2, 'retailer',
        'Madhan', hashedPassword3, 'wholesaler'
      ]);

      console.log('Default users inserted');

    } else {
      console.log('Users already exist');
    }


    // Create licenses table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${schema}.licenses (
        id SERIAL PRIMARY KEY,
        license_number VARCHAR(200) UNIQUE,
        license_type VARCHAR(50),
        shop_name VARCHAR(255),
        username VARCHAR(255),
        owner_name VARCHAR(255),
        data JSONB,
        owner_aadhar_path TEXT,
        pharmacist_certificate_path TEXT,
        pharmacist_signature_path TEXT,
        appointment_document_path TEXT,
        license_document TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Licenses table ensured');


    // Create shops table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${schema}.shops (
        id SERIAL PRIMARY KEY,
        shop_id VARCHAR(100) UNIQUE,
        license_number VARCHAR(200),
        username VARCHAR(255),
        shop_name VARCHAR(255),
        owner_name VARCHAR(255),
        data JSONB,
        owner_aadhar_path TEXT,
        pharmacist_certificate_path TEXT,
        pharmacist_signature_path TEXT,
        appointment_document_path TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Shops table ensured');


    console.log('Database initialized successfully ✅');

  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

module.exports = initializeDatabase;
