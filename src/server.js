// server.js  (or api/contact.js if deploying to Vercel functions)
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import 'dotenv/config';

const app = express();
app.use(cors({ origin: 'https://your-frontend.com' })); // set to your domain
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  /* build an HTML body */
  const html = `
    <h2>New Contact Message</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
  `;

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL,          // e.g. contact@yourdomain.com
      to: process.env.RECIPIENT_EMAIL,       // e.g. you@company.com
      reply_to: email,                       // so you can hit “Reply”
      subject: `Website Contact: ${subject}`,
      html,
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Email send failed' });
  }
});

app.get('/', (_, res) => res.send('Contact API running'));
app.listen(process.env.PORT || 4000, () =>
  console.log(`API on port ${process.env.PORT || 4000}`)
);
