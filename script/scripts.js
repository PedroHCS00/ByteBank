import selecionaCotacao from "./imprimeCotacao.js";

const graficoDolar = document.getElementById('graficoDolar')

const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Dólar',
        data: [],
        borderWidth: 1
      }]
    },
});

function geraHorario() {
    let data = new Date()
    let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds()
    console.log(horario)
    return horario
}

function adicionarDados(grafico, legenda, dados) {
    grafico.data.labels.push(legenda)
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(dados)
    })
    grafico.update()
}

let workerDolar = new Worker('./script/workers/workerDolar.js')
workerDolar.postMessage('usd')

workerDolar.addEventListener('message', event => {
    let tempo = geraHorario()
    let valor = event.data.ask
    selecionaCotacao("dolar", valor)
    adicionarDados(graficoParaDolar, tempo, valor)
})

const graficoIene = document.getElementById('graficoIene')
const graficoParaIene = new Chart(graficoIene, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Iene',
            data: [],
            borderWidth: 1
        }]
    }
})

let workerIene = new Worker("./script/workers/workerIene.js")
workerIene.postMessage("iene")
workerIene.addEventListener("message", event => {
    let tempo = geraHorario()
    let valor = event.data.ask
    adicionarDados(graficoParaIene, tempo, valor)
    selecionaCotacao("iene", valor)
})

const graficoEuro = document.getElementById('graficoEuro')
const graficoParaEuro = new Chart(graficoEuro, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label:'Euro',
            data:[],
            borderWidth: 1
        }]
    }
})

let workerEuro = new Worker("./script/workers/workerEuro.js")
workerEuro.postMessage("euro")
workerEuro.addEventListener("message", event => {
    let tempo = geraHorario()
    let valor = event.data.ask
    adicionarDados(graficoParaEuro, tempo, valor)
    selecionaCotacao("euro", valor)
})

const graficoLibra = document.getElementById('graficoLibra')
const graficoParaLibra = new Chart(graficoLibra, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label:'Libra',
            data: [],
            borderWidth: 1
        }],
    }
})

let workerLibra = new Worker("./script/workers/workerLibra.js")
workerLibra.postMessage("Libra")
workerLibra.addEventListener("message", event => {
    let tempo = geraHorario()
    let valor = event.data.ask
    adicionarDados(graficoParaLibra, tempo, valor)
    selecionaCotacao("libra", valor)
})

