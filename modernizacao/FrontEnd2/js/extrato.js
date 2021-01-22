function carregaExtrato(){
    // praxe = fazer a verificacao se o usuário existe mesmo
    var strUser = localStorage.getItem("userMod");
    if (!strUser){
        window.location = "index.html";
        return;
    }

    // capturar o ID lá da url
    var param = window.location.search;
    var idcomunidade = param.substr(4);

    fetch("http://localhost:8088/modernizacao/comunidade/"+idcomunidade)
        .then(res => res.json())
        .then(lista => preencheExtrato(lista));
}

function preencheExtrato(lista){
    var total=0;

    var nomeComunidade;
    var nomeTeamLeader;

    var extratoSTR="";

    for (i=0; i<lista.length; i++){
        var mod = lista[i];

        extratoSTR = extratoSTR + `<div class="row">
                                    <div class="col-2"> ${mod.data} </div>
                                    <div class="col-9"> ${mod.descricao} </div>
                                    <div class="col-1"> ${mod.percentual}% </div>
                                   </div>`;
        total = total + mod.percentual;
    }
    document.getElementById("extrato").innerHTML = extratoSTR;
    document.getElementById("progresso").innerHTML = `<h4> Progresso total: ${total}%</h4>`;
    if (lista.length > 0){
        document.getElementById("comunidade").innerHTML = `<h3>${lista[0].comunidade.nome}
                                                          (${lista[0].comunidade.usuario.nome})</h3>` //ver o nome do usuario no modelo Usuario em comunidade.java
        

    }
    else{
        document.getElementById("comunidade").innerHTML = "Comunidade sem ações";
    }


}

function carregaInfo3() { //verifica se usuário está conectado;
    carregaExtrato();
    var userSTR = localStorage.getItem("userMod");
    if (!userSTR) {
        window.location = "index.html"
        return;
    }

    var user = JSON.parse(userSTR); //reconverteu para trabalhar como objeto;

    var strFoto = `<img src="${user.link}" width = "25%" >`;

    var strBio = `<p style="font-size:15px"><strong> ${user.nome}</strong></p>
                  <p style="font-size:12px"><strong>RACF:<br></strong> ${user.racf}</p>
                <p style="font-size:12px"><strong>EMAIL:<br></strong> ${user.email}</p>`


    document.getElementById("fotoUser").innerHTML = strFoto;
    document.getElementById("bioUser").innerHTML = strBio;

 
    

}