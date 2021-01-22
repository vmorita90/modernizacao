function validaLogin(){
    let userTxt = localStorage.getItem("userLogged")

    if(!userTxt){
        window.location = "index.html"
    }


    let user = JSON.parse(userTxt)

    document.getElementById("dadosUser").innerHTML = `<b>${user.nome} </b> : (${user.email})`
    document.getElementById("imgUser").innerHTML = `<img src= ${user.linkfoto}>`
    buscaTransacao() 
}

function logout(){
    localStorage.removeItem("userLogged")
    window.location = "index.html"
}

function buscaTransacao(){
    let transacaoTxt = localStorage.getItem("buscaLogged");
           
    objAgente = JSON.parse(transacaoTxt);

    
    
    let consulta = `http://localhost:8080/transacao/status/${objAgente.id}`;

    fetch(consulta)
        .then(res => res.json())
        .then(res => tratarTransacao(res));
}

function tratarTransacao(lista){
    let sucesso = lista[0].count;
    let falhas = lista[1].count;
    let fraudes = lista[2].count;

    
    document.getElementById("dadosParceiro").innerHTML = `${lista[0].agente} / R$ ${lista[0].volumeTransacional}`;
    document.getElementById("sucesso").innerHTML = `<p>${sucesso}</p>`
    document.getElementById("falhas").innerHTML = `<p>${falhas}</p>`
    document.getElementById("fraudes").innerHTML = `<p>${fraudes}</p>`
    

}

function voltar(){
    window.location = "interna.html"
}
