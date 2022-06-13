const express = require('express')
const app = express();
app.use(express.json());

const convidados = ["Carlos", "Amanda", "Fernanda", "Juliana", "Lucas", "Roberto"];

function tornarCaseSensitive(nome){
    nome = nome[0].toUpperCase() + nome.substr(1).toLowerCase();
    return nome
}

function consultarConvidado(nome,indice){
    const convidadoConsultado = convidados.find(convidado=> convidado === tornarCaseSensitive(nome));
    return convidadoConsultado;
}



app.get('/convidados',(req,res)=>{
    let nome = req.query.nome
    if(!nome){
        res.json(convidados)
    }else{
        if (!consultarConvidado(nome)) {
            res.json({ mensagem: "O convidado buscado não está presente na lista." });
        }else{
            res.json({ mensagem: "Convidado presente." });
        }
    }
})

app.post('/convidados',(req,res)=>{
    const novoConvidado = req.body.nome
    if(!consultarConvidado(novoConvidado)){
        convidados.push(novoConvidado)
        res.json({
            "mensagem": "Convidado adicionado."
        })
    }else{
        res.json({
            "mensagem": "O nome do convidado a ser adicionado já existe na lista. Caso queria adicionar outro convidado de mesmo nome, favor fornecer o sobrenome também."
        })
    }
})

app.delete('/convidados/:nome',(req,res)=>{
    let nome = req.params.nome;
    const convidadoConsultado = consultarConvidado(nome)
    let indice = convidados.indexOf(convidadoConsultado)

    if (! convidadoConsultado) {
        res.json({ mensagem: "O nome do convidado a ser removido não existe na lista. Nenhum convidado foi removido." });
    }else{
        convidados.splice(indice,1)
        res.json({ mensagem: "Convidado removido." });
    }
    

})




app.listen(8000)