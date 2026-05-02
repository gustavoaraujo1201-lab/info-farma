// ─── LOGIN PAGE ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const btn  = document.getElementById('btnEntrar');
    const user = document.getElementById('inputUser');
    const pass = document.getElementById('inputPass');

    btn?.addEventListener('click', () => {
        const u = user?.value.trim();
        const p = pass?.value.trim();

        if (!u || !p) {
            showError('Preencha usuário e senha.');
            return;
        }

        // Simulação de login — substituir por autenticação real futuramente
        window.location.href = '/dashboard';
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
