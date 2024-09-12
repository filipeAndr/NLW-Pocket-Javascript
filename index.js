const { select, input, checkbox } = require('@inquirer/prompts');

const fs = require('fs').promises;

mensagem = "Bem vindo ao App de Metas";

let metas;

const carregarMetas = async () => {
    try{
        const dados = await fs.readFile('metas.json', 'utf-8');
        metas = JSON.parse(dados);
    }catch(erro){
        metas = [];
    }
}

const salvarMetas = async () => {
    await fs.writeFile('metas.json', JSON.stringify(metas, null, 2));
}

const cadastrarMeta = async () => {
    const meta = await input({ message:"Digite a meta: "}) 

    if(meta.length == 0){
        mensagem = "Meta não pode ser vazia";
        return;
    }

    metas.push(
        {value: meta, checked: false}
    );

    mensagem = "Meta cadastrada com sucesso!";
}

const listarMetas = async () => {
    if(metas.length == 0){
        mensagem = "Nenhuma meta cadastrada";
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
        mensagem = "Nenhuma meta selecionada";
        return;
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((meta) => {
            return meta.value == resposta;
        });
        meta.checked = true;
    }) 

    mensagem = "Meta(s) Concluida(s)";

}

const metasRealizadas = async () => {
    if(metas.length == 0){
        mensagem = "Nenhuma meta cadastrada";
        return;
    }
    const realizadas = metas.filter((meta) => {
        return meta.checked == true;
    })

    if(realizadas.length == 0){
        mensagem = "Nenhuma meta realizada";
        return;
    }

    await select({
        message: "Metas Realizadas",
        choices: [...realizadas]
    })
    
    
}

const metasAbertas = async () => {
    if(metas.length == 0){
        mensagem = "Nenhuma meta cadastrada";
        return;
    }
    if(metas.length == 0){
        mensagem = "Nenhuma meta cadastrada";
        return;
    }
    const abertas = metas.filter((meta) => {
        return !meta.checked;
    })

    if(abertas.length == 0){
        mensagem = "Não existem metas abertas";
        return;
    }

    await select({
        message: "Metas Abertas " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    if(metas.length == 0){
        mensagem = "Nenhuma meta cadastrada";
        return;
    }
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })
    const itensADeletar = await checkbox({
        message: "Selecione uma Meta para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    });
    if(itensADeletar.length == 0){
        mensagem = "Nenhum item selecionado para deletar";
        return;
    }

    itensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item;
        })
    })
    mensagem = "Meta(s) deletada(s) com sucesso!";
}

const mostrarMensagem = () => {
    console.clear();

    if(mensagem != ""){
        console.log(mensagem);
        console.log("");
        mensagem = "";
    }
}

const start = async () =>{
    await carregarMetas();
    
    while(true){
        mostrarMensagem();
        await salvarMetas();

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

