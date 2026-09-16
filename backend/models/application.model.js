const pool = require("../config/database");

const createApplication = async (application) => {
  const {
    user_id,
    company,
    position,
    status,
    location,
    application_date,
    notes,
  } = application;

  const result = await pool.query(
    `INSERT INTO applications
      (user_id, company, position, status, location, application_date, notes)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      user_id,
      company,
      position,
      status || "applied",
      location || null,
      application_date || null,
      notes || null,
    ]
  );

  return result.rows[0];
};

const getApplicationsByUser = async (userId) => {
  const result = await pool.query(
    `SELECT *
     FROM applications
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );

  return result.rows;
};

const getApplicationById = async (id, userId) => {
  const result = await pool.query(
    `SELECT *
     FROM applications
     WHERE id = $1 AND user_id = $2`,
    [id, userId]
  );

  return result.rows[0];
};

const updateApplication = async (id, userId, application) => {
  const {
    company,
    position,
    status,
    location,
    application_date,
    notes,
  } = application;

  const result = await pool.query(
    `UPDATE applications
     SET
       company = $1,
       position = $2,
       status = $3,
       location = $4,
       application_date = $5,
       notes = $6,
       updated_at = CURRENT_TIMESTAMP
     WHERE id = $7 AND user_id = $8
     RETURNING *`,
    [
      company,
      position,
      status,
      location || null,
      application_date || null,
      notes || null,
      id,
      userId,
    ]
  );

  return result.rows[0];
};

const deleteApplication = async (id, userId) => {
  const result = await pool.query(
    `DELETE FROM applications
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [id, userId]
  );

  return result.rows[0];
};

module.exports = {
  createApplication,
  getApplicationsByUser,
  getApplicationById,
  updateApplication,
  deleteApplication,
};