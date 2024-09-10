// hello world

const mensagem = "olá mundo";


{
    const mensagem = "definição de escopo";
    console.log(mensagem);
}
for (let i = 0; i < 5; i++) {
    console.log(mensagem);
}

// arrays, objetos
let lista = ["filipe", "olá"];
console.log(lista[1] + " " + lista[0]);

let meta = {
    value: "ler um livro todo mês",
    checked: false,
    isChecked: (infos) => {
        console.log(infos);
    }
}

meta.isChecked(meta.value);

// funções
let a = 3;
let b = 5;
function soma(a, b) {
    return a + b;
}
let c = soma(a,b);
console.log(c);

