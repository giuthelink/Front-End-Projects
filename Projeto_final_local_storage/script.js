
function saveall() {

    var email = document.querySelector(`#email`).value;
    var destino = document.querySelector("#destino").value;
    var ida = document.querySelector("#ida").value;
    var volta = document.querySelector("#volta").value;


    if (email.length === 0) {
        alert("por favor, digite o seu email novamente...")
    } else if (destino.length === 0) {
        alert("por favor, digite o destino desejado")
    } else if (ida.length == "") {
        alert("por gentileza, digite a data de ida")
    } else if (volta.length == "") {
        alert("por favor, digite a data do retorno desejada")
    } else {
        alert("muito obrigado por se cadastrar, em breve enviaremos promocoes para seu email !!")

        localStorage.setItem("email", email);
        localStorage.setItem("destino", destino);
        localStorage.setItem("ida", ida);
        localStorage.setItem("volta", volta);
    }
}