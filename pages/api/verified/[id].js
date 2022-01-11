import Token from '../../../models/tokenSchema';
import dbConnect from '../../../util/wizardDbConnect';
import verifyToken from '../../../calculations/verifyToken';

    export default async function tokenPutRoute(req, res) {
    const { method } = req;
    const id = req.query.id;

    await dbConnect();

    switch (method) {
        case 'PUT':
            try {
                const document = await Token.findOne({ planId: id })
                document.verified = verifyToken(document.token, document.verify);
                await Token.updateOne({ planId: id}, { verified: document.verified });
                res.status(200).json( document );
            } catch (error) {
                res.status(400).json({});
            } 
            break
}
}