import Plan from '../../models/wizardSchema';
import dbConnect from '../../util/wizardDbConnect';
import db from '../../util/dbconnect';
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function getPlansRoute(req, res) {
    const { method } = req;

    await dbConnect();
    const userEmail = getSession(req, res).user.email

    switch (method) {
        case 'POST':
            try {
                const { createEmail, createPassword } = req.body;
                const user = db.createUser({
                    user: { createEmail }, 
                    pwd: { createPassword },
                    roles: [
                        { role: "readWrite", db: "plans" },
                        { role: "readWrite", db: "scenarios"}
                    ]
                })
                res.status(200).json( user );
            } catch (error) {
                res.status(400).json({});
            } 
            break
    }
})