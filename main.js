document.addEventListener('DOMContentLoaded', () => {
    const saldoElement = document.getElementById('saldo');
    const moedaElement = document.getElementById('moeda');
    const mensagemElement = document.getElementById('mensagem');
    const btnCara = document.getElementById('apostar-cara');
    const btnCoroa = document.getElementById('apostar-coroa');

    const SALDO_INICIAL = 100;
    const VALOR_APOSTA = 10;
    const TEMPO_ANIMACAO_MS = 2000;
    
    const LADOS_MOEDA = {
        cara: {
            url: 'https://i.imgur.com/2Xy5E6V.png',
            classe: 'cara'
        },
        coroa: {
            url: 'https://i.imgur.com/uF11y1p.png',
            classe: 'coroa'
        }
    };

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

        moedaElement.classList.remove(LADOS_MOEDA.cara.classe, LADOS_MOEDA.coroa.classe);
        moedaElement.classList.add('virando');
        mensagemElement.textContent = "Girando...";

        setTimeout(() => {
            const resultado = Math.random() < 0.5 ? 'cara' : 'coroa';
            const dadosResultado = LADOS_MOEDA[resultado];
            
            moedaElement.classList.remove('virando');
            moedaElement.src = dadosResultado.url;
            moedaElement.classList.add(dadosResultado.classe);

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