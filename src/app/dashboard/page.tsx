import {cookies} from "next/headers";
import {verifySession} from "@/lib/jwt";
import Link from "next/link";

export default function Dashboard(){
  const token=cookies().get("mgl_session")?.value;
  if(!token) return (<main style={{padding:24}}><p>Sem sessão. <a href="/login">Entrar</a></p></main>);
  let user:any; try{ user=verifySession(token);}catch{ return (<main style={{padding:24}}><p>Sessão expirada. <a href="/login">Entrar</a></p></main>); }

  const isSA = user.role==="SUPER_ADMIN";

  return (
    <main style={{padding:"24px 32px"}}>
      <h1>Dashboard {isSA?"• Super Admin":"• Tenant"}</h1>
      {isSA?(
        <>
          <p>Atalhos: <Link href="/sa/tenants">Tenants</Link> • <Link href="/sa/metrics">Métricas</Link></p>
          <p>Gráfico e cards serão renderizados aqui (BLOCO 5).</p>
        </>
      ):(
        <>
          <p>Menu: +Novo • +Cliente • Pesquisar • Configurações (BLOCO 6).</p>
        </>
      )}
      <a className="btn" style={{background:"#ef4444"}} href="/api/auth/logout">Sair</a>
    </main>
  );
}
