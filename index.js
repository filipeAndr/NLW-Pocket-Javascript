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

    metas.forEach((meta) => {
        meta.checked = false;
    });

    if(respostas.length == 0){
        console.log("Nenhuma meta selecionada");
        return;
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((meta) => {
            return meta.value == resposta;
        });
        meta.checked = true;
    }) 

    console.log("Meta(s) Concluida(s)");

}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked == true;
    })

    if(realizadas.length == 0){
        console.log("Nenhuma meta realizada");
        return;
    }

    await select({
        message: "Metas Realizadas",
        choices: [...realizadas]
    })
    
    
}

const start = async () =>{
    
    while(true){

        const opcao = await select({
            message: "MENU",
            choices: [
                {name: "Cadastrar Meta", value: "Cadastrar"},
                {name: "Listar Metas", value: "Listar"},
                {name: "Metas Realizadas", value: "Realizadas"},
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
            case "Realizadas":
                await metasRealizadas();
                break;
            case "sair":
                console.log("Saindo...");
                return;
        }
    }
    
}

start();

