const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // 1. Manejar el tema de CORS (por si acaso)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Si es una petición de tipo OPTIONS (preflight), respondemos rápido con 200
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 2. Solo permitir POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `💼 Nuevo mensaje de contacto de ${name}`,
        text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
        html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #8b9374;">¡Nuevo mensaje desde tu Portfolio!</h2>
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p style="background: #f4f4f4; padding: 15px; border-left: 4px solid #8b9374;">
                    ${message}
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ mensaje: 'Correo enviado con éxito' });
    } catch (error) {
        console.error('Error de Nodemailer:', error);
        return res.status(500).json({ error: 'No se pudo enviar el correo.' });
    }
};