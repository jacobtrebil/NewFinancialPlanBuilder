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
                const { verify } = req.body;
                await Token.updateOne({ planId: id}, { verify });
                document.verified = verifyToken(document.token, verify);
                await Token.updateOne({ planId: id}, { verified: document.verified });
                if (document.verified === true) {
                    await Token.deleteOne({ planId: id});
                    res.status(200).json( document );
                } else if (document.verified === false) {
                    res.status(422).json();
                }
            } catch (error) {
                res.status(422).json({});
            } 
            break
}
}

// I could maybe just import a function and export it from sms to set the error
// Message if it's a 400?