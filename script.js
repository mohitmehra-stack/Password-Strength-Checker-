const pw = document.getElementById('pw');
const lbl = document.getElementById('lbl');
const pct = document.getElementById('pct');
const tipText = document.getElementById('tipText');
const tipIcon = document.getElementById('tipIcon');

const bars = [0, 1, 2, 3, 4].map(i => document.getElementById('b' + i));
const rEls = [0, 1, 2, 3, 4, 5].map(i => document.getElementById('r' + i));

const checks = [v => v.length >= 8, v =>
    /[A-Z]/.test(v), v => /[a-z]/.test(v),
    v => /[0-9]/.test(v), v => /[^A-Za-z0-9]/.test(v),
    v => v.length >= 12];

const cols = ['#ff4d6d', '#ff7c3e', '#ffd23f',
            '#06d6a0', '#7c6cfa'];
const lbls = ['Very Weak', 'Weak', 'Fair', 'Strong',
            'Excellent'];
const tips = ['Add uppercase & numbers.',
            'Mix in symbols like !@#$.',
            'Longer = harder to crack.',
            'Add a symbol for max strength.',
            'Outstanding — hard to crack!'];
const emos = ['🔴', '🟠', '🟡', '🟢', '✨'];

document.getElementById('eyeBtn').onclick = () => {
    const show = pw.type === 'password';
    pw.type = show ? 'text' : 'password';
    document.getElementById('eyeSvg').innerHTML = show
        ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`
        : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
};

pw.addEventListener('input', () => {
    const v = pw.value;

    rEls.forEach((el, i) =>
        el.classList.toggle('ok', checks[i](v)));

    if (!v) {
        bars.forEach(b => b.style.background = '');
        lbl.textContent = 'Enter a password';
        lbl.style.color = 'var(--muted)';
        pct.textContent = '';
        tipText.textContent = 'Start typing to get suggestions…';
        tipIcon.textContent = '💡';
        return;
    }

    let s = 0;

    if (v.length >= 8){
        s++;
        if (v.length >= 12)
            s++;
        if (/[A-Z]/.test(v))
            s++;
        if (/[0-9]/.test(v))
            s++;
        if (/[^A-Za-z0-9]/.test(v))
            s++;
    }

    s = Math.max(0, Math.min(s - 1, 4));
    bars.forEach(
        (b, i) =>
            b.style.background = i <= s ?
            cols[s] : 'rgba(255,255,255,.06)');

    lbl.textContent = lbls[s]; lbl.style.color = cols[s];
    pct.textContent = `${(s + 1) * 20}%`; pct.style.color = cols[s];
    tipText.textContent = tips[s]; tipIcon.textContent = emos[s];

    let pool = 0;
    if (/[a-z]/.test(v)) pool += 26;
    if (/[A-Z]/.test(v)) pool += 26;
    if (/[0-9]/.test(v)) pool += 10;
    if (/[^A-Za-z0-9]/.test(v)) pool += 32;
});