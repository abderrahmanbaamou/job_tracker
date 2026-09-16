const applicationModel = require("../models/application.model");

const createApplication = async (userId, data) => {
  const {
    company,
    position,
    status,
    location,
    application_date,
    notes,
  } = data;

  if (!company || !position) {
    throw new Error("COMPANY_AND_POSITION_REQUIRED");
  }

  const application = await applicationModel.createApplication({
    user_id: userId,
    company,
    position,
    status,
    location,
    application_date,
    notes,
  });

  return application;
};

const getApplications = async (userId) => {
  return await applicationModel.getApplicationsByUser(userId);
};

const getApplication = async (id, userId) => {
  return await applicationModel.getApplicationById(id, userId);
};

const updateApplication = async (id, userId, data) => {
  const {
    company,
    position,
    status,
    location,
    application_date,
    notes,
  } = data;

  if (!company || !position || !status) {
    throw new Error("REQUIRED_FIELDS_MISSING");
  }

  return await applicationModel.updateApplication(
    id,
    userId,
    {
      company,
      position,
      status,
      location,
      application_date,
      notes,
    }
  );
};

const deleteApplication = async (id, userId) => {
  return await applicationModel.deleteApplication(id, userId);
};

module.exports = {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  deleteApplication,
};