// api/login.js — Vercel Serverless Function
// Usa Supabase Auth: verificação de senha via bcrypt, retorna JWT seguro

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ixbstkgxlyadphlpnshn.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4YnN0a2d4bHlhZHBobHBuc2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTc2OTIsImV4cCI6MjA5MzI5MzY5Mn0.QmTgpuJApLRAS9KDVkS4qVh_zC3cFS6_vmEsmuMDdfk';

// ─── Rate Limiting em memória ────────────────────────────────
const attempts = new Map();
function isRateLimited(ip) {
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutos
    const max = 10; // máx 10 tentativas de login por IP
    const data = attempts.get(ip) || { count: 0, start: now };
    if (now - data.start > windowMs) { attempts.set(ip, { count: 1, start: now }); return false; }
    if (data.count >= max) return true;
    data.count++;
    attempts.set(ip, data);
    return false;
}

// ─── Headers de segurança HTTP ───────────────────────────────
function setSecurityHeaders(res) {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
}

export default async function handler(req, res) {
    setSecurityHeaders(res);

    if (req.method !== 'POST') return res.status(405).json({ erro: 'Método não permitido.' });

    const ip = req.headers['x-forwarded-for']?.split(',')[0] || 'unknown';
    if (isRateLimited(ip)) return res.status(429).json({ erro: 'Muitas tentativas. Aguarde 15 minutos e tente novamente.' });

    const { identifier, password } = req.body || {};

    if (!identifier || !password) return res.status(400).json({ erro: 'Preencha e-mail/usuário e senha.' });

    const identifierClean = String(identifier).trim().toLowerCase().slice(0, 254);
    const passwordRaw     = String(password).slice(0, 72);

    try {
        let emailParaLogin = identifierClean;

        // ─── Se não for e-mail, busca o e-mail pelo username ─
        if (!identifierClean.includes('@')) {
            const userRes = await fetch(
                `${SUPABASE_URL}/rest/v1/perfis?username=eq.${encodeURIComponent(identifierClean)}&select=email`,
                { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
            );
            const users = await userRes.json();
            if (!Array.isArray(users) || users.length === 0)
                return res.status(401).json({ erro: 'E-mail/usuário ou senha incorretos.' });
            emailParaLogin = users[0].email;
        }

        // ─── Autentica via Supabase Auth (verifica bcrypt internamente) ──
        const authRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
            method: 'POST',
            headers: { 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailParaLogin, password: passwordRaw })
        });

        const authData = await authRes.json();

        if (!authRes.ok) {
            // Mensagem genérica para não vazar informação
            return res.status(401).json({ erro: 'E-mail/usuário ou senha incorretos.' });
        }

        // ─── Busca o username do perfil ──────────────────────
        const username = authData?.user?.user_metadata?.username || emailParaLogin.split('@')[0];

        // ─── Retorna access_token seguro para o frontend ─────
        return res.json({
            sucesso: true,
            usuario: username,
            access_token: authData.access_token,   // JWT assinado pelo Supabase
            expires_in: authData.expires_in         // tempo de expiração em segundos
        });

    } catch (err) {
        console.error('Erro no login:', err);
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}
