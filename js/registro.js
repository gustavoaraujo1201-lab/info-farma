// api/registro.js — Vercel Serverless Function

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ixbstkgxlyadphlpnshn.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4YnN0a2d4bHlhZHBobHBuc2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTc2OTIsImV4cCI6MjA5MzI5MzY5Mn0.QmTgpuJApLRAS9KDVkS4qVh_zC3cFS6_vmEsmuMDdfk';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ erro: 'Método não permitido.' });
    }

    const { nome, email, username, password } = req.body;

    if (!nome || !email || !username || !password) {
        return res.status(400).json({ erro: 'Preencha todos os campos.' });
    }

    try {
        // Verifica se username ou email já existem
        const checkRes = await fetch(
            `${SUPABASE_URL}/rest/v1/usuarios?or=(username.eq.${encodeURIComponent(username)},email.eq.${encodeURIComponent(email)})&select=id`,
            {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            }
        );
        const existing = await checkRes.json();
        if (existing && existing.length > 0) {
            return res.status(409).json({ erro: 'Usuário ou e-mail já cadastrado.' });
        }

        // Insere novo usuário
        const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/usuarios`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({ nome, email, username, password })
        });

        if (insertRes.ok) {
            return res.json({ sucesso: true });
        } else {
            const err = await insertRes.json();
            return res.status(500).json({ erro: err.message || 'Erro ao criar conta.' });
        }
    } catch (err) {
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}
