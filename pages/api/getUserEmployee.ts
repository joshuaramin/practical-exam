import prisma from "@/lib/prisma";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

export default async function handler(req: NextRequest, res: NextApiResponse) {


  const response = await prisma.user.findMany({
    where: {
      role: "employee",
    },
  });

  const result = await response;

  return await res.json(result);
}
