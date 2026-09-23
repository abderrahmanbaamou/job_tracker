const express = require("express");

const router = express.Router();

const db =
  require("../config/database");



router.get("/", async (req, res) => {

  try {

    const result = await db.query(
      `
      SELECT *
      FROM jobs
      ORDER BY created_at DESC
      `
    );


    res.json(result.rows);


  } catch (error) {

    console.error(
      "JOBS ERROR:",
      error
    );


    res.status(500).json({

      message:
        "Error loading jobs",

    });
  }
});


module.exports = router;