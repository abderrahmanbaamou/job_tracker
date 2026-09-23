const express = require("express");
const cors = require("cors");

require("dotenv").config();

require("./config/database");

const authRoutes =
  require("./routes/auth.routes");

const applicationRoutes =
  require("./routes/application.routes");

const mlRoutes =
  require("./routes/ml.routes");

const jobsRoutes =
  require("./routes/jobs.routes");


const app = express();


app.use(cors());

app.use(express.json());


const PORT =
  process.env.PORT || 5000;


app.get("/", (req, res) => {

  res.json({
    message:
      "Job Tracker API is running",
  });

});


app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/applications",
  applicationRoutes
);

app.use(
  "/api/ml",
  mlRoutes
);

app.use(
  "/api/jobs",
  jobsRoutes
);


app.listen(
  PORT,
  () => {

    console.log(
      `Server running on port ${PORT}`
    );

  }
);