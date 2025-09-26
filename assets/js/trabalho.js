const MAX_ESTUDANTES = 10 // LIMITE DE ESTUDANTES CADASTRADOS
const formJS = document.querySelector('#formulario')
const relatorioJs = document.querySelector('#RELATORIO_HTML')

/* ====================================== CADASTRO ======================================= */
let lista_estudantes = []

function criaPessoa(nome, ra, idade, sexo, media) { 
  if (!nome || !ra || !idade || !media) {
    RespostaIncorreta()
    return
  } else {
    const resultado = media >= 6.0 ? "Aprovado" : "Reprovado" 
    return { nome, ra, idade, sexo, media, resultado }
  }
}

function RespostaIncorreta() {
  return alert('Inserção de Dados Incorreta! Tente novamente')
}

/* ====================================== CADASTRO ========================================================= */

function buscaEstudanteRepetido(vetor, raNovoEstudante) {
  for (let i = 0; i < vetor.length; i++) {
    if (vetor[i].ra === raNovoEstudante) return true
  }
  return false
}

function adic_estudante_cadastro(evento) {
  evento.preventDefault()

  let nome = document.querySelector('#nome_HTML').value
  let ra = Number(document.querySelector('#ra_HTML').value)
  let idade = Number(document.querySelector('#idade_HTML').value)
  let sexo = document.querySelector('#sexo_HTML').value
  let media = Number(document.querySelector('#media_HTML').value)

  const existe_esse_estudante = buscaEstudanteRepetido(lista_estudantes, ra)

  if (existe_esse_estudante == true) {
    alert('Estudante já cadastrado! Insira outro novamente!')
    return
  }

  if (lista_estudantes.length >= MAX_ESTUDANTES) {
    alert('Limite máximo de estudantes atingido!')
    return
  }

  lista_estudantes.push(criaPessoa(nome, ra, idade, sexo, media))

  formJS.reset()
  document.querySelector('#nome_HTML').focus()

  alert('ALUNO CADASTRADO !!')
}

formJS.addEventListener('submit', adic_estudante_cadastro)


/* ====================================== FUNÇÃO GENÉRICA DE EXIBIÇÃO ======================================= */
function exibirTabelaEstudantes(lista) {
  relatorioJs.innerHTML = ''

  if (lista.length === 0) {
    relatorioJs.innerHTML = '<p> Nenhum estudante ainda cadastrado!</p>'
    return
  }

  const tabela = document.createElement('table')
  let titulo = `
    <thead>
      <tr>
        <th> Nomes </th>
        <th> RA </th>
        <th> Idade </th>
        <th> Sexo </th>
        <th> Média </th>
        <th> Resultado </th>
      </tr>
    </thead>
  `

  let corpoTabela = '<tbody>'
  for (let estudante of lista) {
    corpoTabela += `
      <tr>
        <td>${estudante.nome}</td>
        <td>${estudante.ra}</td>
        <td>${estudante.idade}</td>
        <td>${estudante.sexo}</td>
        <td>${estudante.media.toFixed(2)}</td>
        <td>${estudante.resultado}</td>
      </tr>
    `
  }
  corpoTabela += '</tbody>'

  tabela.innerHTML = titulo + corpoTabela
  relatorioJs.appendChild(tabela)
}


/* ====================================== ORDENAÇÃO SELECTION SORT ======================================= */
 /* USAREMOS SELECT SORT */
function selectionSort(vetor, funcComp) {
  for (let pos_select = 0; pos_select < vetor.length - 1; pos_select++) {

    let pos_menor = pos_select + 1

    for (let i = pos_menor + 1; i < vetor.length; i++) {

      if (funcComp(vetor[pos_menor], vetor[i])) pos_menor = i
    
    }

    if (funcComp(vetor[pos_select],vetor[pos_menor])) {

      [vetor[pos_select], vetor[pos_menor]] = [vetor[pos_menor] ,vetor[pos_select]]
    
    }
  }
}


/* ====================================== ORDENAÇÃO NOMES CRESCENTE ======================================= */
function acao_do_Botao_NOMES() {
  selectionSort(lista_estudantes, (obj1, obj2) => obj1.nome > obj2.nome)
  exibirTabelaEstudantes(lista_estudantes)
}

const botaoOrdenaNomes = document.querySelector('#nomes_crescente_HTML')
botaoOrdenaNomes.addEventListener('click',acao_do_Botao_NOMES)


/* ====================================== ORDENAÇÃO RA DECRESCENTE ======================================= */
function Ord_RA_Decrescente() {
  selectionSort(lista_estudantes, (obj1, obj2) => obj1.ra < obj2.ra)
  exibirTabelaEstudantes(lista_estudantes)
}

const botaoOrdenaRA = document.querySelector('#ra_decrescente_HTML')
botaoOrdenaRA.addEventListener('click',Ord_RA_Decrescente)


/* ====================================== ORDENAÇÃO APROVADOS POR NOME ======================================= */
function Ord_Aprovados_Crescente() {

  let aprovados = []

  for (let i = 0; i < lista_estudantes.length; i++) {
 
    if (lista_estudantes[i].resultado === "Aprovado") {

      aprovados.push(lista_estudantes[i])
    }
  }

  selectionSort(aprovados, (obj1, obj2) => obj1.nome > obj2.nome) 
  exibirTabelaEstudantes(aprovados)

}

const botaoOrdenaAprovados = document.querySelector('#aprovados_crescente_HTML')
botaoOrdenaAprovados.addEventListener('click',Ord_Aprovados_Crescente)