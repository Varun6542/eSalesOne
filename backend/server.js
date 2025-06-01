const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

app.post('/send-confirmation', async (req, res) => {
  const { name, email, orderId, items, total } = req.body;

  const itemList = items.map(
    item => `- ${item.title} (Qty: ${item.quantity}) - ₹${item.price}`
  ).join('\n');

  const mailOptions = {
    from: '"eSalesOne" <no-reply@esalesone.com>',
    to: email,
    subject: `Order Confirmation - ${orderId}`,
    text: `
    Hi ${name},

    Thank you for your order!

    Order ID: ${orderId}
    Items:
    ${itemList}

    Total: ₹${total}

    Your order will be shipped soon.

    – eSalesOne Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Confirmation email sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Email failed to send' });
  }
});

app.post('/contact', async (req, res) => {
  const { name, email, phone, comment } = req.body;

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'support@esalesone.com',
    subject: 'New Contact Form Submission',
    text: `
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Message:
    ${comment}
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Contact form sent successfully' });
  } catch (error) {
    console.error('Error sending contact form:', error);
    res.status(500).json({ message: 'Failed to send contact form' });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
