const express = require("express");

const router = express.Router();

const {
    createApplication,
    getApplications,
    getApplication,
    updateApplication,
    deleteApplication,
} = require("../controllers/application.controller");

const {
    authenticateToken
} = require("../middleware/auth.middleware");


router.get(
    "/",
    authenticateToken,
    getApplications
);


router.get(
    "/:id",
    authenticateToken,
    getApplication
);


router.post(
    "/",
    authenticateToken,
    createApplication
);


router.put(
    "/:id",
    authenticateToken,
    updateApplication
);


router.delete(
    "/:id",
    authenticateToken,
    deleteApplication
);


module.exports = router;