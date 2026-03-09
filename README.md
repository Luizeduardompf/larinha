# Larinha – Guia de Estudo 4º Ano

Guia de estudo em formato web para o 4º ano, com exercícios por tópico, correção automática, registo de erros e partilha de resultados.

## Disciplinas

- **Português** – 18 tópicos + secção Resultados (tópicos concluídos, dificuldades, log de erros).
- **Estudo do Meio** – em preparação.

## Como usar

1. Abre **index.html** no browser (ou publica numa pasta web).
2. Escolhe a disciplina (Português ou Estudo do Meio).
3. Em Português: navega pelos tópicos 1–18, responde aos exercícios e usa **Corrigir Tópico** para ver o feedback.
4. A secção **Resultados** (19) mostra tópicos concluídos, dificuldades e log de erros; permite partilhar com amigos ou com os pais (WhatsApp).

## Estrutura do projeto

| Ficheiro | Descrição |
|----------|-----------|
| **index.html** | Página de entrada com menu de disciplinas (Português \| Estudo do Meio). |
| **portugues.html** | Conteúdo completo de Português: 18 tópicos + Resultados. |
| **DOC-DISCIPLINAS.md** | Instruções para adicionar uma nova disciplina (ex.: Estudo do Meio). |

## Persistência

- As **respostas** e o **log de erros** são guardados em **localStorage** e em **cookies** (por disciplina).
- Chaves: `larinha_pt_respostas`, `larinha_pt_log_erros` para Português; `larinha_em_*` para Estudo do Meio.
- O botão 🗑 (limpar progresso) apaga os dados da disciplina atual.

## Publicação

O projeto pode ser servido como ficheiros estáticos (por exemplo no GitHub Pages). Exemplo: [https://luizeduardompf.github.io/larinha](https://luizeduardompf.github.io/larinha).

## Licença

Uso educativo / pessoal.
