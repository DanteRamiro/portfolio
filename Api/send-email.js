const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    // 1. Evitar que entren peticiones que no sean POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido. Usa POST.' });
    }

    const { name, email, message } = req.body;

    // 2. Validación rápida por seguridad en el servidor
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Faltan campos obligatorios.' });
    }

    // 3. Configuración del "Transporte" (Quién envía el mail)
    // Usamos variables de entorno (process.env) para no dejar contraseñas expuestas en GitHub.
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Tu correo de Gmail
            pass: process.env.EMAIL_PASS  // Tu contraseña de aplicación secreta
        }
    });

    // 4. Configuración del contenido del Email (Qué contiene y a quién va)
    const mailOptions = {
        from: `"${name}" <${email}>`, 
        to: process.env.EMAIL_USER, // Te lo enviás a vos mismo
        subject: `📬 Nuevo mensaje de contacto de ${name}`,
        text: `Nombre: ${name}\nEmail del remitente: ${email}\nMensaje:\n${message}`,
        html: `
            <h3>Nuevo mensaje desde tu Portfolio</h3>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
        `
    };

    try {
        // 5. Enviar el correo real
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ mensaje: '¡Correo enviado con éxito! 🚀' });
    } catch (error) {
        console.error('Error de Nodemailer:', error);
        return res.status(500).json({ error: 'Hubo un problema al procesar el envío del correo.' });
    }
}