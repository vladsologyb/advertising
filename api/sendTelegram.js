export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const { name, phone } = req.body;
  
    const message = `
  🐑 Нове замовлення!
  
  👤 Імʼя: ${name}
  📞 Телефон: ${phone}
    `;
  
    const url = `https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`;
  
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TG_CHAT_ID,
          text: message,
        }),
      });
  
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Telegram error" });
    }
  }
  