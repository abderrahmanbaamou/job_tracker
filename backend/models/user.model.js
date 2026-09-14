const pool = require('../config/database');

const findUserByEmail = async (email) => {
    const result = await pool.query('select * from users where email = $1', [email]);
    return result.rows[0];
}

const findUserById = async (id) => {
    const result = await pool.query('select * from users where id = $1', [id]);
    return result.rows[0];
}

const createUser = async (user) => {
    const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [user.name, user.email, user.password]
    );
    return result.rows[0];
};

module.exports = {
    findUserByEmail,
    findUserById,
    createUser,};