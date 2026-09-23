const express = require("express");
const multer = require("multer");

const router = express.Router();



const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});




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


    const data =
      await response.json();


    if (!response.ok) {

      return res
        .status(response.status)
        .json(data);
    }


    res.json(data);


  } catch (error) {

    console.error(
      "ML MATCH ERROR:",
      error
    );


    res.status(500).json({

      message:
        "ML service unavailable",

    });
  }
});




router.post(
  "/analyze-cv",
  upload.single("file"),

  async (req, res) => {

    try {

      if (!req.file) {

        return res.status(400).json({

          message:
            "Please upload a PDF file",

        });
      }


      if (
        req.file.mimetype !==
        "application/pdf"
      ) {

        return res.status(400).json({

          message:
            "Only PDF files are allowed",

        });
      }


      const formData =
        new FormData();


      const blob = new Blob(
        [
          req.file.buffer
        ],
        {
          type:
            "application/pdf",
        }
      );


      formData.append(
        "file",
        blob,
        req.file.originalname
      );


      const response = await fetch(
        "http://127.0.0.1:8000/analyze-cv",
        {
          method: "POST",

          body: formData,
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        return res
          .status(response.status)
          .json(data);
      }


      res.json(data);


    } catch (error) {

      console.error(
        "CV ERROR:",
        error
      );


      res.status(500).json({

        message:
          "CV analyzer unavailable",

      });
    }
  }
);


module.exports = router;