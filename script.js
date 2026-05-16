// Loading
window.addEventListener('load', () => {

    gsap.to('#loadingScreen', {
        opacity: 0,
        duration: 1,

        onComplete: () => {
            document.getElementById('loadingScreen').style.display = 'none';
        }
    });

});

// Cursor
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

document.addEventListener('mousemove', (e) => {

    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });

    gsap.to(cursorFollower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3
    });

});

// Theme
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {

    const body = document.body;

    const current = body.getAttribute('data-theme');

    const newTheme = current === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);

});

// Particles
particlesJS('particles-js', {

    particles: {
        number: {
            value: 20
        },

        color: {
            value: '#579eaa'
        },

        line_linked: {
            enable: true,
            color: '#00f5ff'
        },

        move: {
            enable: true,
            speed: 2
        }
    }

});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        gsap.to(window, {
            duration: 1,
            scrollTo: target
        });

    });

});

// Price
const ticketType = document.getElementById('ticketType');
const ticketCount = document.getElementById('ticketCount');
const totalPrice = document.getElementById('totalPrice');

function calculateTotal() {

    const price = Number(ticketType.value || 0);

    const count = Number(ticketCount.value || 1);

    const total = price * count;

    totalPrice.value = total + " EGP";

}

ticketType.addEventListener('change', calculateTotal);

ticketCount.addEventListener('input', calculateTotal);

// Open Payment
document.getElementById('bookingForm')
.addEventListener('submit', (e) => {

    e.preventDefault();

    document.getElementById('paymentModal').style.display = 'flex';

});

// Confirm Payment
function confirmPayment() {
  const input = document.getElementById("payInput").value;

  if (input === "") {
    alert("من فضلك ادخل بيانات الدفع");
    return;
  }

  // إنشاء QR
  const qrCanvas = document.getElementById("qrCode");

  QRCode.toCanvas(qrCanvas, "Ticket Paid - TechVerse Egypt", function (error) {
    if (error) console.error(error);
  });

  // اظهار رسالة النجاح
  document.getElementById("paymentStatus").style.display = "block";

  // قفل الفورم بالكامل
  document.getElementById("payInput").disabled = true;

  // تعطيل زر التأكيد
  event.target.disabled = true;

  // ممكن كمان نقفل الفورم الرئيسي
  document.getElementById("bookingForm").querySelector("button").disabled = true;
}

// Save QR
function saveQR() {

    const canvas = document.getElementById('qrCode');

    const link = document.createElement('a');

    link.download = 'TechVerse-Ticket.png';

    link.href = canvas.toDataURL();

    link.click();

}

// Close Payment
function closePayment() {

    document.getElementById('paymentModal').style.display = 'none';

}
