const form = document.querySelector("#orderForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const phone = form.phone.value.trim();

  if (!name || !phone) return;

  const res = await fetch("/.netlify/functions/sendTelegram", {
    method: "POST",
    body: JSON.stringify({ name, phone })
  });

  if (res.ok) {
    document.querySelector(".form-content").style.display = "none";
    document.querySelector(".thank-you").style.display = "block";
    form.reset();
  }
});
