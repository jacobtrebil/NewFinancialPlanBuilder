import Token from '../../../models/tokenSchema';
import dbConnect from '../../../util/wizardDbConnect';

export default async function tokenInfoRoute(req, res) {

  const { method } = req;
  const id = req.query.id;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const tokenDocument = await Token.find({planId: id});
        res.status(200).json(tokenDocument);
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

// you might have to do .find({}) by using _id. How could I do this?