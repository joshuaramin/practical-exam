import { NextRequest } from "next/server";
import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";


export default async function handler(req: NextRequest, res: NextApiResponse) {

    const { username, password, role }: any = await req.body

    if(!username) res.status(400).json({ message: "Username is required"})
    if(!password) res.status(400).json({ message: "Password is required"})

    const pass = await bcrypt.hash(password, 12)
    const response = await prisma.user.create({
        data: {
            username, password: pass,
            role
        }
    })


    const result = await res.json(response)

    return result

}