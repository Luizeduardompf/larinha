const fs = require('fs');
const path = require('path');

const jsonPath = '/Users/luizeduardompf/Downloads/dataset_estudo_meio.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const letters = ['a', 'b', 'c', 'd'];

let html = `    <!-- TÓPICO 1: SIMULADO -->
    <section id="t1" class="topic">
      <h2>1. SIMULADO</h2>
      <div class="explicacao">
        <p>Este simulado reúne questões de vários temas de Estudo do Meio (Astronomia, Orientação, Representação da Terra, Geografia, Água, População, etc.). Responde como se fosse uma prova e depois corrige para ver o resultado.</p>
      </div>
      <h3 class="exercicios-titulo">Exercícios</h3>
`;

data.forEach((q, i) => {
  const ex = i + 1;
  const opts = q.opcoes || [];
  const resp = (q.resposta || '').trim();
  let correctIdx = opts.findIndex(o => (o || '').trim() === resp);
  if (correctIdx < 0) correctIdx = 0;
  const correct = letters[correctIdx] || 'a';

  html += `      <div class="exercicio" data-topic="1" data-ex="${ex}" data-correct="${correct}">
        <p>${ex}. ${escapeHtml(q.pergunta)}</p>
        <div class="opcoes">
`;
  letters.forEach((letter, idx) => {
    const text = opts[idx] != null ? escapeHtml(opts[idx]) : '';
    html += `          <label><input type="radio" name="t1-ex${ex}" value="${letter}"> ${text}</label>\n`;
  });
  html += `        </div>
      </div>
`;
});

html += `      <button class="btn-corrigir" onclick="corrigirTopico(1, true)">Corrigir Tópico</button>
      <div id="resumo-t1" class="resumo-correcao"></div>
    </section>

`;

fs.writeFileSync(path.join(__dirname, 'simulado-section.html'), html);
console.log('Generated simulado-section.html with', data.length, 'questions');
