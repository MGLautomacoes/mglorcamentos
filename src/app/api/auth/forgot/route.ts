import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req:NextRequest){
  const {token,password}=await req.json();
  const row = await prisma.passwordResetToken.findUnique({where:{token}});
  if(!row || row.expiresAt < new Date()){
    return NextResponse.json({error:"Token inválido ou expirado"}, {status:400});
  }
  const hash=await bcrypt.hash(password,10);
  await prisma.user.update({where:{id:row.userId}, data:{password:hash}});
  await prisma.passwordResetToken.delete({where:{token}});
  return NextResponse.json({ok:true});
}
 