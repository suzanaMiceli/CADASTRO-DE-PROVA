let tprova = document.querySelector(".tProva");
let questao = document.querySelector("#descricao-questao");
let numeroQuestao = document.querySelector("#numeroQ");
let botaoEnviar = document.querySelector(".enviar-prova");
let idProva = document.querySelector("#provaId");
let salvaQuestao = document.querySelector(".salva-questao");
let container = document.querySelector(".container");
let div = document.querySelector(".alternativa-container");
let adcAlter = document.querySelector(".adcAlt");
let quantidade = document.querySelector("#quant");


let exams = [];
let alternatives = [];
let questions = [];



adcAlter.addEventListener("click", function (event) {
  
  event.preventDefault();
  aumentaDisplay();
  adicionaAlternativas();
  
  salvaQuestao.style.display = "block";
  

});


//exclui alternativas  
div.addEventListener("dblclick", function (event) {
  for (let index = 0; index < 4; index++) {
    div.removeChild(div.lastChild);
  }
});



salvaQuestao.addEventListener("click", function (event) {
  event.preventDefault();
  objetoQuestao();
  resetaInput();
  console.log(questions);
});


//envia as infos nas listas
botaoEnviar.addEventListener("click", function (event) {
  event.preventDefault();

  
  exams.push({
    title: tprova.value,
    Id: idProva.value,

  });
  
  exams.push({
    questions,
  });


  let data = {exams};

  //envia as infos  
  const opcao = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  fetch('http://localhost:3000/exams', opcao);


  alert("Prova enviada com sucesso!");

  location.reload();


});


function adicionaAlternativas(form) {

  for (let index = 0; index < quantidade.value; index++) {

    let alterNumero = document.createElement("input");
    alterNumero.setAttribute("id", `alterNum${index+1}`);
    alterNumero.setAttribute("placeholder", "Nº");

    let novaAl = document.createElement("input");
    novaAl.setAttribute("id", `alter${index+1}`);
    novaAl.setAttribute("placeholder", `Alternativa${index+1}`);
    
    let respostaCerta = document.createElement("input");
    respostaCerta.setAttribute("type", "checkbox");
    respostaCerta.setAttribute("id", `sim${index + 1}`);
    respostaCerta.setAttribute("value", "false");
    
    //verifica se o valor do checkbox é true or false
    respostaCerta.addEventListener("click", function () {
      document.querySelector(`#sim${index+1}`).value = true;
    });

    let spamTexto = document.createElement("spam");
    spamTexto.innerHTML = "Opção certa";
    
    

    alterNumero = div.appendChild(alterNumero).classList.add("inputPequeno");
    novaAl = div.appendChild(novaAl).classList.add("descricao");
    respostaCerta = div.appendChild(respostaCerta).classList.add("sim");
    spamTexto = div.appendChild(spamTexto);
    
  };
}

function objetoQuestao(index) {
  for (let index = 0; index < quantidade.value; index++) {
    
    alternatives.push({

      Id: document.querySelector(`#alterNum${index+1}`).value,
      questionId: numeroQuestao.value, 
      description: document.querySelector(`#alter${index+1}`).value,
      isCorrect: document.querySelector(`#sim${index+1}`).value,

    });

  };
  
  questions.push({
    examId: idProva.value,
    description: document.querySelector("#descricao-questao").value,
    orderNumber: numeroQuestao.value,
    alternatives,
  });
}

function resetaInput(form) {
  numeroQuestao.value ="";
  quantidade.value = "";
  questao.value= "";
  removeAlternativas();
  salvaQuestao.style.display = "none";
  diminuiDisplay();
  alternatives = [];
}

function removeAlternativas(event) {
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
};

function aumentaDisplay(form) {

  container.style.width = "600px";
  botaoEnviar.style.marginLeft = "110px"

  
}

function diminuiDisplay(form) {

  container.style.width = "31em";
  botaoEnviar.style.marginLeft = "70px";

  
}
