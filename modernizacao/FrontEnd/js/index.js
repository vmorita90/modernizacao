function fazerLogin(event) {
    event.preventDefault() // evita o comportamento padrão de enviar um formulario

    let user = document.getElementById("InputIdentity").value;
    let senha = document.getElementById("InputPassword").value;

    //Captura valor da pagina html
    console.log('Você digitou ' +  user + " : " + senha)
    
    //Envia valor para a pagina html
    //document.getElementById("resultado").innerHTML = "<p>Olá " + user + "</p>";    

    // Construindo o objeto javascript para enviar
    let loginMsg = {
        email: user,
        racf: user,
        senha: senha
    }

    //construindo a mensagem que será enviada ao Backend
    //method - indica o metodo que será utilizado (GET, POST, DELETE,....)
    //body - corpo da mensagem, o que deve ser enviado
    //headers: informando o tipo de conteudo da mensagem
    let msg = {
        method: 'POST',
        body: JSON.stringify(loginMsg),
        headers:{
            'Content-type':'application/json'
        }
    }

    // fetch encia a 'msg' para o servidor
    fetch("http://localhost:8088/user/login", msg)
        .then( res => tratarRetorno(res)) // quando a resposta voltar...

}

function tratarRetorno(retorno) {
    if(retorno.status == 200){
        document.getElementById("resultado").innerHTML = "Login com sucesso!";
        retorno.json().then(res => acessoPermitido(res))
        acessoPermitido()
    }else{
        document.getElementById("resultado").innerHTML = "Falha no login!";
    }
}

function acessoPermitido(user){
    localStorage.setItem("userLogged", JSON.stringify(user))
    //console.log(user)
    window.location = "interna.html"
}