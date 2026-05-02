// ─── RECUPERAR SENHA ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const btn   = document.getElementById('btnRecuperar');
    const email = document.getElementById('inputEmail');

    btn?.addEventListener('click', async () => {
        removeMsg();

        const e = email?.value.trim();
        if (!e || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
            showMsg('Digite um e-mail válido.', 'error'); return;
        }

        btn.disabled = true;
        btn.textContent = 'Enviando...';

        try {
            const res = await fetch('/api/recuperar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: e })
            });

            const data = await res.json();

            if (res.ok) {
                showMsg('Link enviado! Verifique seu e-mail.', 'success');
                btn.textContent = 'Enviado ✓';
            } else {
                showMsg(data.erro || 'Erro ao enviar e-mail.', 'error');
                btn.disabled = false;
                btn.textContent = 'Enviar link';
            }
        } catch {
            showMsg('Erro de conexão. Tente novamente.', 'error');
            btn.disabled = false;
            btn.textContent = 'Enviar link';
        }
    });

    email?.addEventListener('keydown', e => {
        if (e.key === 'Enter') btn?.click();
    });
});

function showMsg(msg, type) {
    removeMsg();
    const el = document.createElement('p');
    el.id = 'form-msg';
    el.style.cssText = `color:${type === 'success' ? '#10b981' : '#ef4444'};font-size:13px;text-align:center;margin-top:-10px;margin-bottom:10px;`;
    el.textContent = msg;
    document.getElementById('btnRecuperar').before(el);
}

function removeMsg() { document.getElementById('form-msg')?.remove(); }
