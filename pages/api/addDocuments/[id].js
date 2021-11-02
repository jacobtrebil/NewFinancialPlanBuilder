import Plan from "../../../models/wizardSchema";
import dbConnect from "../../../util/wizardDbConnect";
import formidable from "formidable";
import FileUploader from "../../../util/fileUploader";
import FileDownloader from "../../../util/fileDownloader";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadFile = async (plan, file, docType) => {
  const { fileName, fileType, fileSize, fileKey } = await new FileUploader(
    file,
    docType
  ).upload();

  const url = await new FileDownloader(fileKey, fileName).downloadUrl();

  try {
    await plan.set(docType, {
      name: fileName,
      fileType,
      fileSize,
      fileKey,
      url,
    });
    await plan.markModified(docType);
    await plan.save();
  } catch (error) {
    console.log("the file upload error is **** ====", error);
  }
};

export default withApiAuthRequired(async function addDocumentsRoute(req, res) {
  const { method } = req;
  const id = req.query.id;

  await dbConnect();

  switch (method) {
    case "PUT":
      try {
        let plan = await Plan.findById(id);
        const form = new formidable.IncomingForm();

        form.parse(req, async function (err, fields, files) {
          const file = files[fields.fileName];

          if (
            plan.get(fields.fileName) &&
            plan.get(fields.fileName)["fileSize"]
          ) {
            console.log(
              `Not uploading file ${fields.fileName} as it is already present`
            );
            res.status(200).json(plan);
            return;
          }
          await uploadFile(plan, file, fields.fileName);

          plan = await Plan.findById(id);
          res.status(201).json(plan);
          return;
        });
      } catch (error) {
        console.log(error);
        res.status(400).json();
        return;
      }
      break;
    default:
      res.status(400).json();
      break;
  }
});
