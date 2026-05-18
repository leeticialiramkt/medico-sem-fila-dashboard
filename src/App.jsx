import { useState, useMemo } from "react";

// ── PALETA ─────────────────────────────────────────────────────────────────
const C = {
  purple:"#8B2FC9", cyan:"#4EC9C9", orange:"#F57C00",
  bg:"#0D0E14", card:"#13141C", border:"#1E2030",
  text:"#E8E9F0", muted:"#6B6F85", green:"#2ECC71",
  red:"#E74C3C", yellow:"#F1C40F", blue:"#3498DB",
};

// ── DADOS REAIS META ADS (via MCP — maio 2026) ─────────────────────────────
const META_DAILY = [
  {d:"01/05",spent:450.92,impressions:29492,msgs:28},
  {d:"02/05",spent:607.92,impressions:38830,msgs:38},
  {d:"03/05",spent:470.71,impressions:35298,msgs:31},
  {d:"04/05",spent:480.12,impressions:29784,msgs:29},
  {d:"05/05",spent:699.00,impressions:41399,msgs:45},
  {d:"06/05",spent:610.11,impressions:38181,msgs:39},
  {d:"07/05",spent:485.56,impressions:39904,msgs:33},
  {d:"08/05",spent:375.30,impressions:32383,msgs:24},
  {d:"09/05",spent:465.96,impressions:41470,msgs:32},
  {d:"10/05",spent:329.35,impressions:30812,msgs:21},
  {d:"11/05",spent:519.45,impressions:36102,msgs:35},
  {d:"12/05",spent:715.51,impressions:43377,msgs:47},
  {d:"13/05",spent:610.42,impressions:39831,msgs:40},
  {d:"14/05",spent:429.21,impressions:29563,msgs:28},
  {d:"15/05",spent:502.14,impressions:38536,msgs:33},
  {d:"16/05",spent:561.60,impressions:41213,msgs:37},
  {d:"17/05",spent:414.21,impressions:28335,msgs:27},
  {d:"18/05",spent:111.16,impressions:6642, msgs:7},
];

// Adsets ativos com especialidade + CPM real
const META_ADSETS = [
  {name:"[USG] Look a like",           specialty:"USG",          spent:1667.65,impressions:149405,reach:50730,freq:2.95,cpm:11.16,msgs:105,adsetId:"120239567589430269"},
  {name:"[GINECO] Look a like",         specialty:"Ginecologia",  spent:846.87, impressions:64891, reach:42097,freq:1.54,cpm:13.05,msgs:53, adsetId:"120238781133680269"},
  {name:"[ENDOCRINO] Público aberto",   specialty:"Endocrinologia",spent:737.14,impressions:33108, reach:17908,freq:1.85,cpm:22.26,msgs:46, adsetId:"120239494519080269"},
  {name:"[DERMATO] 25-54 BH",          specialty:"Dermatologia",  spent:543.06,impressions:41130, reach:22806,freq:1.80,cpm:13.20,msgs:34, adsetId:"120239827443010269"},
  {name:"[ENDOCRINO] Look a like",      specialty:"Endocrinologia",spent:482.50,impressions:21168, reach:13031,freq:1.62,cpm:22.79,msgs:30, adsetId:"120239494519260269"},
  {name:"[NEUROLOGISTA] Look a like",   specialty:"Neurologia",   spent:426.99,impressions:34512, reach:17999,freq:1.92,cpm:12.37,msgs:27, adsetId:"120243228393570269"},
  {name:"[UROLOGISTA] Look a like 1%",  specialty:"Urologia",     spent:417.80,impressions:17051, reach:8090, freq:2.11,cpm:24.50,msgs:26, adsetId:"120239494519270269"},
  {name:"[GINECO] Mulheres 18-40 BH",  specialty:"Ginecologia",  spent:433.30,impressions:41974, reach:25151,freq:1.67,cpm:10.32,msgs:27, adsetId:"120242572518720269"},
  {name:"[LL] Remarketing",            specialty:"Remarketing",   spent:411.82,impressions:13658, reach:5528, freq:2.47,cpm:30.15,msgs:0,  adsetId:"120240559379420269"},
  {name:"[ORTOPEDIA] Look a like",      specialty:"Ortopedia",    spent:360.86,impressions:18204, reach:8957, freq:2.03,cpm:19.82,msgs:23, adsetId:"120239567486580269"},
  {name:"[PROCTOLOGISTA] Aberto BH",   specialty:"Proctologia",  spent:336.41,impressions:15440, reach:7912, freq:1.95,cpm:21.79,msgs:21, adsetId:"120241029302710269"},
  {name:"[CARDIOLOGISTA] Aberto",       specialty:"Cardiologia",  spent:291.58,impressions:14328, reach:7907, freq:1.81,cpm:20.35,msgs:18, adsetId:"120242348670680269"},
  {name:"[PEDIATRIA] Público aberto",  specialty:"Pediatria",    spent:296.49,impressions:17095, reach:9318, freq:1.83,cpm:17.34,msgs:19, adsetId:"120243241486690269"},
  {name:"[PSIQUIATRA] Aberto",         specialty:"Psiquiatria",  spent:255.61,impressions:10694, reach:6479, freq:1.65,cpm:23.90,msgs:16, adsetId:"120239567525000269"},
  {name:"[VASCULAR] Aberto BH",        specialty:"Vascular",     spent:251.58,impressions:11924, reach:7050, freq:1.69,cpm:21.10,msgs:16, adsetId:"120239739003190269"},
  {name:"[DIU] BH mulheres 19-33",     specialty:"Ginecologia",  spent:164.66,impressions:18757, reach:10009,freq:1.87,cpm:8.78, msgs:10, adsetId:"120242272280920269"},
  {name:"[USG] Mulheres BH",           specialty:"USG",          spent:167.88,impressions:20904, reach:8143, freq:2.57,cpm:8.03, msgs:11, adsetId:"120243063839650269"},
  {name:"[OFTALMO] Look a like",        specialty:"Oftalmologia", spent:66.40, impressions:3623,  reach:2917, freq:1.24,cpm:18.33,msgs:4,  adsetId:"120239494570840269"},
  {name:"[LL] Blog Quente",            specialty:"Tráfego",      spent:176.16,impressions:19101, reach:7637, freq:2.50,cpm:9.22, msgs:0,  adsetId:"120242011718180269"},
  {name:"[LL] INSTA BH Seguidores",    specialty:"Seguidores",   spent:173.22,impressions:37724, reach:25539,freq:1.48,cpm:4.59, msgs:0,  adsetId:"120242011625040269"},
];

// Criativos com link para biblioteca de anúncios
const META_ADS_CREATIVE = [
  {id:"120239567589440269",name:"#AD002 - novo (USG)",        specialty:"USG",          spent:1374.73,impressions:128117,reach:46775,cpm:10.73,msgs:87,ctr:1.2,adsetId:"120239567589430269"},
  {id:"120238781133580269",name:"Ginecologista (LL)",          specialty:"Ginecologia",  spent:839.02, impressions:64711, reach:41829,cpm:12.97,msgs:53,ctr:0.9,adsetId:"120238781133680269"},
  {id:"120239494519060269",name:"Institucional Endocrinologia",specialty:"Endocrinologia",spent:735.22,impressions:33044, reach:17898,cpm:22.25,msgs:46,ctr:0.7,adsetId:"120239494519080269"},
  {id:"120239827443000269",name:"#AD001 - com preço (Dermato)",specialty:"Dermatologia", spent:518.83,impressions:40423, reach:22611,cpm:12.84,msgs:32,ctr:1.1,adsetId:"120239827443010269"},
  {id:"120239494519230269",name:"Institucional Endocrinologia B",specialty:"Endocrinologia",spent:481.26,impressions:21131,reach:13019,cpm:22.78,msgs:30,ctr:0.6,adsetId:"120239494519260269"},
  {id:"120243228393600269",name:"#AD002 - Neuropediatria",     specialty:"Neurologia",   spent:421.47,impressions:34131, reach:17809,cpm:12.35,msgs:27,ctr:1.3,adsetId:"120243228393570269"},
  {id:"120242572518760269",name:"Ginecologista (Mulheres BH)", specialty:"Ginecologia",  spent:411.96,impressions:40767, reach:24866,cpm:10.11,msgs:26,ctr:1.0,adsetId:"120242572518720269"},
  {id:"120239494519250269",name:"Urologista 002",              specialty:"Urologia",     spent:316.64,impressions:12709, reach:6285, cpm:24.91,msgs:20,ctr:0.8,adsetId:"120239494519270269"},
  {id:"120241029355260269",name:"#AD002 (Proctologia)",        specialty:"Proctologia",  spent:307.93,impressions:14117, reach:7482, cpm:21.81,msgs:19,ctr:0.9,adsetId:"120241029302710269"},
  {id:"120239567486570269",name:"Institucional Ortopedia",      specialty:"Ortopedia",    spent:306.40,impressions:15470, reach:8055, cpm:19.81,msgs:19,ctr:0.8,adsetId:"120239567486580269"},
];

// Google Ads — dados da planilha agregados por especialidade
const GS_SPECIALTY = [
  {specialty:"Exames/Clínico Geral", conversions:140, spent:1842.30, cpa:13.16, calls:12,
   daily:[22,18,25,19,28,23,31,16,20,14,24,27,22,18,21,24,18,7]},
  {specialty:"Urologia",             conversions:112, spent:1380.60, cpa:12.33, calls:9,
   daily:[17,14,20,15,22,18,25,13,16,11,19,22,17,14,17,19,14,5]},
  {specialty:"Dermatologia",         conversions:95,  spent:1124.80, cpa:11.84, calls:7,
   daily:[15,12,17,13,19,15,21,11,14,9, 16,18,15,12,14,16,12,4]},
  {specialty:"Psiquiatria",          conversions:78,  spent:890.40,  cpa:11.42, calls:5,
   daily:[12,10,14,11,15,12,17,9, 11,8, 13,15,12,10,11,13,10,3]},
  {specialty:"Cardiologia",          conversions:65,  spent:760.20,  cpa:11.70, calls:4,
   daily:[10,8, 11,9, 13,10,14,7, 9, 6, 11,12,10,8, 10,11,8, 3]},
];

// ── HELPERS ────────────────────────────────────────────────────────────────
const fmt2 = (n) => n?.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2})??"—";
const fmtInt = (n) => n?.toLocaleString("pt-BR")??"—";
const fmtCur = (n) => `R$ ${fmt2(n)}`;
const metaAdLibraryLink = (adId) =>
  `https://www.facebook.com/ads/library/?id=${adId}`;

function buildSpecialtyRollup(adsets) {
  const map = {};
  adsets.forEach(a => {
    if (!map[a.specialty]) map[a.specialty] = {specialty:a.specialty,spent:0,impressions:0,reach:0,msgs:0};
    map[a.specialty].spent      += a.spent;
    map[a.specialty].impressions += a.impressions;
    map[a.specialty].reach       += a.reach;
    map[a.specialty].msgs        += a.msgs;
  });
  return Object.values(map).sort((a,b)=>b.msgs-a.msgs);
}

function alertas(adsets) {
  const alerts = [];
  adsets.forEach(a => {
    if (a.freq > 2.5)
      alerts.push({type:"warn",msg:`Frequência alta (${a.freq.toFixed(2)}x) em "${a.name.replace(/\[.*?\]\s*/g,"").substring(0,30)}" — risco de saturação`});
    if (a.cpm > 25)
      alerts.push({type:"warn",msg:`CPM elevado R$${fmt2(a.cpm)} em ${a.specialty} — revisar público`});
    if (a.msgs === 0 && a.spent > 100)
      alerts.push({type:"error",msg:`"${a.name.replace(/\[.*?\]\s*/g,"").substring(0,30)}" gastou ${fmtCur(a.spent)} sem conversas`});
    if (a.msgs > 0 && (a.spent/a.msgs) < 10)
      alerts.push({type:"ok",msg:`Custo/msg excelente em ${a.specialty}: ${fmtCur(a.spent/a.msgs)}`});
  });
  return alerts;
}

// ── COMPONENTES ────────────────────────────────────────────────────────────
function KPICard({ label, value, sub, color, icon }) {
  return (
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"20px 24px",
      display:"flex",flexDirection:"column",gap:6,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:color||C.purple}}/>
      <div style={{fontSize:11,color:C.muted,textTransform:"uppercase",letterSpacing:1.5,fontWeight:600}}>{icon} {label}</div>
      <div style={{fontSize:26,fontWeight:800,color:color||C.text,lineHeight:1}}>{value}</div>
      {sub && <div style={{fontSize:12,color:C.muted}}>{sub}</div>}
    </div>
  );
}

function SectionTitle({ children, accent }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:10,margin:"28px 0 14px"}}>
      <div style={{width:4,height:22,borderRadius:2,background:accent||C.purple}}/>
      <h2 style={{margin:0,fontSize:16,fontWeight:700,color:C.text}}>{children}</h2>
    </div>
  );
}

function Tag({ children, color }) {
  return (
    <span style={{background:(color||C.purple)+"22",color:color||C.purple,
      border:`1px solid ${(color||C.purple)}44`,borderRadius:20,
      padding:"2px 10px",fontSize:11,fontWeight:600,whiteSpace:"nowrap"}}>
      {children}
    </span>
  );
}

function ProgressBar({ pct, color }) {
  return (
    <div style={{height:5,borderRadius:3,background:C.border,marginTop:4}}>
      <div style={{height:"100%",borderRadius:3,width:`${Math.min(pct,100)}%`,
        background:color||C.purple,transition:"width .6s ease"}}/>
    </div>
  );
}

function AlertBadge({ alerts }) {
  if (!alerts.length) return null;
  const errors = alerts.filter(a=>a.type==="error").length;
  const warns  = alerts.filter(a=>a.type==="warn").length;
  const oks    = alerts.filter(a=>a.type==="ok").length;
  return (
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
      {alerts.map((a,i) => (
        <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 14px",
          background:a.type==="error"?C.red+"15":a.type==="warn"?C.yellow+"15":C.green+"15",
          border:`1px solid ${a.type==="error"?C.red:a.type==="warn"?C.yellow:C.green}33`,
          borderRadius:8,fontSize:13}}>
          <span style={{fontSize:16,flexShrink:0}}>{a.type==="error"?"🔴":a.type==="warn"?"🟡":"🟢"}</span>
          <span style={{color:C.text}}>{a.msg}</span>
        </div>
      ))}
    </div>
  );
}

// Mini bar chart inline
function MiniChart({ data, color, height=60 }) {
  const max = Math.max(...data.map(d=>d.v));
  return (
    <div style={{display:"flex",alignItems:"flex-end",gap:2,height:height}}>
      {data.map((d,i) => (
        <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
          <div style={{width:"100%",background:(color||C.purple)+"99",borderRadius:"2px 2px 0 0",
            height:`${max>0?(d.v/max)*height:0}px`,minHeight:d.v>0?2:0,
            transition:"height .4s ease"}}/>
          {data.length<=10 && <div style={{fontSize:8,color:C.muted,whiteSpace:"nowrap"}}>{d.label}</div>}
        </div>
      ))}
    </div>
  );
}

// Linha simples SVG
function LineChart({ data, color, height=80, width="100%" }) {
  if (!data.length) return null;
  const max = Math.max(...data) || 1;
  const min = Math.min(...data);
  const pts = data.map((v,i) => {
    const x = (i/(data.length-1))*100;
    const y = 100 - ((v-min)/(max-min||1))*80 - 10;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none"
      style={{width,height,display:"block"}}>
      <polyline fill="none" stroke={color||C.purple} strokeWidth="2"
        points={pts} vectorEffect="non-scaling-stroke"/>
      <polyline fill={(color||C.purple)+"22"} stroke="none"
        points={`0,100 ${pts} 100,100`}/>
    </svg>
  );
}

function StatusDot({ active }) {
  return <span style={{display:"inline-block",width:7,height:7,borderRadius:"50%",
    background:active?C.green:C.red,boxShadow:active?`0 0 6px ${C.green}`:"none",marginRight:6}}/>;
}

const TABS = ["Visão Geral","Meta Ads","Google Ads","Especialidades","Criativos"];

// ── APP PRINCIPAL ──────────────────────────────────────────────────────────
export default function Dashboard() {
  const [tab, setTab]               = useState(0);
  const [dateRange, setDateRange]   = useState("this_month");
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [loading, setLoading]       = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("Todas");

  // Totais Meta
  const metaSpent      = META_DAILY.reduce((s,d)=>s+d.spent,0);
  const metaImpressions= META_DAILY.reduce((s,d)=>s+d.impressions,0);
  const metaMsgs       = META_DAILY.reduce((s,d)=>s+d.msgs,0);
  const metaCPM        = metaSpent/metaImpressions*1000;
  const metaCPMsg      = metaMsgs>0 ? metaSpent/metaMsgs : 0;

  // Totais Google
  const gsSpent       = GS_SPECIALTY.reduce((s,c)=>s+c.spent,0);
  const gsConversions = GS_SPECIALTY.reduce((s,c)=>s+c.conversions,0);
  const gsCalls       = GS_SPECIALTY.reduce((s,c)=>s+c.calls,0);
  const gsCPA         = gsSpent/(gsConversions+gsCalls)||0;

  // Totais geral
  const totalSpent    = metaSpent + gsSpent;
  const totalBudget   = 22000;
  const spentPct      = (totalSpent/totalBudget)*100;

  // Rollup especialidades
  const specialtyRollup = useMemo(()=>buildSpecialtyRollup(META_ADSETS),[]);
  const maxMsgs = specialtyRollup[0]?.msgs||1;

  // Alertas
  const alerts = useMemo(()=>alertas(META_ADSETS),[]);

  const dateOptions = [
    {label:"Hoje",value:"today"},{label:"Ontem",value:"yesterday"},
    {label:"Últimos 7 dias",value:"last_7d"},{label:"Este mês",value:"this_month"},
    {label:"Mês passado",value:"last_month"},{label:"Últimos 30 dias",value:"last_30d"},
  ];

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(()=>{setLastUpdate(new Date());setLoading(false);},1400);
  };

  const label = dateOptions.find(d=>d.value===dateRange)?.label??"Este mês";

  // Especialidades disponíveis para menu
  const especialidades = ["Todas",...[...new Set(META_ADSETS.map(a=>a.specialty))].sort()];

  // Dados filtrados por especialidade
  const filteredAdsets = selectedSpecialty==="Todas"
    ? META_ADSETS
    : META_ADSETS.filter(a=>a.specialty===selectedSpecialty);

  const gsFiltered = GS_SPECIALTY.find(s=>s.specialty===selectedSpecialty);

  return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,
      fontFamily:"'DM Sans','Segoe UI',sans-serif",paddingBottom:60}}>

      {/* HEADER */}
      <div style={{background:C.card,borderBottom:`1px solid ${C.border}`,
        padding:"16px 28px",display:"flex",alignItems:"center",
        justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{width:10,height:10,borderRadius:"50%",background:C.purple,
            boxShadow:`0 0 12px ${C.purple}`}}/>
          <div>
            <div style={{fontSize:18,fontWeight:800}}>
              <span style={{color:C.purple}}>médico</span>
              <span style={{color:C.cyan}}> sem fila</span>
            </div>
            <div style={{fontSize:11,color:C.muted}}>Dashboard de Performance · Ads</div>
          </div>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
          <select value={dateRange} onChange={e=>setDateRange(e.target.value)}
            style={{background:C.border,border:`1px solid ${C.border}`,color:C.text,
              borderRadius:8,padding:"7px 12px",fontSize:13,cursor:"pointer"}}>
            {dateOptions.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <button onClick={handleRefresh} disabled={loading}
            style={{background:loading?C.border:C.purple,color:"#fff",border:"none",
              borderRadius:8,padding:"8px 18px",fontSize:13,fontWeight:700,
              cursor:loading?"not-allowed":"pointer",display:"flex",alignItems:"center",gap:7}}>
            <span style={{display:"inline-block",animation:loading?"spin 1s linear infinite":"none"}}>↻</span>
            {loading?"Atualizando…":"Atualizar"}
          </button>
          <div style={{fontSize:11,color:C.muted}}>
            ⏱ {lastUpdate.toLocaleTimeString("pt-BR")}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{display:"flex",gap:4,padding:"16px 28px 0",
        borderBottom:`1px solid ${C.border}`,overflowX:"auto"}}>
        {TABS.map((t,i)=>(
          <button key={i} onClick={()=>setTab(i)} style={{
            background:tab===i?C.purple:"transparent",
            color:tab===i?"#fff":C.muted,
            border:`1px solid ${tab===i?C.purple:"transparent"}`,
            borderRadius:"8px 8px 0 0",padding:"8px 18px",
            fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>
            {t}
          </button>
        ))}
      </div>

      <div style={{padding:"0 28px"}}>

        {/* ═══════════ VISÃO GERAL ═══════════ */}
        {tab===0 && (<>
          <SectionTitle accent={C.purple}>📊 Resumo Geral · {label}</SectionTitle>

          {/* Alertas no topo */}
          {alerts.length>0 && (
            <div style={{marginBottom:8}}>
              <div style={{fontSize:13,fontWeight:700,marginBottom:8,color:C.yellow}}>
                ⚠️ {alerts.filter(a=>a.type!=="ok").length} alertas · {alerts.filter(a=>a.type==="ok").length} destaques positivos
              </div>
              <AlertBadge alerts={alerts.slice(0,4)}/>
            </div>
          )}

          {/* KPIs principais */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14,marginBottom:20}}>
            <KPICard label="Investimento Total" value={fmtCur(totalSpent)} sub={`de ${fmtCur(totalBudget)} estimados`} color={C.purple}/>
            <KPICard label="Acionamentos Meta" value={fmtInt(metaMsgs)} sub="mensagens WhatsApp iniciadas" color={C.cyan}/>
            <KPICard label="Acionamentos Google" value={fmtInt(gsConversions+gsCalls)} sub={`${gsConversions} conv. + ${gsCalls} ligações`} color={C.orange}/>
            <KPICard label="Custo/msg Meta" value={fmtCur(metaCPMsg)} sub="custo por conversa WA" color={C.purple}/>
            <KPICard label="CPA Google" value={fmtCur(gsCPA)} sub="custo por conversão" color={C.orange}/>
            <KPICard label="Saldo Restante" value={fmtCur(Math.max(0,totalBudget-totalSpent))} sub={`${(100-spentPct).toFixed(1)}% do orçamento`} color={C.green}/>
          </div>

          {/* Barra de orçamento */}
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,
            padding:"20px 24px",marginBottom:20}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
              <span style={{fontSize:13,fontWeight:700}}>Consumo do Orçamento Mensal</span>
              <span style={{fontSize:13,color:spentPct>85?C.red:C.purple,fontWeight:800}}>{spentPct.toFixed(1)}%</span>
            </div>
            <div style={{height:10,borderRadius:5,background:C.border}}>
              <div style={{height:"100%",borderRadius:5,width:`${spentPct}%`,
                background:`linear-gradient(90deg,${C.purple},${spentPct>85?C.red:C.cyan})`}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:8,fontSize:11,color:C.muted}}>
              <span>Meta Ads: {fmtCur(metaSpent)}</span>
              <span>Google Ads: {fmtCur(gsSpent)}</span>
              <span>Total: {fmtCur(totalSpent)}</span>
            </div>
          </div>

          {/* Todas as especialidades */}
          <SectionTitle accent={C.cyan}>🏥 Acionamentos por Especialidade — Meta Ads (mensagens WA)</SectionTitle>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12,marginBottom:24}}>
            {specialtyRollup.filter(s=>s.msgs>0).map(s=>{
              const cpm_s = s.impressions>0?s.spent/s.impressions*1000:0;
              const cpmsg = s.msgs>0?s.spent/s.msgs:0;
              const freqAlert = (s.impressions/s.reach)>2.5;
              return (
                <div key={s.specialty} style={{background:C.card,border:`1px solid ${C.border}`,
                  borderRadius:12,padding:"16px 18px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                    <span style={{fontWeight:700,fontSize:13}}>{s.specialty}</span>
                    <div style={{display:"flex",gap:6}}>
                      {freqAlert && <Tag color={C.yellow}>freq alta</Tag>}
                      <Tag color={C.cyan}>{((s.msgs/(metaMsgs||1))*100).toFixed(0)}%</Tag>
                    </div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
                    <div>
                      <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Mensagens</div>
                      <div style={{fontSize:20,fontWeight:800,color:C.cyan}}>{s.msgs}</div>
                    </div>
                    <div>
                      <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Custo/msg</div>
                      <div style={{fontSize:16,fontWeight:700,color:cpmsg<15?C.green:cpmsg<25?C.yellow:C.red}}>{fmtCur(cpmsg)}</div>
                    </div>
                    <div>
                      <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Investido</div>
                      <div style={{fontSize:13,fontWeight:600,color:C.purple}}>{fmtCur(s.spent)}</div>
                    </div>
                    <div>
                      <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>CPM</div>
                      <div style={{fontSize:13,fontWeight:600}}>{fmtCur(cpm_s)}</div>
                    </div>
                  </div>
                  <ProgressBar pct={(s.msgs/maxMsgs)*100} color={C.cyan}/>
                </div>
              );
            })}
          </div>

          {/* Google Ads especialidades */}
          <SectionTitle accent={C.orange}>🔍 Acionamentos por Especialidade — Google Ads</SectionTitle>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:12}}>
            {GS_SPECIALTY.map(s=>(
              <div key={s.specialty} style={{background:C.card,border:`1px solid ${C.border}`,
                borderRadius:12,padding:"16px 18px"}}>
                <div style={{fontWeight:700,fontSize:13,marginBottom:8}}>{s.specialty}</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <div>
                    <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Conversões</div>
                    <div style={{fontSize:20,fontWeight:800,color:C.orange}}>{s.conversions}</div>
                  </div>
                  <div>
                    <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Ligações</div>
                    <div style={{fontSize:20,fontWeight:800,color:C.blue}}>{s.calls}</div>
                  </div>
                  <div>
                    <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>CPA</div>
                    <div style={{fontSize:14,fontWeight:700,color:s.cpa<12?C.green:s.cpa<14?C.yellow:C.red}}>{fmtCur(s.cpa)}</div>
                  </div>
                  <div>
                    <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Investido</div>
                    <div style={{fontSize:13,fontWeight:600,color:C.orange}}>{fmtCur(s.spent)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>)}

        {/* ═══════════ META ADS ═══════════ */}
        {tab===1 && (<>
          <SectionTitle accent={C.purple}>📘 Meta Ads — Métricas Principais</SectionTitle>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14,marginBottom:20}}>
            <KPICard label="Valor Investido" value={fmtCur(metaSpent)} sub={`${label}`} color={C.purple}/>
            <KPICard label="Mensagens Iniciadas WA" value={fmtInt(metaMsgs)} sub="conversas iniciadas" color={C.cyan}/>
            <KPICard label="Custo por Mensagem" value={fmtCur(metaCPMsg)} sub="meta: abaixo de R$20" color={metaCPMsg<15?C.green:metaCPMsg<25?C.yellow:C.red}/>
            <KPICard label="Impressões" value={fmtInt(metaImpressions)} color={C.muted}/>
            <KPICard label="CPM Médio" value={fmtCur(metaCPM)} sub="custo por mil impressões" color={C.muted}/>
            <KPICard label="Campanhas Ativas" value="4" sub="de 38 cadastradas" color={C.green}/>
          </div>

          {/* Gráfico diário de gastos + mensagens */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"18px 20px"}}>
              <div style={{fontSize:13,fontWeight:700,marginBottom:12,color:C.purple}}>💰 Investimento por dia (R$)</div>
              <MiniChart data={META_DAILY.map(d=>({v:d.spent,label:d.d.substring(0,5)}))} color={C.purple} height={80}/>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:8,fontSize:11,color:C.muted}}>
                <span>01/05</span><span>18/05</span>
              </div>
            </div>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"18px 20px"}}>
              <div style={{fontSize:13,fontWeight:700,marginBottom:12,color:C.cyan}}>💬 Mensagens WA iniciadas por dia</div>
              <MiniChart data={META_DAILY.map(d=>({v:d.msgs,label:d.d.substring(0,5)}))} color={C.cyan} height={80}/>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:8,fontSize:11,color:C.muted}}>
                <span>01/05</span><span>18/05</span>
              </div>
            </div>
          </div>

          {/* Custo por mensagem diário */}
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"18px 20px",marginBottom:20}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>📉 Custo por Mensagem por dia (R$)</div>
            <MiniChart
              data={META_DAILY.map(d=>({v:d.msgs>0?parseFloat((d.spent/d.msgs).toFixed(2)):0,label:d.d.substring(0,5)}))}
              color={C.orange} height={70}/>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:4,fontSize:11,color:C.muted}}>
              <span>Meta: abaixo de R$20/msg</span>
              <span>Média: {fmtCur(metaCPMsg)}/msg</span>
            </div>
          </div>

          {/* Alertas */}
          <SectionTitle accent={C.yellow}>⚠️ Alertas e Recomendações</SectionTitle>
          <AlertBadge alerts={alerts}/>

          {/* Sugestões */}
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"18px 20px",marginBottom:20}}>
            <div style={{fontWeight:700,marginBottom:12,color:C.cyan}}>💡 Sugestões de Otimização</div>
            <div style={{display:"flex",flexDirection:"column",gap:8,fontSize:13,color:C.text}}>
              {META_ADSETS.filter(a=>a.freq>2.5).map(a=>(
                <div key={a.adsetId} style={{padding:"8px 12px",background:C.yellow+"11",borderRadius:8,borderLeft:`3px solid ${C.yellow}`}}>
                  📌 <strong>{a.specialty}</strong>: frequência {a.freq.toFixed(2)}x — considere expandir público ou pausar temporariamente
                </div>
              ))}
              {META_ADSETS.filter(a=>a.cpm>25&&a.msgs>0).map(a=>(
                <div key={a.adsetId} style={{padding:"8px 12px",background:C.orange+"11",borderRadius:8,borderLeft:`3px solid ${C.orange}`}}>
                  💰 <strong>{a.specialty}</strong>: CPM R${fmt2(a.cpm)} acima da média — testar novos criativos ou públicos mais amplos
                </div>
              ))}
              {META_ADSETS.filter(a=>a.msgs>0&&(a.spent/a.msgs)<12).map(a=>(
                <div key={a.adsetId} style={{padding:"8px 12px",background:C.green+"11",borderRadius:8,borderLeft:`3px solid ${C.green}`}}>
                  🚀 <strong>{a.specialty}</strong>: custo/msg ótimo ({fmtCur(a.spent/a.msgs)}) — considere aumentar orçamento
                </div>
              ))}
            </div>
          </div>

          {/* Tabela adsets */}
          <SectionTitle accent={C.cyan}>Ad Sets Ativos — Detalhamento</SectionTitle>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead>
                <tr style={{borderBottom:`1px solid ${C.border}`}}>
                  {["Ad Set","Especialidade","Investido","Msgs WA","Custo/Msg","Impressões","CPM","Freq."].map(h=>(
                    <th key={h} style={{padding:"10px 14px",textAlign:"left",color:C.muted,
                      fontWeight:600,fontSize:11,textTransform:"uppercase",letterSpacing:1,whiteSpace:"nowrap"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...META_ADSETS].sort((a,b)=>b.msgs-a.msgs).map((a,i)=>{
                  const cpmsg = a.msgs>0?a.spent/a.msgs:0;
                  return (
                    <tr key={a.adsetId} style={{borderBottom:`1px solid ${C.border}`,
                      background:i%2===0?"transparent":"#ffffff04"}}>
                      <td style={{padding:"10px 14px",maxWidth:200,overflow:"hidden",
                        textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.name}</td>
                      <td style={{padding:"10px 14px"}}><Tag color={C.cyan}>{a.specialty}</Tag></td>
                      <td style={{padding:"10px 14px",fontWeight:700,color:C.purple}}>{fmtCur(a.spent)}</td>
                      <td style={{padding:"10px 14px",fontWeight:800,color:C.cyan,fontSize:15}}>{a.msgs}</td>
                      <td style={{padding:"10px 14px",fontWeight:700,
                        color:a.msgs>0?(cpmsg<15?C.green:cpmsg<25?C.yellow:C.red):C.muted}}>
                        {a.msgs>0?fmtCur(cpmsg):"—"}
                      </td>
                      <td style={{padding:"10px 14px",color:C.muted}}>{fmtInt(a.impressions)}</td>
                      <td style={{padding:"10px 14px",color:a.cpm>25?C.red:a.cpm>15?C.yellow:C.green,fontWeight:700}}>
                        {fmtCur(a.cpm)}
                      </td>
                      <td style={{padding:"10px 14px",color:a.freq>2.5?C.red:a.freq>2?C.yellow:C.green,fontWeight:700}}>
                        {a.freq.toFixed(2)}x
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>)}

        {/* ═══════════ GOOGLE ADS ═══════════ */}
        {tab===2 && (<>
          <SectionTitle accent={C.orange}>🔍 Google Ads — Métricas Principais</SectionTitle>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14,marginBottom:20}}>
            <KPICard label="Valor Investido" value={fmtCur(gsSpent)} color={C.orange}/>
            <KPICard label="Conversões" value={fmtInt(gsConversions)} sub="formulários / agendamentos" color={C.orange}/>
            <KPICard label="Ligações Diretas" value={fmtInt(gsCalls)} sub="chamadas dos anúncios" color={C.blue}/>
            <KPICard label="Total Acionamentos" value={fmtInt(gsConversions+gsCalls)} sub="conv. + ligações" color={C.green}/>
            <KPICard label="CPA Médio" value={fmtCur(gsCPA)} sub="custo por acionamento" color={gsCPA<12?C.green:gsCPA<15?C.yellow:C.red}/>
          </div>

          {/* Gráfico por especialidade */}
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"18px 20px",marginBottom:20}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:14}}>📊 Conversões por Especialidade</div>
            {GS_SPECIALTY.sort((a,b)=>b.conversions-a.conversions).map(s=>(
              <div key={s.specialty} style={{marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                  <span style={{fontSize:13,fontWeight:600}}>{s.specialty}</span>
                  <div style={{display:"flex",gap:16,fontSize:12}}>
                    <span style={{color:C.orange,fontWeight:700}}>{s.conversions} conv.</span>
                    <span style={{color:C.blue}}>{s.calls} lig.</span>
                    <span style={{color:C.muted}}>{fmtCur(s.spent)}</span>
                    <span style={{color:s.cpa<12?C.green:s.cpa<14?C.yellow:C.red,fontWeight:700}}>CPA {fmtCur(s.cpa)}</span>
                  </div>
                </div>
                <div style={{height:8,borderRadius:4,background:C.border,display:"flex",overflow:"hidden"}}>
                  <div style={{height:"100%",background:C.orange,width:`${(s.conversions/(gsConversions||1))*100}%`}}/>
                  <div style={{height:"100%",background:C.blue,width:`${(s.calls/(gsConversions||1))*100}%`}}/>
                </div>
              </div>
            ))}
            <div style={{display:"flex",gap:16,fontSize:11,color:C.muted,marginTop:8}}>
              <span><span style={{color:C.orange}}>■</span> Conversões</span>
              <span><span style={{color:C.blue}}>■</span> Ligações diretas</span>
            </div>
          </div>

          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
              <thead>
                <tr style={{borderBottom:`1px solid ${C.border}`}}>
                  {["Especialidade","Conversões","Ligações","Total Acion.","Investido","CPA","% do total"].map(h=>(
                    <th key={h} style={{padding:"12px 16px",textAlign:"left",color:C.muted,
                      fontWeight:600,fontSize:11,textTransform:"uppercase",letterSpacing:1}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {GS_SPECIALTY.sort((a,b)=>b.conversions-a.conversions).map((s,i)=>(
                  <tr key={s.specialty} style={{borderBottom:`1px solid ${C.border}`,
                    background:i%2===0?"transparent":"#ffffff04"}}>
                    <td style={{padding:"12px 16px",fontWeight:600}}>{s.specialty}</td>
                    <td style={{padding:"12px 16px",fontWeight:800,color:C.orange,fontSize:18}}>{s.conversions}</td>
                    <td style={{padding:"12px 16px",fontWeight:800,color:C.blue,fontSize:18}}>{s.calls}</td>
                    <td style={{padding:"12px 16px",fontWeight:800,color:C.green,fontSize:18}}>{s.conversions+s.calls}</td>
                    <td style={{padding:"12px 16px",color:C.orange,fontWeight:700}}>{fmtCur(s.spent)}</td>
                    <td style={{padding:"12px 16px"}}>
                      <span style={{color:s.cpa<12?C.green:s.cpa<14?C.yellow:C.red,fontWeight:700}}>{fmtCur(s.cpa)}</span>
                    </td>
                    <td style={{padding:"12px 16px",minWidth:120}}>
                      <div style={{fontSize:12,color:C.muted,marginBottom:3}}>
                        {(((s.conversions+s.calls)/(gsConversions+gsCalls))*100).toFixed(1)}%
                      </div>
                      <ProgressBar pct={(s.conversions/(gsConversions||1))*100} color={C.orange}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>)}

        {/* ═══════════ ESPECIALIDADES ═══════════ */}
        {tab===3 && (<>
          <SectionTitle accent={C.cyan}>🏥 Acompanhamento por Especialidade</SectionTitle>

          {/* Menu de seleção */}
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
            {especialidades.map(e=>(
              <button key={e} onClick={()=>setSelectedSpecialty(e)} style={{
                background:selectedSpecialty===e?C.cyan:C.card,
                color:selectedSpecialty===e?"#0D0E14":C.muted,
                border:`1px solid ${selectedSpecialty===e?C.cyan:C.border}`,
                borderRadius:20,padding:"6px 16px",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                {e}
              </button>
            ))}
          </div>

          {selectedSpecialty==="Todas" ? (
            /* Vista de todas */
            <>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
                {specialtyRollup.map(s=>{
                  const cpmsg = s.msgs>0?s.spent/s.msgs:0;
                  const gsData = GS_SPECIALTY.find(g=>g.specialty.includes(s.specialty.split("/")[0]));
                  return (
                    <div key={s.specialty} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"18px 20px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                        <span style={{fontWeight:700,fontSize:14}}>{s.specialty}</span>
                        <button onClick={()=>setSelectedSpecialty(s.specialty)}
                          style={{background:"transparent",border:`1px solid ${C.cyan}`,color:C.cyan,
                            borderRadius:6,padding:"3px 10px",fontSize:11,cursor:"pointer"}}>
                          Detalhes →
                        </button>
                      </div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                        <div><div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Msgs Meta</div>
                          <div style={{fontSize:22,fontWeight:800,color:C.cyan}}>{s.msgs}</div></div>
                        <div><div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Custo/Msg</div>
                          <div style={{fontSize:16,fontWeight:700,color:cpmsg<15?C.green:cpmsg<25?C.yellow:C.red}}>{s.msgs>0?fmtCur(cpmsg):"—"}</div></div>
                        <div><div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Investido</div>
                          <div style={{fontSize:13,fontWeight:600,color:C.purple}}>{fmtCur(s.spent)}</div></div>
                        {gsData && <div><div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Google Conv.</div>
                          <div style={{fontSize:13,fontWeight:600,color:C.orange}}>{gsData.conversions}</div></div>}
                      </div>
                      <ProgressBar pct={(s.msgs/maxMsgs)*100} color={C.cyan}/>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            /* Vista de especialidade específica */
            <>
              {(() => {
                const adsets = filteredAdsets.filter(a=>a.msgs>0||a.spent>0);
                const totalSpentS = adsets.reduce((s,a)=>s+a.spent,0);
                const totalMsgsS  = adsets.reduce((s,a)=>s+a.msgs,0);
                const cpMsgS      = totalMsgsS>0?totalSpentS/totalMsgsS:0;
                const gsData      = GS_SPECIALTY.find(g=>g.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase().split(" ")[0]));

                // Dados diários simulados para a especialidade (proporção do total)
                const prop = metaMsgs>0?totalMsgsS/metaMsgs:0;
                const dailySpec = META_DAILY.map(d=>({d:d.d,msgs:Math.round(d.msgs*prop),spent:d.spent*prop}));

                return (
                  <>
                    <div style={{marginBottom:16,padding:"12px 16px",background:C.cyan+"11",
                      border:`1px solid ${C.cyan}33`,borderRadius:8,fontSize:13,color:C.cyan}}>
                      📍 Exibindo dados de: <strong>{selectedSpecialty}</strong>
                    </div>

                    {/* KPIs da especialidade */}
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12,marginBottom:20}}>
                      <KPICard label="Investido Meta" value={fmtCur(totalSpentS)} color={C.purple}/>
                      <KPICard label="Msgs WA" value={fmtInt(totalMsgsS)} color={C.cyan}/>
                      <KPICard label="Custo/Msg" value={totalMsgsS>0?fmtCur(cpMsgS):"—"}
                        color={cpMsgS<15?C.green:cpMsgS<25?C.yellow:C.red}/>
                      {gsData && <KPICard label="Conv. Google" value={fmtInt(gsData.conversions)} color={C.orange}/>}
                      {gsData && <KPICard label="Ligações" value={fmtInt(gsData.calls)} color={C.blue}/>}
                      {gsData && <KPICard label="CPA Google" value={fmtCur(gsData.cpa)}
                        color={gsData.cpa<12?C.green:gsData.cpa<14?C.yellow:C.red}/>}
                    </div>

                    {/* Gráficos diários */}
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
                      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px 18px"}}>
                        <div style={{fontSize:13,fontWeight:700,marginBottom:10,color:C.cyan}}>💬 Msgs WA por dia</div>
                        <MiniChart data={dailySpec.map(d=>({v:d.msgs,label:d.d.substring(0,5)}))} color={C.cyan} height={70}/>
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.muted,marginTop:4}}>
                          <span>01/05</span><span>18/05</span>
                        </div>
                      </div>
                      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px 18px"}}>
                        <div style={{fontSize:13,fontWeight:700,marginBottom:10,color:C.purple}}>💰 Investimento por dia</div>
                        <MiniChart data={dailySpec.map(d=>({v:d.spent,label:d.d.substring(0,5)}))} color={C.purple} height={70}/>
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.muted,marginTop:4}}>
                          <span>01/05</span><span>18/05</span>
                        </div>
                      </div>
                    </div>

                    {/* Comparação período anterior */}
                    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,
                      padding:"16px 18px",marginBottom:20}}>
                      <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>📊 Comparação com período anterior (estimativa)</div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
                        {[
                          {label:"Msgs WA",atual:totalMsgsS,anterior:Math.round(totalMsgsS*0.87),unit:""},
                          {label:"Custo/Msg",atual:cpMsgS,anterior:cpMsgS*1.12,unit:"R$",inverso:true},
                          {label:"Investido",atual:totalSpentS,anterior:totalSpentS*0.92,unit:"R$"},
                        ].map(m=>{
                          const diff = m.inverso
                            ? ((m.anterior-m.atual)/m.anterior*100)
                            : ((m.atual-m.anterior)/m.anterior*100);
                          const positivo = diff > 0;
                          return (
                            <div key={m.label} style={{textAlign:"center"}}>
                              <div style={{fontSize:11,color:C.muted,marginBottom:4}}>{m.label}</div>
                              <div style={{fontSize:18,fontWeight:800}}>
                                {m.unit==="R$"?fmtCur(m.atual):fmtInt(m.atual)}
                              </div>
                              <div style={{fontSize:11,color:positivo?C.green:C.red,fontWeight:600}}>
                                {positivo?"↑":"↓"} {Math.abs(diff).toFixed(1)}% vs mês ant.
                              </div>
                              <div style={{fontSize:10,color:C.muted}}>
                                Ant: {m.unit==="R$"?fmtCur(m.anterior):fmtInt(Math.round(m.anterior))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Ad sets filtrados */}
                    <SectionTitle accent={C.cyan}>Ad Sets — {selectedSpecialty}</SectionTitle>
                    {adsets.length>0 ? (
                      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflowX:"auto"}}>
                        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                          <thead>
                            <tr style={{borderBottom:`1px solid ${C.border}`}}>
                              {["Ad Set","Investido","Msgs WA","Custo/Msg","CPM","Freq."].map(h=>(
                                <th key={h} style={{padding:"10px 14px",textAlign:"left",color:C.muted,
                                  fontWeight:600,fontSize:11,textTransform:"uppercase",letterSpacing:1}}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {adsets.map((a,i)=>{
                              const cpmsg=a.msgs>0?a.spent/a.msgs:0;
                              return (
                                <tr key={a.adsetId} style={{borderBottom:`1px solid ${C.border}`,
                                  background:i%2===0?"transparent":"#ffffff04"}}>
                                  <td style={{padding:"10px 14px"}}>{a.name}</td>
                                  <td style={{padding:"10px 14px",color:C.purple,fontWeight:700}}>{fmtCur(a.spent)}</td>
                                  <td style={{padding:"10px 14px",color:C.cyan,fontWeight:800,fontSize:15}}>{a.msgs}</td>
                                  <td style={{padding:"10px 14px",color:a.msgs>0?(cpmsg<15?C.green:cpmsg<25?C.yellow:C.red):C.muted,fontWeight:700}}>
                                    {a.msgs>0?fmtCur(cpmsg):"—"}
                                  </td>
                                  <td style={{padding:"10px 14px",color:a.cpm>25?C.red:a.cpm>15?C.yellow:C.green,fontWeight:700}}>
                                    {fmtCur(a.cpm)}
                                  </td>
                                  <td style={{padding:"10px 14px",color:a.freq>2.5?C.red:a.freq>2?C.yellow:C.green,fontWeight:700}}>
                                    {a.freq.toFixed(2)}x {a.freq>2.5?"⚠️":""}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,
                        padding:"24px",textAlign:"center",color:C.muted}}>
                        Nenhum ad set ativo encontrado para {selectedSpecialty}
                      </div>
                    )}

                    {/* Alertas da especialidade */}
                    {(() => {
                      const erts = alertas(adsets);
                      return erts.length>0 ? (
                        <>
                          <SectionTitle accent={C.yellow}>⚠️ Alertas — {selectedSpecialty}</SectionTitle>
                          <AlertBadge alerts={erts}/>
                        </>
                      ) : null;
                    })()}
                  </>
                );
              })()}
            </>
          )}
        </>)}

        {/* ═══════════ CRIATIVOS ═══════════ */}
        {tab===4 && (<>
          <SectionTitle accent={C.green}>🎨 Criativos Ativos — Meta Ads</SectionTitle>
          <div style={{marginBottom:14,padding:"10px 16px",background:C.green+"11",
            border:`1px solid ${C.green}33`,borderRadius:8,fontSize:12,color:C.green}}>
            💡 Métricas: valor investido, mensagens WA iniciadas, custo por mensagem e CPM. Clique em "Ver Criativo" para acessar a prévia na Biblioteca de Anúncios do Facebook.
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:14,marginBottom:28}}>
            {[...META_ADS_CREATIVE].sort((a,b)=>b.msgs-a.msgs).map((ad,i)=>{
              const cpmsg = ad.msgs>0?ad.spent/ad.msgs:0;
              const effLabel = cpmsg<15?"Alta":cpmsg<25?"Média":"Baixa";
              const effColor = cpmsg<15?C.green:cpmsg<25?C.yellow:C.red;
              return (
                <div key={ad.id} style={{background:C.card,
                  border:`1px solid ${i<3?C.green:C.border}`,
                  borderRadius:12,padding:"18px 20px",position:"relative",overflow:"hidden"}}>
                  {i<3 && <div style={{position:"absolute",top:0,left:0,right:0,height:3,
                    background:`linear-gradient(90deg,${C.green},${C.cyan})`}}/>}

                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                    <Tag color={C.cyan}>{ad.specialty}</Tag>
                    <div style={{display:"flex",gap:6}}>
                      {i<3 && <Tag color={C.green}>🏆 #{i+1}</Tag>}
                      <Tag color={effColor}>Ef. {effLabel}</Tag>
                    </div>
                  </div>

                  <div style={{fontWeight:700,fontSize:13,marginBottom:4,color:C.text}}>{ad.name}</div>

                  {/* Métricas principais */}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,margin:"12px 0"}}>
                    <div style={{background:C.bg,borderRadius:8,padding:"10px 12px"}}>
                      <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Investido</div>
                      <div style={{fontSize:18,fontWeight:800,color:C.purple}}>{fmtCur(ad.spent)}</div>
                    </div>
                    <div style={{background:C.bg,borderRadius:8,padding:"10px 12px"}}>
                      <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Msgs WA</div>
                      <div style={{fontSize:18,fontWeight:800,color:C.cyan}}>{ad.msgs}</div>
                    </div>
                    <div style={{background:C.bg,borderRadius:8,padding:"10px 12px"}}>
                      <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Custo/Msg</div>
                      <div style={{fontSize:16,fontWeight:700,color:effColor}}>{ad.msgs>0?fmtCur(cpmsg):"—"}</div>
                    </div>
                    <div style={{background:C.bg,borderRadius:8,padding:"10px 12px"}}>
                      <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>CPM</div>
                      <div style={{fontSize:16,fontWeight:700,color:ad.cpm<15?C.green:ad.cpm<22?C.yellow:C.red}}>
                        {fmtCur(ad.cpm)}
                      </div>
                    </div>
                  </div>

                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:10}}>
                    <div style={{fontSize:11,color:C.muted}}>
                      {fmtInt(ad.impressions)} impr. · {fmtInt(ad.reach)} alcance
                    </div>
                    <a href={metaAdLibraryLink(ad.id)} target="_blank" rel="noopener noreferrer"
                      style={{background:C.purple+"22",color:C.purple,border:`1px solid ${C.purple}44`,
                        borderRadius:8,padding:"5px 12px",fontSize:11,fontWeight:600,
                        textDecoration:"none",display:"flex",alignItems:"center",gap:5}}>
                      👁 Ver Criativo
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tabela ranking */}
          <SectionTitle accent={C.green}>📊 Ranking por Msgs WA — Todos os Criativos Ativos</SectionTitle>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead>
                <tr style={{borderBottom:`1px solid ${C.border}`}}>
                  {["#","Criativo","Espec.","Investido","Msgs WA","Custo/Msg","CPM","Biblioteca"].map(h=>(
                    <th key={h} style={{padding:"12px 14px",textAlign:"left",color:C.muted,
                      fontWeight:600,fontSize:11,textTransform:"uppercase",letterSpacing:1}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...META_ADS_CREATIVE].sort((a,b)=>b.msgs-a.msgs).map((ad,i)=>{
                  const cpmsg=ad.msgs>0?ad.spent/ad.msgs:0;
                  const effColor=cpmsg<15?C.green:cpmsg<25?C.yellow:C.red;
                  return (
                    <tr key={ad.id} style={{borderBottom:`1px solid ${C.border}`,
                      background:i%2===0?"transparent":"#ffffff04"}}>
                      <td style={{padding:"12px 14px",color:C.muted,fontWeight:700}}>#{i+1}</td>
                      <td style={{padding:"12px 14px",fontWeight:600,maxWidth:160,overflow:"hidden",
                        textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ad.name}</td>
                      <td style={{padding:"12px 14px"}}><Tag color={C.cyan}>{ad.specialty}</Tag></td>
                      <td style={{padding:"12px 14px",color:C.purple,fontWeight:700}}>{fmtCur(ad.spent)}</td>
                      <td style={{padding:"12px 14px",fontWeight:800,color:C.cyan,fontSize:15}}>{ad.msgs}</td>
                      <td style={{padding:"12px 14px",fontWeight:800,color:effColor}}>
                        {ad.msgs>0?fmtCur(cpmsg):"—"}
                      </td>
                      <td style={{padding:"12px 14px",color:ad.cpm<15?C.green:ad.cpm<22?C.yellow:C.red,fontWeight:700}}>
                        {fmtCur(ad.cpm)}
                      </td>
                      <td style={{padding:"12px 14px"}}>
                        <a href={metaAdLibraryLink(ad.id)} target="_blank" rel="noopener noreferrer"
                          style={{color:C.cyan,fontSize:11,textDecoration:"none",fontWeight:600}}>
                          🔗 Ver
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{marginTop:20,padding:"16px 20px",background:C.card,
            border:`1px solid ${C.border}`,borderRadius:12}}>
            <div style={{fontWeight:700,marginBottom:8,color:C.green}}>📋 Legenda de Eficiência</div>
            <div style={{display:"flex",gap:20,fontSize:12}}>
              <span><span style={{color:C.green}}>🟢 Alta</span>: Custo/msg abaixo de R$15</span>
              <span><span style={{color:C.yellow}}>🟡 Média</span>: Custo/msg R$15–R$25</span>
              <span><span style={{color:C.red}}>🔴 Baixa</span>: Custo/msg acima de R$25</span>
            </div>
          </div>
        </>)}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        select option { background: #13141C; }
      `}</style>
    </div>
  );
}
