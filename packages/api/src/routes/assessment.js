const { AssessmentService } = require(`../microservices`);
const { ResponseHandler } = require(`../utils`);
const { Router } = require(`express`);

const assessmentRouter = Router();

assessmentRouter.post(`/submit`, async (req, res, next) => {
  try {

    const { assessment } = req.body;

    console.log(`response in the backend`, assessment);

    // verify that your data is making it here to the API by using console.log(assessment);
    // call the AssessmentService.submit function from packages/api/src/microservices/Assessment-Service.js and

    await AssessmentService.submit(assessment);
    // supply the correct parameters

    ResponseHandler(res, `Submitted assessment`, {});
  } catch (err) {
    next(err);
  }
});

assessmentRouter.get(`/list`, async (req, res, next) => {
  try {
    // verify that your data is making it here to the API by using console.log();
    // call the AssessmentService.getList function from packages/api/src/microservices/Assessment-Service.js
    console.log(`fetching assessments`);
    const assessments = await AssessmentService.getList();

    ResponseHandler(res, `Fetched assessments`, { assessments });
  } catch (err) {
    next(err);
  }
});

module.exports = { assessmentRouter };
