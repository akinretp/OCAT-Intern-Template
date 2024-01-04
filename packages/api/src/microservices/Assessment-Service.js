const { Assessment } = require(`../database/models`);

exports.submit = async (assessment) => {
  console.log({ assessment });

  try {
    await Assessment.create(assessment);
  }
  catch (err) {
    console.log(`error saving assessment:`, err);
    throw err;
  }
  // use the sequelize model Assessments from packages/api/src/database/models to save
  // the assessment data in the PostgreSQL database
};

exports.getList = async () => {
  // use the sequelize model Assessments from packages/api/src/database/models to fetch
  // the assessment data from the PostgreSQL database
  try {
    const assessments = await Assessment.findAll();
    return assessments;
  } catch (err) {
    console.log(`error fetching assessments:`, err);
    throw err;
  }
};
