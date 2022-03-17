const form = document.querySelector("#novoItem")
const ul = document.querySelector("#lista")
const itens = JSON.parse(localStorage.getItem("dados")) || []

itens.forEach(item => {
    if ((item.nome !== "") && (item.quantidade !== "")) {        
        criaElemento(item)
    }
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = document.querySelector("#nome")
    const quantidade = document.querySelector("#quantidade")

    const nomeValue = nome.value.toUpperCase()

    const obj = {
        "nome": nomeValue,
        "quantidade": quantidade.value,
        "id": itens.length
    }

    const verificaExistencia = itens.find(item => item.nome.toUpperCase() == nomeValue)

    if (verificaExistencia) {
        if (obj.quantidade !== "") {
            
            obj.id = verificaExistencia.id

            atualiazaDados(verificaExistencia)
            
            const index = itens.findIndex(item => {
                item.id === verificaExistencia.id
            })

            itens[index] = obj
        }
    } else {

        if ((nomeValue !== "") && (quantidade.value !== "")) {
            
            criaElemento(obj)

            itens.push(obj)
        }
    }
    


    localStorage.setItem("dados", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
    document.querySelector("#nome").focus()
})


function criaElemento(obj){
    const li = document.createElement("li")
    li.classList.add("item")

    const strong = document.createElement("strong")
    strong.innerHTML = obj.quantidade
    strong.dataset.id = obj.id

    li.appendChild(strong)
    li.innerHTML += obj.nome
    li.appendChild(botaoDeleta(obj.id))

    ul.appendChild(li)
}

function atualiazaDados(verificaExistencia) {
    const quantidade = document.querySelector("#quantidade").value
    if (quantidade !== "") {
        document.querySelector(`[data-id="${verificaExistencia.id}"]`).innerHTML = quantidade
    }

}

function botaoDeleta(id) {
    const botaoDeleta = document.createElement("button")
    botaoDeleta.innerHTML = "X"
    botaoDeleta.classList.add("botao")
    botaoDeleta.addEventListener("click", function () {
        this.parentNode.remove()
        deletaItemArray(id)
    })

    return botaoDeleta
}

function deletaItemArray(id) {
    itens.splice(itens.findIndex(item => item.id === id), 1)


    localStorage.setItem("dados", JSON.stringify(itens))
}
