// hello world

const mensagem = "olá mundo";


{
    const mensagem = "definição de escopo";
    console.log(mensagem);
}
for (let i = 0; i < 5; i++) {
    console.log(mensagem);
}