import dbConnect from '../../../util/wizardDbConnect';
import Plan from '../../../models/wizardSchema';
import WizardCalculationsHelper from '../helper/wizardCalculationsHelper';
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function wizardCalculationsRoute(req, res) {
    const { method } = req
    const id = req.query.id;

    await dbConnect();
    const userEmail = getSession(req, res).user.email

    switch (method) {
        case 'POST':
            try {
               await WizardCalculationsHelper.reCalculate(id)

                const plan = await Plan.findById(id);
                res.status(200).json( plan );
                return;
            } catch (error) {
                console.log(error)
                res.status(400).json()
                return;
            }
            default: 
            res.status(400).json()
            break
    }
})