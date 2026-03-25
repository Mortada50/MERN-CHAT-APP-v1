import type { Response, NextFunction } from "express"
import { User } from "../models/User.ts";
import type { AuthRequest } from "../middleware/auth.ts";
export const getUsers = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        const users = await User.find({_id: {$ne: userId}}).select("name email avatar").limit(50);

        if(!users) return res.status(404).json({message: "No users found"})
        res.status(200).json(users);
    } catch (error) {
        res.status(500);
        next(error);
    }
}