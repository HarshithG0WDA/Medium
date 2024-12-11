-- Create Table
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
    );

-- Create Table 
CREATE TABLE "Post" (
    "id" TEXT NOT NULL;
    "title" TEXT NOT NULL;
    "content" TEXT NOT NULL;
    "published" BOOLEAN NOT NULL DEFAULT false;
    "authorId" TEXT NOT NULL;

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
    );

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;