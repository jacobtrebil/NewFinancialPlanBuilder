import Expenses from "../../../models/expenseSchema";
import dbConnect from "../../../util/wizardDbConnect";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function addExpenseRoute(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();
  const userEmail = getSession(req, res).user.email

  switch (method) {
    case "POST":
      try {
        const { ageAtPurchase, annualCost, nameOfExpense, upfrontCost } = req.body
        const expense = Expenses.create({
            planId: id, 
            ageAtPurchase, 
            annualCost, 
            nameOfExpense, 
            upfrontCost
        });
        res.status(200).json(expense);
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
