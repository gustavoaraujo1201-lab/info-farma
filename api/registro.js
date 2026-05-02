// api/registro.js — Vercel Serverless Function

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ixbstkgxlyadphlpnshn.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4YnN0a2d4bHlhZHBobHBuc2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTc2OTIsImV4cCI6MjA5MzI5MzY5Mn0.QmTgpuJApLRAS9KDVkS4qVh_zC3cFS6_vmEsmuMDdfk';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ erro: 'Método não permitido.' });
    }

    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ erro: 'Preencha todos os campos.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ erro: 'E-mail inválido.' });
    }

    if (password.length < 6) {
        return res.status(400).json({ erro: 'A senha deve ter pelo menos 6 caracteres.' });
    }

    try {
        // Verifica se e-mail já existe
        const checkEmail = await fetch(
            `${SUPABASE_URL}/rest/v1/usuarios?email=eq.${encodeURIComponent(email)}&select=id`,
            {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            }
        );
        const emailData = await checkEmail.json();
        if (emailData && emailData.length > 0) {
            return res.status(409).json({ erro: 'Este e-mail já está cadastrado.' });
        }

        // Verifica se username já existe
        const checkUser = await fetch(
            `${SUPABASE_URL}/rest/v1/usuarios?username=eq.${encodeURIComponent(username)}&select=id`,
            {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            }
        );
        const userData = await checkUser.json();
        if (userData && userData.length > 0) {
            return res.status(409).json({ erro: 'Este nome de usuário já está em uso.' });
        }

        // Insere novo usuário
        const insert = await fetch(
            `${SUPABASE_URL}/rest/v1/usuarios`,
            {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify({ email, username, password })
            }
        );

        const inserted = await insert.json();

        if (insert.ok && inserted && inserted.length > 0) {
            return res.json({ sucesso: true, usuario: inserted[0].username });
        } else {
            const errMsg = inserted?.message || inserted?.details || 'Erro ao criar conta.';
            return res.status(500).json({ erro: errMsg });
        }

    } catch (err) {
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}
