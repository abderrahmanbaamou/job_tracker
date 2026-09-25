const express = require("express");

const router = express.Router();

const {
    createJob,
    getMyJobs,
    getAllJobs,
    getJob,
    updateJob,
    deleteJob
} = require("../controllers/job.controller");

const {
    authenticateToken
} = require("../middleware/auth.middleware");

const {
    requireRole
} = require("../middleware/role.middleware");


// GET ALL JOBS
router.get(
    "/",
    getAllJobs
);


// GET MY JOBS
router.get(
    "/my-jobs",
    authenticateToken,
    requireRole("professional"),
    getMyJobs
);


// CREATE JOB
router.post(
    "/",
    authenticateToken,
    requireRole("professional"),
    createJob
);


// UPDATE JOB
router.put(
    "/:id",
    authenticateToken,
    requireRole("professional"),
    updateJob
);


// DELETE JOB
router.delete(
    "/:id",
    authenticateToken,
    requireRole("professional"),
    deleteJob
);


// GET ONE JOB
router.get(
    "/:id",
    getJob
);


module.exports = router;