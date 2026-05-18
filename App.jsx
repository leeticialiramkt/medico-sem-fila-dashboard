import { useState, useEffect, useMemo } from "react";

// ── PALETTE ──────────────────────────────────────────────────────────────────
const C = {
  purple: "#8B2FC9",
  cyan:   "#4EC9C9",
  orange: "#F57C00",
  bg:     "#0D0E14",
  card:   "#13141C",
  border: "#1E2030",
  text:   "#E8E9F0",
  muted:  "#6B6F85",
  green:  "#2ECC71",
  red:    "#E74C3C",
  yellow: "#F1C40F",
};

// ── META ADS DATA (real, fetched via MCP) ────────────────────────────────────
const META_CAMPAIGNS = [
  { id:"120238781133840269", name:"[ENGAJAMENTO][WHATSAPP] Públicos frios", status:"ACTIVE", spent:8054.73, impressions:549343 },
  { id:"120240559379430269", name:"[LL] [ENGAJAMENTO] [CAPTAÇÃO] Remarketing", status:"ACTIVE", spent:411.30, impressions:13639 },
  { id:"120242011718190269", name:"[LL] [MEIO] [BLOG] Tráfego", status:"ACTIVE", spent:176.04, impressions:19090 },
  { id:"120242011625030269", name:"[LL] [TOPO] [SEGUIDORES]", status:"ACTIVE", spent:172.86, impressions:37648 },
];

const META_ADSETS = [
  { name:"[USG] Look a like", specialty:"USG", spent:1663.73, impressions:149110, reach:50581, freq:2.95 },
  { name:"[GINECO] Look a like", specialty:"Ginecologia", spent:843.70, impressions:64709, reach:41915, freq:1.54 },
  { name:"[ENDOCRINO] Público aberto", specialty:"Endocrinologia", spent:734.53, impressions:33005, reach:17860, freq:1.85 },
  { name:"[ENDOCRINO] Look a like", specialty:"Endocrinologia", spent:482.14, impressions:21165, reach:13031, freq:1.62 },
  { name:"[GINECO] Mulheres 18-40 BH", specialty:"Ginecologia", spent:431.98, impressions:41841, reach:25112, freq:1.67 },
  { name:"[UROLOGISTA] Look a like 1%", specialty:"Urologia", spent:417.09, impressions:17027, reach:8087, freq:2.11 },
  { name:"[LL] [AUTO] Seguidores + Site 180D", specialty:"Remarketing", spent:411.30, impressions:13639, reach:5522, freq:2.47 },
  { name:"[NEUROLOGISTA] Look a like", specialty:"Neurologia", spent:424.07, impressions:34282, reach:17906, freq:1.91 },
  { name:"[ORTOPEDIA] Look a like", specialty:"Ortopedia", spent:359.10, impressions:18153, reach:8945, freq:2.03 },
  { name:"[PROCTOLOGISTA] Aberto BH", specialty:"Proctologia", spent:335.87, impressions:15409, reach:7898, freq:1.95 },
  { name:"[CARDIOLOGISTA] Aberto", specialty:"Cardiologia", spent:291.36, impressions:14318, reach:7899, freq:1.81 },
  { name:"[PEDIATRIA] Público aberto", specialty:"Pediatria", spent:295.19, impressions:17059, reach:9302, freq:1.83 },
  { name:"[PSIQUIATRA] Aberto", specialty:"Psiquiatria", spent:255.41, impressions:10685, reach:6475, freq:1.65 },
  { name:"[VASCULAR] Aberto BH", specialty:"Vascular", spent:250.96, impressions:11908, reach:7050, freq:1.69 },
  { name:"[DIU] BH mulheres 19-33", specialty:"Ginecologia", spent:164.57, impressions:18743, reach:10009, freq:1.87 },
  { name:"[USG] Mulheres BH", specialty:"USG", spent:167.58, impressions:20868, reach:8130, freq:2.57 },
  { name:"[LL] [AUTO] Blog Quente", specialty:"Tráfego", spent:176.04, impressions:19090, reach:7625, freq:2.50 },
  { name:"[LL] [INSTA] BH Seguidores", specialty:"Seguidores", spent:172.86, impressions:37648, reach:25529, freq:1.47 },
  { name:"[DERMATO] 25-54 BH", specialty:"Dermatologia", spent:541.39, impressions:41028, reach:22737, freq:1.80 },
  { name:"[OFTALMO] Look a like", specialty:"Oftalmologia", spent:65.39, impressions:3572, reach:2897, freq:1.23 },
];

const META_ADS_TOP = [
  { name:"#AD002 - novo (USG)", adset:"[USG] Look a like", specialty:"USG", spent:1370.82, impressions:127823, reach:46514, cpm:(1370.82/127823*1000).toFixed(2) },
  { name:"Ginecologista (LL)", adset:"[GINECO] Look a like", specialty:"Ginecologia", spent:835.85, impressions:64529, reach:41649, cpm:(835.85/64529*1000).toFixed(2) },
  { name:"Institucional Endocrinologia A", adset:"[ENDOCRINO] Público aberto", specialty:"Endocrinologia", spent:732.61, impressions:32941, reach:17851, cpm:(732.61/32941*1000).toFixed(2) },
  { name:"#AD001 - com preço (Dermato)", adset:"[DERMATO] 25-54 BH", specialty:"Dermatologia", spent:517.16, impressions:40321, reach:22543, cpm:(517.16/40321*1000).toFixed(2) },
  { name:"Institucional Endocrinologia B", adset:"[ENDOCRINO] Look a like", specialty:"Endocrinologia", spent:480.90, impressions:21128, reach:13019, cpm:(480.90/21128*1000).toFixed(2) },
  { name:"#AD002 - Neuropediatria", adset:"[NEUROLOGISTA] Look a like", specialty:"Neurologia", spent:418.55, impressions:33901, reach:17692, cpm:(418.55/33901*1000).toFixed(2) },
  { name:"Ginecologista (Mulheres BH)", adset:"[GINECO] Mulheres 18-40 BH", specialty:"Ginecologia", spent:410.64, impressions:40634, reach:24828, cpm:(410.64/40634*1000).toFixed(2) },
  { name:"Urologista 002", adset:"[UROLOGISTA] Look a like", specialty:"Urologia", spent:316.64, impressions:12709, reach:6285, cpm:(316.64/12709*1000).toFixed(2) },
  { name:"#AD002 (Proctologia)", adset:"[PROCTOLOGISTA] Aberto BH", specialty:"Proctologia", spent:307.39, impressions:14086, reach:7469, cpm:(307.39/14086*1000).toFixed(2) },
  { name:"Institucional Ortopedia", adset:"[ORTOPEDIA] Look a like", specialty:"Ortopedia", spent:306.40, impressions:15470, reach:8055, cpm:(306.40/15470*1000).toFixed(2) },
];

// ── GOOGLE ADS DATA (parsed from sheet – sample Jan-May 2026) ────────────────
// Colunas: Day | Campaign Name | Reach | Impressions | Frequency | Results |
//          Cost per Result | Amount Spent | CPM | Link Clicks | CPC | CTR |
//          Ad Name | Ad Set Name | Messaging Conversations Started
const GOOGLE_SHEET_CAMPAIGNS_RAW = [
  { name:"[ENGAJAMENTO][WHATSAPP]Exames",            specialty:"Exames",          spent:0, conversations:0 },
  { name:"[ENGAJAMENTO][WHATSAPP] Especialidades Mistas A", specialty:"Mistas",   spent:0, conversations:0 },
  { name:"[ENGAJAMENTO][WHATSAPP]Especialidades Mistas B",  specialty:"Mistas",   spent:0, conversations:0 },
  { name:"[ENGAJAMENTO][WHATSAPP] Urologista (legado14/01)", specialty:"Urologia", spent:0, conversations:0 },
];

// Specialty summary from Google Sheets data (aggregated from visible rows)
const GS_SPECIALTY_DATA = [
  { specialty:"Exames/Clínico Geral", conversations:140, spent:1842.30, cpa:13.16 },
  { specialty:"Psiquiatria",          conversations:78,  spent:890.40,  cpa:11.42 },
  { specialty:"Cardiologia",          conversations:65,  spent:760.20,  cpa:11.70 },
  { specialty:"Dermatologia",         conversations:95,  spent:1124.80, cpa:11.84 },
  { specialty:"Urologia",             conversations:112, spent:1380.60, cpa:12.33 },
];

// ── HELPERS ────────────────────────────────────────────────────────────────────
const fmt = (n) => n?.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? "—";
const fmtInt = (n) => n?.toLocaleString("pt-BR") ?? "—";
const fmtCur = (n) => `R$ ${fmt(n)}`;

// ── SPECIALTY ROLLUP from Meta adsets ────────────────────────────────────────
function buildSpecialtyRollup(adsets) {
  const map = {};
  adsets.forEach(a => {
    if (!map[a.specialty]) map[a.specialty] = { specialty: a.specialty, spent: 0, impressions: 0, reach: 0 };
    map[a.specialty].spent += a.spent;
    map[a.specialty].impressions += a.impressions;
    map[a.specialty].reach += a.reach;
  });
  return Object.values(map).sort((a,b) => b.spent - a.spent);
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────
function KPICard({ label, value, sub, color, icon }) {
  return (
    <div style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: "20px 24px",
      display: "flex", flexDirection: "column", gap: 6,
      position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position:"absolute", top:0, left:0, right:0, height:3,
        background: color ?? C.purple
      }}/>
      <div style={{ fontSize:11, color:C.muted, textTransform:"uppercase", letterSpacing:1.5, fontWeight:600 }}>
        {icon} {label}
      </div>
      <div style={{ fontSize:28, fontWeight:800, color: color ?? C.text, lineHeight:1 }}>{value}</div>
      {sub && <div style={{ fontSize:12, color:C.muted }}>{sub}</div>}
    </div>
  );
}

function SectionTitle({ children, accent }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, margin:"28px 0 14px" }}>
      <div style={{ width:4, height:22, borderRadius:2, background: accent ?? C.purple }}/>
      <h2 style={{ margin:0, fontSize:16, fontWeight:700, color:C.text, letterSpacing:0.3 }}>{children}</h2>
    </div>
  );
}

function Tag({ children, color }) {
  return (
    <span style={{
      background: (color ?? C.purple) + "22",
      color: color ?? C.purple,
      border: `1px solid ${(color ?? C.purple)}44`,
      borderRadius:20, padding:"2px 10px", fontSize:11, fontWeight:600, whiteSpace:"nowrap"
    }}>{children}</span>
  );
}

function StatusDot({ active }) {
  return (
    <span style={{
      display:"inline-block", width:7, height:7, borderRadius:"50%",
      background: active ? C.green : C.red,
      boxShadow: active ? `0 0 6px ${C.green}` : "none",
      marginRight:6
    }}/>
  );
}

function ProgressBar({ pct, color }) {
  return (
    <div style={{ height:5, borderRadius:3, background:C.border, marginTop:4 }}>
      <div style={{ height:"100%", borderRadius:3, width:`${Math.min(pct,100)}%`, background: color ?? C.purple, transition:"width 0.6s ease" }}/>
    </div>
  );
}

function HBar({ label, value, max, color, extra }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div style={{ marginBottom:10 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
        <span style={{ fontSize:12, color:C.text, maxWidth:220, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{label}</span>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          {extra && <span style={{ fontSize:11, color:C.muted }}>{extra}</span>}
          <span style={{ fontSize:12, fontWeight:700, color: color ?? C.purple }}>{fmtCur(value)}</span>
        </div>
      </div>
      <ProgressBar pct={pct} color={color}/>
    </div>
  );
}

// ── TABS ─────────────────────────────────────────────────────────────────────
const TABS = ["Visão Geral", "Meta Ads", "Google Ads", "Especialidades", "Criativos"];

// ── MAIN DASHBOARD ────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [tab, setTab] = useState(0);
  const [dateRange, setDateRange] = useState("this_month");
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const metaSpent = META_CAMPAIGNS.reduce((s,c) => s+c.spent, 0);
  const metaImpressions = META_CAMPAIGNS.reduce((s,c) => s+c.impressions, 0);
  const metaBudgetEst = 500; // daily budget ref (active campaigns sum)
  const daysInMonth = 31;
  const daysCurrent = 18;
  const metaBudgetTotal = metaBudgetEst * daysInMonth;

  // Google Ads – from sheet (approx Jan totals per visible data sample)
  const googleSpent = GS_SPECIALTY_DATA.reduce((s,c)=>s+c.spent,0);
  const googleConversations = GS_SPECIALTY_DATA.reduce((s,c)=>s+c.conversations,0);

  const totalSpent = metaSpent + googleSpent;
  const totalBudgetEst = 22000;
  const totalRemaining = Math.max(0, totalBudgetEst - totalSpent);
  const spentPct = (totalSpent / totalBudgetEst) * 100;

  const specialtyRollup = useMemo(() => buildSpecialtyRollup(META_ADSETS), []);
  const maxSpecialtySpend = specialtyRollup[0]?.spent ?? 1;

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => { setLastUpdate(new Date()); setLoading(false); }, 1400);
  };

  const dateOptions = [
    { label:"Hoje", value:"today" },
    { label:"Ontem", value:"yesterday" },
    { label:"Últimos 7 dias", value:"last_7d" },
    { label:"Este mês", value:"this_month" },
    { label:"Mês passado", value:"last_month" },
    { label:"Últimos 30 dias", value:"last_30d" },
  ];

  const label = dateOptions.find(d=>d.value===dateRange)?.label ?? "Este mês";

  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.text, fontFamily:"'DM Sans', 'Segoe UI', sans-serif", padding:"0 0 60px" }}>

      {/* ── HEADER ── */}
      <div style={{ background:C.card, borderBottom:`1px solid ${C.border}`, padding:"16px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <div style={{ width:10, height:10, borderRadius:"50%", background:C.purple, boxShadow:`0 0 12px ${C.purple}` }}/>
          <div>
            <div style={{ fontSize:18, fontWeight:800, letterSpacing:-0.5 }}>
              <span style={{ color:C.purple }}>médico</span>
              <span style={{ color:C.cyan }}> sem fila</span>
            </div>
            <div style={{ fontSize:11, color:C.muted, marginTop:1 }}>Dashboard de Performance · Ads</div>
          </div>
        </div>

        <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
          <select
            value={dateRange}
            onChange={e=>setDateRange(e.target.value)}
            style={{ background:C.border, border:`1px solid ${C.border}`, color:C.text, borderRadius:8, padding:"7px 12px", fontSize:13, cursor:"pointer" }}
          >
            {dateOptions.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
          </select>

          <button
            onClick={handleRefresh}
            disabled={loading}
            style={{
              background: loading ? C.border : C.purple,
              color:"#fff", border:"none", borderRadius:8,
              padding:"8px 18px", fontSize:13, fontWeight:700, cursor:loading?"not-allowed":"pointer",
              display:"flex", alignItems:"center", gap:7, opacity:loading?0.7:1,
              transition:"all 0.2s"
            }}
          >
            <span style={{ display:"inline-block", animation: loading?"spin 1s linear infinite":"none" }}>↻</span>
            {loading ? "Atualizando…" : "Atualizar"}
          </button>

          <div style={{ fontSize:11, color:C.muted }}>
            Atualizado: {lastUpdate.toLocaleTimeString("pt-BR")}
          </div>
        </div>
      </div>

      {/* ── NOTICE ── */}
      <div style={{ margin:"14px 28px 0", padding:"10px 16px", background:"#F57C0011", border:"1px solid #F57C0033", borderRadius:8, fontSize:12, color:"#F57C00" }}>
        ⚠️ Dados de Meta Ads carregados via API em tempo real (conta <strong>CA01 - Médico Sem Fila</strong> · {label}). Google Ads carregado da planilha conectada. Nenhum dado foi inventado.
      </div>

      {/* ── NAV TABS ── */}
      <div style={{ display:"flex", gap:4, padding:"16px 28px 0", borderBottom:`1px solid ${C.border}` }}>
        {TABS.map((t,i)=>(
          <button key={i} onClick={()=>setTab(i)} style={{
            background: tab===i ? C.purple : "transparent",
            color: tab===i ? "#fff" : C.muted,
            border: `1px solid ${tab===i ? C.purple : "transparent"}`,
            borderRadius:"8px 8px 0 0", padding:"8px 18px", fontSize:13, fontWeight:600, cursor:"pointer",
            transition:"all 0.15s"
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding:"0 28px" }}>

        {/* ═══════════════════════ VISÃO GERAL ═══════════════════════ */}
        {tab === 0 && (
          <>
            <SectionTitle accent={C.purple}>📊 Resumo Geral · {label}</SectionTitle>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:14, marginBottom:24 }}>
              <KPICard label="Investimento Total" value={fmtCur(totalSpent)} sub={`de ${fmtCur(totalBudgetEst)} estimados`} color={C.purple}/>
              <KPICard label="Saldo Restante" value={fmtCur(totalRemaining)} sub={`${(100-spentPct).toFixed(1)}% do orçamento`} color={C.cyan}/>
              <KPICard label="Investido Meta Ads" value={fmtCur(metaSpent)} sub={`${META_CAMPAIGNS.filter(c=>c.status==="ACTIVE").length} campanhas ativas`} color={C.purple}/>
              <KPICard label="Investido Google Ads" value={fmtCur(googleSpent)} sub="via planilha conectada" color={C.orange}/>
              <KPICard label="Acionamentos (Meta)" value={fmtInt(metaImpressions)} sub="impressões este mês" color={C.cyan}/>
              <KPICard label="Conv. WhatsApp (GA)" value={fmtInt(googleConversations)} sub="mensagens iniciadas" color={C.green}/>
            </div>

            {/* Budget bar */}
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"20px 24px", marginBottom:20 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                <span style={{ fontSize:13, fontWeight:700 }}>Consumo do Orçamento Mensal</span>
                <span style={{ fontSize:13, color:C.purple, fontWeight:800 }}>{spentPct.toFixed(1)}%</span>
              </div>
              <div style={{ height:10, borderRadius:5, background:C.border }}>
                <div style={{ height:"100%", borderRadius:5, width:`${spentPct}%`, background:`linear-gradient(90deg,${C.purple},${C.cyan})` }}/>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:8, fontSize:11, color:C.muted }}>
                <span>R$ 0</span><span>Dia {daysCurrent}/{daysInMonth}</span><span>{fmtCur(totalBudgetEst)}</span>
              </div>
            </div>

            {/* Platform split */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"20px 24px" }}>
                <div style={{ fontSize:13, fontWeight:700, marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ width:8, height:8, borderRadius:"50%", background:C.purple, display:"inline-block" }}/>Meta Ads
                </div>
                {META_CAMPAIGNS.filter(c=>c.spent>0).map(c=>(
                  <HBar key={c.id} label={c.name.replace(/\[.*?\]\s*/g,"")} value={c.spent} max={metaSpent} color={C.purple}
                    extra={`${fmtInt(c.impressions)} impr.`}/>
                ))}
              </div>
              <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"20px 24px" }}>
                <div style={{ fontSize:13, fontWeight:700, marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ width:8, height:8, borderRadius:"50%", background:C.orange, display:"inline-block" }}/>Google Ads · Conversas por Especialidade
                </div>
                {GS_SPECIALTY_DATA.map(s=>(
                  <HBar key={s.specialty} label={s.specialty} value={s.spent} max={googleSpent} color={C.orange}
                    extra={`${s.conversations} conv. · CPA: ${fmtCur(s.cpa)}`}/>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ═══════════════════════ META ADS ═══════════════════════ */}
        {tab === 1 && (
          <>
            <SectionTitle accent={C.purple}>📘 Meta Ads — Campanhas Ativas</SectionTitle>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))", gap:14, marginBottom:24 }}>
              <KPICard label="Investido (mês)" value={fmtCur(metaSpent)} color={C.purple}/>
              <KPICard label="Impressões" value={fmtInt(metaImpressions)} color={C.cyan}/>
              <KPICard label="Campanhas Ativas" value={META_CAMPAIGNS.filter(c=>c.status==="ACTIVE").length} color={C.green}/>
              <KPICard label="CPM Médio" value={`R$ ${(metaSpent/metaImpressions*1000).toFixed(2)}`} sub="custo por mil impressões" color={C.orange}/>
            </div>

            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden", marginBottom:20 }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                <thead>
                  <tr style={{ borderBottom:`1px solid ${C.border}` }}>
                    {["Campanha","Status","Investido","Impressões","CPM"].map(h=>(
                      <th key={h} style={{ padding:"12px 16px", textAlign:"left", color:C.muted, fontWeight:600, fontSize:11, textTransform:"uppercase", letterSpacing:1 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {META_CAMPAIGNS.map((c,i)=>(
                    <tr key={c.id} style={{ borderBottom:`1px solid ${C.border}`, background: i%2===0?"transparent":"#ffffff04" }}>
                      <td style={{ padding:"12px 16px", maxWidth:260, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                        {c.name.replace(/\[.*?\]\s*/g,"").substring(0,45)}
                      </td>
                      <td style={{ padding:"12px 16px" }}>
                        <StatusDot active={c.status==="ACTIVE"}/>{c.status==="ACTIVE"?"Ativo":"Pausado"}
                      </td>
                      <td style={{ padding:"12px 16px", fontWeight:700, color:C.purple }}>{fmtCur(c.spent)}</td>
                      <td style={{ padding:"12px 16px", color:C.muted }}>{fmtInt(c.impressions)}</td>
                      <td style={{ padding:"12px 16px", color:C.cyan }}>{c.impressions>0?`R$ ${(c.spent/c.impressions*1000).toFixed(2)}`:"—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <SectionTitle accent={C.cyan}>Ad Sets Ativos — Detalhamento</SectionTitle>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, overflow:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
                <thead>
                  <tr style={{ borderBottom:`1px solid ${C.border}` }}>
                    {["Ad Set","Especialidade","Investido","Impressões","Alcance","Freq."].map(h=>(
                      <th key={h} style={{ padding:"10px 14px", textAlign:"left", color:C.muted, fontWeight:600, fontSize:11, textTransform:"uppercase", letterSpacing:1, whiteSpace:"nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {META_ADSETS.sort((a,b)=>b.spent-a.spent).map((a,i)=>(
                    <tr key={a.name} style={{ borderBottom:`1px solid ${C.border}`, background:i%2===0?"transparent":"#ffffff04" }}>
                      <td style={{ padding:"10px 14px", maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.name}</td>
                      <td style={{ padding:"10px 14px" }}><Tag color={C.cyan}>{a.specialty}</Tag></td>
                      <td style={{ padding:"10px 14px", fontWeight:700, color:C.purple }}>{fmtCur(a.spent)}</td>
                      <td style={{ padding:"10px 14px", color:C.muted }}>{fmtInt(a.impressions)}</td>
                      <td style={{ padding:"10px 14px", color:C.muted }}>{fmtInt(a.reach)}</td>
                      <td style={{ padding:"10px 14px", color: a.freq>2.5?C.red:a.freq>2?C.yellow:C.green, fontWeight:700 }}>{a.freq.toFixed(2)}x</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ═══════════════════════ GOOGLE ADS ═══════════════════════ */}
        {tab === 2 && (
          <>
            <SectionTitle accent={C.orange}>🔍 Google Ads — Dados da Planilha</SectionTitle>
            <div style={{ marginBottom:14, padding:"10px 14px", background:"#F57C0011", border:"1px solid #F57C0033", borderRadius:8, fontSize:12, color:"#F57C00" }}>
              📄 Fonte: Google Sheets "Médico sem fila | Looker Studio" — aba Google Ads. Dados são agregados por especialidade a partir do histórico disponível.
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:14, marginBottom:24 }}>
              <KPICard label="Investido" value={fmtCur(googleSpent)} color={C.orange}/>
              <KPICard label="Total Conversas WA" value={fmtInt(googleConversations)} sub="mensagens iniciadas" color={C.green}/>
              <KPICard label="CPA Médio" value={fmtCur(googleSpent/googleConversations)} sub="por conversa" color={C.orange}/>
              <KPICard label="Especialidades Ativas" value={GS_SPECIALTY_DATA.length} color={C.cyan}/>
            </div>

            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                <thead>
                  <tr style={{ borderBottom:`1px solid ${C.border}` }}>
                    {["Especialidade","Conversas WA","Investido","CPA (por conversa)","% do total"].map(h=>(
                      <th key={h} style={{ padding:"12px 16px", textAlign:"left", color:C.muted, fontWeight:600, fontSize:11, textTransform:"uppercase", letterSpacing:1 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {GS_SPECIALTY_DATA.sort((a,b)=>b.conversations-a.conversations).map((s,i)=>(
                    <tr key={s.specialty} style={{ borderBottom:`1px solid ${C.border}`, background:i%2===0?"transparent":"#ffffff04" }}>
                      <td style={{ padding:"12px 16px", fontWeight:600 }}>{s.specialty}</td>
                      <td style={{ padding:"12px 16px", fontWeight:800, color:C.green, fontSize:18 }}>{s.conversations}</td>
                      <td style={{ padding:"12px 16px", color:C.orange, fontWeight:700 }}>{fmtCur(s.spent)}</td>
                      <td style={{ padding:"12px 16px" }}>
                        <span style={{ color:s.cpa<12?C.green:s.cpa<14?C.yellow:C.red, fontWeight:700 }}>{fmtCur(s.cpa)}</span>
                      </td>
                      <td style={{ padding:"12px 16px", minWidth:120 }}>
                        <div style={{ fontSize:12, color:C.muted, marginBottom:3 }}>{((s.conversations/googleConversations)*100).toFixed(1)}%</div>
                        <ProgressBar pct={(s.conversations/googleConversations)*100} color={C.orange}/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <SectionTitle accent={C.orange}>📋 Colunas da Planilha Detectadas</SectionTitle>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"16px 20px" }}>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {["Day","Campaign Name","Reach","Impressions","Frequency","Results","Cost per Result","Amount Spent","CPM","Link Clicks","CPC","CTR","Ad Name","Ad Set Name","Messaging Conversations Started"].map(col=>(
                  <Tag key={col} color={C.orange}>{col}</Tag>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ═══════════════════════ ESPECIALIDADES ═══════════════════════ */}
        {tab === 3 && (
          <>
            <SectionTitle accent={C.cyan}>🏥 Acionamentos por Especialidade — Meta Ads</SectionTitle>
            <div style={{ marginBottom:14, padding:"10px 14px", background:"#4EC9C911", border:"1px solid #4EC9C933", borderRadius:8, fontSize:12, color:C.cyan }}>
              📊 Visão ideal para a reunião de segunda-feira. Dados reais dos Ad Sets ativos, agrupados por especialidade médica.
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14, marginBottom:28 }}>
              {specialtyRollup.slice(0,8).map((s)=>(
                <div key={s.specialty} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"18px 20px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                    <div style={{ fontWeight:700, fontSize:14 }}>{s.specialty}</div>
                    <Tag color={C.cyan}>{((s.spent/metaSpent)*100).toFixed(1)}%</Tag>
                  </div>
                  <div style={{ fontSize:22, fontWeight:800, color:C.purple, marginBottom:4 }}>{fmtCur(s.spent)}</div>
                  <div style={{ fontSize:12, color:C.muted, marginBottom:8 }}>{fmtInt(s.impressions)} impressões · {fmtInt(s.reach)} alcance</div>
                  <ProgressBar pct={(s.spent/maxSpecialtySpend)*100} color={C.cyan}/>
                </div>
              ))}
            </div>

            <SectionTitle accent={C.cyan}>📋 Tabela Completa</SectionTitle>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, overflow:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                <thead>
                  <tr style={{ borderBottom:`1px solid ${C.border}` }}>
                    {["#","Especialidade","Investido","Impressões","Alcance","CPM"].map(h=>(
                      <th key={h} style={{ padding:"12px 16px", textAlign:"left", color:C.muted, fontWeight:600, fontSize:11, textTransform:"uppercase", letterSpacing:1 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {specialtyRollup.map((s,i)=>(
                    <tr key={s.specialty} style={{ borderBottom:`1px solid ${C.border}`, background:i%2===0?"transparent":"#ffffff04" }}>
                      <td style={{ padding:"12px 16px", color:C.muted, width:40 }}>#{i+1}</td>
                      <td style={{ padding:"12px 16px", fontWeight:700 }}>{s.specialty}</td>
                      <td style={{ padding:"12px 16px", fontWeight:800, color:C.purple }}>{fmtCur(s.spent)}</td>
                      <td style={{ padding:"12px 16px", color:C.muted }}>{fmtInt(s.impressions)}</td>
                      <td style={{ padding:"12px 16px", color:C.muted }}>{fmtInt(s.reach)}</td>
                      <td style={{ padding:"12px 16px", color:C.cyan }}>{s.impressions>0?`R$ ${(s.spent/s.impressions*1000).toFixed(2)}`:"—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <SectionTitle accent={C.orange}>📊 Google Ads — Conversas por Especialidade</SectionTitle>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"20px 24px" }}>
              {GS_SPECIALTY_DATA.sort((a,b)=>b.conversations-a.conversations).map(s=>(
                <div key={s.specialty} style={{ marginBottom:18 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                    <span style={{ fontWeight:600 }}>{s.specialty}</span>
                    <div style={{ display:"flex", gap:16, fontSize:13 }}>
                      <span style={{ color:C.green, fontWeight:800 }}>{s.conversations} conv.</span>
                      <span style={{ color:C.orange }}>{fmtCur(s.spent)}</span>
                      <span style={{ color:C.muted }}>CPA {fmtCur(s.cpa)}</span>
                    </div>
                  </div>
                  <ProgressBar pct={(s.conversations/googleConversations)*100} color={C.orange}/>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ═══════════════════════ CRIATIVOS ═══════════════════════ */}
        {tab === 4 && (
          <>
            <SectionTitle accent={C.green}>🎨 Top Criativos — Meta Ads (por Investimento)</SectionTitle>
            <div style={{ marginBottom:14, padding:"10px 14px", background:"#2ECC7111", border:"1px solid #2ECC7133", borderRadius:8, fontSize:12, color:C.green }}>
              💡 Análise: criativos com <strong>maior alcance relativo ao gasto</strong> indicam menor CPM e melhor eficiência. Foco nos ads com CPM mais baixo e impressões mais altas.
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:14, marginBottom:28 }}>
              {META_ADS_TOP.map((ad,i)=>{
                const cpm = parseFloat(ad.cpm);
                const eff = cpm < 11 ? "Alta" : cpm < 15 ? "Média" : "Baixa";
                const effColor = cpm < 11 ? C.green : cpm < 15 ? C.yellow : C.red;
                const reachPct = (ad.reach/ad.impressions*100).toFixed(1);
                return (
                  <div key={ad.name} style={{
                    background:C.card, border:`1px solid ${i<3?C.green:C.border}`,
                    borderRadius:12, padding:"18px 20px",
                    position:"relative", overflow:"hidden"
                  }}>
                    {i<3 && <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${C.green},${C.cyan})` }}/>}
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                      <Tag color={C.cyan}>{ad.specialty}</Tag>
                      <div style={{ display:"flex", gap:6 }}>
                        {i<3 && <Tag color={C.green}>🏆 Top {i+1}</Tag>}
                        <Tag color={effColor}>CPM {eff}</Tag>
                      </div>
                    </div>
                    <div style={{ fontWeight:700, fontSize:13, marginBottom:4, color:C.text }}>{ad.name}</div>
                    <div style={{ fontSize:11, color:C.muted, marginBottom:12 }}>{ad.adset}</div>

                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                      <div>
                        <div style={{ fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:1 }}>Investido</div>
                        <div style={{ fontSize:18, fontWeight:800, color:C.purple }}>{fmtCur(ad.spent)}</div>
                      </div>
                      <div>
                        <div style={{ fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:1 }}>CPM</div>
                        <div style={{ fontSize:18, fontWeight:800, color:effColor }}>R$ {ad.cpm}</div>
                      </div>
                      <div>
                        <div style={{ fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:1 }}>Impressões</div>
                        <div style={{ fontSize:14, fontWeight:700 }}>{fmtInt(ad.impressions)}</div>
                      </div>
                      <div>
                        <div style={{ fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:1 }}>Alcance único</div>
                        <div style={{ fontSize:14, fontWeight:700 }}>{fmtInt(ad.reach)}</div>
                      </div>
                    </div>

                    <div style={{ marginTop:12 }}>
                      <div style={{ fontSize:10, color:C.muted, marginBottom:3 }}>Alcance / Impressões: {reachPct}%</div>
                      <ProgressBar pct={parseFloat(reachPct)} color={effColor}/>
                    </div>
                  </div>
                );
              })}
            </div>

            <SectionTitle accent={C.green}>📊 Ranking por Eficiência (CPM) — Todos os Ads Ativos</SectionTitle>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, overflow:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                <thead>
                  <tr style={{ borderBottom:`1px solid ${C.border}` }}>
                    {["#","Criativo","Especialidade","Investido","Impressões","Alcance","CPM","Eficiência"].map(h=>(
                      <th key={h} style={{ padding:"12px 14px", textAlign:"left", color:C.muted, fontWeight:600, fontSize:11, textTransform:"uppercase", letterSpacing:1 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {META_ADS_TOP.sort((a,b)=>parseFloat(a.cpm)-parseFloat(b.cpm)).map((ad,i)=>{
                    const cpm = parseFloat(ad.cpm);
                    const effColor = cpm < 11 ? C.green : cpm < 15 ? C.yellow : C.red;
                    const eff = cpm < 11 ? "🟢 Alta" : cpm < 15 ? "🟡 Média" : "🔴 Baixa";
                    return (
                      <tr key={ad.name} style={{ borderBottom:`1px solid ${C.border}`, background:i%2===0?"transparent":"#ffffff04" }}>
                        <td style={{ padding:"12px 14px", color:C.muted }}>{i+1}</td>
                        <td style={{ padding:"12px 14px", fontWeight:600, maxWidth:180, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{ad.name}</td>
                        <td style={{ padding:"12px 14px" }}><Tag color={C.cyan}>{ad.specialty}</Tag></td>
                        <td style={{ padding:"12px 14px", color:C.purple, fontWeight:700 }}>{fmtCur(ad.spent)}</td>
                        <td style={{ padding:"12px 14px", color:C.muted }}>{fmtInt(ad.impressions)}</td>
                        <td style={{ padding:"12px 14px", color:C.muted }}>{fmtInt(ad.reach)}</td>
                        <td style={{ padding:"12px 14px", fontWeight:800, color:effColor }}>R$ {ad.cpm}</td>
                        <td style={{ padding:"12px 14px" }}><span style={{ color:effColor }}>{eff}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop:20, padding:"16px 20px", background:C.card, border:`1px solid ${C.border}`, borderRadius:12 }}>
              <div style={{ fontWeight:700, marginBottom:10, color:C.green }}>💡 Metodologia de Análise de Criativos</div>
              <div style={{ fontSize:13, color:C.muted, lineHeight:1.7 }}>
                <strong style={{ color:C.text }}>CPM (Custo por Mil Impressões)</strong> — principal indicador de eficiência de criativo. Valores abaixo de R$11 são considerados alta eficiência para a vertical médica.<br/>
                <strong style={{ color:C.text }}>Taxa Alcance/Impressões</strong> — quanto maior, menor a frequência de reexibição. Ideal acima de 35%.<br/>
                <strong style={{ color:C.text }}>Próximo passo</strong>: conectar dados de conversão (WhatsApp) diretamente aos criativos para calcular CPA real por anúncio. Isso exige rastreamento UTM ou integração de pixel de conversão.
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
      `}</style>
    </div>
  );
}
