import dbConnect from "../../../util/wizardDbConnect";
import Plan from "../../../models/wizardSchema";
import WizardCalculationHelper from "../helper/wizardCalculationsHelper";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function updatePlanCalculationsRoute(req, res) {
  const { method } = req;
  const id = req.query.id;

  await dbConnect();
  const userEmail = getSession(req, res).user.email

  switch (method) {
    case "PUT":
      try {
        console.log('req body ==========', req.body);
        console.log(id);
        const { livingExpense, currentSavings, retirementAge, riskScore } = req.body;

        await Plan.updateOne({_id: id}, {
          livingExpense,
          currentSavings,
          retirementAge,
          riskScore,
        });

        await WizardCalculationHelper.reCalculate(id);

        const plan = await Plan.findById(id);
        res.status(200).json(plan);
        return;
      } catch (error) {
        console.log(error);
        res.status(400).json();
        return;
      }
    default:
      res.status(400).json();
      break;
  }
})
