import type { AuthRequest } from "../middleware/auth";
import type { Response, Request, NextFunction } from "express";
import { User } from "../models/User.ts";
import { clerkClient, getAuth, verifyToken } from "@clerk/express";

export async function getMe(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.userId;
        
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({message: "User not found"});
        return res.status(200).json(user)
    } catch (error) {
        res.status(500);
        next(error);
    }
}

export async function authCallback(req: Request, res: Response, next: NextFunction) {

    try {
        let clerkId = getAuth(req)?.userId;

        if(!clerkId){
            const authHeader = req.headers.authorization;
            const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

            if(token){
                const payload = await verifyToken(token, {
                    secretKey: process.env.CLERK_SECRET_KEY!,
                });
                clerkId = payload.sub;
            }
        }
        
        if(!clerkId) return res.status(401).json({message: "Unauthorized"});

        let user = await User.findOne({ clerkId });
        if(!user){
            const clerkUser = await clerkClient.users.getUser(clerkId);
            user = await User.create({
                clerkId,
                name: clerkUser.firstName
                    ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim()
                    : clerkUser.emailAddresses[0]?.emailAddress?.split("@")[0],
                email: clerkUser.emailAddresses[0]?.emailAddress,
                avatar: clerkUser?.imageUrl,
            });
        }
        res.json(user);
        // const {userId: clerkId} = getAuth(req);
        // if(!clerkId) return res.status(401).json({message: "Unauthorized"})
        
        // let user = await User.findOne({clerkId});
        // if(!user){
        //     // get user info from clerk and save to db
        //     const clerkUser = await clerkClient.users.getUser(clerkId);

        //     user = await User.create({
        //         clerkId,
        //         name: clerkUser.firstName 
        //               ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim()
        //               : clerkUser.emailAddresses[0]?.emailAddress?.split("@")[0],
        //         email: clerkUser.emailAddresses[0]?.emailAddress,
        //         avatar: clerkUser?.imageUrl
                    
        //     });
        // }
        // res.json(user)
    } catch (error) {
        res.status(500);
        next(error);
    }

}