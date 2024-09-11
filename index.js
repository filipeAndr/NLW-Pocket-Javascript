const { select, input } = require('@inquirer/prompts');

let meta = {
    value: "tomar 3L de água por dia",
    checked: false,
}

let metas = [ meta ];

const cadastrarMeta = async () => {
    const meta = await input({ message:"Digite a meta: "}) 

    if(meta.length == 0){
        console.log("Meta não pode ser vazia");
        return;
    }

    metas.push(
        {value: meta, checked: false}
    );
}

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
                await cadastrarMeta();
                console.log(metas);
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

