import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { NextApiResponse } from "next";
import generateTaskID from "@/lib/helper";

export default async function handler(req: NextRequest, res: NextApiResponse) {
  const { title, description, priority, status, userID, tags, users }: any =
    req.body;

  if (!title) res.status(400).json({ message: "Title is required" });
  if (!description)
    res.status(400).json({ message: "Description is required" });
  if (!priority) res.status(400).json({ message: "Priority is required" });
  if (!status) res.status(400).json({ message: "Status is required" });
  if (!tags) res.status(400).json({ message: "Tag is required" });
  if (users.length < 0)
    res.status(400).json({ message: "You need at least to assign" });

  const result = await prisma.task.create({
    data: {
      title,
      description,
      priority,
      status,
      tags,
      id: `TASK-${generateTaskID(4)}`,
      User: {
        connect: {
          userID,
        },
      },
    },
  });

  return res.status(200).json(result);
}
