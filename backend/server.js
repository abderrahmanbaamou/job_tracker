const express = require("express");
require("dotenv").config();

require("./config/database");

const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Job Tracker API is running",
  });
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});