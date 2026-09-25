const pool = require("../config/database");


// CREATE JOB
const createJob = async ({
    title,
    company,
    location,
    description,
    requirements,
    salary,
    professional_id
}) => {

    const result = await pool.query(
        `INSERT INTO jobs
        (
            title,
            company,
            location,
            description,
            requirements,
            salary,
            professional_id
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [
            title,
            company,
            location,
            description,
            requirements,
            salary,
            professional_id
        ]
    );

    return result.rows[0];
};


// GET MY JOBS
const getJobsByProfessional = async (professionalId) => {

    const result = await pool.query(
        `SELECT *
         FROM jobs
         WHERE professional_id = $1
         ORDER BY created_at DESC`,
        [professionalId]
    );

    return result.rows;
};


// GET ALL JOBS
const getAllJobs = async () => {

    const result = await pool.query(
        `SELECT *
         FROM jobs
         ORDER BY created_at DESC`
    );

    return result.rows;
};


// GET JOB BY ID
const getJobById = async (id) => {

    const result = await pool.query(
        `SELECT *
         FROM jobs
         WHERE id = $1`,
        [id]
    );

    return result.rows[0];
};


// UPDATE JOB
const updateJob = async (
    id,
    professionalId,
    data
) => {

    const result = await pool.query(
        `UPDATE jobs
         SET
            title = $1,
            company = $2,
            location = $3,
            description = $4,
            requirements = $5,
            salary = $6
         WHERE id = $7
         AND professional_id = $8
         RETURNING *`,
        [
            data.title,
            data.company,
            data.location,
            data.description,
            data.requirements,
            data.salary,
            id,
            professionalId
        ]
    );

    return result.rows[0];
};


// DELETE JOB
const deleteJob = async (
    id,
    professionalId
) => {

    const result = await pool.query(
        `DELETE FROM jobs
         WHERE id = $1
         AND professional_id = $2
         RETURNING *`,
        [
            id,
            professionalId
        ]
    );

    return result.rows[0];
};


module.exports = {
    createJob,
    getJobsByProfessional,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob
};