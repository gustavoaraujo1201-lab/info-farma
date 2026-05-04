// Medicamentos ANVISA - Base completa (9.724 registros)
// Gerado automaticamente a partir da base oficial ANVISA

let medicamentosData = [];
let filteredData = [];
let currentPage = 1;
const ITEMS_PER_PAGE = 50;

// Carrega o JSON externo
async function carregarMedicamentos() {
  try {
    const response = await fetch('../data/medicamentos.json');
    medicamentosData = await response.json();
    filteredData = [...medicamentosData];
    renderizarTabela();
    atualizarContador();
  } catch (e) {
    console.error('Erro ao carregar medicamentos:', e);
  }
}

function normalizarTexto(texto) {
  return String(texto)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function filtrar() {
  const busca = normalizarTexto(document.getElementById('searchInput')?.value || '');
  const tipoFiltro = document.getElementById('tipoFilter')?.value || '';

  filteredData = medicamentosData.filter(med => {
    const matchBusca =
      !busca ||
      normalizarTexto(med.nome).includes(busca) ||
      normalizarTexto(med.principioAtivo).includes(busca) ||
      normalizarTexto(med.empresa).includes(busca) ||
      normalizarTexto(med.numeroRegistro).includes(busca);

    const matchTipo = !tipoFiltro || med.tipo === tipoFiltro;

    return matchBusca && matchTipo;
  });

  currentPage = 1;
  renderizarTabela();
  atualizarContador();
}

function renderizarTabela() {
  const tbody = document.getElementById('medicamentosBody');
  if (!tbody) return;

  const inicio = (currentPage - 1) * ITEMS_PER_PAGE;
  const fim = inicio + ITEMS_PER_PAGE;
  const pagina = filteredData.slice(inicio, fim);

  tbody.innerHTML = pagina.map(med => `
    <tr>
      <td><strong>${escapeHtml(med.nome)}</strong></td>
      <td>${escapeHtml(med.principioAtivo)}</td>
      <td><span class="badge badge-tipo">${escapeHtml(med.tipo)}</span></td>
      <td>${escapeHtml(med.numeroRegistro)}</td>
      <td class="empresa-cell">${escapeHtml(med.empresa)}</td>
      <td>${escapeHtml(med.vencimento || '—')}</td>
    </tr>
  `).join('');

  renderizarPaginacao();
}

function renderizarPaginacao() {
  const container = document.getElementById('paginacao');
  if (!container) return;

  const totalPaginas = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  if (totalPaginas <= 1) {
    container.innerHTML = '';
    return;
  }

  const maxBotoes = 7;
  let paginas = [];
  if (totalPaginas <= maxBotoes) {
    paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);
  } else {
    paginas = [1];
    if (currentPage > 3) paginas.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPaginas - 1, currentPage + 1); i++) {
      paginas.push(i);
    }
    if (currentPage < totalPaginas - 2) paginas.push('...');
    paginas.push(totalPaginas);
  }

  container.innerHTML = `
    <div class="paginacao-wrapper">
      <button onclick="irParaPagina(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>‹ Anterior</button>
      ${paginas.map(p =>
        p === '...'
          ? `<span class="paginacao-ellipsis">...</span>`
          : `<button class="${p === currentPage ? 'ativo' : ''}" onclick="irParaPagina(${p})">${p}</button>`
      ).join('')}
      <button onclick="irParaPagina(${currentPage + 1})" ${currentPage === totalPaginas ? 'disabled' : ''}>Próximo ›</button>
    </div>
  `;
}

function irParaPagina(pagina) {
  const totalPaginas = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  if (pagina < 1 || pagina > totalPaginas) return;
  currentPage = pagina;
  renderizarTabela();
  document.querySelector('.medicamentos-tabela')?.scrollIntoView({ behavior: 'smooth' });
}

function atualizarContador() {
  const contador = document.getElementById('contador');
  if (contador) {
    contador.textContent = `${filteredData.length.toLocaleString('pt-BR')} medicamento(s) encontrado(s)`;
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  carregarMedicamentos();

  document.getElementById('searchInput')?.addEventListener('input', debounce(filtrar, 300));
  document.getElementById('tipoFilter')?.addEventListener('change', filtrar);
});

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
