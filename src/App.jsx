import { useState, useMemo } from "react";

const C = {
  purple:"#8B2FC9", cyan:"#4EC9C9", orange:"#F57C00",
  bg:"#0D0E14", card:"#13141C", border:"#1E2030",
  text:"#E8E9F0", muted:"#6B6F85", green:"#2ECC71",
  red:"#E74C3C", yellow:"#F1C40F", blue:"#3498DB",
};

const PAGE_ID = "1472486276409572";

const CAMPAIGNS = [
  {id:"120238781133840269", name:"[WHATSAPP] Públicos frios",  type:"whatsapp"},
  {id:"120240559379430269", name:"[ENGAJAMENTO] Remarketing",  type:"remarketing"},
  {id:"120242011718190269", name:"[BLOG] Tráfego",             type:"blog"},
  {id:"120242011625030269", name:"[SEGUIDORES]",               type:"seguidores"},
];

const ADSETS = [
  {id:"120239567589430269", name:"USG — Look a like",                   specialty:"USG",           campaignId:"120238781133840269", spent:1701.07,impressions:149405,reach:50730,freq:2.95,cpm:11.16,msgs:105,type:"whatsapp"},
  {id:"120238781133680269", name:"Ginecologia — Look a like",           specialty:"Ginecologia",   campaignId:"120238781133840269", spent:858.95, impressions:65945, reach:42360,freq:1.54,cpm:13.03,msgs:53, type:"whatsapp"},
  {id:"120239494519080269", name:"Endocrinologia — Público aberto",     specialty:"Endocrinologia",campaignId:"120238781133840269", spent:749.66, impressions:33578, reach:18004,freq:1.85,cpm:22.33,msgs:46, type:"whatsapp"},
  {id:"120239827443010269", name:"Dermatologia — 25-54 BH",             specialty:"Dermatologia",  campaignId:"120238781133840269", spent:525.48, impressions:40933, reach:22693,freq:1.80,cpm:12.84,msgs:34, type:"whatsapp"},
  {id:"120239494519260269", name:"Endocrinologia — Look a like",        specialty:"Endocrinologia",campaignId:"120238781133840269", spent:496.98, impressions:21713, reach:13297,freq:1.62,cpm:22.89,msgs:30, type:"whatsapp"},
  {id:"120243228393570269", name:"Neurologia — Look a like",            specialty:"Neurologia",    campaignId:"120238781133840269", spent:431.96, impressions:35180, reach:18029,freq:1.92,cpm:12.28,msgs:27, type:"whatsapp"},
  {id:"120242572518720269", name:"Ginecologia — Mulheres 18-40 BH",     specialty:"Ginecologia",   campaignId:"120238781133840269", spent:416.01, impressions:41186, reach:24997,freq:1.67,cpm:10.10,msgs:27, type:"whatsapp"},
  {id:"120239494519270269", name:"Urologia — Look a like 1%",           specialty:"Urologia",      campaignId:"120238781133840269", spent:422.18, impressions:17244, reach:9362, freq:2.11,cpm:24.71,msgs:26, type:"whatsapp"},
  {id:"120240559379420269", name:"Remarketing — Seguidores + Site 180D",specialty:"Remarketing",   campaignId:"120240559379430269", spent:411.82, impressions:13658, reach:5528, freq:2.47,cpm:30.15,msgs:0,  type:"remarketing"},
  {id:"120239567486580269", name:"Ortopedia — Look a like",             specialty:"Ortopedia",     campaignId:"120238781133840269", spent:360.86, impressions:18204, reach:8957, freq:2.03,cpm:19.82,msgs:23, type:"whatsapp"},
  {id:"120241029302710269", name:"Proctologia — Aberto BH",             specialty:"Proctologia",   campaignId:"120238781133840269", spent:314.28, impressions:14314, reach:7580, freq:1.95,cpm:21.96,msgs:21, type:"whatsapp"},
  {id:"120242348670680269", name:"Cardiologia — Aberto",                specialty:"Cardiologia",   campaignId:"120238781133840269", spent:254.47, impressions:12967, reach:7454, freq:1.81,cpm:19.62,msgs:18, type:"whatsapp"},
  {id:"120243241486690269", name:"Pediatria — Público aberto",          specialty:"Pediatria",     campaignId:"120238781133840269", spent:299.12, impressions:17122, reach:9324, freq:1.83,cpm:17.47,msgs:19, type:"whatsapp"},
  {id:"120239567525000269", name:"Psiquiatria — Aberto",                specialty:"Psiquiatria",   campaignId:"120238781133840269", spent:255.61, impressions:10694, reach:6479, freq:1.65,cpm:23.90,msgs:16, type:"whatsapp"},
  {id:"120239739003190269", name:"Vascular — Aberto BH",                specialty:"Vascular",      campaignId:"120238781133840269", spent:251.58, impressions:11924, reach:7050, freq:1.69,cpm:21.10,msgs:16, type:"whatsapp"},
  {id:"120242272280920269", name:"Ginecologia — DIU BH 19-33 anos",     specialty:"Ginecologia",   campaignId:"120238781133840269", spent:167.71, impressions:19056, reach:10154,freq:1.87,cpm:8.80, msgs:10, type:"whatsapp"},
  {id:"120243063839650269", name:"USG — Mulheres BH",                   specialty:"USG",           campaignId:"120238781133840269", spent:164.80, impressions:20583, reach:8135, freq:2.57,cpm:8.01, msgs:11, type:"whatsapp"},
  {id:"120239494570840269", name:"Oftalmologia — Look a like",          specialty:"Oftalmologia",  campaignId:"120238781133840269", spent:66.40,  impressions:3623,  reach:2917, freq:1.24,cpm:18.33,msgs:4,  type:"whatsapp"},
  {id:"120242011718180269", name:"Blog — Público quente",               specialty:"Tráfego/Blog",  campaignId:"120242011718190269", spent:178.08, impressions:19267, reach:7726, freq:2.50,cpm:9.24, msgs:0,  type:"blog"},
  {id:"120242011625040269", name:"Seguidores — BH Instagram",           specialty:"Seguidores",    campaignId:"120242011625030269", spent:175.04, impressions:38424, reach:25825,freq:1.48,cpm:4.56, msgs:0,  type:"seguidores"},
];

const ADS = [
  {id:"120239567589440269", name:"#AD002 - novo",                    adsetId:"120239567589430269",campaignId:"120238781133840269", specialty:"USG",           spent:1409.53,impressions:130744,reach:47462,cpm:10.78,msgs:89,ctr:1.3},
  {id:"120238781133580269", name:"Ginecologista",                    adsetId:"120238781133680269",campaignId:"120238781133840269", specialty:"Ginecologia",   spent:858.95, impressions:65945, reach:42360,cpm:13.03,msgs:53,ctr:0.9},
  {id:"120239494519060269", name:"Institucional Endocrinologia",     adsetId:"120239494519080269",campaignId:"120238781133840269", specialty:"Endocrinologia",spent:749.66, impressions:33578, reach:18004,cpm:22.33,msgs:46,ctr:0.7},
  {id:"120239827443000269", name:"#AD001 - com preco",               adsetId:"120239827443010269",campaignId:"120238781133840269", specialty:"Dermatologia",  spent:525.48, impressions:40933, reach:22693,cpm:12.84,msgs:32,ctr:1.1},
  {id:"120239494519230269", name:"Institucional Endocrinologia (LL)",adsetId:"120239494519260269",campaignId:"120238781133840269", specialty:"Endocrinologia",spent:496.98, impressions:21713, reach:13297,cpm:22.89,msgs:30,ctr:0.6},
  {id:"120243228393600269", name:"#AD002 - Neuropediatria",          adsetId:"120243228393570269",campaignId:"120238781133840269", specialty:"Neurologia",    spent:431.96, impressions:35180, reach:18029,cpm:12.28,msgs:27,ctr:1.3},
  {id:"120242572518760269", name:"Ginecologista (Mulheres BH)",      adsetId:"120242572518720269",campaignId:"120238781133840269", specialty:"Ginecologia",   spent:416.01, impressions:41186, reach:24997,cpm:10.10,msgs:26,ctr:1.0},
  {id:"120239494519250269", name:"Urologista 002",                   adsetId:"120239494519270269",campaignId:"120238781133840269", specialty:"Urologia",      spent:316.85, impressions:12710, reach:6285, cpm:24.93,msgs:20,ctr:0.8},
  {id:"120241029355260269", name:"#AD002 (Proctologia)",             adsetId:"120241029302710269",campaignId:"120238781133840269", specialty:"Proctologia",   spent:314.28, impressions:14314, reach:7580, cpm:21.96,msgs:19,ctr:0.9},
  {id:"120239567486570269", name:"Institucional Ortopedia",          adsetId:"120239567486580269",campaignId:"120238781133840269", specialty:"Ortopedia",     spent:306.40, impressions:15470, reach:8055, cpm:19.81,msgs:19,ctr:0.8},
  {id:"120243241486680269", name:"Pediatria",                        adsetId:"120243241486690269",campaignId:"120238781133840269", specialty:"Pediatria",     spent:299.12, impressions:17122, reach:9324, cpm:17.47,msgs:19,ctr:0.7},
  {id:"120242571948410269", name:"#AD003 (Cardiologia)",             adsetId:"120242348670680269",campaignId:"120238781133840269", specialty:"Cardiologia",   spent:254.47, impressions:12967, reach:7454, cpm:19.62,msgs:18,ctr:0.8},
  {id:"120239567589450269", name:"#AD001 - novo (USG)",              adsetId:"120239567589430269",campaignId:"120238781133840269", specialty:"USG",           spent:241.54, impressions:16668, reach:10516,cpm:14.49,msgs:15,ctr:1.1},
  {id:"120243664311610269", name:"#AD002 - Cancer Colorretal",       adsetId:"120242011718180269",campaignId:"120242011718190269", specialty:"Trafego/Blog",  spent:178.08, impressions:19267, reach:7726, cpm:9.24, msgs:0, ctr:2.1},
  {id:"120242011694670269", name:"#AD003 - Doencas auto imunes",     adsetId:"120242011625040269",campaignId:"120242011625030269", specialty:"Seguidores",    spent:175.04, impressions:38424, reach:25825,cpm:4.56, msgs:0, ctr:0.3},
  {id:"120242272280930269", name:"#AD001 - DIU",                     adsetId:"120242272280920269",campaignId:"120238781133840269", specialty:"Ginecologia",   spent:167.71, impressions:19056, reach:10154,cpm:8.80, msgs:10,ctr:1.2},
  {id:"120243063839680269", name:"#AD003 - novo (USG)",              adsetId:"120243063839650269",campaignId:"120238781133840269", specialty:"USG",           spent:164.80, impressions:20583, reach:8135, cpm:8.01, msgs:11,ctr:1.4},
  {id:"120244483488710269", name:"#AD001 - Uro foco em mulher",      adsetId:"120239494519270269",campaignId:"120238781133840269", specialty:"Urologia",      spent:105.33, impressions:4534,  reach:3077, cpm:23.23,msgs:6, ctr:0.7},
  {id:"120240559674090269", name:"#AD003 - Doppler",                 adsetId:"120239739003190269",campaignId:"120238781133840269", specialty:"Vascular",      spent:131.24, impressions:7874,  reach:5274, cpm:16.67,msgs:10,ctr:0.9},
  {id:"120243664926220269", name:"#AD004 - Angiologista",            adsetId:"120239739003190269",campaignId:"120238781133840269", specialty:"Vascular",      spent:73.16,  impressions:2611,  reach:1787, cpm:28.02,msgs:5, ctr:0.6},
];

const META_DAILY = [
  {d:"01/05",spent:450.92,msgs:28},{d:"02/05",spent:607.92,msgs:38},{d:"03/05",spent:470.71,msgs:31},
  {d:"04/05",spent:480.12,msgs:29},{d:"05/05",spent:699.00,msgs:45},{d:"06/05",spent:610.11,msgs:39},
  {d:"07/05",spent:485.56,msgs:33},{d:"08/05",spent:375.30,msgs:24},{d:"09/05",spent:465.96,msgs:32},
  {d:"10/05",spent:329.35,msgs:21},{d:"11/05",spent:519.45,msgs:35},{d:"12/05",spent:715.51,msgs:47},
  {d:"13/05",spent:610.42,msgs:40},{d:"14/05",spent:429.21,msgs:28},{d:"15/05",spent:502.14,msgs:33},
  {d:"16/05",spent:561.60,msgs:37},{d:"17/05",spent:414.21,msgs:27},{d:"18/05",spent:111.16,msgs:7},
];

const GS_CAMPAIGNS_RAW = [
  {id:"1739541590",  name:"Institucional Medico Sem Fila",        specialty:"Institucional",        spent:659.22, clicks:697,  conversions:1103.92,cpa:0.60},
  {id:"2078679576",  name:"Rede de Pesquisa - clinico geral",     specialty:"Clínico Geral",        spent:614.34, clicks:385,  conversions:212.88, cpa:2.89},
  {id:"2080202786",  name:"Rede de Pesquisa - Gineco",            specialty:"Ginecologia",          spent:1003.47,clicks:491,  conversions:268.48, cpa:3.74},
  {id:"2080205462",  name:"Rede de Pesquisa - Oftalmo",           specialty:"Oftalmologia",         spent:611.89, clicks:336,  conversions:168.47, cpa:3.63},
  {id:"6469330509",  name:"Rede de Pesquisa - Pediatria",         specialty:"Pediatria",            spent:596.56, clicks:292,  conversions:131.98, cpa:4.52},
  {id:"7192740625",  name:"Rede de Pesquisa - Ortopedia",         specialty:"Ortopedia",            spent:609.55, clicks:329,  conversions:173.17, cpa:3.52},
  {id:"7192819569",  name:"Rede de Pesquisa - Endocrinologia",    specialty:"Endocrinologia",       spent:1247.72,clicks:597,  conversions:295.96, cpa:4.22},
  {id:"7193358655",  name:"Rede de Pesquisa - Otorrino",          specialty:"Otorrinolaringologia", spent:524.64, clicks:178,  conversions:196.99, cpa:2.66},
  {id:"7206755015",  name:"Rede de Pesquisa - Neurologia",        specialty:"Neurologia",           spent:373.80, clicks:238,  conversions:169.96, cpa:2.20},
  {id:"17701438061", name:"Rede de Pesquisa - Gastroenterologia", specialty:"Gastroenterologia",    spent:453.56, clicks:63,   conversions:63.49,  cpa:7.14},
  {id:"22427426815", name:"[Ari][SKAG] Cardiologista",            specialty:"Cardiologia",          spent:608.87, clicks:679,  conversions:80.01,  cpa:7.61},
  {id:"22931909032", name:"[Rede de pesquisa] Exames",            specialty:"Exames",               spent:354.48, clicks:320,  conversions:238.74, cpa:1.48},
  {id:"23153476956", name:"[Rede de Pesquisa] Psiquiatra",        specialty:"Psiquiatria",          spent:426.02, clicks:421,  conversions:59.99,  cpa:7.10},
  {id:"23163106747", name:"[Rede de Pesquisa] Dermatologista",    specialty:"Dermatologia",         spent:1213.20,clicks:1137, conversions:418.98, cpa:2.90},
  {id:"23202804685", name:"[P.Max][Lead Gen] Generica",           specialty:"P.Max Geral",          spent:1013.10,clicks:2290, conversions:3205.68,cpa:0.32},
  {id:"23343302605", name:"Rede de pesquisa - Reumatologista",    specialty:"Reumatologia",         spent:483.81, clicks:248,  conversions:70.00,  cpa:6.91},
  {id:"23610940548", name:"[LL] [USG] Campanha USG",              specialty:"USG",                  spent:459.86, clicks:512,  conversions:129.00, cpa:3.57},
  {id:"23719457911", name:"[LL] [SEARCH] [VASCULAR]",             specialty:"Vascular",             spent:107.73, clicks:43,   conversions:9.00,   cpa:11.97},
];

const GS_DAILY = [
  {d:"01/05",spent:461.38,conv:197.67},{d:"04/05",spent:1279.18,conv:802.19},{d:"05/05",spent:1083.13,conv:736.28},
  {d:"06/05",spent:1036.13,conv:718.46},{d:"07/05",spent:1057.24,conv:742.32},{d:"08/05",spent:1023.67,conv:691.34},
  {d:"09/05",spent:21.24,conv:2.00},   {d:"10/05",spent:28.42,conv:3.00},   {d:"11/05",spent:1089.86,conv:770.24},
  {d:"12/05",spent:1025.11,conv:733.67},{d:"13/05",spent:1027.15,conv:747.82},{d:"14/05",spent:1059.33,conv:741.23},
  {d:"15/05",spent:988.86,conv:736.50},{d:"16/05",spent:19.63,conv:1.99},   {d:"17/05",spent:22.99,conv:9.00},
  {d:"18/05",spent:849.04,conv:526.31},
];

const GS_KEYWORDS = [
  {keyword:"medico sem fila",                 specialty:"Institucional",        matchType:"Exata", impressions:1847,clicks:589, conv:423, ctr:31.9,cpa:1.56, spent:659},
  {keyword:"dermatologista bh",               specialty:"Dermatologia",         matchType:"Exata", impressions:2847,clicks:432, conv:128, ctr:15.2,cpa:9.48, spent:1213},
  {keyword:"endocrinologista belo horizonte", specialty:"Endocrinologia",       matchType:"Frase", impressions:1654,clicks:298, conv:98,  ctr:18.0,cpa:12.73,spent:1248},
  {keyword:"ginecologista bh",                specialty:"Ginecologia",          matchType:"Exata", impressions:1243,clicks:201, conv:87,  ctr:16.2,cpa:11.53,spent:1003},
  {keyword:"pediatra bh",                     specialty:"Pediatria",            matchType:"Frase", impressions:987, clicks:178, conv:56,  ctr:18.0,cpa:10.65,spent:597},
  {keyword:"ortopedista belo horizonte",      specialty:"Ortopedia",            matchType:"Frase", impressions:934, clicks:163, conv:73,  ctr:17.5,cpa:8.35, spent:610},
  {keyword:"clinico geral bh",                specialty:"Clínico Geral",        matchType:"Frase", impressions:1892,clicks:243, conv:89,  ctr:12.8,cpa:6.90, spent:614},
  {keyword:"neurologista bh",                 specialty:"Neurologia",           matchType:"Exata", impressions:756, clicks:143, conv:78,  ctr:18.9,cpa:4.79, spent:374},
  {keyword:"psiquiatra belo horizonte",       specialty:"Psiquiatria",          matchType:"Exata", impressions:1103,clicks:198, conv:29,  ctr:17.9,cpa:14.69,spent:426},
  {keyword:"oftalmologista bh",               specialty:"Oftalmologia",         matchType:"Frase", impressions:1102,clicks:203, conv:87,  ctr:18.4,cpa:7.03, spent:612},
  {keyword:"gastroenterologista bh",          specialty:"Gastroenterologia",    matchType:"Exata", impressions:543, clicks:78,  conv:32,  ctr:14.4,cpa:14.17,spent:454},
  {keyword:"reumatologista bh",               specialty:"Reumatologia",         matchType:"Exata", impressions:478, clicks:89,  conv:28,  ctr:18.6,cpa:17.28,spent:484},
  {keyword:"cardiologista belo horizonte",    specialty:"Cardiologia",          matchType:"Frase", impressions:1654,clicks:478, conv:48,  ctr:28.9,cpa:12.69,spent:609},
  {keyword:"usg belo horizonte",              specialty:"USG",                  matchType:"Exata", impressions:892, clicks:312, conv:67,  ctr:35.0,cpa:6.86, spent:460},
  {keyword:"exames medicos bh",               specialty:"Exames",               matchType:"Frase", impressions:1234,clicks:289, conv:119, ctr:23.4,cpa:2.98, spent:354},
  {keyword:"otorrinolaringologista bh",       specialty:"Otorrinolaringologia", matchType:"Exata", impressions:679, clicks:134, conv:89,  ctr:19.7,cpa:5.90, spent:525},
  {keyword:"angiologista belo horizonte",     specialty:"Vascular",             matchType:"Exata", impressions:312, clicks:43,  conv:9,   ctr:13.8,cpa:11.97,spent:108},
  {keyword:"consulta medica bh",              specialty:"P.Max Geral",          matchType:"Ampla", impressions:8234,clicks:1543,conv:1876,ctr:18.7,cpa:0.54, spent:1013},
];

const GA4_CHANNELS = {
  "Paid Search":    {sessions:5019,users:4448,bounce_rate:0.405,avg_dur:123.8,views:6478, engaged:2895},
  "Organic Search": {sessions:2578,users:2170,bounce_rate:0.340,avg_dur:199.2,views:4028, engaged:1671},
  "Cross-network":  {sessions:2270,users:1912,bounce_rate:0.334,avg_dur:195.5,views:3989, engaged:1484},
  "Direct":         {sessions:1100,users:889, bounce_rate:0.498,avg_dur:225.4,views:1545, engaged:559},
  "Display":        {sessions:615, users:573, bounce_rate:0.378,avg_dur:123.3,views:939,  engaged:373},
  "Paid Social":    {sessions:342, users:268, bounce_rate:0.854,avg_dur:10.7, views:394,  engaged:34},
  "Organic Social": {sessions:208, users:185, bounce_rate:0.434,avg_dur:108.2,views:379,  engaged:118},
  "Referral":       {sessions:8,   users:8,   bounce_rate:0.250,avg_dur:427.0,views:8,    engaged:6},
};

const GA4_DAILY_CHANNELS = {
  "Paid Search":   [138,23,20,448,336,318,297,237,23,33,370,355,349,343,236,20,17,88],
  "Organic Search":[41,115,106,202,180,154,159,100,120,86,199,164,132,160,107,128,98,37],
  "Cross-network": [69,7,9,142,169,161,149,177,16,11,153,180,176,141,196,6,6,35],
  "Direct":        [46,42,46,79,80,56,60,37,53,32,58,71,65,50,60,38,45,19],
  "Display":       [67,1,0,19,40,54,74,48,0,0,0,4,38,74,67,0,1,8],
  "Paid Social":   [16,13,30,19,8,20,16,17,12,21,18,16,14,9,2,4,7,3],
};

const GA4_PAGES = [
  {path:"/",                                   views:5057,users:2998,sessions:4049,dur:169.3,bounce:0.311},
  {path:"/servicos/consultas/",                views:1530,users:930, sessions:1179,dur:125.5,bounce:0.160},
  {path:"/dermatologia-lp/",                   views:894, users:767, sessions:813, dur:96.3, bounce:0.364},
  {path:"/endocrinologista/",                  views:470, users:375, sessions:412, dur:72.1, bounce:0.447},
  {path:"/exames/",                            views:423, users:346, sessions:377, dur:118.3,bounce:0.329},
  {path:"/cardiologista/",                     views:384, users:321, sessions:340, dur:45.0, bounce:0.629},
  {path:"/ginecologista-lp/",                  views:344, users:269, sessions:299, dur:66.9, bounce:0.388},
  {path:"/o-que-e-cancer-colorretal/",         views:302, users:206, sessions:257, dur:14.1, bounce:0.829},
  {path:"/servicos/exames-b/exames/",          views:270, users:211, sessions:238, dur:106.8,bounce:0.135},
  {path:"/psiquiatria-lp/",                    views:257, users:215, sessions:233, dur:64.6, bounce:0.601},
  {path:"/oftalmologista/",                    views:252, users:203, sessions:219, dur:103.8,bounce:0.384},
  {path:"/links/",                             views:264, users:182, sessions:191, dur:97.5, bounce:0.450},
  {path:"/neurologista/",                      views:205, users:168, sessions:188, dur:64.2, bounce:0.410},
  {path:"/post-especialidades/ortopedista/",   views:203, users:160, sessions:182, dur:527.7,bounce:0.319},
  {path:"/pediatria/",                         views:206, users:166, sessions:177, dur:77.9, bounce:0.401},
  {path:"/politica-de-privacidade/",           views:376, users:102, sessions:103, dur:138.9,bounce:0.010},
  {path:"/post-especialidades/psiquiatra/",    views:185, users:151, sessions:168, dur:106.7,bounce:0.316},
  {path:"/unidades/unidade-centro/",           views:192, users:129, sessions:159, dur:170.9,bounce:0.182},
  {path:"/post-especialidades/ginecologista/", views:166, users:119, sessions:155, dur:61.2, bounce:0.219},
  {path:"/post-especialidades/otorrino/",      views:181, users:143, sessions:154, dur:132.9,bounce:0.247},
];

const fmt2   = n => n?.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2})??"—";
const fmtInt = n => n?.toLocaleString("pt-BR")??"—";
const fmtCur = n => `R$ ${fmt2(n)}`;
const fmtDur = s => { const m=Math.floor(s/60),ss=Math.round(s%60); return `${m}m${ss.toString().padStart(2,"0")}s`; };
const fmtPct = n => `${(n*100).toFixed(1)}%`;
const adLibUrl = () => `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=BR&is_targeted_country=false&media_type=all&search_type=page&sort_data[direction]=desc&sort_data[mode]=total_impressions&view_all_page_id=${PAGE_ID}`;

function buildMetaRollup(adsets) {
  const map={};
  adsets.forEach(a=>{
    if(!map[a.specialty]) map[a.specialty]={specialty:a.specialty,spent:0,impressions:0,reach:0,msgs:0};
    map[a.specialty].spent+=a.spent; map[a.specialty].impressions+=a.impressions;
    map[a.specialty].reach+=a.reach; map[a.specialty].msgs+=a.msgs;
  });
  return Object.values(map).sort((a,b)=>b.msgs-a.msgs);
}

function genAlerts(adsets,ads) {
  const out=[];
  adsets.forEach(a=>{
    if(a.freq>2.5) out.push({type:"warn",msg:`Frequência alta (${a.freq.toFixed(2)}x) — ${a.specialty} · Conjunto: "${a.name}" — risco de saturação`});
    if(a.cpm>25&&a.msgs>0) out.push({type:"warn",msg:`CPM elevado ${fmtCur(a.cpm)} — ${a.specialty} · Conjunto: "${a.name}" — revisar criativo`});
    if(a.msgs===0&&a.spent>150&&a.type==="whatsapp"){
      const adsDoConj=ads.filter(ad=>ad.adsetId===a.id&&ad.spent>50);
      if(adsDoConj.length>0) adsDoConj.forEach(ad=>out.push({type:"error",msg:`Sem mensagens — ${a.specialty} · Anúncio: "${ad.name}" · Conjunto: "${a.name}" · Gasto: ${fmtCur(ad.spent)}`}));
      else out.push({type:"error",msg:`Sem mensagens — ${a.specialty} · Conjunto: "${a.name}" · Gasto: ${fmtCur(a.spent)}`});
    }
    if(a.msgs>0&&(a.spent/a.msgs)<12) out.push({type:"ok",msg:`Ótimo custo/msg ${fmtCur(a.spent/a.msgs)} — ${a.specialty} · Conjunto: "${a.name}" — considere escalar`});
  });
  return out;
}

function KPI({label,value,sub,color,icon,delta}) {
  return (
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px 18px",display:"flex",flexDirection:"column",gap:5,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:color||C.purple}}/>
      <div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:1.4,fontWeight:600}}>
        {icon&&<span style={{marginRight:4}}>{icon}</span>}{label}
      </div>
      <div style={{fontSize:22,fontWeight:800,color:color||C.text,lineHeight:1.1}}>{value}</div>
      {sub&&<div style={{fontSize:11,color:C.muted}}>{sub}</div>}
      {delta!==undefined&&(
        <div style={{fontSize:10,fontWeight:700,color:delta>=0?C.green:C.red}}>
          {delta>=0?"↑":"↓"} {Math.abs(delta).toFixed(1)}% vs mês ant.
        </div>
      )}
    </div>
  );
}

function SecTitle({children,accent}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:10,margin:"22px 0 10px"}}>
      <div style={{width:4,height:20,borderRadius:2,background:accent||C.purple}}/>
      <h2 style={{margin:0,fontSize:14,fontWeight:700,color:C.text}}>{children}</h2>
    </div>
  );
}

function Pill({children,color}) {
  return <span style={{background:(color||C.purple)+"22",color:color||C.purple,border:`1px solid ${(color||C.purple)}44`,borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:600,whiteSpace:"nowrap"}}>{children}</span>;
}

function PBar({pct,color,h=4}) {
  return <div style={{height:h,borderRadius:h/2,background:C.border,marginTop:3}}>
    <div style={{height:"100%",borderRadius:h/2,width:`${Math.min(pct,100)}%`,background:color||C.purple}}/>
  </div>;
}

function AlertList({items}) {
  if(!items.length) return null;
  return <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
    {items.map((a,i)=>(
      <div key={i} style={{display:"flex",gap:10,padding:"9px 13px",
        background:a.type==="error"?C.red+"14":a.type==="warn"?C.yellow+"14":C.green+"14",
        border:`1px solid ${a.type==="error"?C.red:a.type==="warn"?C.yellow:C.green}33`,
        borderRadius:8,fontSize:12,color:C.text,alignItems:"flex-start"}}>
        <span style={{flexShrink:0}}>{a.type==="error"?"🔴":a.type==="warn"?"🟡":"🟢"}</span>
        <span>{a.msg}</span>
      </div>
    ))}
  </div>;
}

function BarChartTooltip({data,color,h=65}) {
  const [tip,setTip]=useState(null);
  const max=Math.max(...data.map(d=>d.v))||1;
  return (
    <div style={{position:"relative"}}>
      <div style={{display:"flex",alignItems:"flex-end",gap:2,height:h+20}}>
        {data.map((d,i)=>(
          <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:1,cursor:"pointer"}}
            onMouseEnter={e=>setTip({i,d,x:e.clientX,y:e.clientY})} onMouseLeave={()=>setTip(null)}>
            <div style={{width:"100%",background:tip?.i===i?(color||C.purple):(color||C.purple)+(i===data.length-1?"55":"99"),
              borderRadius:"3px 3px 0 0",height:`${(d.v/max)*h}px`,minHeight:d.v>0?2:0}}/>
            <div style={{fontSize:7,color:C.muted,whiteSpace:"nowrap",transform:"rotate(-40deg)",transformOrigin:"top center",marginTop:2}}>{d.label}</div>
          </div>
        ))}
      </div>
      {tip&&<div style={{position:"fixed",left:tip.x+12,top:tip.y-40,zIndex:9999,background:"#1E2030",
        border:`1px solid ${color||C.purple}`,borderRadius:8,padding:"8px 12px",fontSize:12,color:C.text,pointerEvents:"none",whiteSpace:"nowrap",boxShadow:"0 4px 20px #00000066"}}>
        <div style={{fontWeight:700,marginBottom:3}}>{tip.d.label}</div>
        {tip.d.extra?Object.entries(tip.d.extra).map(([k,v])=>(
          <div key={k} style={{color:C.muted}}>{k}: <span style={{color:C.text,fontWeight:600}}>{v}</span></div>
        )):<div>{tip.d.v}</div>}
      </div>}
    </div>
  );
}

function DualBarChart({data,color1,color2,h=65,label1="",label2=""}) {
  const [tip,setTip]=useState(null);
  const max=Math.max(...data.map(d=>Math.max(d.v1,d.v2)))||1;
  return (
    <div style={{position:"relative"}}>
      <div style={{display:"flex",gap:16,marginBottom:8,fontSize:10,color:C.muted}}>
        <span><span style={{color:color1}}>■</span> {label1}</span>
        <span><span style={{color:color2}}>■</span> {label2}</span>
      </div>
      <div style={{display:"flex",alignItems:"flex-end",gap:1,height:h+20}}>
        {data.map((d,i)=>(
          <div key={i} style={{flex:1,display:"flex",alignItems:"flex-end",gap:1,cursor:"pointer"}}
            onMouseEnter={e=>setTip({i,d,x:e.clientX,y:e.clientY})} onMouseLeave={()=>setTip(null)}>
            <div style={{flex:1,background:tip?.i===i?color1:color1+"bb",borderRadius:"2px 2px 0 0",height:`${(d.v1/max)*h}px`,minHeight:d.v1>0?2:0}}/>
            <div style={{flex:1,background:tip?.i===i?color2:color2+"bb",borderRadius:"2px 2px 0 0",height:`${(d.v2/max)*h}px`,minHeight:d.v2>0?2:0}}/>
          </div>
        ))}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:8,color:C.muted,marginTop:2}}>
        {data.filter((_,i)=>i%3===0).map(d=><span key={d.label}>{d.label}</span>)}
      </div>
      {tip&&<div style={{position:"fixed",left:tip.x+12,top:tip.y-50,zIndex:9999,background:"#1E2030",
        border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 12px",fontSize:12,color:C.text,pointerEvents:"none",whiteSpace:"nowrap",boxShadow:"0 4px 20px #00000066"}}>
        <div style={{fontWeight:700,marginBottom:4}}>{tip.d.label}</div>
        <div style={{color:color1}}>{label1}: <strong>{fmtCur(tip.d.v1)}</strong></div>
        <div style={{color:color2}}>{label2}: <strong>{fmtCur(tip.d.v2)}</strong></div>
      </div>}
    </div>
  );
}

function SortTh({children,field,sortField,sortDir,onSort}) {
  const active=sortField===field;
  return (
    <th onClick={()=>onSort(field)} style={{padding:"9px 12px",textAlign:"left",color:active?C.cyan:C.muted,
      fontWeight:600,fontSize:10,textTransform:"uppercase",letterSpacing:1,whiteSpace:"nowrap",cursor:"pointer",userSelect:"none"}}>
      {children} {active?(sortDir==="asc"?"↑":"↓"):"↕"}
    </th>
  );
}

function useSortTable(initial="msgs") {
  const [sortField,setSortField]=useState(initial);
  const [sortDir,setSortDir]=useState("desc");
  const onSort=f=>{if(f===sortField){setSortDir(d=>d==="asc"?"desc":"asc");}else{setSortField(f);setSortDir("desc");}};
  const sortFn=(a,b)=>{const av=a[sortField]??0,bv=b[sortField]??0;return sortDir==="asc"?av-bv:bv-av;};
  return {sortField,sortDir,onSort,sortFn};
}

function FilterBar({campaigns,adsets,selCampaign,selAdset,onCampaign,onAdset}) {
  const filtAdsets=selCampaign==="all"?adsets:adsets.filter(a=>a.campaignId===selCampaign);
  return (
    <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap",alignItems:"center",padding:"10px 14px",background:C.card,border:`1px solid ${C.border}`,borderRadius:10}}>
      <span style={{fontSize:11,color:C.muted,fontWeight:600}}>🔽 FILTRAR:</span>
      <select value={selCampaign} onChange={e=>{onCampaign(e.target.value);onAdset("all");}}
        style={{background:"#1E2030",border:`1px solid ${C.border}`,color:C.text,borderRadius:7,padding:"6px 10px",fontSize:12,minWidth:200}}>
        <option value="all">Todas as Campanhas</option>
        {campaigns.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <select value={selAdset} onChange={e=>onAdset(e.target.value)}
        style={{background:"#1E2030",border:`1px solid ${C.border}`,color:C.text,borderRadius:7,padding:"6px 10px",fontSize:12,minWidth:220}}>
        <option value="all">Todos os Conjuntos</option>
        {filtAdsets.map(a=><option key={a.id} value={a.id}>{a.name}</option>)}
      </select>
      {(selCampaign!=="all"||selAdset!=="all")&&(
        <button onClick={()=>{onCampaign("all");onAdset("all");}}
          style={{background:C.red+"22",color:C.red,border:`1px solid ${C.red}33`,borderRadius:6,padding:"5px 10px",fontSize:11,cursor:"pointer"}}>✕ Limpar</button>
      )}
    </div>
  );
}

function GsFilterBar({campaigns,selCampaign,onCampaign}) {
  return (
    <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap",alignItems:"center",padding:"10px 14px",background:C.card,border:`1px solid ${C.border}`,borderRadius:10}}>
      <span style={{fontSize:11,color:C.muted,fontWeight:600}}>🔽 FILTRAR:</span>
      <select value={selCampaign} onChange={e=>onCampaign(e.target.value)}
        style={{background:"#1E2030",border:`1px solid ${C.border}`,color:C.text,borderRadius:7,padding:"6px 10px",fontSize:12,minWidth:280}}>
        <option value="all">Todas as Campanhas ({campaigns.length})</option>
        {campaigns.map(c=><option key={c.id} value={c.id}>{c.specialty} — {c.name}</option>)}
      </select>
      {selCampaign!=="all"&&(
        <button onClick={()=>onCampaign("all")}
          style={{background:C.red+"22",color:C.red,border:`1px solid ${C.red}33`,borderRadius:6,padding:"5px 10px",fontSize:11,cursor:"pointer"}}>✕ Limpar</button>
      )}
    </div>
  );
}

function PeriodCompare({items,note}) {
  return (
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"14px 18px",marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div style={{fontSize:12,fontWeight:700}}>📊 Comparação com Período Anterior</div>
        {note&&<div style={{fontSize:9,color:C.muted,fontStyle:"italic"}}>{note}</div>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:`repeat(${items.length},1fr)`,gap:12}}>
        {items.map(m=>{
          const d=m.inv?(m.prev>0?(m.prev-m.curr)/m.prev*100:0):(m.prev>0?(m.curr-m.prev)/m.prev*100:0);
          const pos=d>0;
          return (
            <div key={m.lbl} style={{textAlign:"center",padding:"11px",background:C.bg,borderRadius:8}}>
              <div style={{fontSize:10,color:C.muted,marginBottom:3}}>{m.lbl}</div>
              <div style={{fontSize:17,fontWeight:800}}>{m.unit==="cur"?fmtCur(m.curr):fmtInt(Math.round(m.curr))}</div>
              <div style={{fontSize:11,color:pos?C.green:C.red,fontWeight:700,marginTop:2}}>
                {pos?"↑":"↓"} {Math.abs(d).toFixed(1)}% vs período ant.
              </div>
              <div style={{fontSize:9,color:C.muted}}>Ant.: {m.unit==="cur"?fmtCur(m.prev):fmtInt(Math.round(m.prev))}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const CHANNEL_COLORS={
  "Paid Search":C.orange,"Organic Search":C.green,"Cross-network":C.purple,
  "Direct":C.blue,"Display":C.cyan,"Paid Social":C.red,"Organic Social":"#9B59B6","Referral":"#16A085",
};

const TABS=["📊 Visão Geral","📘 Meta Ads","🔍 Google Ads","🏥 Especialidades","🌐 Site Analytics","🎨 Criativos"];

export default function App() {
  const [tab,setTab]           = useState(0);
  const [dateStart,setDateStart] = useState("2026-05-01");
  const [dateEnd,setDateEnd]     = useState("2026-05-18");
  const [lastUp,setLastUp]     = useState(new Date());
  const [loading,setLoad]      = useState(false);
  const [spec,setSpec]         = useState("Todas");
  const [siteView,setSiteView] = useState("canal");
  const [metaCampaign,setMetaCampaign] = useState("all");
  const [metaAdset,setMetaAdset]       = useState("all");
  const [gsCampaign,setGsCampaign]     = useState("all");
  const [gsView,setGsView]             = useState("campanhas");
  const adsetSort = useSortTable("msgs");
  const adsSort   = useSortTable("msgs");
  const gsSort    = useSortTable("conversions");
  const pageSort  = useSortTable("views");
  const kwSort    = useSortTable("conv");

  const filtDaily = useMemo(()=>{
    const s=dateStart.replace(/-/g,""),e=dateEnd.replace(/-/g,"");
    return META_DAILY.filter(d=>{const [day,mon]=d.d.split("/");const k=`2026${mon}${day}`;return k>=s&&k<=e;});
  },[dateStart,dateEnd]);

  const dayRatio = META_DAILY.length>0?filtDaily.length/META_DAILY.length:1;

  const filtAdsets = ADSETS.filter(a=>{
    if(metaCampaign!=="all"&&a.campaignId!==metaCampaign) return false;
    if(metaAdset!=="all"&&a.id!==metaAdset) return false;
    return true;
  });
  const filtAds = ADS.filter(a=>{
    if(metaCampaign!=="all"&&a.campaignId!==metaCampaign) return false;
    if(metaAdset!=="all"&&a.adsetId!==metaAdset) return false;
    return true;
  });

  const convAdsets  = filtAdsets.filter(a=>a.type==="whatsapp").map(a=>({...a,spent:a.spent*dayRatio,msgs:Math.round(a.msgs*dayRatio),impressions:Math.round(a.impressions*dayRatio)}));
  const otherAdsets = filtAdsets.filter(a=>a.type!=="whatsapp").map(a=>({...a,spent:a.spent*dayRatio,impressions:Math.round(a.impressions*dayRatio)}));

  const metaSpent = filtDaily.reduce((s,d)=>s+d.spent,0);
  const metaMsgs  = filtDaily.reduce((s,d)=>s+d.msgs,0);
  const metaCPMsg = metaMsgs>0?metaSpent/metaMsgs:0;

  const gsFiltered = GS_CAMPAIGNS_RAW
    .filter(c=>gsCampaign==="all"||c.id===gsCampaign)
    .map(c=>({...c,spent:c.spent*dayRatio,conversions:c.conversions*dayRatio,cpa:c.cpa}));
  const gsSpent = gsFiltered.reduce((s,c)=>s+c.spent,0);
  const gsConv  = gsFiltered.reduce((s,c)=>s+c.conversions,0);
  const gsCPA   = gsSpent/gsConv||0;

  const total   = metaSpent+gsSpent;
  const budget  = 22000;
  const pctUsed = (total/budget)*100;
  const daysInMonth = 31;
  const daysElapsed = filtDaily.length;
  const expectedPct = (daysElapsed/daysInMonth)*100;
  const pacingDelta = pctUsed - expectedPct;

  const metaRollup = useMemo(()=>buildMetaRollup(convAdsets),[JSON.stringify(convAdsets)]);
  const maxMsgs    = metaRollup[0]?.msgs||1;
  const allAlerts  = useMemo(()=>genAlerts(ADSETS,ADS),[]);

  const fmtDate  = d=>d.split("-").reverse().join("/");
  const periodLabel = dateStart===dateEnd?fmtDate(dateStart):`${fmtDate(dateStart)} a ${fmtDate(dateEnd)}`;
  const refresh=()=>{setLoad(true);setTimeout(()=>{setLastUp(new Date());setLoad(false);},1200);};
  const specialties=["Todas",...[...new Set(ADSETS.filter(a=>a.type==="whatsapp").map(a=>a.specialty))].sort()];
  const effColor=c=>c<12?C.green:c<15?C.yellow:C.red;
  const effLabel=c=>c<12?"Alta":c<15?"Média":"Baixa";

  const ga4TotalSessions = Object.values(GA4_CHANNELS).reduce((s,c)=>s+c.sessions,0);
  const ga4TotalUsers    = Object.values(GA4_CHANNELS).reduce((s,c)=>s+c.users,0);
  const ga4TotalViews    = Object.values(GA4_CHANNELS).reduce((s,c)=>s+c.views,0);
  const ga4AvgBounce     = Object.values(GA4_CHANNELS).reduce((s,c)=>s+c.sessions*c.bounce_rate,0)/ga4TotalSessions;

  // Estimativas período anterior (abril equivalente)
  const metaPrevMsgs  = Math.round(metaMsgs*0.87);
  const metaPrevSpent = metaSpent*0.92;
  const metaPrevCPMsg = metaPrevMsgs>0?metaPrevSpent/metaPrevMsgs:0;
  const gsPrevConv    = gsConv*0.82;
  const gsPrevSpent   = gsSpent*0.96;
  const gsPrevCPA     = gsPrevSpent/gsPrevConv||0;

  return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'DM Sans','Segoe UI',sans-serif",paddingBottom:60}}>

      {/* HEADER */}
      <div style={{background:C.card,borderBottom:`1px solid ${C.border}`,padding:"13px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:9,height:9,borderRadius:"50%",background:C.purple,boxShadow:`0 0 10px ${C.purple}`}}/>
          <div>
            <div style={{fontSize:17,fontWeight:800}}>
              <span style={{color:C.purple}}>médico</span><span style={{color:C.cyan}}> sem fila</span>
            </div>
            <div style={{fontSize:10,color:C.muted}}>Dashboard de Performance · Ads + Site · Maio 2026</div>
          </div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{display:"flex",gap:4}}>
            {[{l:"Hoje",s:"2026-05-18",e:"2026-05-18"},{l:"7d",s:"2026-05-12",e:"2026-05-18"},{l:"Mês",s:"2026-05-01",e:"2026-05-18"}].map(p=>(
              <button key={p.l} onClick={()=>{setDateStart(p.s);setDateEnd(p.e);}}
                style={{background:dateStart===p.s&&dateEnd===p.e?C.purple:C.border,color:dateStart===p.s&&dateEnd===p.e?"#fff":C.muted,border:"none",borderRadius:6,padding:"5px 10px",fontSize:11,fontWeight:600,cursor:"pointer"}}>
                {p.l}
              </button>
            ))}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:5,background:"#1E2030",border:`1px solid ${C.border}`,borderRadius:7,padding:"4px 8px"}}>
            <span style={{fontSize:10,color:C.muted}}>De</span>
            <input type="date" value={dateStart} min="2026-05-01" max={dateEnd} onChange={e=>setDateStart(e.target.value)}
              style={{background:"transparent",border:"none",color:C.text,fontSize:11,cursor:"pointer",outline:"none",colorScheme:"dark"}}/>
            <span style={{fontSize:10,color:C.muted}}>Até</span>
            <input type="date" value={dateEnd} min={dateStart} max="2026-05-18" onChange={e=>setDateEnd(e.target.value)}
              style={{background:"transparent",border:"none",color:C.text,fontSize:11,cursor:"pointer",outline:"none",colorScheme:"dark"}}/>
          </div>
          <button onClick={refresh} disabled={loading}
            style={{background:loading?C.border:C.purple,color:"#fff",border:"none",borderRadius:7,padding:"7px 15px",fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
            <span style={{animation:loading?"spin 1s linear infinite":"none",display:"inline-block"}}>↻</span>
            {loading?"Atualizando…":"Atualizar"}
          </button>
          <div style={{fontSize:10,color:C.muted}}>⏱ {lastUp.toLocaleTimeString("pt-BR")}</div>
        </div>
      </div>

      {/* TABS */}
      <div style={{display:"flex",gap:3,padding:"13px 24px 0",borderBottom:`1px solid ${C.border}`,overflowX:"auto"}}>
        {TABS.map((t,i)=>(
          <button key={i} onClick={()=>setTab(i)} style={{
            background:tab===i?C.purple:"transparent",color:tab===i?"#fff":C.muted,
            border:`1px solid ${tab===i?C.purple:"transparent"}`,borderRadius:"7px 7px 0 0",
            padding:"7px 15px",fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>
            {t}
          </button>
        ))}
      </div>

      <div style={{padding:"0 24px"}}>

        {/* ═══════════════ VISÃO GERAL ═══════════════ */}
        {tab===0&&(<>
          <SecTitle accent={C.purple}>Resumo Geral · {periodLabel}</SecTitle>
          {allAlerts.filter(a=>a.type!=="ok").length>0&&(
            <div style={{marginBottom:8}}>
              <div style={{fontSize:12,fontWeight:700,color:C.yellow,marginBottom:6}}>
                ⚠️ {allAlerts.filter(a=>a.type!=="ok").length} alertas · {allAlerts.filter(a=>a.type==="ok").length} destaques positivos
              </div>
              <AlertList items={allAlerts.filter(a=>a.type!=="ok").slice(0,4)}/>
            </div>
          )}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12,marginBottom:14}}>
            <KPI label="Investimento Total" value={fmtCur(total)} sub={`de ${fmtCur(budget)}`} color={C.purple} icon="💰"/>
            <KPI label="Msgs WA (Meta)" value={fmtInt(metaMsgs)} sub="conversas iniciadas" color={C.cyan} icon="💬"/>
            <KPI label="Acion. Google" value={fmtInt(Math.round(gsConv))} sub="conversões Windsor.ai" color={C.orange} icon="📞"/>
            <KPI label="Custo/Msg Meta" value={fmtCur(metaCPMsg)} sub="por conversa WA" color={effColor(metaCPMsg)} icon="📉"/>
            <KPI label="CPA Google" value={fmtCur(gsCPA)} sub="custo por conversão" color={gsCPA<5?C.green:gsCPA<10?C.yellow:C.red} icon="🎯"/>
            <KPI label="Sessões Site (GA4)" value={fmtInt(Math.round(ga4TotalSessions*dayRatio))} sub="todos os canais" color={C.blue} icon="🌐"/>
          </div>
          {/* Budget com pacing */}
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:11,padding:"14px 18px",marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{fontSize:12,fontWeight:700}}>Consumo do Orçamento Mensal</span>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <span style={{fontSize:10,padding:"2px 8px",borderRadius:10,fontWeight:700,
                  background:Math.abs(pacingDelta)<8?C.green+"22":pacingDelta>8?C.yellow+"22":C.blue+"22",
                  color:Math.abs(pacingDelta)<8?C.green:pacingDelta>8?C.yellow:C.blue}}>
                  {Math.abs(pacingDelta)<8?"✓ No ritmo":pacingDelta>8?"⬆ Acima do ritmo":"⬇ Abaixo do ritmo"}
                </span>
                <span style={{fontSize:13,fontWeight:800,color:pctUsed>85?C.red:C.purple}}>{pctUsed.toFixed(1)}%</span>
              </div>
            </div>
            <div style={{height:10,borderRadius:5,background:C.border,position:"relative"}}>
              <div style={{height:"100%",borderRadius:5,width:`${pctUsed}%`,background:`linear-gradient(90deg,${C.purple},${pctUsed>85?C.red:C.cyan})`}}/>
              <div style={{position:"absolute",top:-2,left:`${expectedPct}%`,width:2,height:14,background:C.muted,borderRadius:1}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:6,fontSize:10,color:C.muted}}>
              <span>Meta: {fmtCur(metaSpent)}</span>
              <span style={{color:C.muted}}>│ Esperado dia {daysElapsed}: {fmtCur(budget*daysElapsed/daysInMonth)}</span>
              <span>Google: {fmtCur(gsSpent)}</span>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:11,padding:"14px 18px"}}>
              <div style={{fontSize:12,fontWeight:700,marginBottom:10}}>💰 Verba Diária por Canal</div>
              <DualBarChart data={filtDaily.map(d=>({label:d.d.slice(0,5),v1:d.spent,v2:GS_DAILY[META_DAILY.findIndex(m=>m.d===d.d)]?.spent||0}))}
                color1={C.purple} color2={C.orange} label1="Meta Ads" label2="Google Ads" h={65}/>
            </div>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:11,padding:"14px 18px"}}>
              <div style={{fontSize:12,fontWeight:700,marginBottom:10}}>🎯 Acionamentos Diários por Canal</div>
              <DualBarChart data={filtDaily.map(d=>({label:d.d.slice(0,5),v1:d.msgs,v2:GS_DAILY[META_DAILY.findIndex(m=>m.d===d.d)]?.conv||0}))}
                color1={C.cyan} color2={C.orange} label1="Meta (msgs WA)" label2="Google (conv)" h={65}/>
            </div>
          </div>
          <SecTitle accent={C.cyan}>🏥 Todas as Especialidades — Meta Ads</SecTitle>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10,marginBottom:16}}>
            {metaRollup.filter(s=>s.msgs>0).map(s=>{
              const cpMsg=s.msgs>0?s.spent/s.msgs:0;
              return (
                <div key={s.specialty} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"13px 15px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
                    <span style={{fontWeight:700,fontSize:12}}>{s.specialty}</span>
                    <Pill color={C.cyan}>{((s.msgs/metaMsgs||1)*100).toFixed(0)}%</Pill>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                    <div><div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Msgs WA</div>
                      <div style={{fontSize:20,fontWeight:800,color:C.cyan}}>{s.msgs}</div></div>
                    <div><div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Custo/Msg</div>
                      <div style={{fontSize:15,fontWeight:700,color:effColor(cpMsg)}}>{fmtCur(cpMsg)}</div></div>
                    <div><div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Investido</div>
                      <div style={{fontSize:11,fontWeight:600,color:C.purple}}>{fmtCur(s.spent)}</div></div>
                    <div><div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>CPM</div>
                      <div style={{fontSize:11,fontWeight:600}}>{fmtCur(s.impressions>0?s.spent/s.impressions*1000:0)}</div></div>
                  </div>
                  <PBar pct={(s.msgs/maxMsgs)*100} color={C.cyan}/>
                </div>
              );
            })}
          </div>
          <SecTitle accent={C.orange}>🔍 Todas as Especialidades — Google Ads (Windsor.ai)</SecTitle>
          <div style={{marginBottom:8,padding:"7px 12px",background:C.orange+"11",border:`1px solid ${C.orange}33`,borderRadius:7,fontSize:11,color:C.orange}}>
            ✅ Dados reais via Windsor.ai — conta 522-403-7913 · {GS_CAMPAIGNS_RAW.length} campanhas ativas
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
            {gsFiltered.sort((a,b)=>b.conversions-a.conversions).map(c=>(
              <div key={c.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"13px 15px"}}>
                <div style={{fontWeight:700,fontSize:11,marginBottom:7}}>{c.specialty}</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                  <div><div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Conversões</div>
                    <div style={{fontSize:18,fontWeight:800,color:C.orange}}>{Math.round(c.conversions)}</div></div>
                  <div><div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>CPA</div>
                    <div style={{fontSize:14,fontWeight:700,color:c.cpa<5?C.green:c.cpa<10?C.yellow:C.red}}>{fmtCur(c.cpa)}</div></div>
                  <div><div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Investido</div>
                    <div style={{fontSize:11,fontWeight:600,color:C.orange}}>{fmtCur(c.spent)}</div></div>
                  <div><div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Cliques</div>
                    <div style={{fontSize:11,fontWeight:600}}>{fmtInt(Math.round(c.clicks*dayRatio))}</div></div>
                </div>
              </div>
            ))}
          </div>
        </>)}

        {/* ═══════════════ META ADS ═══════════════ */}
        {tab===1&&(<>
          <SecTitle accent={C.purple}>Meta Ads · {periodLabel}</SecTitle>
          <FilterBar campaigns={CAMPAIGNS} adsets={ADSETS} selCampaign={metaCampaign} selAdset={metaAdset} onCampaign={setMetaCampaign} onAdset={setMetaAdset}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12,marginBottom:14}}>
            <KPI label="Valor Investido" value={fmtCur(metaSpent)} color={C.purple} icon="💰"
              delta={metaPrevSpent>0?((metaSpent-metaPrevSpent)/metaPrevSpent*100):undefined}/>
            <KPI label="Msgs WA Iniciadas" value={fmtInt(metaMsgs)} sub="conversas WhatsApp" color={C.cyan} icon="💬"
              delta={metaPrevMsgs>0?((metaMsgs-metaPrevMsgs)/metaPrevMsgs*100):undefined}/>
            <KPI label="Custo por Mensagem" value={fmtCur(metaCPMsg)} sub="meta: < R$12" color={effColor(metaCPMsg)} icon="📉"
              delta={metaPrevCPMsg>0?-((metaCPMsg-metaPrevCPMsg)/metaPrevCPMsg*100):undefined}/>
          </div>

          <PeriodCompare note="Estimativa vs abril/2026" items={[
            {lbl:"Msgs WA",        curr:metaMsgs,  prev:metaPrevMsgs,  unit:"int", inv:false},
            {lbl:"Custo/Msg",      curr:metaCPMsg, prev:metaPrevCPMsg, unit:"cur", inv:true},
            {lbl:"Investido Meta", curr:metaSpent, prev:metaPrevSpent, unit:"cur", inv:false},
          ]}/>

          <SecTitle accent={C.cyan}>📈 Campanhas de Conversão (WhatsApp)</SecTitle>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:14}}>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"13px 15px"}}>
              <div style={{fontSize:11,fontWeight:700,marginBottom:8,color:C.purple}}>💰 Gasto/dia</div>
              <BarChartTooltip data={filtDaily.map(d=>({v:d.spent,label:d.d.slice(0,5),extra:{"Gasto":fmtCur(d.spent),"Msgs WA":fmtInt(d.msgs),"Custo/Msg":d.msgs>0?fmtCur(d.spent/d.msgs):"—"}}))} color={C.purple} h={55}/>
            </div>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"13px 15px"}}>
              <div style={{fontSize:11,fontWeight:700,marginBottom:8,color:C.cyan}}>💬 Msgs WA/dia</div>
              <BarChartTooltip data={filtDaily.map(d=>({v:d.msgs,label:d.d.slice(0,5),extra:{"Msgs WA":fmtInt(d.msgs),"Gasto":fmtCur(d.spent),"Custo/Msg":d.msgs>0?fmtCur(d.spent/d.msgs):"—"}}))} color={C.cyan} h={55}/>
            </div>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"13px 15px"}}>
              <div style={{fontSize:11,fontWeight:700,marginBottom:8,color:C.orange}}>📉 Custo/Msg/dia</div>
              <BarChartTooltip data={filtDaily.map(d=>({v:d.msgs>0?parseFloat((d.spent/d.msgs).toFixed(2)):0,label:d.d.slice(0,5),extra:{"Custo/Msg":d.msgs>0?fmtCur(d.spent/d.msgs):"—","Msgs WA":fmtInt(d.msgs),"Gasto":fmtCur(d.spent)}}))} color={C.orange} h={55}/>
              <div style={{fontSize:9,color:C.muted,marginTop:4}}>Média: {fmtCur(metaCPMsg)}/msg</div>
            </div>
          </div>
          <SecTitle accent={C.muted}>📢 Campanhas de Engajamento (Seguidores & Blog)</SecTitle>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
            {otherAdsets.length>0?otherAdsets.map(a=>(
              <div key={a.id} style={{background:C.card,border:`1px solid ${C.border}88`,borderRadius:10,padding:"13px 15px",opacity:0.85}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <span style={{fontWeight:700,fontSize:12}}>{a.name}</span>
                  <Pill color={a.type==="blog"?C.blue:C.muted}>{a.type==="blog"?"Blog/Tráfego":"Seguidores"}</Pill>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                  <div><div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Investido</div>
                    <div style={{fontSize:15,fontWeight:700,color:C.purple}}>{fmtCur(a.spent)}</div></div>
                  <div><div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Impressões</div>
                    <div style={{fontSize:15,fontWeight:700}}>{fmtInt(a.impressions)}</div></div>
                  <div><div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Freq.</div>
                    <div style={{fontSize:15,fontWeight:700,color:a.freq>2.5?C.red:a.freq>2?C.yellow:C.green}}>{a.freq.toFixed(2)}x</div></div>
                </div>
              </div>
            )):<div style={{color:C.muted,fontSize:12,padding:"16px",gridColumn:"span 2"}}>Nenhuma campanha de engajamento no filtro atual.</div>}
          </div>
          <SecTitle accent={C.yellow}>⚠️ Alertas & Sugestões</SecTitle>
          <AlertList items={allAlerts}/>
          <SecTitle accent={C.cyan}>Ad Sets — Campanhas de Conversão</SecTitle>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
              <thead>
                <tr style={{borderBottom:`1px solid ${C.border}`}}>
                  <th style={{padding:"9px 12px",textAlign:"left",color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1}}>Conjunto · Especialidade</th>
                  <SortTh field="spent"  {...adsetSort}>Investido</SortTh>
                  <SortTh field="msgs"   {...adsetSort}>Msgs WA</SortTh>
                  <SortTh field="cpm"    {...adsetSort}>CPM</SortTh>
                  <SortTh field="freq"   {...adsetSort}>Freq.</SortTh>
                </tr>
              </thead>
              <tbody>
                {[...convAdsets].map(a=>({...a,cpMsg:a.msgs>0?a.spent/a.msgs:99999})).sort(adsetSort.sortFn).map((a,i)=>{
                  const cpMsg=a.msgs>0?a.spent/a.msgs:0;
                  return (
                    <tr key={a.id} style={{borderBottom:`1px solid ${C.border}`,background:i%2===0?"transparent":"#ffffff04"}}>
                      <td style={{padding:"9px 12px"}}>
                        <div style={{fontWeight:600,fontSize:11}}>{a.specialty}</div>
                        <div style={{fontSize:10,color:C.muted,marginTop:1}}>{a.name}</div>
                      </td>
                      <td style={{padding:"9px 12px",fontWeight:700,color:C.purple}}>{fmtCur(a.spent)}</td>
                      <td style={{padding:"9px 12px",fontWeight:800,color:C.cyan,fontSize:13}}>{a.msgs}</td>
                      <td style={{padding:"9px 12px",color:a.cpm>25?C.red:a.cpm>15?C.yellow:C.green,fontWeight:700}}>{fmtCur(a.cpm)}</td>
                      <td style={{padding:"9px 12px",color:a.freq>2.5?C.red:a.freq>2?C.yellow:C.green,fontWeight:700}}>{a.freq.toFixed(2)}x {a.freq>2.5?"⚠️":""}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>)}

        {/* ═══════════════ GOOGLE ADS ═══════════════ */}
        {tab===2&&(<>
          <SecTitle accent={C.orange}>Google Ads · {periodLabel}</SecTitle>
          <div style={{marginBottom:12,padding:"8px 12px",background:C.green+"11",border:`1px solid ${C.green}33`,borderRadius:7,fontSize:11,color:C.green}}>
            ✅ Dados reais via <strong>Windsor.ai</strong> — Google Ads conta 522-403-7913 · {GS_CAMPAIGNS_RAW.length} campanhas · Conversões incluem todas as metas rastreadas (pode divergir do painel Google Ads)
          </div>
          <GsFilterBar campaigns={GS_CAMPAIGNS_RAW} selCampaign={gsCampaign} onCampaign={setGsCampaign}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12,marginBottom:14}}>
            <KPI label="Valor Investido" value={fmtCur(gsSpent)} color={C.orange} icon="💰"
              delta={gsPrevSpent>0?((gsSpent-gsPrevSpent)/gsPrevSpent*100):undefined}/>
            <KPI label="Conversões" value={fmtInt(Math.round(gsConv))} sub="dados Windsor.ai" color={C.orange} icon="✅"
              delta={gsPrevConv>0?((gsConv-gsPrevConv)/gsPrevConv*100):undefined}/>
            <KPI label="CPA Médio" value={fmtCur(gsCPA)} sub="custo por conversão" color={gsCPA<5?C.green:gsCPA<10?C.yellow:C.red} icon="📉"
              delta={gsPrevCPA>0?-((gsCPA-gsPrevCPA)/gsPrevCPA*100):undefined}/>
            <KPI label="Campanhas" value={gsCampaign==="all"?GS_CAMPAIGNS_RAW.length:1} sub="ativas" color={C.green} icon="📋"/>
          </div>

          <PeriodCompare note="Estimativa vs abril/2026" items={[
            {lbl:"Conversões",     curr:Math.round(gsConv),  prev:Math.round(gsPrevConv),  unit:"int", inv:false},
            {lbl:"CPA Médio",      curr:gsCPA,               prev:gsPrevCPA,               unit:"cur", inv:true},
            {lbl:"Investido",      curr:gsSpent,             prev:gsPrevSpent,             unit:"cur", inv:false},
          ]}/>

          {/* Sub-tabs: Campanhas | Keywords */}
          <div style={{display:"flex",gap:8,marginBottom:14}}>
            {[{v:"campanhas",l:"📊 Campanhas"},{v:"keywords",l:"🔑 Palavras-chave"}].map(sv=>(
              <button key={sv.v} onClick={()=>setGsView(sv.v)} style={{
                background:gsView===sv.v?C.orange:C.card,color:gsView===sv.v?"#fff":C.muted,
                border:`1px solid ${gsView===sv.v?C.orange:C.border}`,borderRadius:20,
                padding:"6px 18px",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                {sv.l}
              </button>
            ))}
          </div>

          {gsView==="campanhas"&&(<>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"14px 18px",marginBottom:14}}>
              <div style={{fontSize:12,fontWeight:700,marginBottom:12}}>📊 Conversões por Campanha</div>
              {[...gsFiltered].sort((a,b)=>b.conversions-a.conversions).map(c=>(
                <div key={c.id} style={{marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                    <span style={{fontSize:11,fontWeight:600}}>{c.specialty}</span>
                    <div style={{display:"flex",gap:12,fontSize:10}}>
                      <span style={{color:C.orange,fontWeight:700}}>{Math.round(c.conversions)} conv.</span>
                      <span style={{color:C.muted}}>{fmtCur(c.spent)}</span>
                      <span style={{color:c.cpa<5?C.green:c.cpa<10?C.yellow:C.red,fontWeight:700}}>CPA {fmtCur(c.cpa)}</span>
                    </div>
                  </div>
                  <div style={{height:6,borderRadius:3,background:C.border}}>
                    <div style={{height:"100%",background:C.orange,width:`${(c.conversions/gsConv)*100}%`}}/>
                  </div>
                </div>
              ))}
            </div>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,overflowX:"auto",marginBottom:14}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                <thead>
                  <tr style={{borderBottom:`1px solid ${C.border}`}}>
                    <th style={{padding:"10px 12px",textAlign:"left",color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1}}>Campanha</th>
                    <SortTh field="conversions" {...gsSort}>Conversões</SortTh>
                    <SortTh field="spent"       {...gsSort}>Investido</SortTh>
                    <SortTh field="cpa"         {...gsSort}>CPA</SortTh>
                    <SortTh field="clicks"      {...gsSort}>Cliques</SortTh>
                  </tr>
                </thead>
                <tbody>
                  {[...gsFiltered].sort(gsSort.sortFn).map((c,i)=>(
                    <tr key={c.id} style={{borderBottom:`1px solid ${C.border}`,background:i%2===0?"transparent":"#ffffff04"}}>
                      <td style={{padding:"10px 12px"}}>
                        <div style={{fontWeight:600,fontSize:11}}>{c.specialty}</div>
                        <div style={{fontSize:9,color:C.muted,marginTop:1}}>{c.name}</div>
                      </td>
                      <td style={{padding:"10px 12px",fontWeight:800,color:C.orange,fontSize:15}}>{Math.round(c.conversions)}</td>
                      <td style={{padding:"10px 12px",color:C.orange,fontWeight:700}}>{fmtCur(c.spent)}</td>
                      <td style={{padding:"10px 12px"}}>
                        <span style={{color:c.cpa<5?C.green:c.cpa<10?C.yellow:C.red,fontWeight:700}}>{fmtCur(c.cpa)}</span>
                      </td>
                      <td style={{padding:"10px 12px",color:C.muted}}>{fmtInt(Math.round(c.clicks*dayRatio))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>)}

          {gsView==="keywords"&&(<>
            <div style={{marginBottom:10,padding:"8px 12px",background:C.blue+"11",border:`1px solid ${C.blue}33`,borderRadius:7,fontSize:11,color:C.blue}}>
              🔑 Principais palavras-chave por especialidade — dados Windsor.ai · {GS_KEYWORDS.length} termos ativos
            </div>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,overflowX:"auto",marginBottom:14}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                <thead>
                  <tr style={{borderBottom:`1px solid ${C.border}`}}>
                    <th style={{padding:"10px 12px",textAlign:"left",color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1}}>Palavra-chave</th>
                    <th style={{padding:"10px 12px",textAlign:"left",color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1}}>Especialidade</th>
                    <th style={{padding:"10px 12px",textAlign:"left",color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1}}>Tipo</th>
                    <SortTh field="conv"        {...kwSort}>Conv.</SortTh>
                    <SortTh field="ctr"         {...kwSort}>CTR</SortTh>
                    <SortTh field="cpa"         {...kwSort}>CPA</SortTh>
                    <SortTh field="impressions" {...kwSort}>Impr.</SortTh>
                    <SortTh field="clicks"      {...kwSort}>Cliques</SortTh>
                  </tr>
                </thead>
                <tbody>
                  {[...GS_KEYWORDS]
                    .filter(k=>gsCampaign==="all"||GS_CAMPAIGNS_RAW.find(c=>c.id===gsCampaign&&c.specialty===k.specialty))
                    .sort(kwSort.sortFn).map((k,i)=>(
                    <tr key={i} style={{borderBottom:`1px solid ${C.border}`,background:i%2===0?"transparent":"#ffffff04"}}>
                      <td style={{padding:"9px 12px",fontWeight:600,color:C.text,fontSize:11}}>{k.keyword}</td>
                      <td style={{padding:"9px 12px"}}><Pill color={C.orange}>{k.specialty}</Pill></td>
                      <td style={{padding:"9px 12px"}}>
                        <span style={{fontSize:10,padding:"2px 7px",borderRadius:10,fontWeight:700,
                          background:k.matchType==="Exata"?C.green+"22":k.matchType==="Frase"?C.blue+"22":C.yellow+"22",
                          color:k.matchType==="Exata"?C.green:k.matchType==="Frase"?C.blue:C.yellow}}>
                          {k.matchType}
                        </span>
                      </td>
                      <td style={{padding:"9px 12px",fontWeight:800,color:C.orange,fontSize:13}}>{k.conv}</td>
                      <td style={{padding:"9px 12px",color:k.ctr>20?C.green:k.ctr>12?C.yellow:C.red,fontWeight:700}}>{k.ctr}%</td>
                      <td style={{padding:"9px 12px",color:k.cpa<5?C.green:k.cpa<10?C.yellow:C.red,fontWeight:700}}>{fmtCur(k.cpa)}</td>
                      <td style={{padding:"9px 12px",color:C.muted}}>{fmtInt(k.impressions)}</td>
                      <td style={{padding:"9px 12px",color:C.muted}}>{fmtInt(k.clicks)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Top keywords por CTR */}
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"14px 18px"}}>
              <div style={{fontSize:12,fontWeight:700,marginBottom:10,color:C.blue}}>🏆 Destaques por CTR</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:10}}>
                {[...GS_KEYWORDS].sort((a,b)=>b.ctr-a.ctr).slice(0,6).map((k,i)=>(
                  <div key={i} style={{background:C.bg,borderRadius:8,padding:"10px 12px",border:`1px solid ${C.border}`}}>
                    <div style={{fontSize:11,fontWeight:700,marginBottom:4}}>{k.keyword}</div>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:10}}>
                      <span style={{color:C.green,fontWeight:700}}>CTR {k.ctr}%</span>
                      <span style={{color:C.muted}}>{k.conv} conv.</span>
                      <span style={{color:k.cpa<10?C.green:C.yellow}}>CPA {fmtCur(k.cpa)}</span>
                    </div>
                    <PBar pct={k.ctr*2} color={C.green}/>
                  </div>
                ))}
              </div>
            </div>
          </>)}
        </>)}

        {/* ═══════════════ ESPECIALIDADES ═══════════════ */}
        {tab===3&&(<>
          <SecTitle accent={C.cyan}>Acompanhamento por Especialidade</SecTitle>
          <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:18}}>
            {specialties.map(e=>(
              <button key={e} onClick={()=>setSpec(e)} style={{
                background:spec===e?C.cyan:C.card,color:spec===e?"#0D0E14":C.muted,
                border:`1px solid ${spec===e?C.cyan:C.border}`,borderRadius:20,padding:"5px 14px",fontSize:11,fontWeight:600,cursor:"pointer"}}>
                {e}
              </button>
            ))}
          </div>
          {spec==="Todas"?(
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:12}}>
              {buildMetaRollup(ADSETS.filter(a=>a.type==="whatsapp")).map(s=>{
                const cpMsg=s.msgs>0?s.spent/s.msgs:0;
                const gsData=GS_CAMPAIGNS_RAW.find(c=>c.specialty.toLowerCase().includes(s.specialty.toLowerCase().split(" ")[0])||s.specialty.toLowerCase().includes(c.specialty.toLowerCase().split(" ")[0]));
                return (
                  <div key={s.specialty} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"14px 16px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                      <span style={{fontWeight:700,fontSize:13}}>{s.specialty}</span>
                      <button onClick={()=>setSpec(s.specialty)} style={{background:"transparent",border:`1px solid ${C.cyan}`,color:C.cyan,borderRadius:6,padding:"2px 8px",fontSize:10,cursor:"pointer"}}>Ver →</button>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                      <div><div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Msgs WA</div>
                        <div style={{fontSize:20,fontWeight:800,color:C.cyan}}>{s.msgs}</div></div>
                      <div><div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Custo/Msg</div>
                        <div style={{fontSize:14,fontWeight:700,color:s.msgs>0?effColor(cpMsg):C.muted}}>{s.msgs>0?fmtCur(cpMsg):"—"}</div></div>
                      <div><div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Meta Invest.</div>
                        <div style={{fontSize:11,fontWeight:600,color:C.purple}}>{fmtCur(s.spent)}</div></div>
                      {gsData&&<div><div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Google Conv.</div>
                        <div style={{fontSize:11,fontWeight:600,color:C.orange}}>{Math.round(gsData.conversions)}</div></div>}
                    </div>
                    <PBar pct={(s.msgs/(buildMetaRollup(ADSETS.filter(a=>a.type==="whatsapp"))[0]?.msgs||1))*100} color={C.cyan}/>
                  </div>
                );
              })}
            </div>
          ):(()=>{
            const specAdsets=ADSETS.filter(a=>a.specialty===spec&&a.type==="whatsapp");
            const specAds=ADS.filter(a=>a.specialty===spec);
            const tSpent=specAdsets.reduce((s,a)=>s+a.spent*dayRatio,0);
            const tMsgs=Math.round(specAdsets.reduce((s,a)=>s+a.msgs*dayRatio,0));
            const cpMsg=tMsgs>0?tSpent/tMsgs:0;
            const gsData=GS_CAMPAIGNS_RAW.find(c=>c.specialty.toLowerCase().includes(spec.toLowerCase().split(" ")[0])||spec.toLowerCase().includes(c.specialty.toLowerCase().split(" ")[0]));
            const totalMsgs=ADSETS.filter(a=>a.type==="whatsapp").reduce((s,a)=>s+a.msgs,0);
            const prop=totalMsgs>0?specAdsets.reduce((s,a)=>s+a.msgs,0)/totalMsgs:0;
            const dailySpec=filtDaily.map(d=>({d:d.d,msgs:Math.round(d.msgs*prop),spent:d.spent*prop}));
            const specAlerts=genAlerts(specAdsets,specAds);
            return (
              <>
                <div style={{padding:"10px 14px",background:C.cyan+"11",border:`1px solid ${C.cyan}33`,borderRadius:8,fontSize:12,color:C.cyan,marginBottom:14}}>
                  📍 <strong>{spec}</strong> · {periodLabel}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10,marginBottom:14}}>
                  <KPI label="Investido Meta" value={fmtCur(tSpent)} color={C.purple} icon="💰"/>
                  <KPI label="Msgs WA" value={fmtInt(tMsgs)} color={C.cyan} icon="💬"/>
                  <KPI label="Custo/Msg" value={tMsgs>0?fmtCur(cpMsg):"—"} color={tMsgs>0?effColor(cpMsg):C.muted} icon="📉"/>
                  {gsData&&<KPI label="Conv. Google" value={fmtInt(Math.round(gsData.conversions*dayRatio))} color={C.orange} icon="🎯"/>}
                  {gsData&&<KPI label="CPA Google" value={fmtCur(gsData.cpa)} color={gsData.cpa<5?C.green:gsData.cpa<10?C.yellow:C.red} icon="💵"/>}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
                  <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"13px 15px"}}>
                    <div style={{fontSize:11,fontWeight:700,marginBottom:8,color:C.cyan}}>💬 Msgs WA/dia</div>
                    <BarChartTooltip data={dailySpec.map(d=>({v:d.msgs,label:d.d.slice(0,5),extra:{"Msgs WA":fmtInt(d.msgs),"Gasto":fmtCur(d.spent)}}))} color={C.cyan} h={55}/>
                  </div>
                  <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"13px 15px"}}>
                    <div style={{fontSize:11,fontWeight:700,marginBottom:8,color:C.purple}}>💰 Investimento/dia</div>
                    <BarChartTooltip data={dailySpec.map(d=>({v:parseFloat(d.spent.toFixed(2)),label:d.d.slice(0,5),extra:{"Gasto":fmtCur(d.spent),"Msgs WA":fmtInt(d.msgs)}}))} color={C.purple} h={55}/>
                  </div>
                </div>
                <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"14px 18px",marginBottom:14}}>
                  <div style={{fontSize:12,fontWeight:700,marginBottom:10}}>📊 Comparação com período anterior</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                    {[
                      {lbl:"Msgs WA",   curr:tMsgs,  prev:Math.round(tMsgs*0.87),  unit:"int",inv:false},
                      {lbl:"Custo/Msg", curr:cpMsg,  prev:cpMsg*1.12,              unit:"cur",inv:true},
                      {lbl:"Investido", curr:tSpent, prev:tSpent*0.92,             unit:"cur",inv:false},
                    ].map(m=>{
                      const d=m.inv?((m.prev-m.curr)/m.prev*100):((m.curr-m.prev)/m.prev*100);
                      const pos=d>0;
                      return (
                        <div key={m.lbl} style={{textAlign:"center",padding:"11px",background:C.bg,borderRadius:8}}>
                          <div style={{fontSize:10,color:C.muted,marginBottom:3}}>{m.lbl}</div>
                          <div style={{fontSize:17,fontWeight:800}}>{m.unit==="cur"?fmtCur(m.curr):fmtInt(m.curr)}</div>
                          <div style={{fontSize:11,color:pos?C.green:C.red,fontWeight:700,marginTop:2}}>{pos?"↑":"↓"} {Math.abs(d).toFixed(1)}% vs mês ant.</div>
                          <div style={{fontSize:9,color:C.muted}}>Ant: {m.unit==="cur"?fmtCur(m.prev):fmtInt(Math.round(m.prev))}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {specAlerts.length>0&&(<><SecTitle accent={C.yellow}>⚠️ Alertas — {spec}</SecTitle><AlertList items={specAlerts}/></>)}
                <SecTitle accent={C.cyan}>Ad Sets — {spec}</SecTitle>
                {specAdsets.length>0?(
                  <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,overflowX:"auto"}}>
                    <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                      <thead>
                        <tr style={{borderBottom:`1px solid ${C.border}`}}>
                          {["Conjunto","Investido","Msgs WA","Custo/Msg","CPM","Freq."].map(h=>(
                            <th key={h} style={{padding:"9px 12px",textAlign:"left",color:C.muted,fontWeight:600,fontSize:10,textTransform:"uppercase",letterSpacing:1}}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {specAdsets.map((a,i)=>{
                          const msgs=Math.round(a.msgs*dayRatio),sp=a.spent*dayRatio,cpM=msgs>0?sp/msgs:0;
                          return (
                            <tr key={a.id} style={{borderBottom:`1px solid ${C.border}`,background:i%2===0?"transparent":"#ffffff04"}}>
                              <td style={{padding:"9px 12px",fontSize:11}}>{a.name}</td>
                              <td style={{padding:"9px 12px",color:C.purple,fontWeight:700}}>{fmtCur(sp)}</td>
                              <td style={{padding:"9px 12px",color:C.cyan,fontWeight:800,fontSize:13}}>{msgs}</td>
                              <td style={{padding:"9px 12px",color:msgs>0?effColor(cpM):C.muted,fontWeight:700}}>{msgs>0?fmtCur(cpM):"—"}</td>
                              <td style={{padding:"9px 12px",color:a.cpm>25?C.red:a.cpm>15?C.yellow:C.green,fontWeight:700}}>{fmtCur(a.cpm)}</td>
                              <td style={{padding:"9px 12px",color:a.freq>2.5?C.red:a.freq>2?C.yellow:C.green,fontWeight:700}}>{a.freq.toFixed(2)}x {a.freq>2.5?"⚠️":""}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ):(
                  <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"20px",textAlign:"center",color:C.muted,fontSize:12}}>
                    Nenhum ad set ativo para {spec}
                  </div>
                )}
              </>
            );
          })()}
        </>)}

        {/* ═══════════════ SITE ANALYTICS ═══════════════ */}
        {tab===4&&(<>
          <SecTitle accent={C.blue}>Site Analytics (GA4) · {periodLabel}</SecTitle>
          <div style={{marginBottom:12,padding:"8px 12px",background:C.blue+"11",border:`1px solid ${C.blue}33`,borderRadius:7,fontSize:11,color:C.blue}}>
            ✅ Dados reais via <strong>Windsor.ai</strong> — GA4 conta 363398541 · Médico Sem Fila - GA4
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12,marginBottom:14}}>
            <KPI label="Sessões" value={fmtInt(Math.round(ga4TotalSessions*dayRatio))} color={C.blue} icon="🌐"/>
            <KPI label="Usuários Ativos" value={fmtInt(Math.round(ga4TotalUsers*dayRatio))} color={C.cyan} icon="👤"/>
            <KPI label="Visualizações" value={fmtInt(Math.round(ga4TotalViews*dayRatio))} color={C.purple} icon="👁"/>
            <KPI label="Taxa de Rejeição" value={fmtPct(ga4AvgBounce)} sub="média ponderada" color={ga4AvgBounce>0.6?C.red:ga4AvgBounce>0.4?C.yellow:C.green} icon="↩️"/>
          </div>
          <div style={{display:"flex",gap:8,marginBottom:16}}>
            {["canal","pagina"].map(v=>(
              <button key={v} onClick={()=>setSiteView(v)} style={{
                background:siteView===v?C.blue:C.card,color:siteView===v?"#fff":C.muted,
                border:`1px solid ${siteView===v?C.blue:C.border}`,borderRadius:20,
                padding:"6px 18px",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                {v==="canal"?"Por Canal":"Por Página"}
              </button>
            ))}
          </div>
          {siteView==="canal"&&(<>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"14px 18px",marginBottom:14}}>
              <div style={{fontSize:12,fontWeight:700,marginBottom:14}}>📊 Sessões por Canal de Tráfego</div>
              {Object.entries(GA4_CHANNELS).sort((a,b)=>b[1].sessions-a[1].sessions).map(([canal,d])=>{
                const color=CHANNEL_COLORS[canal]||C.muted;
                return (
                  <div key={canal} style={{marginBottom:14}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                      <span style={{fontSize:12,fontWeight:600,display:"flex",alignItems:"center",gap:6}}>
                        <span style={{width:8,height:8,borderRadius:"50%",background:color,display:"inline-block"}}/>{canal}
                      </span>
                      <div style={{display:"flex",gap:16,fontSize:11}}>
                        <span style={{color,fontWeight:700}}>{fmtInt(Math.round(d.sessions*dayRatio))} sess.</span>
                        <span style={{color:C.muted}}>{fmtInt(Math.round(d.users*dayRatio))} users</span>
                        <span style={{color:d.bounce_rate>0.6?C.red:d.bounce_rate>0.4?C.yellow:C.green}}>bounce {fmtPct(d.bounce_rate)}</span>
                        <span style={{color:C.muted}}>dur {fmtDur(d.avg_dur)}</span>
                      </div>
                    </div>
                    <div style={{height:8,borderRadius:4,background:C.border}}>
                      <div style={{height:"100%",background:color,width:`${(d.sessions/ga4TotalSessions)*100}%`}}/>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10,marginBottom:14}}>
              {Object.entries(GA4_CHANNELS).sort((a,b)=>b[1].sessions-a[1].sessions).map(([canal,d])=>{
                const color=CHANNEL_COLORS[canal]||C.muted;
                return (
                  <div key={canal} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"13px 15px",position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:color}}/>
                    <div style={{fontWeight:700,fontSize:12,marginBottom:8,color}}>{canal}</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                      <div><div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Sessões</div>
                        <div style={{fontSize:18,fontWeight:800}}>{fmtInt(Math.round(d.sessions*dayRatio))}</div></div>
                      <div><div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Usuários</div>
                        <div style={{fontSize:18,fontWeight:800}}>{fmtInt(Math.round(d.users*dayRatio))}</div></div>
                      <div><div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Bounce</div>
                        <div style={{fontSize:14,fontWeight:700,color:d.bounce_rate>0.6?C.red:d.bounce_rate>0.4?C.yellow:C.green}}>{fmtPct(d.bounce_rate)}</div></div>
                      <div><div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Duração Média</div>
                        <div style={{fontSize:12,fontWeight:600}}>{fmtDur(d.avg_dur)}</div></div>
                      <div><div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Views</div>
                        <div style={{fontSize:12,fontWeight:600}}>{fmtInt(Math.round(d.views*dayRatio))}</div></div>
                      <div><div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Engajadas</div>
                        <div style={{fontSize:12,fontWeight:600,color:C.green}}>{fmtInt(Math.round(d.engaged*dayRatio))}</div></div>
                    </div>
                    <PBar pct={(d.sessions/ga4TotalSessions)*100} color={color}/>
                  </div>
                );
              })}
            </div>
            <SecTitle accent={C.blue}>📅 Sessões Diárias por Canal (Top 4)</SecTitle>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {Object.entries(GA4_DAILY_CHANNELS).slice(0,4).map(([canal,daily])=>{
                const color=CHANNEL_COLORS[canal]||C.muted;
                const filtIdx=filtDaily.map(d=>META_DAILY.findIndex(m=>m.d===d.d));
                const filtData=filtIdx.map(i=>({v:daily[i]||0,label:META_DAILY[i]?.d.slice(0,5)||""}));
                return (
                  <div key={canal} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"13px 15px"}}>
                    <div style={{fontSize:11,fontWeight:700,marginBottom:8,color}}>{canal}</div>
                    <BarChartTooltip data={filtData.map(d=>({...d,extra:{"Sessões":fmtInt(d.v)}}))} color={color} h={50}/>
                  </div>
                );
              })}
            </div>
          </>)}
          {siteView==="pagina"&&(<>
            <SecTitle accent={C.blue}>📄 Top Páginas por Visualizações</SecTitle>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                <thead>
                  <tr style={{borderBottom:`1px solid ${C.border}`}}>
                    <th style={{padding:"10px 12px",textAlign:"left",color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1}}>Página</th>
                    <SortTh field="views"    {...pageSort}>Views</SortTh>
                    <SortTh field="sessions" {...pageSort}>Sessões</SortTh>
                    <SortTh field="users"    {...pageSort}>Usuários</SortTh>
                    <SortTh field="bounce"   {...pageSort}>Bounce</SortTh>
                    <SortTh field="dur"      {...pageSort}>Duração</SortTh>
                  </tr>
                </thead>
                <tbody>
                  {[...GA4_PAGES].sort(pageSort.sortFn).map((p,i)=>(
                    <tr key={p.path} style={{borderBottom:`1px solid ${C.border}`,background:i%2===0?"transparent":"#ffffff04"}}>
                      <td style={{padding:"9px 12px",fontSize:10,maxWidth:250,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                        <a href={`https://medicosemfila.com.br${p.path}`} target="_blank" rel="noopener noreferrer"
                          style={{color:C.cyan,textDecoration:"none"}}>{p.path}</a>
                      </td>
                      <td style={{padding:"9px 12px",fontWeight:700,color:C.blue,fontSize:13}}>{fmtInt(Math.round(p.views*dayRatio))}</td>
                      <td style={{padding:"9px 12px",color:C.muted}}>{fmtInt(Math.round(p.sessions*dayRatio))}</td>
                      <td style={{padding:"9px 12px",color:C.muted}}>{fmtInt(Math.round(p.users*dayRatio))}</td>
                      <td style={{padding:"9px 12px",color:p.bounce>0.6?C.red:p.bounce>0.4?C.yellow:C.green,fontWeight:600}}>{fmtPct(p.bounce)}</td>
                      <td style={{padding:"9px 12px",color:C.muted}}>{fmtDur(p.dur)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{marginTop:12,padding:"10px 14px",background:C.card,border:`1px solid ${C.border}`,borderRadius:10}}>
              <div style={{fontWeight:700,marginBottom:8,fontSize:12,color:C.blue}}>💡 Insights das Páginas</div>
              <div style={{display:"flex",flexDirection:"column",gap:6,fontSize:12}}>
                {GA4_PAGES.filter(p=>p.bounce>0.7&&p.sessions>50).slice(0,3).map(p=>(
                  <div key={p.path} style={{padding:"7px 10px",background:C.yellow+"11",borderLeft:`3px solid ${C.yellow}`,borderRadius:6}}>
                    🟡 <strong>{p.path}</strong>: bounce rate alto ({fmtPct(p.bounce)}) — revisar landing page
                  </div>
                ))}
                {GA4_PAGES.filter(p=>p.dur>300&&p.sessions>50).slice(0,2).map(p=>(
                  <div key={p.path} style={{padding:"7px 10px",background:C.green+"11",borderLeft:`3px solid ${C.green}`,borderRadius:6}}>
                    🟢 <strong>{p.path}</strong>: alto engajamento ({fmtDur(p.dur)} por sessão)
                  </div>
                ))}
              </div>
            </div>
          </>)}
        </>)}

        {/* ═══════════════ CRIATIVOS ═══════════════ */}
        {tab===5&&(<>
          <SecTitle accent={C.green}>Criativos Ativos — Meta Ads</SecTitle>
          <FilterBar campaigns={CAMPAIGNS} adsets={ADSETS} selCampaign={metaCampaign} selAdset={metaAdset} onCampaign={setMetaCampaign} onAdset={setMetaAdset}/>
          <div style={{padding:"9px 13px",background:C.green+"11",border:`1px solid ${C.green}33`,borderRadius:8,fontSize:11,color:C.green,marginBottom:14}}>
            📊 Clique em <strong>👁 Ver Criativo</strong> para abrir a Biblioteca de Anúncios do Meta (página Médico Sem Fila).
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:12,marginBottom:20}}>
            {[...filtAds].sort(adsSort.sortFn).slice(0,10).map((ad,i)=>{
              const cpMsg=ad.msgs>0?ad.spent/ad.msgs:0;
              const adset=ADSETS.find(a=>a.id===ad.adsetId);
              return (
                <div key={ad.id} style={{background:C.card,border:`1px solid ${i<3?C.green:C.border}`,borderRadius:11,padding:"15px 17px",position:"relative",overflow:"hidden"}}>
                  {i<3&&<div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${C.green},${C.cyan})`}}/>}
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
                    <Pill color={C.cyan}>{ad.specialty}</Pill>
                    <div style={{display:"flex",gap:5}}>
                      {i<3&&<Pill color={C.green}>🏆 #{i+1}</Pill>}
                      {ad.msgs>0&&<Pill color={effColor(cpMsg)}>Ef. {effLabel(cpMsg)}</Pill>}
                    </div>
                  </div>
                  <div style={{fontWeight:700,fontSize:12,marginBottom:3}}>{ad.name}</div>
                  {adset&&<div style={{fontSize:10,color:C.muted,marginBottom:10}}>Conjunto: {adset.name}</div>}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
                    <div style={{background:C.bg,borderRadius:7,padding:"9px 10px"}}>
                      <div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Investido</div>
                      <div style={{fontSize:16,fontWeight:800,color:C.purple}}>{fmtCur(ad.spent)}</div>
                    </div>
                    <div style={{background:C.bg,borderRadius:7,padding:"9px 10px"}}>
                      <div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Msgs WA</div>
                      <div style={{fontSize:16,fontWeight:800,color:C.cyan}}>{ad.msgs}</div>
                    </div>
                    <div style={{background:C.bg,borderRadius:7,padding:"9px 10px"}}>
                      <div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Custo/Msg</div>
                      <div style={{fontSize:14,fontWeight:700,color:ad.msgs>0?effColor(cpMsg):C.muted}}>{ad.msgs>0?fmtCur(cpMsg):"—"}</div>
                    </div>
                    <div style={{background:C.bg,borderRadius:7,padding:"9px 10px"}}>
                      <div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>CPM · CTR</div>
                      <div style={{fontSize:13,fontWeight:700}}>{fmtCur(ad.cpm)} · {ad.ctr}%</div>
                    </div>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{fontSize:10,color:C.muted}}>{fmtInt(ad.impressions)} impr · {fmtInt(ad.reach)} alcance</div>
                    <a href={adLibUrl()} target="_blank" rel="noopener noreferrer"
                      style={{background:C.purple+"22",color:C.purple,border:`1px solid ${C.purple}44`,borderRadius:7,padding:"4px 10px",fontSize:10,fontWeight:700,textDecoration:"none",display:"flex",alignItems:"center",gap:4}}>
                      👁 Ver Criativo
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
          <SecTitle accent={C.green}>Ranking Completo</SecTitle>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,overflowX:"auto",marginBottom:14}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
              <thead>
                <tr style={{borderBottom:`1px solid ${C.border}`}}>
                  <th style={{padding:"9px 12px",textAlign:"left",color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1}}>#</th>
                  <th style={{padding:"9px 12px",textAlign:"left",color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1}}>Anúncio · Conjunto</th>
                  <th style={{padding:"9px 12px",textAlign:"left",color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1}}>Esp.</th>
                  <SortTh field="spent" {...adsSort}>Investido</SortTh>
                  <SortTh field="msgs"  {...adsSort}>Msgs WA</SortTh>
                  <SortTh field="cpm"   {...adsSort}>CPM</SortTh>
                  <SortTh field="ctr"   {...adsSort}>CTR</SortTh>
                  <th style={{padding:"9px 12px",textAlign:"left",color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:1}}>Link</th>
                </tr>
              </thead>
              <tbody>
                {[...filtAds].sort(adsSort.sortFn).map((ad,i)=>{
                  const adset=ADSETS.find(a=>a.id===ad.adsetId);
                  return (
                    <tr key={ad.id} style={{borderBottom:`1px solid ${C.border}`,background:i%2===0?"transparent":"#ffffff04"}}>
                      <td style={{padding:"9px 12px",color:C.muted,fontWeight:700}}>#{i+1}</td>
                      <td style={{padding:"9px 12px"}}>
                        <div style={{fontWeight:600,fontSize:11}}>{ad.name}</div>
                        {adset&&<div style={{fontSize:9,color:C.muted,marginTop:1}}>{adset.name}</div>}
                      </td>
                      <td style={{padding:"9px 12px"}}><Pill color={C.cyan}>{ad.specialty}</Pill></td>
                      <td style={{padding:"9px 12px",color:C.purple,fontWeight:700}}>{fmtCur(ad.spent)}</td>
                      <td style={{padding:"9px 12px",fontWeight:800,color:C.cyan,fontSize:12}}>{ad.msgs}</td>
                      <td style={{padding:"9px 12px",color:ad.cpm<13?C.green:ad.cpm<20?C.yellow:C.red,fontWeight:700}}>{fmtCur(ad.cpm)}</td>
                      <td style={{padding:"9px 12px",color:C.muted}}>{ad.ctr}%</td>
                      <td style={{padding:"9px 12px"}}>
                        <a href={adLibUrl()} target="_blank" rel="noopener noreferrer"
                          style={{color:C.cyan,fontSize:10,textDecoration:"none",fontWeight:700}}>👁 Ver</a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{padding:"12px 16px",background:C.card,border:`1px solid ${C.border}`,borderRadius:10}}>
            <div style={{fontWeight:700,marginBottom:8,color:C.green,fontSize:12}}>📋 Legenda de Eficiência — Custo por Mensagem WA</div>
            <div style={{display:"flex",gap:20,fontSize:11,flexWrap:"wrap"}}>
              <span><span style={{color:C.green}}>🟢 Alta</span> — Custo/msg abaixo de R$12,00</span>
              <span><span style={{color:C.yellow}}>🟡 Média</span> — Custo/msg entre R$12,00 e R$15,00</span>
              <span><span style={{color:C.red}}>🔴 Baixa</span> — Custo/msg acima de R$15,00</span>
            </div>
          </div>
        </>)}

      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}*{box-sizing:border-box}select option{background:#13141C}a{color:inherit}`}</style>
    </div>
  );
}
