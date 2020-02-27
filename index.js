
/*
--------------------------------------- Treinando rede neural com Brain.js --------------------------------------------------------
01 - Instancie um exemplo de input e output na variável data / aqui há um modelo previamente treinado com inputs e outputs genéricos
02 - Crie uma string de teste com um input que não esteja previamente treinado
03 - Defina um nome para o arquivo que irá conter o modelo já treinado / caso não seja definido o arquivo default.js será criado 
-----------------------------------------------------------------------------------------------------------------------------------
 ---------  RODE ESSE EXEMPLO COM :  yarn run train

*/

let data  = require('./example'); // exemplo de base de inputs e outputs
const brain = require('brain.js');
const fs  = require('fs');  /* responsável unicamente por salvar a função gerada pela rede neural 
                               Como está atualmente o modelo é salvo usando a nova sintaxe ES6, 
                               por isso uso o Babel como transpiler, 
                               exporto na sintaxe ES6 simplesmente para ser mais confortável usar
                               com o React depois. 
                            */

const inputExample = "Diarreia falta de apetite, sangramento";
const safeModel  = "modelo_medico_treinado.js"; 

data = data.dados()


//----------------- função criada espeficamente para converter os inputs em floats -------------------
function code(arg){
    return arg.split('').map(x=>(x.charCodeAt(0)/256))
   }

//----------------- função que retorna  um array de objetos devidamente configurado para o treino -----  
function handleData(arg){
    let flux = [];
    arg.forEach((a) => {flux.push({ input: code(a.input), output: a.output})} )
    return flux
}

function train(){
    /* criando rede neural de recorrência, essa é uma função específica do Brain.js para liguagem natural
     funciona infinitamente melhor com o inglês. 
     aqui treinamos a rede usando a função de recorrência própria.
     No entanto, toda a base desse código está pronta para o treino de caracteres como números entre 0 e 1 
     Contudo, treinei repetidas vezes redes com a função básica de recorrência e usando de 2 a 20 neurônios 
     
     SEM SUCESSO!
     
     ----------  A quem desejar testar----------------
              01 - Substitua os outputs por objetos, exemplo  output:  { virose: 1 } 
              02 - Defina uma variável config à exemplo da documentação do brain.js, ou simplesmente insirá os hiddenLayers
                    const config =  { hiddenLayers: [3,3] }, // array of ints for the sizes of the hidden layers in the network // número de neuronios 
              03 - Defina a rede
                    const net = new brain.NeuralNetwork(config);
     -------------------------------------------------
     AVISO:  tenha em mente que a rede na configuração atual, fará 20000 interações
             isso demanda um tempo grande conforme a quantidade de informações carregadas na entrada e saída
     -------------------------------------------------         
    */
    const net = new brain.recurrent.LSTM();
    console.log('train model...',net.train(handleData(data),{log: true}));
    let rna  = net.toFunction();
    return rna 
}   

function runModel(arg,options){
    let input  = code(arg);
    let rede   = train();
    let output = rede(input);
    if(options.save){
        fs.writeFileSync(options.name ? options.name : 'default.js', `export default ${ rede.toString() };`);
    }
    console.log(output)
}

//---------- Chamamos a função de treino -----------------
runModel(inputExample,{
    save : true,
    name: safeModel
}); 

/* --------------- 
O treinamento mostrará uma série de erros, isso é normal porque a rede aprende justamente com as interações e erros. 
*/

