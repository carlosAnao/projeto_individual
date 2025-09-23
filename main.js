document.addEventListener('DOMContentLoaded', () => {
    const saldoElement = document.getElementById('saldo');
    const moedaElement = document.getElementById('moeda');
    const mensagemElement = document.getElementById('mensagem');
    const btnCara = document.getElementById('apostar-cara');
    const btnCoroa = document.getElementById('apostar-coroa');

    let saldo = 100;
    const apostaValor = 10;
    let isFlipping = false;

    const urlCara = 'https://i.imgur.com/2Xy5E6V.png';
    const urlCoroa = 'https://i.imgur.com/uF11y1p.png';

    const atualizarSaldo = () => {
        saldoElement.textContent = saldo;
    };
    
    atualizarSaldo();

    const jogar = (aposta) => {
        if (isFlipping) {
            return;
        }

        if (saldo < apostaValor) {
            mensagemElement.textContent = "Saldo insuficiente para apostar!";
            return;
        }

        isFlipping = true;
        saldo -= apostaValor;
        atualizarSaldo();

        moedaElement.classList.remove('cara', 'coroa');
        moedaElement.classList.add('virada');
        mensagemElement.textContent = "Girando...";

        setTimeout(() => {
            const resultado = Math.random() < 0.5 ? 'cara' : 'coroa';
            
            if (resultado === 'cara') {
                moedaElement.src = urlCara;
                moedaElement.classList.add('cara');
            } else {
                moedaElement.src = urlCoroa;
                moedaElement.classList.add('coroa');
            }

            if (resultado === aposta) {
                saldo += apostaValor * 2;
                mensagemElement.textContent = `Você ganhou! Deu ${resultado}.`;
            } else {
                mensagemElement.textContent = `Você perdeu! Deu ${resultado}.`;
            }

            isFlipping = false;
            atualizarSaldo();
        }, 2000); 
    };

    btnCara.addEventListener('click', () => jogar('cara'));
    btnCoroa.addEventListener('click', () => jogar('coroa'));
});