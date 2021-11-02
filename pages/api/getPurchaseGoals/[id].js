import Expenses from "../../../models/expenseSchema";
import dbConnect from "../../../util/wizardDbConnect";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function getPurchaseGoalsRoute(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();
  const userEmail = getSession(req, res).user.email

  switch (method) {
    case "GET":
      try {
        const expenses = Expenses.find({
            planId: id, 
        });
        res.status(200).json(expenses);
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
