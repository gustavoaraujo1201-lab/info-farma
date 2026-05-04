// Base de Dados ANVISA — 9.724 registros
// Colunas: fiel à planilha oficial

let medicamentosData = [];
let filteredData = [];
let currentPage = 1;
const PER_PAGE = 50;

async function carregarMedicamentos() {
    try {
        const res = await fetch('data/medicamentos.json');
        medicamentosData = await res.json();
        filteredData = [...medicamentosData];
        renderTabela();
        atualizarContador();
    } catch (e) {
        console.error('Erro ao carregar medicamentos:', e);
        document.getElementById('medBody').innerHTML =
            '<tr><td colspan="9" style="text-align:center;padding:2rem;color:#ef4444">Erro ao carregar a base de dados.</td></tr>';
    }
}

function normalizar(txt) {
    return String(txt).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function filtrar() {
    const busca = normalizar(document.getElementById('searchInput')?.value || '');
    const tipo  = (document.getElementById('filterTipo')?.value || '').toUpperCase();

    filteredData = medicamentosData.filter(m => {
        const matchBusca = !busca || [m.nome, m.complemento, m.principioAtivo, m.empresa, m.numeroReg, m.numeroProcesso]
            .some(v => normalizar(v).includes(busca));
        const matchTipo = !tipo || m.tipo.toUpperCase() === tipo;
        return matchBusca && matchTipo;
    });

    currentPage = 1;
    renderTabela();
    atualizarContador();
}

function renderTabela() {
    const tbody = document.getElementById('medBody');
    if (!tbody) return;

    const inicio = (currentPage - 1) * PER_PAGE;
    const pagina = filteredData.slice(inicio, inicio + PER_PAGE);

    if (pagina.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:2rem;color:var(--muted)">Nenhum medicamento encontrado.</td></tr>';
        document.getElementById('medPaginacao').innerHTML = '';
        return;
    }

    tbody.innerHTML = pagina.map(m => `
        <tr>
            <td><strong>${esc(m.nome)}</strong></td>
            <td class="principio-cell">${esc(m.principioAtivo)}</td>
            <td><span class="badge-tipo ${m.tipo === 'NOTIFICADO' ? 'notificado' : ''}">${esc(m.tipo)}</span></td>
            <td class="mono">${esc(m.numeroReg)}</td>
            <td class="mono processo-cell">${esc(m.numeroProcesso) || '<span class="vazio">—</span>'}</td>
            <td class="empresa-cell">${esc(m.empresa)}</td>
            <td><span class="badge-situacao">${esc(m.situacao)}</span></td>
            <td class="vencimento-cell">${esc(m.vencimento) || '<span class="vazio">—</span>'}</td>
        </tr>
    `).join('');

    renderPaginacao();
}

function renderPaginacao() {
    const container = document.getElementById('medPaginacao');
    if (!container) return;

    const total = Math.ceil(filteredData.length / PER_PAGE);
    if (total <= 1) { container.innerHTML = ''; return; }

    let pags = [];
    if (total <= 7) {
        pags = Array.from({ length: total }, (_, i) => i + 1);
    } else {
        pags = [1];
        if (currentPage > 3) pags.push('...');
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(total - 1, currentPage + 1); i++) pags.push(i);
        if (currentPage < total - 2) pags.push('...');
        pags.push(total);
    }

    container.innerHTML = '<div class="paginacao-wrapper">' +
        '<button onclick="irPagina(' + (currentPage - 1) + ')" ' + (currentPage === 1 ? 'disabled' : '') + '>&#8249; Anterior</button>' +
        pags.map(p => p === '...'
            ? '<span class="paginacao-ellipsis">...</span>'
            : '<button class="' + (p === currentPage ? 'ativo' : '') + '" onclick="irPagina(' + p + ')">' + p + '</button>'
        ).join('') +
        '<button onclick="irPagina(' + (currentPage + 1) + ')" ' + (currentPage === total ? 'disabled' : '') + '>Pr&#243;ximo &#8250;</button>' +
        '</div>';
}

function irPagina(p) {
    const total = Math.ceil(filteredData.length / PER_PAGE);
    if (p < 1 || p > total) return;
    currentPage = p;
    renderTabela();
    document.querySelector('.table-wrap')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function atualizarContador() {
    const el = document.getElementById('medContador');
    if (el) el.textContent = filteredData.length.toLocaleString('pt-BR') + ' medicamento(s) encontrado(s)';
}

function esc(str) {
    return String(str)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function debounce(fn, ms) {
    let t;
    return function() { var a = arguments; clearTimeout(t); t = setTimeout(function(){ fn.apply(null,a); }, ms); };
}

document.addEventListener('DOMContentLoaded', function() {
    carregarMedicamentos();
    document.getElementById('searchInput')?.addEventListener('input', debounce(filtrar, 300));
    document.getElementById('filterTipo')?.addEventListener('change', filtrar);
});
