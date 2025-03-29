import jwt from "jsonwebtoken";
import Student from "../models/StudentModel.js";
import Faculty from "../models/FacultyModel.js";

export const protectUserRoutes = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // Decode the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Check if the user exists in Student or Faculty collection
            let user = await Student.findById(decoded.id) || await Faculty.findById(decoded.id);

            if (!user) {
                return res.status(401).json({ message: "User not found, not authorized" });
            }

            req.user = user;
            return next(); // ✅ Ensures no further execution

        } catch (error) {
            return res.status(401).json({ msg: "Not authorized, token failed." });
        }
    }

    return res.status(401).json({ message: "Not authorized, no token provided." });
};
