import prisma from "@/lib/prisma";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";




export default async function handler (req: NextRequest, res: NextApiResponse) {

    const { taskID }: any = req.body


    const response = await prisma.task.delete({
        where: { taskID }
    })

    return res.json(response)
}