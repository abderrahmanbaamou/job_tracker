const applicationService = require("../services/application.service");


const createApplication = async (req, res) => {
  try {
    const userId = req.user.userId;

    const application = await applicationService.createApplication(
      userId,
      req.body
    );

    res.status(201).json({
      message: "Application created successfully",
      application
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const getApplications = async (req, res) => {
  try {
    const userId = req.user.userId;

    const applications = await applicationService.getApplications(userId);

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const getApplication = async (req, res) => {
  try {
    const userId = req.user.userId;
    const id = req.params.id;

    const application = await applicationService.getApplication(
      id,
      userId
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



const updateApplication = async (req, res) => {
  try {
    const userId = req.user.userId;
    const id = req.params.id;

    const application = await applicationService.updateApplication(
      id,
      userId,
      req.body
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.json({
      message: "Application updated successfully",
      application
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const deleteApplication = async (req, res) => {
  try {
    const userId = req.user.userId;
    const id = req.params.id;

    const application = await applicationService.deleteApplication(
      id,
      userId
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.json({
      message: "Application deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


module.exports = {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  deleteApplication
};