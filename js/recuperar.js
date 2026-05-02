// api/recuperar.js — Vercel Serverless Function

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ixbstkgxlyadphlpnshn.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4YnN0a2d4bHlhZHBobHBuc2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTc2OTIsImV4cCI6MjA5MzI5MzY5Mn0.QmTgpuJApLRAS9KDVkS4qVh_zC3cFS6_vmEsmuMDdfk';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ erro: 'Método não permitido.' });
    }

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ erro: 'E-mail obrigatório.' });
    }

    try {
        // Verifica se e-mail existe na tabela
        const checkRes = await fetch(
            `${SUPABASE_URL}/rest/v1/usuarios?email=eq.${encodeURIComponent(email)}&select=id`,
            {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            }
        );
        const users = await checkRes.json();

        // Por segurança, sempre retorna sucesso mesmo se e-mail não existir
        // Evita enumeração de e-mails
        if (!users || users.length === 0) {
            return res.json({ sucesso: true });
        }

        // Envia e-mail de recuperação via Supabase Auth
        const resetRes = await fetch(`${SUPABASE_URL}/auth/v1/recover`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                redirect_to: 'https://infofarma.vercel.app/dashboard'
            })
        });

        return res.json({ sucesso: true });

    } catch (err) {
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}
