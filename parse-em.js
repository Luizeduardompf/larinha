const fs = require('fs');
const path = require('path');

const txtPath = '/Users/luizeduardompf/Downloads/estudo-do-meio.txt';
const txt = fs.readFileSync(txtPath, 'utf8');

const blocks = txt.split(/={50,}/).map(b => b.trim()).filter(B => B.length > 50);

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function parseTopic(block) {
  const lines = block.split('\n').map(l => l.trim());
  const titleMatch = block.match(/^TÓPICO\s+(\d+):\s*(.+?)(?:\n|$)/);
  const num = titleMatch ? parseInt(titleMatch[1], 10) : 0;
  const title = titleMatch ? titleMatch[2].trim() : '';

  let explicacao = '';
  let inExp = false;
  let inCurios = false;
  let expLines = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('--- EXPLICAÇÃO')) { inExp = true; inCurios = false; continue; }
    if (lines[i].startsWith('--- CURIOSIDADES') || lines[i].startsWith('--- CURIOSIDADE') || lines[i].startsWith('--- DICA')) { inCurios = true; inExp = false; continue; }
    if (lines[i].startsWith('--- EXERCÍCIOS')) { inExp = false; inCurios = false; break; }
    if (inExp && lines[i]) expLines.push(lines[i]);
    if (inCurios && lines[i]) expLines.push(lines[i]);
  }
  explicacao = expLines.join('\n').replace(/\n/g, '<br>\n');

  const exercises = [];
  const rest = block.split(/--- EXERCÍCIOS \(20 PERGUNTAS\) ---|--- EXERCÍCIOS \(20 QUESTÕES\) ---/)[1] || block.split(/--- EXERCÍCIOS ---/)[1] || '';
  const regex = /(\d+)\.\s*([^\n]+)\nA\)\s*([^\n]+)\nB\)\s*([^\n]+)\nC\)\s*([^\n]+)\nD\)\s*([^\n]+)\nResposta:\s*([ABCD])/gi;
  let m;
  const exBlock = rest.replace(/\r/g, '');
  let lastIndex = 0;
  while ((m = regex.exec(exBlock)) !== null) {
    const [, numEx, question, optA, optB, optC, optD, resp] = m;
    const correct = resp.toLowerCase();
    exercises.push({ num: parseInt(numEx, 10), question: question.trim(), a: optA.trim(), b: optB.trim(), c: optC.trim(), d: optD.trim(), correct });
  }
  if (exercises.length === 0) {
    const altRegex = /(\d+)\.\s*(.+?)\s*A\)\s*(.+?)\s*B\)\s*(.+?)\s*C\)\s*(.+?)\s*D\)\s*(.+?)\s*Resposta:\s*([ABCD])/gs;
    let m2;
    while ((m2 = altRegex.exec(exBlock)) !== null) {
      exercises.push({
        num: parseInt(m2[1], 10),
        question: m2[2].trim().replace(/\s+/g, ' '),
        a: m2[3].trim().replace(/\s+/g, ' '),
        b: m2[4].trim().replace(/\s+/g, ' '),
        c: m2[5].trim().replace(/\s+/g, ' '),
        d: m2[6].trim().replace(/\s+/g, ' '),
        correct: m2[7].toLowerCase()
      });
    }
  }
  return { num, title, explicacao, exercises };
}

const topics = [];
for (let i = 0; i < blocks.length; i++) {
  const t = parseTopic(blocks[i]);
  if (t.num >= 1 && t.num <= 9 && t.exercises.length >= 10) topics.push(t);
}

if (topics.length === 0) {
  const singleBlock = txt.split(/\n(?=TÓPICO \d+:)/);
  for (let i = 0; i < singleBlock.length; i++) {
    const t = parseTopic(singleBlock[i]);
    if (t.num >= 1 && t.num <= 9) topics.push(t);
  }
}

let out = '';
topics.forEach(t => {
  out += `    <!-- TÓPICO ${t.num}: ${escapeHtml(t.title)} -->\n`;
  out += `    <section id="t${t.num}" class="topic">\n`;
  out += `      <h2>${t.num}. ${escapeHtml(t.title)}</h2>\n`;
  out += `      <div class="explicacao"><p>${explicacaoToHtml(t.explicacao)}</p></div>\n`;
  out += `      <h3 class="exercicios-titulo">Exercícios</h3>\n`;
  t.exercises.forEach(ex => {
    out += `      <div class="exercicio" data-topic="${t.num}" data-ex="${ex.num}" data-correct="${ex.correct}">\n`;
    out += `        <p>${ex.num}. ${escapeHtml(ex.question)}</p>\n`;
    out += `        <div class="opcoes">\n`;
    out += `          <label><input type="radio" name="t${t.num}-ex${ex.num}" value="a"> ${escapeHtml(ex.a)}</label>\n`;
    out += `          <label><input type="radio" name="t${t.num}-ex${ex.num}" value="b"> ${escapeHtml(ex.b)}</label>\n`;
    out += `          <label><input type="radio" name="t${t.num}-ex${ex.num}" value="c"> ${escapeHtml(ex.c)}</label>\n`;
    out += `          <label><input type="radio" name="t${t.num}-ex${ex.num}" value="d"> ${escapeHtml(ex.d)}</label>\n`;
    out += `        </div>\n      </div>\n`;
  });
  out += `      <button class="btn-corrigir" onclick="corrigirTopico(${t.num}, true)">Corrigir Tópico</button>\n`;
  out += `      <div id="resumo-t${t.num}" class="resumo-correcao"></div>\n`;
  out += `    </section>\n\n`;
});

function explicacaoToHtml(s) {
  return String(s).replace(/\n/g, '</p><p>').replace(/<p><\/p>/g, '');
}

console.log(out);
