import type { Request, Response, NextFunction } from "express"
import { User } from "./../models/User.ts"
import { getAuth, verifyToken } from "@clerk/express"

export type AuthRequest = Request & {
    userId?: string;
}

export const protectRoute = [
    
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {

            let clerkId = getAuth(req)?.userId;

            // fallback Bearer token (mobile)
            if(!clerkId){
                const token = req.headers.authorization?.slice(7);
                if(token){
                    const payload = await verifyToken(token, {
                        secretKey: process.env.CLERK_SECRET_KEY!,
                    });
                    clerkId = payload.sub;
                }
            }

            if(!clerkId) return res.status(401).json({message: "Unauthorized"});

            const user = await User.findOne({ clerkId });
            if(!user) return res.status(404).json({message: "User not found"});

            req.userId = user._id.toString();
            next();

            // const {userId: clerkId} = getAuth(req);
            // // since we call requireAuth() this if check is not necessary
            // // if(!clerkId) return res.status(401).json({message: "Unauthorized - invalid token"});

            // const user = await User.findOne({clerkId});
            // if(!user) return res.status(404).json({message: "User not found"})

            // req.userId = user._id.toString();

            // next()
        } catch (error) {
          res.status(500);
          next(error);
                        
        }
    }
]