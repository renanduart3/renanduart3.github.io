# AI-Powered Developer Portfolio

A modern, high-performance portfolio for developers, featuring prompt-driven portfolio generation from LinkedIn or PDF resumes, built with **React**, **Vite**, and **Tailwind CSS**.

![Portfolio Preview](https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=2000)

## 🚀 Features

- **CV Import Prompt**: Generate a portfolio skeleton from a CV or LinkedIn input using a ready-made prompt.
- **Dynamic Articles**: Support for internal Markdown-based articles and external blog links.
- **Direct Deep Linking**: Internal articles have SEO-friendly slugs and can be accessed directly (e.g., `yoursite.com/articles/slug`).
- **Full Localization**: Toggle between English (EN) and Portuguese (PT) with a single click.
- **ATS-Ready PDF Generation**: Export your portfolio data into a professional, ATS-friendly HTML/PDF resume.
- **Responsive Design**: Ultra-dark "Cyberpunk" aesthetic optimized for all devices.
- **Pagination**: Organized display of Experience, Projects, Education, and Certificates.

## 🛠️ Tech Stack

- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS (+ Typography plugin)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Routing**: React Router Dom

## ⚙️ Setup & Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the photo upload API (required for avatar upload)**:
  ```bash
  npm run dev:api
  ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 📝 Customization

Most of the application data is centralized in `src/constants.ts`. You can manually edit this file to change:
- Personal profile information.
- Experience and Projects.
- Social media links.
- Skills and Competencies.

## 🖼️ Profile Photo Upload

- Click the small upload button on the profile avatar.
- Accepted formats: `.jpg`, `.jpeg`, `.png`.
- The backend crops to a centered square (`512x512`) and saves at `public/cv-imported/profile-photo.jpg`.
- This file is inside the project and can be committed to Git, so the same photo is published on GitHub Pages.

## 🤖 Fluxo IA Local (oficial)

Este projeto agora usa fluxo local guiado por assistente de IA (Copilot, Cursor, Claude Code, Antigravity etc.).

### Como funciona

1. Coloque os arquivos do curriculo na pasta `src/cv-imported` (ex.: `Profile.pdf`).
2. Abra o projeto no seu assistente local.
3. Cole o prompt abaixo exatamente como esta.
4. A IA deve ler os arquivos em `src/cv-imported` e editar **diretamente** o `src/constants.ts`.
5. Rode a aplicacao e valide os dados.
6. Gere o CV por download (HTML/Markdown) na UI.
7. Faça build e publique no GitHub Pages.

### Regras de preenchimento visual

- Quando algum campo ainda não tiver dado real, prefira preencher com placeholder curto e visualmente coerente em vez de deixar a área vazia.
- Para a sidebar, o campo `about` deve ser resumido para no máximo 200 caracteres.
- Os níveis de idioma devem seguir CEFR, por exemplo `Native` para português e `B2` para inglês.
- As seções de projetos e artigos podem ser ligadas ou desligadas por meio de `DEFAULT_PORTFOLIO.sections.projects` e `DEFAULT_PORTFOLIO.sections.articles`.

### Prompt exato para usar na IA

```text
Voce esta trabalhando neste repositorio e deve preparar o portfolio com base no curriculo da pasta src/cv-imported.

Objetivo:
- Ler todos os arquivos de src/cv-imported (prioridade para Profile.pdf).
- Extrair dados reais do curriculo.
- Atualizar SOMENTE o objeto DEFAULT_PORTFOLIO em src/constants.ts.

Regras obrigatorias:
- Nao use API externa.
- Nao invente dados. Se nao existir informacao, use string vazia "" ou array vazio [].
- Mantenha TRANSLATIONS intacto.
- Preserve o schema de src/types.ts.
- Use ids estaveis e unicos, por exemplo: exp-1, proj-1, edu-1, cert-1, article-1.
- Nao criar novos arquivos para os dados.
- Nao alterar o layout do app.

Mapeamento esperado em DEFAULT_PORTFOLIO:
- profile: nome, titulo, resumo, email, localizacao, linkedin/github/instagram/twitter, linguas, hobbies, skills.
- experience: experiencias profissionais em ordem da mais recente para a mais antiga.
- projects: projetos (se existirem no curriculo; se nao, []).
- education: formacao academica.
- certificates: certificacoes/cursos.
- articles: artigos/publicacoes (se nao houver, []).

Apos editar src/constants.ts:
1) Rode npm run lint
2) Rode npm run build
3) Se houver erro de tipos, corrija ate passar.


No final, me mostre um resumo curto do que foi preenchido em cada secao.
```

### Manifests e conteúdo local (projects / articles)

Para que o app mostre projetos e artigos locais, o assistente local deve também gerar manifestos e arquivos markdown em `public/`:

- `public/projects/index.json`: lista de objetos com campos como `file` (ex.: `projeto1.md`), `title`, `title_en`, `description`, `description_en`, `tech`, `image`.
- `public/projects/*.md`: arquivos markdown com a versão em português do conteúdo do projeto (opcional colocar traduções no manifesto).
- `public/articles/index.json`: lista de artigos; para artigos internos inclua `file` (ex.: `article1.md`) e opcionalmente `content_en` / `title_en` / `description_en`. Para artigos externos, defina `type: "external"` e `url: "https://..."`.

O repositório já inclui exemplos em `public/projects` e `public/articles` para você usar como referência.

Regras rápidas para a IA local:
- Produza campos bilíngues sempre que possível (`field_en` ao lado do campo base) ou um objeto `translations` com chaves `pt`/`en`.
- Resuma `profile.about` para no máximo 200 caracteres e preencha `profile.about_pt` e `profile.about_en` (ou `profile.about` + `profile.about_en`).
- Normalize níveis de idioma para CEFR (Português -> `Native`, Inglês -> `B2`).
- Quando não houver conteúdo suficiente, use placeholders bonitos e consistentes para manter a página completa.

```

### Comandos de validacao e deploy

```bash
npm run dev
npm run lint
npm run build
```

Depois do build, faça commit/push no repositório e deixe o workflow do GitHub Pages publicar automaticamente.

## 🌍 Deployment to GitHub Pages

### 1. Configure `vite.config.ts`
Ensure your `base` property matches your repository name:
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // Change this to your repo name
})
```

### 2. GitHub Actions Deployment (Recommended)
This project is configured to use GitHub Actions for automatic deployment.

1. Go to your GitHub Repository **Settings**.
2. Navigate to **Actions** -> **General**.
3. Ensure "Allow all actions and reusable workflows" is checked.
4. Create a folder `.github/workflows` and a file `deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build_site:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Install & Build
        run: |
          npm install
          npm run build
      - name: Upload Artifacts
        uses: actions/upload-pages-artifact@v3
        with:
          path: 'dist'

  deploy:
    needs: build_site
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    permissions:
      pages: write
      id-token: write
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

5. Go to **Settings** -> **Pages** and change "Source" to "GitHub Actions".

### 3. Routing on GitHub Pages (SPA Fix)
Since this app uses `react-router-dom`, you might need a `404.html` hack or use `HashRouter` if you encounter issues with direct links on refresh. Currently, it uses `BrowserRouter` which works best with custom domains or specific server configurations.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
