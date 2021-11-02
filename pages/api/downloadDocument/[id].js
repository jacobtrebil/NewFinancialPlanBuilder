import Plan from "../../../models/wizardSchema";
import dbConnect from "../../../util/wizardDbConnect";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import FileDownloader from "../../../util/fileDownloader";

export default withApiAuthRequired(async function addDocumentsRoute(req, res) {
  const { method } = req;
  const { id, docType } = req.query;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        let plan = await Plan.findById(id);
        const s3Key = await plan.get(docType)?.fileKey;
        const url = await new FileDownloader(s3Key, docType).downloadUrl();

        res.status(200).json({ url });
      } catch (error) {
        console.log("Error in downloading file", error);
        res.status(400).json();
        return;
      }
      break;
    default:
      res.status(400).json();
      break;
  }
});
