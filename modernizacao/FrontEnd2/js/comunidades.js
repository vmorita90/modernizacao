function carregaInfo() { //verifica se usuário está conectado;
    var total=0;
    
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

    // aqui começo a preencher a lista de comunidades
    var strLista = `<div class="row"> <br>   
                        <div class="col-12" align=center><h3><strong>Minhas comunidades</h3></strong><br></div>
                    </div>    
                        <br><div class="row">
                            <div class="col-1"></div>
                            <div class="col-1" align=center><b>ID</b></div>
                            <div class="col-4" align=center><b>Descrição</b></div>
                            <div class="col-2"align=center><b>Registrar</b></div>
                            <div class="col-2"align=center><b>Extrato Modernização</b></div>
                        </div><br>`;
    for (i = 0; i < user.comunidades.length; i++) {
        var comunidade = user.comunidades[i];


        strLista = strLista + `<div class="row">
                                  <div class="col-1"></div>
                                  <div class="col-1" align=center>${comunidade.id}</div>
                                  <div class="col-4" align=center>${comunidade.nome}</div>
                                  <div class="col-2"align=center><a href="novamodernizacao.html?id=${comunidade.id}" class="btn btn-success btn-sm">Novo</a></div><br><br>
                                  <div class="col-2"align=center><a href="extrato.html?id=${comunidade.id}" class="btn btn-warning btn-sm">Extrato</a></div><br><br>
                                  <div class="col-2"></div>
                                  </div>`;
    }
    document.getElementById("listaComunidades").innerHTML = strLista;

}