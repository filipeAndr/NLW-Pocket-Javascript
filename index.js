const { select } = require('@inquirer/prompts');

const start = async () =>{
    
    while(true){

        const opcao = await select({
            message: "MENU",
            choices: [
                {name: "Cadastrar Meta", value: "Cadastrar"},
                {name: "Listar Metas", value: "Listar"},
                {name: "Sair", value: "sair"},
            ]
        })
        switch(opcao){
            case "Cadastrar":
                console.log("vamos Cadastrar");
                break;
            case "Listar":
                console.log("vamos Listar");
                break;
            case "sair":
                console.log("Saindo...");
                return;
        }
    }
    
}

start();

