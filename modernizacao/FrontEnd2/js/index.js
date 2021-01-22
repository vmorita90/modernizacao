function enviarDados(event) {

    var txtLogin = document.getElementById("txtLogin").value;
    var txtSenha = document.getElementById("txtSenha").value;

    console.log("Você digitou = " + txtLogin + " / " + txtSenha);


    var msgBody = {
        email: txtLogin,
        racf: txtLogin,
        senha: txtSenha

    };

    var cabecalho = {
        method: 'POST',
        body: JSON.stringify(msgBody),
        headers: {
            "content-type": "application/json"
        }

    }

    fetch("http://localhost:8088/login", cabecalho).then(res => trataStatus(res)) // quando a resposta voltar...

}

function trataStatus(res) {
    if (res.status == 200) {
        //preciso extrair os dados da resposta
        res.json().then(user => {
            localStorage.setItem("userMod", JSON.stringify(user)); // gravo os dados do usuario no chache
            window.location = "comunidades.html"; // mudo de pagina
        });


    } else if (res.status == 403) {
        document.getElementById("msgErro").innerHTML = "Senha inválida!";


    } else if (res.status == 404) {
        document.getElementById("msgErro").innerHTML = "Usuário não encontrado!";


    } else {
        document.getElementById("msgErro").innerHTML = "Erro desconhecido!";

    }

}