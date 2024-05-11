-- CreateEnum
CREATE TYPE "StatusPriority" AS ENUM ('High', 'Medium', 'Low');

-- CreateEnum
CREATE TYPE "StatusTask" AS ENUM ('InProgress', 'Doing', 'Canceled', 'Complete', 'Incomplete', 'Backlog');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'employee');

-- CreateTable
CREATE TABLE "User" (
    "userID" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "creatdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Assign" (
    "assignID" TEXT NOT NULL,

    CONSTRAINT "Assign_pkey" PRIMARY KEY ("assignID")
);

-- CreateTable
CREATE TABLE "Task" (
    "taskID" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "creatdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "StatusTask" NOT NULL,
    "priority" "StatusPriority" NOT NULL,
    "userID" TEXT,
    "assignID" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("taskID")
);

-- CreateTable
CREATE TABLE "_AssignToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_AssignToUser_AB_unique" ON "_AssignToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AssignToUser_B_index" ON "_AssignToUser"("B");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignID_fkey" FOREIGN KEY ("assignID") REFERENCES "Assign"("assignID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssignToUser" ADD CONSTRAINT "_AssignToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Assign"("assignID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssignToUser" ADD CONSTRAINT "_AssignToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;
