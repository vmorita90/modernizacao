function carregaInfo3() { //verifica se usuário está conectado;
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