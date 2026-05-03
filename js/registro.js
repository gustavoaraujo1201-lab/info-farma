// ─── REGISTRO ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const btn   = document.getElementById('btnRegistrar');
    const email = document.getElementById('inputEmail');
    const user  = document.getElementById('inputUser');
    const pass  = document.getElementById('inputPass');
    const pass2 = document.getElementById('inputPass2');

    // Toggle mostrar/ocultar senha
    document.querySelectorAll('.toggle-pass').forEach(icon => {
        icon.addEventListener('click', () => {
            const input = document.getElementById(icon.dataset.target);
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('bx-hide', 'bx-show');
            } else {
                input.type = 'password';
                icon.classList.replace('bx-show', 'bx-hide');
            }
        });
    });

    btn?.addEventListener('click', async () => {
        removeMsg();

        const e  = email?.value.trim();
        const u  = user?.value.trim();
        const p  = pass?.value.trim();
        const p2 = pass2?.value.trim();

        if (!e || !u || !p || !p2) {
            showMsg('Preencha todos os campos.', 'error'); return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
            showMsg('E-mail inválido.', 'error'); return;
        }
        if (p.length < 8) {
            showMsg('A senha deve ter pelo menos 8 caracteres.', 'error'); return;
        }
        if (p !== p2) {
            showMsg('As senhas não coincidem.', 'error'); return;
        }

        btn.disabled = true;
        btn.textContent = 'Criando conta...';

        try {
            const res = await fetch('/api/registro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: e, username: u, password: p })
            });

            const data = await res.json();

            if (res.ok && data.sucesso) {
                showMsg('Conta criada! Redirecionando...', 'success');
                // ✅ Removido setTimeout de 2000ms — redirect imediato
                window.location.href = '/login';
            } else {
                showMsg(data.erro || 'Erro ao criar conta.', 'error');
                btn.disabled = false;
                btn.textContent = 'Criar conta';
            }
        } catch {
            showMsg('Erro de conexão. Tente novamente.', 'error');
            btn.disabled = false;
            btn.textContent = 'Criar conta';
        }
    });

    [email, user, pass, pass2].forEach(input => {
        input?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') btn?.click();
        });
    });
});

function showMsg(msg, type) {
    removeMsg();
    const el = document.createElement('p');
    el.id = 'form-msg';
    el.style.cssText = `color:${type === 'success' ? '#10b981' : '#ef4444'};font-size:13px;text-align:center;margin-top:-6px;margin-bottom:10px;`;
    el.textContent = msg;
    document.getElementById('btnRegistrar').before(el);
}

function removeMsg() { document.getElementById('form-msg')?.remove(); }
