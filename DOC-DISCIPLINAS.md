# Múltiplas disciplinas – como adicionar uma nova

## Estrutura atual

- **index.html** – Página de entrada (hub) com menu: Português | Estudo do Meio.
- **portugues.html** – Conteúdo completo de Português 4º Ano (18 tópicos + Resultados).
- Cada disciplina tem **storage e cookies próprios** para não misturar respostas e log de erros.

## Chaves de storage e cookies (por disciplina)

Em cada página de disciplina (ex.: `portugues.html`) está definido:

- `DISCIPLINA_ID`: `'pt'` para Português, `'em'` para Estudo do Meio.
- As chaves são construídas a partir dele:
  - Respostas: `larinha_pt_respostas` / `larinha_em_respostas` (localStorage e cookie).
  - Log de erros: `larinha_pt_log_erros` / `larinha_em_log_erros` (localStorage e cookie).

Assim, Português e Estudo do Meio não partilham dados.

## Para adicionar Estudo do Meio

1. **Criar estudo-do-meio.html**  
   Copiar `portugues.html` como base e:
   - Alterar `DISCIPLINA_ID` de `'pt'` para `'em'`.
   - Substituir todo o conteúdo dos tópicos pelo conteúdo de Estudo do Meio (mantendo a mesma estrutura: secções `id="t1"`, `id="t2"`, etc., e `.exercicio` com `data-topic`, `data-ex`, `data-correct`).
   - Ajustar títulos, textos de partilha e mensagens para “Estudo do Meio” em vez de “Português”.

2. **Atualizar o hub (index.html)**  
   Trocar o link “Estudo do Meio” de `href="#"` para `href="estudo-do-meio.html"` e remover a classe `em-breve` (e o texto “(em breve)” no CSS, se quiseres).

3. **Link “← Menu”**  
   Em `estudo-do-meio.html` o link “← Menu” deve continuar a apontar para `index.html` (já fica correto se copiares de `portugues.html`).

## Migração de dados antigos

Em `portugues.html` existe uma migração única: quem tinha dados nas chaves antigas (`larinha_respostas`, `larinha_log_erros`) passa a vê-los em `larinha_pt_respostas` e `larinha_pt_log_erros` na primeira visita a `portugues.html`.
