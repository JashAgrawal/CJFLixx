import prisma from "@/client/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
export async function GET(req: NextRequest,{params}:{params:{id:string}}) {
    const userId = params.id;
    const history = await prisma.watchHistory.findMany({
        take: 10,
        where: {
            userId: userId as string,
        },
        orderBy: {
            watched_at: 'desc'
        }
    });
    return NextResponse.json(history);
  }