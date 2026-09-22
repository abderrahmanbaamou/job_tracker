const express = require("express");

const router = express.Router();

router.post("/match", async (req, res) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/match",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "ML service unavailable",
    });

  }
});

module.exports = router;