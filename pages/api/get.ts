import prisma  from "@/lib/prisma";
import {  NextApiResponse } from "next";
import { NextResponse } from "next/server";



export default async function handler(req: NextResponse, res: NextApiResponse) {

    const response = await prisma.task.findMany({
        include: {
            Assign: {
                include: {
                  User: true
                }
            }
        }
    })

    return await res.json(await response)
}