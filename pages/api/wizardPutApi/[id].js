import Plan from '../../../models/wizardSchema';
import dbConnect from '../../../util/wizardDbConnect';
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function wizardPutApiRoute(req, res) {
    const { method } = req
    const id = req.query.id;

    await dbConnect();
    const userEmail = getSession(req, res).user.email

    switch (method) {
        case 'PUT':
            try {
                const plan = await Plan.findOne({ _id: id })
                const { pension, pensionStartAge, pensionEarnings, pensionInflation, retirementAge, retirementIncome, livingExpense, assetValue, currentEarnings, currentSavings } = req.body
                await Plan.updateOne({ _id: id}, { pension, pensionStartAge, pensionEarnings, pensionInflation, retirementAge, retirementIncome, livingExpense, assetValue, currentEarnings, currentSavings, lastStep: 'Financial Info' })
                const plan2 = await Plan.findById(id)
                res.status(200).json( plan2 )
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