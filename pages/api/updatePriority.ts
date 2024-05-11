import prisma from "@/lib/prisma";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";




export default async function handler(req: NextRequest, res: NextApiResponse) {

    const { taskID, priority}: any = await req.body

    const response = await prisma.task.update({
        where: { taskID }, data: { priority }
    })

    return await res.json(response)

}