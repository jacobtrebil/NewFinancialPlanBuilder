import Plan from "../../../models/wizardSchema";
import dbConnect from "../../../util/wizardDbConnect";
import textmagicClient from "textmagic-client";
import setFormattedPhoneNumber from '../../../models/wizardSchema';

export default async function wizardPutApiRoute(req, res) {
  const { method } = req;
  const id = req.query.id;

  await dbConnect();

  const client = textmagicClient.ApiClient.instance;
  const auth = client.authentications["BasicAuth"];
  const api = new textmagicClient.TextMagicApi();

  // put your Username and API Key from https://my.textmagic.com/online/api/rest-api/keys page.
  auth.username = "jacobtrebil";
  auth.password = "TvNyFDQlFOf2VOulfuUNlrfRemouwy";

  const input = {
    phone: req.body.phoneNumber,
    brand: "fpb",
    codeLength: 4,
    // Optional parameters
    workflowId: 6,
    language: "en-gb",
    senderId: "+12065294258",
    country: "US",
  };

  switch (method) {
    case "PUT":
      try {
        const plan = await Plan.findOne({ _id: id });
        const { phoneNumber, token } = req.body;
        await Plan.updateOne({ _id: id }, { phoneNumber });
        plan.formattedPhoneNumber = setFormattedPhoneNumber(plan.phoneNumber);
        await api.sendMessage({
            'text': `${token}`,
            'phones': `+${plan.formattedPhoneNumber}`
        })
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
}




// Add the token that has been generated to a token document with planId, token, and 
// The creation date & time (timestamp). Call authennticator.verify to verify. 
// Use the totp method. 
// Use this to create & generate a code https://github.com/yeojz/otplib

// This should be done within the sms.js page & added to the token document with it's own api call
