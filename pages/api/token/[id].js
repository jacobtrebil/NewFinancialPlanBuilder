import Token from '../../../models/tokenSchema';
import dbConnect from '../../../util/wizardDbConnect';

    export default async function tokenPostRoute(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'POST':
            try {
                const { token, planId, phoneNumber } = req.body;
                const document = await Token.create({ token, planId, phoneNumber });
                res.status(200).json( document );
            } catch (error) {
                res.status(400).json({});
            } 
            break
}
}