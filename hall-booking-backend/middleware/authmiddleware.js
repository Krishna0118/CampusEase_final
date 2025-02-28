import jwt from "jsonwebtoken";
import User from "../models/StudentModel.js";

// const { toHaveErrorMessage } = require('@testing-library/jest-dom/matchers');
export const protectUserRoutes = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // decodes token id

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);

      next();
    } catch (error) {
      res.status(401).json({
        msg: "Not authorized , token failed.",
      });
    }
  }
  if (!token) {
    res.status(401).json({
      msg: "Not authorized , token failed.",
    });
  }
};
