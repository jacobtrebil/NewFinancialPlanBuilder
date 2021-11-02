import Plan from "../../models/wizardSchema";
import dbConnect from "../../util/wizardDbConnect";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function getPlansRoute(req, res) {
//export default async function Handler(req, res) {
  const { method } = req;
  const id = req.query.id;

  //const { user } = useUser();
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

// Update all API routes with this new meaningful naming structure, with api auth required whenever it is required
// We will have to use getSession during the plan creation process as well to make sure plan maps with the correct email
// Will use the name, getSession line, and change the schema to include userId

