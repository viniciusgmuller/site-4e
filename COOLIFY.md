# Deploy — 4E Gestão (site-4e)

Site institucional da **4E Consultoria em Educação**. Site **estático**
(Eleventy + Decap CMS em `/admin`), servido por nginx.

## Onde está no ar

- **Coolify do Duck:** `https://app.duckstudio.design` (servidor DuckServer, IP `31.97.85.63`).
- **App:** `4e-site` — uuid `ag0gggkogccksk8sg4kgwsk0`.
- **Repo:** `duck-design-studio/site-4e` (branch `main`). Push na `main` → deploy automático.
- **Build:** `nixpacks` (build `npm run build` do Eleventy → estático servido por nginx,
  porta 80). Config nginx custom no app (try_files + 404/50x).

## Domínios

- **Oficial (canônico): `https://4egestao.com`** + `https://www.4egestao.com`.
- Provisório (legado, a aposentar): `https://4e.germanomuller.com`.

Os 3 estão no campo **Domains** do app. O canônico é o primeiro da lista.

## DNS (Registro.br / onde o domínio estiver)

Apontar pro servidor do Duck:

| Tipo | Nome | Valor |
|------|------|-------|
| A | `@` (4egestao.com) | `31.97.85.63` |
| A | `www` | `31.97.85.63` |

Sem proxy laranja se for Cloudflare. Depois que `dig +short 4egestao.com` devolver
`31.97.85.63`, dar **um redeploy** no Coolify pro Traefik emitir o certificado HTTPS
(Let's Encrypt) e passar a rotear o domínio oficial.

## Trocar/redeployar (receita)

1. DNS apontando pro `31.97.85.63` (conferir com `dig +short`).
2. Coolify → app `4e-site` → **Redeploy** (ou `GET /api/v1/deploy?uuid=ag0gggkogccksk8sg4kgwsk0`).
3. Cert HTTPS é automático assim que o DNS resolve.

App **nixpacks/estático** (não é docker-compose), então mexer no domínio pela **API**
é seguro (o cuidado de "só pelo painel" vale só pros apps docker-compose, tipo o connection).
