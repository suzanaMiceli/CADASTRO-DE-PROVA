let tprova = document.querySelector(".tProva");
let questao = document.querySelector("#descricao-questao");
let numeroQuestao = document.querySelector("#numeroQ");
let alternativaQuestao = document.querySelector(".alternativa-questao");
let alternativaCerta = document.querySelector(".sim");
let botaoEnviar = document.querySelector(".enviar-prova");




  
botaoEnviar.addEventListener("click", function (event) {
  event.preventDefault();

//peguei informações dos inputs
  let infoProva = tprova.value;
  let infoQuestao = questao.value;
  let infoNumeroQuestao = numeroQuestao.value;
  let infoAlternativaQuestao = alternativaQuestao.value;
  let infoAlternativaCerta = alternativaCerta.value
	
  
  let prova = [];

  prova.push({
    title: infoProva,
    questions: infoQuestao,
    description: infoAlternativaQuestao,
    examId: infoNumeroQuestao,
    isCorrect: infoAlternativaCerta,
  });

  let data = { prova };

  //envia as infos  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  fetch('http://localhost:3000/exams', options);

  console.log(prova);
 
 
  alert("Prova enviada com sucesso!");
  
  location.reload();
 
  
});






