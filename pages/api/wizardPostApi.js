import Plan from '../../models/wizardSchema';
import dbConnect from '../../util/wizardDbConnect';

    export default async function wizardPostRoute(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'POST':
            try {
                const { firstName, gender, dateOfBirthDay, dateOfBirthYear, dateOfBirthMonth, socialSecurity } = req.body;
                const plan = await Plan.create( { firstName, gender, dateOfBirthDay, dateOfBirthYear, dateOfBirthMonth, socialSecurity, lastStep: 'Personal Info' } )
                res.status(200).json( plan );
            } catch (error) {
                res.status(400).json({});
            } 
            break
}
}