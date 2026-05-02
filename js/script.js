// ─── DADOS DE MEDICAMENTOS ──────────────────────────────────
const medicamentos = [
    // TARJA PRETA
    { nome: "Ritalina", ativo: "Cloridrato de Metilfenidato", tarja: "Preta", classe: "Psicotrópico", receita: "Notificação Azul", obs: "Controle especial — Port. 344/98" },
    { nome: "Rivotril", ativo: "Clonazepam", tarja: "Preta", classe: "Psicotrópico", receita: "Notificação Azul", obs: "Benzodiazepínico — uso controlado" },
    { nome: "Frontal", ativo: "Alprazolam", tarja: "Preta", classe: "Psicotrópico", receita: "Notificação Azul", obs: "Ansiolítico — uso controlado" },
    { nome: "Dormonid", ativo: "Midazolam", tarja: "Preta", classe: "Psicotrópico", receita: "Notificação Azul", obs: "Sedativo — uso hospitalar" },
    { nome: "Morfina EMS", ativo: "Sulfato de Morfina", tarja: "Preta", classe: "Psicotrópico", receita: "Notificação Amarela", obs: "Opioide — uso restrito" },
    { nome: "Lexotan", ativo: "Bromazepam", tarja: "Preta", classe: "Psicotrópico", receita: "Notificação Azul", obs: "Ansiolítico benzodiazepínico" },
    { nome: "Gardenal", ativo: "Fenobarbital", tarja: "Preta", classe: "Psicotrópico", receita: "Notificação Azul", obs: "Antiepiléptico — controle especial" },
    { nome: "Valium", ativo: "Diazepam", tarja: "Preta", classe: "Psicotrópico", receita: "Notificação Azul", obs: "Benzodiazepínico" },
    { nome: "Xyrem", ativo: "Oxibato de Sódio", tarja: "Preta", classe: "Psicotrópico", receita: "Notificação Amarela", obs: "Uso restrito — narcolepsia" },
    { nome: "Codein Phosphate", ativo: "Fosfato de Codeína", tarja: "Preta", classe: "Psicotrópico", receita: "Notificação Azul", obs: "Opioide leve" },
    { nome: "Stilnox", ativo: "Zolpidem", tarja: "Preta", classe: "Psicotrópico", receita: "Notificação Azul", obs: "Indutor do sono" },
    { nome: "Ativan", ativo: "Lorazepam", tarja: "Preta", classe: "Psicotrópico", receita: "Notificação Azul", obs: "Benzodiazepínico" },
    { nome: "Tramal", ativo: "Cloridrato de Tramadol", tarja: "Preta", classe: "Psicotrópico", receita: "Notificação Azul", obs: "Analgésico opioide" },
    { nome: "Venvanse", ativo: "Dimesilato de Lisdexanfetamina", tarja: "Preta", classe: "Psicotrópico", receita: "Notificação Azul", obs: "TDAH — uso controlado" },

    // TARJA VERMELHA (seleção representativa)
    { nome: "Amoxil", ativo: "Amoxicilina", tarja: "Vermelha", classe: "Antibiótico", receita: "Receita Branca 2 vias", obs: "Penicilina — espectro ampliado" },
    { nome: "Keflex", ativo: "Cefalexina", tarja: "Vermelha", classe: "Antibiótico", receita: "Receita Branca 2 vias", obs: "Cefalosporina 1ª geração" },
    { nome: "Zithromax", ativo: "Azitromicina", tarja: "Vermelha", classe: "Antibiótico", receita: "Receita Branca 2 vias", obs: "Macrolídeo — uso único 3-5 dias" },
    { nome: "Cipro", ativo: "Ciprofloxacino", tarja: "Vermelha", classe: "Antibiótico", receita: "Receita Branca 2 vias", obs: "Fluoroquinolona — uso cuidadoso" },
    { nome: "Clavulin", ativo: "Amoxicilina + Clavulanato", tarja: "Vermelha", classe: "Antibiótico", receita: "Receita Branca 2 vias", obs: "Inibidor de beta-lactamase" },
    { nome: "Metronidazol EMS", ativo: "Metronidazol", tarja: "Vermelha", classe: "Antibiótico", receita: "Receita Branca 2 vias", obs: "Ação antiparasitária e antibacteriana" },
    { nome: "Bactrim", ativo: "Sulfametoxazol + Trimetoprima", tarja: "Vermelha", classe: "Antibiótico", receita: "Receita Branca 2 vias", obs: "Sulfonamida combinada" },
    { nome: "Voltaren", ativo: "Diclofenaco Sódico", tarja: "Vermelha", classe: "Anti-inflamatório", receita: "Receita Simples", obs: "AINE — risco GI e cardiovascular" },
    { nome: "Nimesulida Genérico", ativo: "Nimesulida", tarja: "Vermelha", classe: "Anti-inflamatório", receita: "Receita Simples", obs: "Máx. 15 dias contínuos" },
    { nome: "Movatec", ativo: "Meloxicam", tarja: "Vermelha", classe: "Anti-inflamatório", receita: "Receita Simples", obs: "AINE seletivo COX-2" },
    { nome: "Cataflan", ativo: "Diclofenaco Potássico", tarja: "Vermelha", classe: "Anti-inflamatório", receita: "Receita Simples", obs: "Absorção mais rápida que sódico" },
    { nome: "Losartana Medley", ativo: "Losartana Potássica", tarja: "Vermelha", classe: "Cardiovascular", receita: "Receita Simples", obs: "BRA — anti-hipertensivo" },
    { nome: "Enalapril EMS", ativo: "Maleato de Enalapril", tarja: "Vermelha", classe: "Cardiovascular", receita: "Receita Simples", obs: "IECA — anti-hipertensivo" },
    { nome: "Atorvastatina Genérico", ativo: "Atorvastatina Cálcica", tarja: "Vermelha", classe: "Cardiovascular", receita: "Receita Simples", obs: "Estatina — dislipidemias" },
    { nome: "Sinvastatina Genérico", ativo: "Sinvastatina", tarja: "Vermelha", classe: "Cardiovascular", receita: "Receita Simples", obs: "Estatina — risco miopatia alta dose" },
    { nome: "Metformina EMS", ativo: "Cloridrato de Metformina", tarja: "Vermelha", classe: "Cardiovascular", receita: "Receita Simples", obs: "Biguanida — DM tipo 2 1ª linha" },
    { nome: "Glifage XR", ativo: "Cloridrato de Metformina", tarja: "Vermelha", classe: "Cardiovascular", receita: "Receita Simples", obs: "Liberação prolongada — menos efeito GI" },
    { nome: "Omeprazol Genérico", ativo: "Omeprazol", tarja: "Vermelha", classe: "Gastrointestinal", receita: "Receita Simples", obs: "IBP — uso máx. recomendado 8 semanas" },
    { nome: "Nexium", ativo: "Esomeprazol", tarja: "Vermelha", classe: "Gastrointestinal", receita: "Receita Simples", obs: "IBP — enantiômero S do omeprazol" },
    { nome: "Pantoprazol Genérico", ativo: "Pantoprazol Sódico", tarja: "Vermelha", classe: "Gastrointestinal", receita: "Receita Simples", obs: "IBP — menor interação medicamentosa" },
    { nome: "Zoloft", ativo: "Cloridrato de Sertralina", tarja: "Vermelha", classe: "Psicotrópico", receita: "Receita Branca 2 vias", obs: "ISRS — antidepressivo" },
    { nome: "Prozac", ativo: "Cloridrato de Fluoxetina", tarja: "Vermelha", classe: "Psicotrópico", receita: "Receita Branca 2 vias", obs: "ISRS — meia-vida longa" },
    { nome: "Lexapro", ativo: "Oxalato de Escitalopram", tarja: "Vermelha", classe: "Psicotrópico", receita: "Receita Branca 2 vias", obs: "ISRS — alta seletividade" },
    { nome: "Effexor", ativo: "Cloridrato de Venlafaxina", tarja: "Vermelha", classe: "Psicotrópico", receita: "Receita Branca 2 vias", obs: "ISRN — dor neuropática" },
    { nome: "Haldol", ativo: "Haloperidol", tarja: "Vermelha", classe: "Psicotrópico", receita: "Receita Branca 2 vias", obs: "Antipsicótico típico 1ª geração" },
    { nome: "Risperdal", ativo: "Risperidona", tarja: "Vermelha", classe: "Psicotrópico", receita: "Receita Branca 2 vias", obs: "Antipsicótico atípico" },
    { nome: "Tegretol", ativo: "Carbamazepina", tarja: "Vermelha", classe: "Psicotrópico", receita: "Receita Branca 2 vias", obs: "Antiepiléptico / estabilizador de humor" },
    { nome: "Depakote", ativo: "Valproato de Sódio", tarja: "Vermelha", classe: "Psicotrópico", receita: "Receita Branca 2 vias", obs: "Antiepiléptico — risco teratogênico" },
    { nome: "Amoxicilina Genérico", ativo: "Amoxicilina", tarja: "Vermelha", classe: "Antibiótico", receita: "Receita Branca 2 vias", obs: "Penicilina de amplo espectro" },
    { nome: "Clindamicina Genérico", ativo: "Cloridrato de Clindamicina", tarja: "Vermelha", classe: "Antibiótico", receita: "Receita Branca 2 vias", obs: "Lincosamida — anaeróbios" },

    // SEM TARJA / MIP
    { nome: "Dipirona Sódica EMS", ativo: "Dipirona Sódica (Metamizol)", tarja: "MIP", classe: "Analgésico", receita: "Não exige", obs: "Analgésico e antipirético — uso popular" },
    { nome: "Tylenol", ativo: "Paracetamol", tarja: "MIP", classe: "Analgésico", receita: "Não exige", obs: "Hepatotóxico em dose excessiva" },
    { nome: "Buscopan Composto", ativo: "Butilbrometo de Escopolamina + Dipirona", tarja: "MIP", classe: "Analgésico", receita: "Não exige", obs: "Espasmolítico + analgésico" },
    { nome: "Neosaldina", ativo: "Dipirona + Cafeína + Mucato de Isometepteno", tarja: "MIP", classe: "Analgésico", receita: "Não exige", obs: "Cefaleia tensional" },
    { nome: "Dorflex", ativo: "Dipirona + Orfenadrina + Cafeína", tarja: "MIP", classe: "Analgésico", receita: "Não exige", obs: "Relaxante muscular + analgésico" },
    { nome: "Aspirina", ativo: "Ácido Acetilsalicílico", tarja: "MIP", classe: "Anti-inflamatório", receita: "Não exige", obs: "Evitar em < 12 anos — síndrome de Reye" },
    { nome: "Ibuprofeno Genérico", ativo: "Ibuprofeno", tarja: "MIP", classe: "Anti-inflamatório", receita: "Não exige", obs: "AINE — risco GI" },
    { nome: "Loratadina Genérico", ativo: "Loratadina", tarja: "MIP", classe: "Analgésico", receita: "Não exige", obs: "Anti-histamínico não sedativo" },
    { nome: "Claritin", ativo: "Loratadina", tarja: "MIP", classe: "Analgésico", receita: "Não exige", obs: "Anti-histamínico H1 2ª geração" },
    { nome: "Polaramine", ativo: "Maleato de Dexclorfeniramina", tarja: "MIP", classe: "Analgésico", receita: "Não exige", obs: "Anti-histamínico 1ª geração — sedativo" },
    { nome: "Resfenol", ativo: "Paracetamol + Dextrometorfano + Fenilefrina", tarja: "MIP", classe: "Analgésico", receita: "Não exige", obs: "Gripe e resfriado" },
    { nome: "Engov", ativo: "Paracetamol + Ácido Acetilsalicílico + Cafeína", tarja: "MIP", classe: "Analgésico", receita: "Não exige", obs: "Síndrome pós-alcoólica" },
    { nome: "Simeticona Genérico", ativo: "Simeticona", tarja: "MIP", classe: "Gastrointestinal", receita: "Não exige", obs: "Antiflatulento — seguro em bebês" },
    { nome: "Omeprazol 10mg (OTC)", ativo: "Omeprazol", tarja: "MIP", classe: "Gastrointestinal", receita: "Não exige", obs: "OTC — uso máx. 14 dias" },
    { nome: "Luftal", ativo: "Simeticona", tarja: "MIP", classe: "Gastrointestinal", receita: "Não exige", obs: "Cólicas e flatulências" },
    { nome: "Buscopan", ativo: "Butilbrometo de Escopolamina", tarja: "MIP", classe: "Gastrointestinal", receita: "Não exige", obs: "Espasmolítico puro" },
    { nome: "Energil C", ativo: "Vitamina C (Ácido Ascórbico)", tarja: "MIP", classe: "Analgésico", receita: "Não exige", obs: "Suplemento vitamínico" },
    { nome: "Cebion", ativo: "Vitamina C 1g", tarja: "MIP", classe: "Analgésico", receita: "Não exige", obs: "Vitamina C efervescente" },
    { nome: "Ginkgo Biloba EMS", ativo: "Extrato de Ginkgo biloba", tarja: "MIP", classe: "Analgésico", receita: "Não exige", obs: "Fitoterápico — circulação periférica" },
    { nome: "Sempre Viva", ativo: "Óleo mineral", tarja: "MIP", classe: "Gastrointestinal", receita: "Não exige", obs: "Laxante lubrificante — uso pontual" },
    { nome: "Dulcolatex", ativo: "Picossulfato de Sódio", tarja: "MIP", classe: "Gastrointestinal", receita: "Não exige", obs: "Laxante estimulante — uso eventual" },
    { nome: "Flogoral", ativo: "Benzidamina", tarja: "MIP", classe: "Anti-inflamatório", receita: "Não exige", obs: "Anti-inflamatório tópico oral" },
    { nome: "Bepantol Derma", ativo: "Dexpantenol", tarja: "MIP", classe: "Analgésico", receita: "Não exige", obs: "Cicatrizante e hidratante" },
    { nome: "Canesten", ativo: "Clotrimazol", tarja: "MIP", classe: "Antifúngico", receita: "Não exige", obs: "Antifúngico tópico — candidíase" },
    { nome: "Gyno-Canesten", ativo: "Clotrimazol Vaginal", tarja: "MIP", classe: "Antifúngico", receita: "Não exige", obs: "Candidíase vulvovaginal" },
    { nome: "Nizoral Shampoo", ativo: "Cetoconazol 2%", tarja: "MIP", classe: "Antifúngico", receita: "Não exige", obs: "Antifúngico tópico — dermatofitoses" },
    { nome: "Sempre Livre Dorflex", ativo: "Dipirona Sódica", tarja: "MIP", classe: "Analgésico", receita: "Não exige", obs: "Analgésico de uso amplo" },
    { nome: "Sal de Fruta Eno", ativo: "Bicarbonato de Sódio + Ácido Cítrico", tarja: "MIP", classe: "Gastrointestinal", receita: "Não exige", obs: "Antiácido efervescente" },
    { nome: "Maalox", ativo: "Hidróxido de Al + Mg", tarja: "MIP", classe: "Gastrointestinal", receita: "Não exige", obs: "Antiácido — interação com outros meds" },
    { nome: "Gaviscon", ativo: "Alginato de Sódio + Bicarbonato", tarja: "MIP", classe: "Gastrointestinal", receita: "Não exige", obs: "DRGE — barreira mecânica" },
];

// ─── RENDER TABLE ───────────────────────────────────────────
function renderTable(data) {
    const tbody = document.getElementById('medBody');
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
            <td style="color:var(--muted);font-size:12px">${m.obs}</td>
        </tr>
    `).join('');
}

function badgeTarja(t) {
    if (t === 'Preta')    return `<span class="badge-tarja preta">Tarja Preta</span>`;
    if (t === 'Vermelha') return `<span class="badge-tarja vermelha">Tarja Vermelha</span>`;
    return `<span class="badge-tarja mip">Sem Tarja</span>`;
}

function filterMeds() {
    const q = (document.getElementById('searchInput')?.value || '').toLowerCase();
    const tarja = document.getElementById('filterTarja')?.value || '';
    const classe = document.getElementById('filterClasse')?.value || '';

    const filtered = medicamentos.filter(m => {
        const matchQ = !q || m.nome.toLowerCase().includes(q) || m.ativo.toLowerCase().includes(q) || m.obs.toLowerCase().includes(q);
        const matchT = !tarja || m.tarja === tarja;
        const matchC = !classe || m.classe === classe;
        return matchQ && matchT && matchC;
    });
    renderTable(filtered);
}

// ─── NAVBAR SCROLL ──────────────────────────────────────────
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 10);

    // Active nav link
    const sections = ['inicio','acesso','tarja','medicamentos','legislacao','varejo','atencao','noticias','sobre'];
    let current = '';
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 80) current = id;
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
});

// ─── MOBILE MENU ────────────────────────────────────────────
document.getElementById('navToggle')?.addEventListener('click', () => {
    document.getElementById('navLinks')?.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => document.getElementById('navLinks')?.classList.remove('open'));
});

// ─── INIT ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    renderTable(medicamentos);
});
