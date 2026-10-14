# Site de Lívia Barbosa de Oliveira, Psicóloga (CRP 20/14387)

Site estático (HTML, CSS e JavaScript puros), sem dependências nem etapa de build.
Tem duas partes na mesma página: o **portfólio** e a **psicoterapia**, que aparece ao clicar em "Psicoterapia".

## Estrutura

```
├── index.html            Todo o conteúdo (textos, seções, links)
├── css/
│   ├── base.css          Cores, fontes, reset e menu
│   ├── portfolio.css     Topo, credenciais, Sobre, Formação e Contato
│   ├── psicoterapia.css  Seções da psicoterapia e janela do formulário
│   └── interacoes.css    Mancha, exercício da TCC, cartões, respiração, botão flutuante
├── js/
│   ├── navegacao.js      Menu e troca entre portfólio e psicoterapia
│   ├── formulario.js     Abre e fecha a janela do formulário
│   └── interacoes.js     Interações e animações de entrada
├── assets/
│   └── favicon.svg       Ícone da aba do navegador
├── netlify.toml          Configuração de publicação
└── README.md
```

Os arquivos CSS e JS são carregados nessa ordem pelo `index.html`. Mantenha a ordem.

## Como editar o mais comum

O `index.html` tem comentários marcando cada seção (procure por `<!-- =====`).

| O que mudar | Onde |
|---|---|
| Textos de qualquer seção | `index.html`, na seção correspondente |
| Número de WhatsApp | `index.html`: busque `wa.me/559284075979` (links) e `(92) 98407-5979` (número exibido) |
| E-mail | `index.html`: busque `liviabarbosa.psi@outlook.com` |
| Link do formulário | `index.html`: na janela do formulário, o atributo `data-src` (link com `embedded=true`) e o link `forms.gle` do botão "Nova aba" |
| Cores do site | `css/base.css`, no bloco `:root` (ex.: `--violet`, `--petrol`, `--lilac`) |
| Situações do exercício "Experimente" | `js/interacoes.js`, na lista `sits` |
| Frases dos cartões e perguntas das palavras | `index.html`, seções "Nem tudo que você pensa é um fato" e "Antes de mudar" |
| Tempo da respiração | `js/interacoes.js`, em "Pausa para respirar" (4 s inspirar, 6 s soltar, 6 ciclos) |

Dica: use a busca do editor (Ctrl+F) e troque todas as ocorrências de uma vez.

## Ver o site no computador

Abra o `index.html` no navegador. Para um teste mais fiel (o formulário embutido, por exemplo), rode um servidor local na pasta do projeto:

```bash
python3 -m http.server 8000
# depois acesse http://localhost:8000
```

## Publicar com Git e Netlify

1. Crie um repositório no GitHub e envie os arquivos:
   ```bash
   git init
   git add .
   git commit -m "Primeira versão do site"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPO.git
   git push -u origin main
   ```
2. No Netlify: **Add new site → Import an existing project → GitHub** e escolha o repositório.
3. Deixe o comando de build vazio e o diretório de publicação como `.` (o `netlify.toml` já define isso).
4. Daqui em diante, cada `git push` publica o site automaticamente.

Se o site já existe no Netlify (publicado arrastando o zip), conecte o repositório em
**Site configuration → Build & deploy → Link repository**, para manter o mesmo endereço.

## Antes de publicar uma mudança

- Teste no celular e no computador.
- Clique em "Psicoterapia" e em "← Portfólio" para conferir a navegação.
- Abra o formulário e confira se carrega.
- Teste o link do WhatsApp.
