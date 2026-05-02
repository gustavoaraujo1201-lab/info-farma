// ─── MEDICAMENTOS — busca via API ───────────────────────────
let debounceTimer;

document.addEventListener('DOMContentLoaded', () => {
    fetchMeds();

    document.getElementById('searchInput')?.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(fetchMeds, 300);
    });
    document.getElementById('filterTarja')?.addEventListener('change', fetchMeds);
    document.getElementById('filterClasse')?.addEventListener('change', fetchMeds);
});

async function fetchMeds() {
    const q      = document.getElementById('searchInput')?.value || '';
    const tarja  = document.getElementById('filterTarja')?.value || '';
    const classe = document.getElementById('filterClasse')?.value || '';

    const params = new URLSearchParams();
    if (q)      params.set('q', q);
    if (tarja)  params.set('tarja', tarja);
    if (classe) params.set('classe', classe);

    try {
        const res  = await fetch(`/api/medicamentos?${params}`);
        const data = await res.json();
        renderTable(data);
    } catch (err) {
        console.error('Erro ao buscar medicamentos:', err);
    }
}

function renderTable(data) {
    const tbody     = document.getElementById('medBody');
    const noResults = document.getElementById('noResults');
    if (!tbody) return;

    if (data.length === 0) {
        tbody.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    noResults.style.display = 'none';

    tbody.innerHTML = data.map(m => `
        <tr>
            <td><strong>${m.nome}</strong></td>
            <td style="color:var(--muted)">${m.ativo}</td>
            <td>${badgeTarja(m.tarja)}</td>
            <td style="color:var(--muted);font-size:13px">${m.classe}</td>
            <td><span class="badge-receita">${m.receita}</span></td>
            <td style="color:var(--muted);font-size:12px">${m.obs || ''}</td>
        </tr>
    `).join('');
}

function badgeTarja(t) {
    if (t === 'Preta')    return `<span class="badge-tarja preta">Tarja Preta</span>`;
    if (t === 'Vermelha') return `<span class="badge-tarja vermelha">Tarja Vermelha</span>`;
    return `<span class="badge-tarja mip">Sem Tarja</span>`;
}
