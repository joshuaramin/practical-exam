import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await prisma.user.findUnique({
    where: {
      userID: req.query.id as string,
    },
  });

  return await res.json(response);
}
