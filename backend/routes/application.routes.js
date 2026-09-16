const express = require("express");

const {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  deleteApplication,
} = require("../controllers/application.controller");

const authenticateToken = require("../middleware/auth.middleware");

const router = express.Router();

router.post( "/",authenticateToken,createApplication);

router.get("/",authenticateToken,getApplications);

router.get("/:id",authenticateToken,getApplication);

router.put("/:id",authenticateToken,updateApplication);

router.delete("/:id",authenticateToken,deleteApplication);

module.exports = router;