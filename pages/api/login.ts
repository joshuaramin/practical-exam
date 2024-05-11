import prisma from "@/lib/prisma";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jsonwebtoken, { sign } from 'jsonwebtoken'


interface User  {
    username: string
    password: string
}


export default async function handler(req: NextRequest, res: NextApiResponse) {


    const { username, password}: User | any =  req.body

    if(!username) res.status(400).json({message: "Username is required"});
    if(!password) res.status(500).json({message: "Password is required"})

    const user = await prisma.user.findUnique({
        where: { username: username}
    })


    if(!user) res.status(400).json({ message: "Username does not exist"});

    const valid = await bcrypt.compare(password, user?.password as any);

    if(!valid) res.status(400).json({ message: "Invalid password"})
    
    const token =  sign({userID: user?.userID}, "kynatech", {
        algorithm: "HS256"
    })


    return res.status(200).json(token)


    
}