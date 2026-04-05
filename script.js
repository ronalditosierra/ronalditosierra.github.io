/* ============================================================
   TULIPANES — Lluvia fluida (Canvas)
   ============================================================ */
const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');
const TULIPS = ['🌷', '🌸', '🌷', '🌺', '🌷'];
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function createTulip() {
    return {
        x: Math.random() * canvas.width,
        y: -50,
        emoji: TULIPS[Math.floor(Math.random() * TULIPS.length)],
        size: 15 + Math.random() * 20,
        speed: 1 + Math.random() * 2,
        drift: (Math.random() - 0.5) * 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 3,
        opacity: 0.4 + Math.random() * 0.5
    };
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (Math.random() < 0.05) particles.push(createTulip());

    particles = particles.filter(p => p.y < canvas.height + 50);

    particles.forEach(p => {
        p.y += p.speed;
        p.x += p.drift;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.font = `${p.size}px serif`;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillText(p.emoji, -p.size / 2, p.size / 2);
        ctx.restore();
    });
    requestAnimationFrame(animate);
}
animate();

/* ============================================================
   ANIMACIONES GSAP
   ============================================================ */
const tl = gsap.timeline({ delay: 0.5 });

tl.to(".title", {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power3.out"
})
    .to(".question", {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "back.out(1.2)"
    }, "-=0.6")
    .to(".photos-container", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=0.8")
    .to(".img-frame", {
        scale: 1,
        stagger: 0.3,
        duration: 0.8,
        ease: "back.out(1.5)"
    }, "-=0.5")
    .to(".pocoyo-section", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
    }, "-=0.2");

// Efecto flotante suave para las fotos
gsap.to(".img-frame", {
    y: -10,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: 0.5
});