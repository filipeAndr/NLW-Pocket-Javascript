const start = () =>{
    
    while(true){
        let opcao = "sair";

        switch(opcao){
            case "Cadastrar":
                console.log("vamos Cadastrar");
                break;
            case "Listar":
                console.log("vamos Listar");
                break;
            case "sair":
                return;
        }
    }
    
}

start();

