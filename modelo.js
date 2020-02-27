/*  ---------------------  Rodando modelo já treinado ------------------------
Aqui não temos a necessidade de nenhuma outra importação porque a função com a rede neural 
já foi salva. ( Uma maravilhosa vantagem do Brain.js)

 ---------  RODE ESSE EXEMPLO COM :  yarn run start
*/


import trainedNet from './modelo_medico_treinado'

// - mesmo exemplo treinado, se espera a mesma resposta

const inputExample = "Diarreia falta de apetite, sangramento";


function code(arg){
    return arg.split('').map(x=>(x.charCodeAt(0)/256))
   }

console.log(trainedNet(code(inputExample)).toString());
