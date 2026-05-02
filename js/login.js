// ─── LOGIN PAGE ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const btn  = document.getElementById('btnEntrar');
    const user = document.getElementById('inputUser');
    const pass = document.getElementById('inputPass');

    btn?.addEventListener('click', async () => {
        const u = user?.value.trim();
        const p = pass?.value.trim();

        if (!u || !p) {
            showError('Preencha usuário e senha.');
            return;
        }

        btn.disabled = true;
        btn.textContent = 'Entrando...';

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: u, password: p })
            });

            const data = await res.json();

            if (res.ok && data.sucesso) {
                sessionStorage.setItem('infofarma_user', data.usuario);
                window.location.href = '/dashboard';
            } else {
                showError(data.erro || 'Usuário ou senha incorretos.');
                btn.disabled = false;
                btn.textContent = 'Entrar';
            }
        } catch (err) {
            showError('Erro de conexão. Tente novamente.');
            btn.disabled = false;
            btn.textContent = 'Entrar';
        }
    });

    // Permite submeter com Enter
    [user, pass].forEach(input => {
        input?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') btn?.click();
        });
    });
});

function showError(msg) {
    let err = document.getElementById('login-error');
    if (!err) {
        err = document.createElement('p');
        err.id = 'login-error';
        err.style.cssText = 'color:#ef4444;font-size:13px;text-align:center;margin-top:-10px;margin-bottom:10px;';
        const btn = document.getElementById('btnEntrar');
        btn.parentNode.insertBefore(err, btn);
    }
    err.textContent = msg;
}
