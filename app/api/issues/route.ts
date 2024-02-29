import { NextResponse, type NextRequest } from "next/server";
import prisma from '@/prisma/client';
import { createIssueSchema } from "../../validationSchemas";

/**
 * Creates a new issue
 * @param request 
 * @returns the issue created with status 201
 * 
 * @throws validation error (status 400)
 */
export async function POST(request: NextRequest) {
   const body = await request.json();

   const validation = createIssueSchema.safeParse(body);
   if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
   }

   const newIssue = await prisma.issue.create({
      data: {
         title: body.title,
         description: body.description
      }
   });

   return NextResponse.json(newIssue, { status: 201, statusText: 'Created' });
}