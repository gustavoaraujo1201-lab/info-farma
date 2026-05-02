// api/login.js — Vercel Serverless Function

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ixbstkgxlyadphlpnshn.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4YnN0a2d4bHlhZHBobHBuc2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTc2OTIsImV4cCI6MjA5MzI5MzY5Mn0.QmTgpuJApLRAS9KDVkS4qVh_zC3cFS6_vmEsmuMDdfk';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ erro: 'Método não permitido.' });
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ erro: 'Preencha usuário e senha.' });
    }

    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/usuarios?username=eq.${encodeURIComponent(username)}&password=eq.${encodeURIComponent(password)}&select=id,username`,
            {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const data = await response.json();

        if (data && data.length > 0) {
            return res.json({ sucesso: true, usuario: data[0].username });
        } else {
            return res.status(401).json({ erro: 'Usuário ou senha incorretos.' });
        }
    } catch (err) {
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}
