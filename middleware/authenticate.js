import Singup from "../moduls/singup.js";
import "dotenv/config";

async function authenticate(req, res, next) {
  let bearerToken = req.headers.authorization;
  if (!bearerToken) {
    res.status(400).json({
      error: true,
      meassage: "token not found",
      data: null,
    });

    let token = bearerToken.split(" ")[1];
    let decoded = await jwt.verify(token, process.env.AUTH_SECRET);
    if (decoded) {
      let user = await Singup.findById(decoded._id);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({
          error: true,
          meassage: "user not found",
          data: null,
        });
      }
    } else {
      res.status(400).json({
        error: true,
        meassage: "token invalid",
        data: null,
      });
    }
  }
}

export default authenticate;
