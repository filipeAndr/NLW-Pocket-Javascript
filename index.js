const { select, input, checkbox } = require('@inquirer/prompts');

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

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para navegar e a barra de espaço para marcar/desmarcar",
        choices: [...metas],
        instructions: false,
    });

    if(respostas.length == 0){
        console.log("Nenhuma meta selecionada");
        return;
    }

    metas.forEach((meta) => {
        meta.checked = false;
    });

    respostas.forEach((resposta) => {
        const meta = metas.find((meta) => {
            return meta.value == resposta;
        });
        meta.checked = true;
    }) 

    console.log("Meta(s) Concluida(s)");

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
                await listarMetas();
                break;
            case "sair":
                console.log("Saindo...");
                return;
        }
    }
    
}

start();

