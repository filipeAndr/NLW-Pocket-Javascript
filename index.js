const { select, input, checkbox } = require('@inquirer/prompts');

/*let meta = {
    value: "tomar 3L de água por dia",
    checked: false,
}*/


let metas = [ ];

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
    if(metas.length == 0){
        console.log("Nenhuma meta cadastrada");
        return;
    }
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

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return !meta.checked;
    })

    if(abertas.length == 0){
        console.log("Não existem metas abertas");
        return;
    }

    await select({
        message: "Metas Abertas " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })
    const itensADeletar = await checkbox({
        message: "Selecione uma Meta para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    });
    if(itensADeletar.length == 0){
        console.log("Nenhum item para deletar");
        return;
    }

    itensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item;
        })
    })
    console.log("Meta(s) deletada(s) com sucesso!");
}

const start = async () =>{
    
    while(true){

        const opcao = await select({
            message: "MENU",
            choices: [
                {name: "Cadastrar Meta", value: "Cadastrar"},
                {name: "Listar Metas", value: "Listar"},
                {name: "Metas Realizadas", value: "Realizadas"},
                {name: "Metas Abertas", value: "Abertas"},
                {name: "Deletar Meta", value: "Deletar"},
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
            case "Abertas":
                await metasAbertas();
                break;
            case "Deletar":
                await deletarMetas();
                break;
            case "sair":
                console.log("Saindo...");
                return;
        }
    }
    
}

start();

