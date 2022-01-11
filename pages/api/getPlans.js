import Plan from "../../models/wizardSchema";
import dbConnect from "../../util/wizardDbConnect";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function getPlansRoute(req, res) {
  const { method } = req;
  const id = req.query.id;

  console.log("========== the req is === ", getSession(req, res).user.email);
  await dbConnect();

  const userEmail = getSession(req, res).user.email
  switch (method) {
    case "GET":
      try {
        const plans = await Plan.find({userId: userEmail});
        res.status(200).json(plans);
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

