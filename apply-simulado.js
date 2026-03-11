const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
let html = fs.readFileSync(path.join(baseDir, 'estudo-do-meio.html'), 'utf8');
const simulado = fs.readFileSync(path.join(baseDir, 'simulado-section.html'), 'utf8');

// 1) Insert Simulado right after main header (before current Tópico 1)
const insertMarker = '    </header>\n\n    <!-- TÓPICO 1: EVOLUÇÃO DA TECNOLOGIA';
if (!html.includes(insertMarker)) throw new Error('Marker not found');
html = html.replace(insertMarker, '    </header>\n\n' + simulado.trimEnd() + '\n\n    <!-- TÓPICO 2: EVOLUÇÃO DA TECNOLOGIA');

// 2) Renumber old topic 1 -> 2 (only in the section that has "EVOLUÇÃO DA TECNOLOGIA" and "t1-ex1" with "O que define a tecnologia")
// We do targeted replaces: the OLD topic 1 section has h2 "1. EVOLUÇÃO" and id="t1" - we need to change that section to topic 2.
// Replace first occurrence of "    <!-- TÓPICO 2: EVOLUÇÃO DA TECNOLOGIA - TRANSPORTES E TELECOMUNICAÇÕES -->\n    <section id=\"t1\"" with id="t2"
html = html.replace(
  '    <!-- TÓPICO 2: EVOLUÇÃO DA TECNOLOGIA - TRANSPORTES E TELECOMUNICAÇÕES -->\n    <section id="t1" class="topic">\n      <h2>1. EVOLUÇÃO',
  '    <!-- TÓPICO 2: EVOLUÇÃO DA TECNOLOGIA - TRANSPORTES E TELECOMUNICAÇÕES -->\n    <section id="t2" class="topic">\n      <h2>2. EVOLUÇÃO'
);

// Replace in old topic 1 (now 2): data-topic="1" and name="t1-ex - but only in the block that has "O que define a tecnologia" (old topic 1 content). We already changed the section id. So now we need to change data-topic="1" to data-topic="2" and name="t1-ex to name="t2-ex ONLY in the second section. The second section is between "id=\"t2\" class=\"topic\"" and the next "    <!-- TÓPICO 3:". So split and replace in that block only.
const parts = html.split(/(?=    <!-- TÓPICO \d+:)/);
const newParts = [];
for (let i = 0; i < parts.length; i++) {
  let p = parts[i];
  if (p.includes('id="t2" class="topic"') && p.includes('O que define a tecnologia')) {
    p = p.replace(/data-topic="1"/g, 'data-topic="2"').replace(/name="t1-ex/g, 'name="t2-ex').replace(/resumo-t1/g, 'resumo-t2').replace(/corrigirTopico(1, true)/g, 'corrigirTopico(2, true)');
  } else if (p.includes('SERES VIVOS EM EXTINÇÃO')) {
    p = p.replace(/id="t2"/g, 'id="t3"').replace(/<h2>2\. SERES/, '<h2>3. SERES').replace(/data-topic="2"/g, 'data-topic="3"').replace(/name="t2-ex/g, 'name="t3-ex').replace(/resumo-t2/g, 'resumo-t3').replace(/corrigirTopico(2, true)/g, 'corrigirTopico(3, true)');
  } else if (p.includes('PROTEÇÃO DO OCEANO')) {
    p = p.replace(/id="t3"/g, 'id="t4"').replace(/<h2>3\. PROTEÇÃO/, '<h2>4. PROTEÇÃO').replace(/data-topic="3"/g, 'data-topic="4"').replace(/name="t3-ex/g, 'name="t4-ex').replace(/resumo-t3/g, 'resumo-t4').replace(/corrigirTopico(3, true)/g, 'corrigirTopico(4, true)');
  } else if (p.includes('A TERRA NO ESPAÇO') && p.includes('SISTEMA SOLAR')) {
    p = p.replace(/id="t4"/g, 'id="t5"').replace(/<h2>4\. A TERRA/, '<h2>5. A TERRA').replace(/data-topic="4"/g, 'data-topic="5"').replace(/name="t4-ex/g, 'name="t5-ex').replace(/resumo-t4/g, 'resumo-t5').replace(/corrigirTopico(4, true)/g, 'corrigirTopico(5, true)');
  } else if (p.includes('REPRESENTAÇÕES DA TERRA')) {
    p = p.replace(/id="t5"/g, 'id="t6"').replace(/<h2>5\. REPRESENTAÇÕES/, '<h2>6. REPRESENTAÇÕES').replace(/data-topic="5"/g, 'data-topic="6"').replace(/name="t5-ex/g, "name=\"t6-ex\"").replace(/resumo-t5/g, 'resumo-t6').replace(/corrigirTopico(5, true)/g, 'corrigirTopico(6, true)');
  } else if (p.includes('LOCALIZAÇÃO E ORIENTAÇÃO') && p.includes('PONTOS CARDEAIS')) {
    p = p.replace(/id="t6"/g, 'id="t7"').replace(/<h2>6\. LOCALIZAÇÃO/, '<h2>7. LOCALIZAÇÃO').replace(/data-topic="6"/g, 'data-topic="7"').replace(/name="t6-ex/g, 'name="t7-ex').replace(/resumo-t6/g, 'resumo-t7').replace(/corrigirTopico(6, true)/g, 'corrigirTopico(7, true)');
  } else if (p.includes('SISMOS E VULCÕES')) {
    p = p.replace(/id="t7"/g, 'id="t8"').replace(/<h2>7\. SISMOS/, '<h2>8. SISMOS').replace(/data-topic="7"/g, 'data-topic="8"').replace(/name="t7-ex/g, 'name="t8-ex').replace(/resumo-t7/g, 'resumo-t8').replace(/corrigirTopico(7, true)/g, 'corrigirTopico(8, true)');
  } else if (p.includes('AMEAÇAS AOS OCEANOS')) {
    p = p.replace(/id="t8"/g, 'id="t9"').replace(/<h2>8\. /g, '<h2>9. ').replace(/data-topic="8"/g, 'data-topic="9"').replace(/name="t8-ex/g, 'name="t9-ex').replace(/resumo-t8/g, 'resumo-t9').replace(/corrigirTopico(8, true)/g, 'corrigirTopico(9, true)');
  } else if (p.includes('POPULAÇÃO MUNDIAL E IMPACTO')) {
    p = p.replace(/id="t9"/g, 'id="t10"').replace(/<h2>9\. POPULAÇÃO/, '<h2>10. POPULAÇÃO').replace(/data-topic="9"/g, 'data-topic="10"').replace(/name="t9-ex/g, 'name="t10-ex').replace(/resumo-t9/g, 'resumo-t10').replace(/corrigirTopico(9, true)/g, 'corrigirTopico(10, true)');
  } else if (p.includes('Resultados') && p.includes('resultados-conteudo')) {
    p = p.replace(/id="t10" class="topic topic-resultados"/g, 'id="t11" class="topic topic-resultados"').replace(/<h2>📊 10\. Resultados<\/h2>/, '<h2>📊 11. Resultados</h2>');
  }
  newParts.push(p);
}
html = newParts.join('');

// 3) Update nav: add Simulado first, then 2-10, then Resultados #t11
// Current nav has t1-t9 and t10 Resultados. We need: Simulado (or 1) #t1, 2 #t2, ... 10 #t10, Resultados #t11
const navSticky = `        <a href="#t1" title="Simulado">S<span class="nav-count"></span></a>
        <a href="#t2" title="Tecnologia">2<span class="nav-count"></span></a>
        <a href="#t3" title="Profissões">3<span class="nav-count"></span></a>
        <a href="#t4" title="Sistema Solar">4<span class="nav-count"></span></a>
        <a href="#t5" title="Mapas">5<span class="nav-count"></span></a>
        <a href="#t6" title="Pontos cardeais">6<span class="nav-count"></span></a>
        <a href="#t7" title="Rochas e solo">7<span class="nav-count"></span></a>
        <a href="#t8" title="Água">8<span class="nav-count"></span></a>
        <a href="#t9" title="Água">9<span class="nav-count"></span></a>
        <a href="#t10" title="Ambiente">10<span class="nav-count"></span></a>
        <a href="#t11" title="Resultados">Resultados</a>`;

html = html.replace(
  /<a href="#t1" title="Tecnologia">1<span class="nav-count"><\/span><\/a>\s*\n\s*<a href="#t2" title="Profissões">2<span class="nav-count"><\/span><\/a>\s*\n\s*<a href="#t3" title="Localidade">3<span class="nav-count"><\/span><\/a>\s*\n\s*<a href="#t4" title="Sistema Solar">4<span class="nav-count"><\/span><\/a>\s*\n\s*<a href="#t5" title="Mapas">5<span class="nav-count"><\/span><\/a>\s*\n\s*<a href="#t6" title="Pontos cardeais">6<span class="nav-count"><\/span><\/a>\s*\n\s*<a href="#t7" title="Rochas e solo">7<span class="nav-count"><\/span><\/a>\s*\n\s*<a href="#t8" title="Água">8<span class="nav-count"><\/span><\/a>\s*\n\s*<a href="#t9" title="Ambiente">9<span class="nav-count"><\/span><\/a>\s*\n\s*<a href="#t10" title="Resultados">Resultados<\/a>/g,
  navSticky
);

// Same for the second nav (main header)
html = html.replace(
  /<a href="#t1" title="Tecnologia">1<span class="nav-count"><\/span><\/a>\s*\n\s*<a href="#t2" title="Profissões">2<span class="nav-count"><\/span><\/a>\s*\n\s*<a href="#t3" title="Localidade">3<span class="nav-count"><\/span><\/a>\s*\n\s*<a href="#t4" title="Sistema Solar">4<span class="nav-count"><\/span><\/a>\s*\n\s*<a href="#t5" title="Mapas">5<span class="nav-count"><\/span><\/a>\s*\n\s*<a href="#t6" title="Pontos cardeais">6<span class="nav-count"><\/span><\/a>\s*\n\s*<a href="#t7" title="Rochas e solo">7<span class="nav-count"><\/span><\/a>\s*\n\s*<a href="#t8" title="Água">8<span class="nav-count"><\/span><\/a>\s*\n\s*<a href="#t9" title="Ambiente">9<span class="nav-count"><\/span><\/a>\s*\n\s*<a href="#t10" title="Resultados">Resultados<\/a>/g,
  navSticky
);

// 4) CSS: Resultados link (orange button) #t10 -> #t11
html = html.replace(/\.nav-links a\[href="#t10"\]/g, '.nav-links a[href="#t11"]');

// 5) Script: TOTAL_TOPICOS = 9 -> 10, n <= 9 -> n <= 10, for n 1..9 -> 1..10, corrigirTopico t 1..9 -> 1..10
html = html.replace(/var TOTAL_TOPICOS = 9;/g, 'var TOTAL_TOPICOS = 10;');
html = html.replace(/if \(n >= 1 && n <= 9\) concluidos\.push\(n\);/g, 'if (n >= 1 && n <= 10) concluidos.push(n);');
html = html.replace(/for \(var n = 1; n <= 9; n\+\+\)/g, 'for (var n = 1; n <= 10; n++)');
html = html.replace(/for \(var t = 1; t <= 9; t\+\+\)/g, 'for (var t = 1; t <= 10; t++)');

// DEFAULT_EXPLICACOES_TOPICO: add 1 for Simulado, shift 1-9 to 2-10
html = html.replace(
  /var DEFAULT_EXPLICACOES_TOPICO = \{\s*1: 'Revê a explicação sobre tecnologia'/,
  `var DEFAULT_EXPLICACOES_TOPICO = {
      1: 'Simulado: revê os temas das questões erradas nos tópicos correspondentes.',
      2: 'Revê a explicação sobre tecnologia'`
);
html = html.replace(
  /2: 'Revê a explicação sobre profissões/,
  '3: \'Revê a explicação sobre profissões'
);
html = html.replace(
  /3: 'Revê a explicação sobre a localidade/,
  '4: \'Revê a explicação sobre a localidade'
);
html = html.replace(
  /4: 'Revê a explicação sobre o Sistema Solar/,
  '5: \'Revê a explicação sobre o Sistema Solar'
);
html = html.replace(
  /5: 'Revê a explicação sobre mapas/,
  '6: \'Revê a explicação sobre mapas'
);
html = html.replace(
  /6: 'Revê a explicação sobre pontos cardeais/,
  '7: \'Revê a explicação sobre pontos cardeais'
);
html = html.replace(
  /7: 'Revê a explicação sobre rochas/,
  '8: \'Revê a explicação sobre rochas'
);
html = html.replace(
  /8: 'Revê a explicação sobre a água/,
  '9: \'Revê a explicação sobre a água'
);
html = html.replace(
  /9: 'Revê a explicação sobre ambiente'/,
  '10: \'Revê a explicação sobre ambiente'
);

fs.writeFileSync(path.join(baseDir, 'estudo-do-meio.html'), html);
console.log('Done: Simulado inserted, topics renumbered 2-10, Resultados t11, nav and script updated.');
