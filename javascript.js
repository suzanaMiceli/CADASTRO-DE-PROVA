let tprova = document.querySelector(".tProva");
let questao = document.querySelector("#descricao-questao");
let numeroQuestao = document.querySelector("#numeroQ");
let alternativaQuestao = document.querySelector(".alternativa-questao");
let alternativaCerta = document.querySelector(".sim");
let botaoEnviar = document.querySelector(".enviar-prova");
let idProva = document.querySelector("#provaId");
let botaoAdAlt = document.querySelector(".adcAlt");
let divAternativa = document.querySelector("#adcAlternativa");
let salvaQuestao = document.querySelector(".adc-questao");
let idAlternativa = document.querySelector("#numeroA");

// criei listas pra empurrar os valores
let exams = [];
let alternatives = [];
let questions = [];

//salva a alternativa
botaoAdAlt.addEventListener("click", function (event) {
  event.preventDefault();

  alternatives.push({

    Id: idAlternativa.value,
    orderNumber: numeroQuestao.value,
    description: alternativaQuestao.value,
    isCorrect: alternativaCerta.value,

  });
  console.log(alternatives);
  

});
//salva a questao dentro junto com as alternativas
salvaQuestao.addEventListener("click", function (event) {
  event.preventDefault();


  questions.push({
    examId:idProva.value,
    description: questao.value,
    orderNumber: numeroQuestao.value,
    alternatives,
  });
  
  alternatives = [];
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




