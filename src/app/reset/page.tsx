"use client";
import {useSearchParams} from "next/navigation";
import {useState} from "react";
import AuthLayout from "@/components/AuthLayout";

export default function Reset(){
  const token=useSearchParams().get("token")||"";
  const [pwd,setPwd]=useState(""); const [ok,setOk]=useState(false); const [msg,setMsg]=useState<string|null>(null);

  const submit=async(e:any)=>{e.preventDefault(); setMsg(null);
    const r=await fetch("/api/auth/reset",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token,password:pwd})});
    const j=await r.json(); if(!r.ok) return setMsg(j.error||"Erro"); setOk(true);
  };

  if(ok) return <AuthLayout title="Senha alterada">
    <a className="btn" href="/login">Entrar</a>
  </AuthLayout>;

  return <AuthLayout title="Definir nova senha">
    <form onSubmit={submit}>
      <input className="input" type="password" placeholder="Nova senha" value={pwd} onChange={e=>setPwd(e.target.value)} required/>
      {msg && <p className="warning">{msg}</p>}
      <button className="btn">Salvar</button>
    </form>
  </AuthLayout>
}
