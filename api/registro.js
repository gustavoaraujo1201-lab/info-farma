// ─── REGISTRO ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const btn   = document.getElementById('btnRegistrar');
    const nome  = document.getElementById('inputNome');
    const email = document.getElementById('inputEmail');
    const user  = document.getElementById('inputUser');
    const pass  = document.getElementById('inputPass');
    const pass2 = document.getElementById('inputPass2');

    btn?.addEventListener('click', async () => {
        clearError();

        const n = nome?.value.trim();
        const e = email?.value.trim();
        const u = user?.value.trim();
        const p = pass?.value.trim();
        const p2 = pass2?.value.trim();

        if (!n || !e || !u || !p || !p2) {
            showError('Preencha todos os campos.'); return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
            showError('E-mail inválido.'); return;
        }
        if (p.length < 6) {
            showError('A senha deve ter pelo menos 6 caracteres.'); return;
        }
        if (p !== p2) {
            showError('As senhas não coincidem.'); return;
        }

        btn.disabled = true;
        btn.textContent = 'Criando conta...';

        try {
            const res = await fetch('/api/registro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome: n, email: e, username: u, password: p })
            });

            const data = await res.json();

            if (res.ok && data.sucesso) {
                showSuccess('Conta criada! Redirecionando...');
                setTimeout(() => window.location.href = '/login', 2000);
            } else {
                showError(data.erro || 'Erro ao criar conta.');
                btn.disabled = false;
                btn.textContent = 'Criar conta';
            }
        } catch {
            showError('Erro de conexão. Tente novamente.');
            btn.disabled = false;
            btn.textContent = 'Criar conta';
        }
    });

    [nome, email, user, pass, pass2].forEach(input => {
        input?.addEventListener('keydown', e => {
            if (e.key === 'Enter') btn?.click();
        });
    });
});

function showError(msg) {
    removeMsg();
    const el = document.createElement('p');
    el.id = 'form-msg';
    el.style.cssText = 'color:#ef4444;font-size:13px;text-align:center;margin-top:-10px;margin-bottom:10px;';
    el.textContent = msg;
    document.getElementById('btnRegistrar').before(el);
}

function showSuccess(msg) {
    removeMsg();
    const el = document.createElement('p');
    el.id = 'form-msg';
    el.style.cssText = 'color:#10b981;font-size:13px;text-align:center;margin-top:-10px;margin-bottom:10px;';
    el.textContent = msg;
    document.getElementById('btnRegistrar').before(el);
}

function clearError() { removeMsg(); }
function removeMsg() { document.getElementById('form-msg')?.remove(); }
