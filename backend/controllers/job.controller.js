const jobModel = require("../models/job.model");

const createJob = async (req, res) => {
    try {

        const {
            title,
            company,
            location,
            description,
            requirements,
            salary
        } = req.body;

        if (!title || !company) {
            return res.status(400).json({
                message: "Title and company are required"
            });
        }

        const job = await jobModel.createJob({
            title,
            company,
            location,
            description,
            requirements,
            salary,
            professional_id: req.user.userId
        });

        res.status(201).json({
            message: "Job created successfully",
            job
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


const getMyJobs = async (req, res) => {
    try {

        const jobs = await jobModel.getJobsByProfessional(
            req.user.userId
        );

        res.json({
            jobs
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


const getAllJobs = async (req, res) => {
    try {

        const jobs = await jobModel.getAllJobs();

        res.json({
            jobs
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


const getJob = async (req, res) => {
    try {

        const job = await jobModel.getJobById(
            req.params.id
        );

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.json({
            job
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


const updateJob = async (req, res) => {
    try {

        const job = await jobModel.updateJob(
            req.params.id,
            req.user.userId,
            req.body
        );

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.json({
            message: "Job updated successfully",
            job
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


const deleteJob = async (req, res) => {
    try {

        const job = await jobModel.deleteJob(
            req.params.id,
            req.user.userId
        );

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.json({
            message: "Job deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    createJob,
    getMyJobs,
    getAllJobs,
    getJob,
    updateJob,
    deleteJob
};