import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signSession, setSessionCookie } from "@/lib/jwt";

export async function POST(req:NextRequest){
  const {email,password}=await req.json();
  const user = await prisma.user.findUnique({where:{email}, include:{tenant:true}});
  if(!user) return NextResponse.json({error:"Senha ou e-mail incorreto"}, {status:401});
  const ok = await bcrypt.compare(password,user.password);
  if(!ok) return NextResponse.json({error:"Senha ou e-mail incorreto"}, {status:401});

  // Bloqueio de tenant desativado
  if(user.role!=="SUPER_ADMIN" && user.tenant?.status==="DEACTIVATED"){
    return NextResponse.json({error:"Aguardando Validação"}, {status:403});
  }

  const token = signSession({id:user.id,email:user.email,role:user.role,tenantId:user.tenantId});
  setSessionCookie(token);
  return NextResponse.json({ok:true, redirect:"/dashboard"});
}
