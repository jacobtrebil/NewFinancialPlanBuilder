export default function verifyToken(token, verify) {
    console.log(token, verify);
    if (token === verify) {
        return true;
    } else {
        return false;
    }
  }
  