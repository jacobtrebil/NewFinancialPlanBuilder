/*import { handleAuth } from '@auth0/nextjs-auth0';

export default handleAuth();*/
import Plan from "../../../models/wizardSchema";

import {
  handleAuth,
  handleLogout,
  handleLogin,
  handleCallback,
} from "@auth0/nextjs-auth0";

const afterCallback = async (req, res, session, state) => {
  console.log("the state is =======", state, session, res);
  const { user: { email = "" } = {} } = session;
  const { planId } = state;

  const plan = await Plan.findOne({ _id: planId });
  plan.userId = email;
  await plan.save();
  return session;
};

const getLoginState = (req, loginOptions) => {
  const { planId } = req.query;
  return { planId };
};

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, { getLoginState });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
  async logout(req, res) {
    // You don't strictly need to sanitise `req.query.returnTo` because it has to be in Auth0's "Allowed Logout URLs"
    // But if you ever added a local logout option you should sanitise it, like we do with the login `returnTo`
    // eg https://github.com/auth0/nextjs-auth0/blob/beta/src/handlers/login.ts#L70-L72
    const returnTo = req.query.returnTo;
    try {
      await handleLogout(req, res, {
        returnTo,
      });
    } catch (error) {
      res.status(error.status || 400).end(error.message);
    }
  },
});
