import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET(){
  const email=process.env.ROOT_ADMIN_EMAIL!;
  const exists = await prisma.user.findUnique({where:{email}});
  if(exists) return NextResponse.json({ok:true, msg:"já existe"});
  const hash=await bcrypt.hash("Almenara794158*",10);
  await prisma.user.create({data:{name:"Super Admin",email,password:hash,role:"SUPER_ADMIN"}});
  return NextResponse.json({ok:true});
}
