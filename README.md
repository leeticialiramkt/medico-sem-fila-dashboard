# 📊 Médico Sem Fila — Dashboard de Performance

Dashboard de acompanhamento de métricas de **Meta Ads** e **Google Ads** para o cliente Médico Sem Fila.

## Funcionalidades

- **Visão Geral** — KPIs consolidados, consumo de orçamento, split por plataforma
- **Meta Ads** — Campanhas e Ad Sets ativos com métricas reais via API
- **Google Ads** — Conversas por especialidade via Google Sheets
- **Especialidades** — Acionamentos por especialidade médica (visão para reunião de segunda)
- **Criativos** — Ranking por CPM, análise de eficiência por anúncio
- Seletor de período de visualização
- Botão de atualização manual

## Stack

- React 18 + Vite
- Dados Meta Ads via Meta Ads API
- Dados Google Ads via Google Sheets

## Instalação local

```bash
npm install
npm run dev
```

## Deploy na Vercel

```bash
npm install -g vercel
vercel --prod
```

Ou conecte o repositório diretamente no [dashboard da Vercel](https://vercel.com).

## Atualização automática (Vercel Cron)

Adicione ao `vercel.json` para atualizar toda manhã às 8h:

```json
{
  "crons": [{ "path": "/api/refresh", "schedule": "0 8 * * 1-6" }]
}
```

---

Desenvolvido pela **Agência Incandescente** para Médico Sem Fila.
