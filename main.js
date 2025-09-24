document.addEventListener('DOMContentLoaded', () => {
    const saldoElement = document.getElementById('saldo');
    const moedaElement = document.getElementById('moeda');
    const mensagemElement = document.getElementById('mensagem');
    const btnCara = document.getElementById('apostar-cara');
    const btnCoroa = document.getElementById('apostar-coroa');

    const SALDO_INICIAL = 100;
    const VALOR_APOSTA = 10;
    const TEMPO_ANIMACAO_MS = 1500;

    let saldo = SALDO_INICIAL;
    let isFlipping = false;

    const atualizarSaldoDisplay = () => {
        saldoElement.textContent = saldo;
    };

    const jogar = (aposta) => {
        if (isFlipping) return;

        if (saldo < VALOR_APOSTA) {
            mensagemElement.textContent = "Saldo insuficiente para apostar!";
            return;
        }

        isFlipping = true;
        saldo -= VALOR_APOSTA;
        atualizarSaldoDisplay();
        mensagemElement.textContent = "Girando...";

        moedaElement.classList.remove('girar-para-cara', 'girar-para-coroa');

        void moedaElement.offsetWidth;

        const resultado = Math.random() < 0.5 ? 'cara' : 'coroa';

        if (resultado === 'cara') {
            moedaElement.classList.add('girar-para-cara');
        } else {
            moedaElement.classList.add('girar-para-coroa');
        }

        setTimeout(() => {
            if (resultado === aposta) {
                saldo += VALOR_APOSTA * 2;
                mensagemElement.textContent = `Você ganhou! Deu ${resultado}.`;
            } else {
                mensagemElement.textContent = `Você perdeu! Deu ${resultado}.`;
            }
            
            atualizarSaldoDisplay();
            isFlipping = false;
        }, TEMPO_ANIMACAO_MS);
    };

    btnCara.addEventListener('click', () => jogar('cara'));
    btnCoroa.addEventListener('click', () => jogar('coroa'));

    atualizarSaldoDisplay();
});