import Plan from '../../models/wizardSchema';
import dbConnect from '../../util/wizardDbConnect';
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

    export default withApiAuthRequired(async function wizardPostRoute(req, res) {
    const { method } = req;

    await dbConnect();
    const userEmail = getSession(req, res).user.email

    switch (method) {
        case 'POST':
            try {
                const { firstName, gender, dateOfBirthDay, dateOfBirthYear, dateOfBirthMonth, socialSecurity, phoneNumber } = req.body;
                const plan = await Plan.create( { firstName, gender, dateOfBirthDay, dateOfBirthYear, dateOfBirthMonth, socialSecurity, userId: userEmail, lastStep: 'Personal Info', phoneNumber } )
                res.status(200).json( plan );
            } catch (error) {
                res.status(400).json({});
            } 
            break
}
})