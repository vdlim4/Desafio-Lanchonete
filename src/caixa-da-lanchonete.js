const res = document.querySelector('.res')
let produtoInput = document.querySelector('.produto')
let quantidadeInput = document.querySelector('.quantidade')
let pagamentoInput = document.querySelector('.pgto')

class CaixaDaLanchonete {
    constructor(pagamento, itens) {
        this.pagamento = pagamento
        this.itens = itens
    }

    adicionarProduto() {
        if (produtoInput.value === '') {
            res.innerHTML = '<p>[ERRO] Código inválido ou não cadastrado.<p/>'
        } else {
            this.itens.push(`${produtoInput.value},${quantidadeInput.value}`)
            res.innerHTML = ''
        }
    }
    
    adicionarPagamento() {
        const pagamento = Number(pagamentoInput.value)
        let metodoDePagamento = ''
        
        if (pagamento === 1) {
            metodoDePagamento = 'dinheiro' 
        } else if (pagamento === 2) {
            metodoDePagamento = 'debito'
        } else if (pagamento === 3) {
            metodoDePagamento = 'credito'
        } else {
            pagamentoInput.value = ''
        }

        return metodoDePagamento
    }

    calcularValorDaCompra() {
        let valor = 0

        for (const item of this.itens) {
            const [produto, quantidade] = item.split(',')
            const quantidadeNum = Number(quantidadeInput.value)
            if (produto === 'cafe') {
                valor += 3 * quantidade
            } else if (produto === 'chantily') {
                valor += 1.5 * quantidade
            } else if (produto === 'suco') {
                valor += 6.20 * quantidade
            } else if (produto === 'sanduiche') {
                valor += 6.50 * quantidade
            } else if (produto === 'queijo') {
                valor += 2 * quantidade
            } else if (produto === 'salgado') {
                valor += 7.25 * quantidade
            } else if (produto ==='combo1') {
                valor += 9.50 * quantidade
            } else if (produto === 'combo2') {
                valor += 7.50 * quantidade
            } else {

            }
        }

        if (this.adicionarPagamento() == 'dinheiro') {
            return valor *= 0.95
        } else if (this.adicionarPagamento() == 'credito') {
            return valor *= 1.03
        } else {
            return valor
        }
    }

}

const botaoAdd = document.querySelector('.botao-add')
const botaoFinal = document.querySelector('.botao-finalizar')
const itens = []

const caixa = new CaixaDaLanchonete('', itens)

botaoAdd.addEventListener('click', () => {
    const produto = produtoInput.value;
    const quantidade = quantidadeInput.value;

    if ((produto === 'queijo' || produto === 'chantily') && !temItemPrincipal(produto)) {
        res.innerHTML = '<p>[ERRO] Item extra não pode ser pedido sem o principal.</p>'
        return
    }
    
    caixa.adicionarProduto()
    if (quantidadeInput.value == 0 && Number(quantidadeInput.value) == 0) {
        res.innerHTML = '<p>[ERRO]Quantidade inálida</p>'
    }

    produtoInput.value = ''
    quantidadeInput.value = ''

    console.log(itens)
})

botaoFinal.addEventListener('click', () => {
    const pgto = caixa.adicionarPagamento()
    const valorTotal = caixa.calcularValorDaCompra()
    
    if (pagamentoInput.value == '') {
        res.innerHTML = '<p>[ERRO] Forma de pagamento inválida!</p>'
    } else if (caixa.itens.length == 0 && pagamentoInput !== ''){
        res.innerHTML = '<p>[ERRO] Não há itens no carrinho de compra!</p>'
    } else {
        res.innerHTML = `<p>Valor total do pedido: R$${valorTotal.toFixed(2)}</p>`
    }

    pagamentoInput.value = ''
    console.log(pgto)
    console.log(valorTotal)
})

function temItemPrincipal(produtoExtra) {
    const itensPrincipais = ['cafe', 'suco', 'sanduiche', 'salgado', 'combo1', 'combo2'];

    return caixa.itens.some(item => {
        const produtoPrincipal = item.split(',')[0].trim(); // Obtém o produto antes da vírgula
        return itensPrincipais.includes(produtoPrincipal);
    });
}

export { CaixaDaLanchonete }