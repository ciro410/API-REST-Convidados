const {convidados} = require("../dados/dados")


function tornarCaseSensitive(nome){
    nome = nome[0].toUpperCase() + nome.substr(1).toLowerCase();
    return nome
}

function validarConvidado(nome,indice){
    const convidadoConsultado = convidados.find(convidado=> convidado === tornarCaseSensitive(nome));
    return convidadoConsultado;
}

function consultarConvidado (req,res){
    let nome = req.query.nome
    if(!nome){
        res.status(200)
        res.json(convidados)
    }else{
        if (!validarConvidado(nome)) {
            res.status(400)
            res.json({ mensagem: "O convidado buscado não está presente na lista." });
        }else{
            res.status(200)
            res.json({ mensagem: "Convidado presente." });
        }
    }
}

 function adicionarConvidado (req,res){
    const novoConvidado = tornarCaseSensitive(req.body.nome) 
    if(!validarConvidado(novoConvidado)){
        convidados.push(novoConvidado)
        res.json({
            "mensagem": "Convidado adicionado."
        })
    }else{
        res.json({
            "mensagem": "O nome do convidado a ser adicionado já existe na lista. Caso queria adicionar outro convidado de mesmo nome, favor fornecer o sobrenome também."
        })
    }
}

function deletarConvidado (req,res){
    let nome = req.params.nome;
    const convidadoConsultado = validarConvidado(nome)
    let indice = convidados.indexOf(convidadoConsultado)

    if (! convidadoConsultado) {
        res.json({ mensagem: "O nome do convidado a ser removido não existe na lista. Nenhum convidado foi removido." });
    }else{
        convidados.splice(indice,1)
        res.json({ mensagem: "Convidado removido." });
    }
    

}

module.exports = {
    tornarCaseSensitive,
    validarConvidado,
    consultarConvidado,
    adicionarConvidado,
    deletarConvidado
    
}