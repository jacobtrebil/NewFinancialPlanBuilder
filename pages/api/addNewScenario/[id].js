import Scenarios from "../../../models/scenarioSchema";
import dbConnect from "../../../util/wizardDbConnect";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function addNewScenarioRoute(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();
  const userEmail = getSession(req, res).user.email

  switch (method) {
    case "POST":
      try {
        const { scenarioName, currentSavings, livingExpense, retirementAge, riskScore } = req.body
        const scenario = Scenarios.create({
          planId: id,
          scenarioName,
          currentSavings,
          livingExpense,
          retirementAge,
          riskScore
        });
        res.status(200).json(scenario);
        return;
      } catch (error) {
        res.status(400).json();
        return;
      }
    default:
      res.status(400).json();
      break;
  }
})
