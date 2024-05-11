import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";



export default async function handler (req: NextRequest, res: NextApiResponse) {


    const { status, taskID }: any = await req.body
    
    const response = await prisma.task.update({
        data: {
            status
        },
        where: {
            taskID
        }
    })


    return await res.json(response)
}