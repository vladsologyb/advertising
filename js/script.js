const modal = document.getElementById('orderModal');
const thanksModal = document.getElementById('thanksModal');
const openButtons = document.querySelectorAll('.open-order');
const closeModalBtn = document.querySelector('.close-modal');
const form = document.getElementById('orderForm');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const nameError = document.getElementById('nameError');
const phoneError = document.getElementById('phoneError');

/* OPEN MODAL */
openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
    });
});

/* CLOSE MODAL */
closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

/* CLOSE ON BACKDROP */
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
});

/* PHONE +380 */
phoneInput.addEventListener('focus', () => {
    if (phoneInput.value === '') phoneInput.value = '+380';
});

phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/[^\d+]/g, '');
});

/* VALIDATION */
function validateName() {
    if (nameInput.value.trim().length < 2) {
        nameError.textContent = 'Введіть імʼя';
        nameInput.classList.add('error-input');
        return false;
    }
    nameError.textContent = '';
    nameInput.classList.remove('error-input');
    nameInput.classList.add('success');
    return true;
}

function validatePhone() {
    if (phoneInput.value.length < 13) {
        phoneError.textContent = 'Невірний номер';
        phoneInput.classList.add('error-input');
        return false;
    }
    phoneError.textContent = '';
    phoneInput.classList.remove('error-input');
    phoneInput.classList.add('success');
    return true;
}

/* SUBMIT */
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateName() || !validatePhone()) return;

    try {
        await fetch('/api/sendTelegram', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: nameInput.value,
                phone: phoneInput.value
            })
        });

        modal.classList.remove('active');
        thanksModal.classList.add('active');
        form.reset();
    } catch (err) {
        alert('Помилка відправки. Спробуйте пізніше.');
    }
});

/* TIMER 3 DAYS */
const TIMER_KEY = 'promoEnd';
const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;

function getEndTime() {
    let end = localStorage.getItem(TIMER_KEY);
    if (!end || Date.now() > end) {
        end = Date.now() + THREE_DAYS;
        localStorage.setItem(TIMER_KEY, end);
    }
    return end;
}

function updateTimer() {
    const diff = getEndTime() - Date.now();
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    const timer = document.getElementById('timer');
    if (timer) {
        timer.textContent = `${d}д ${h}г ${m}хв ${s}с`;
    }
}

setInterval(updateTimer, 1000);
updateTimer();

function closeThanks() {
    thanksModal.classList.remove('active');
}

/* CLOSE THANKS ON BACKDROP */
thanksModal.addEventListener('click', (e) => {
    if (e.target === thanksModal) {
        thanksModal.classList.remove('active');
    }
});

/* CLOSE THANKS ON ESC */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        thanksModal.classList.remove('active');
    }
});