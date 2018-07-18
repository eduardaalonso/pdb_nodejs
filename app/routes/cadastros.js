module.exports = function(app){

    var listaCadastros = function(req, res) {
        var connection = app.infra.connectionFactory();
        var cadastrosDAO = new app.infra.cadastrosDAO(connection);

        cadastrosDAO.lista(function(err, results) {
            res.render('cadastros/lista', {lista: results});
        });

        connection.end();
    }

    app.get('/central/listagem', listaCadastros);


    app.get("/central/form", function(req,res){
        res.render('cadastros/form');
    });


    app.post('/central/form', function(req, res) {
        var medico = req.body;
        console.log(medico);

        req.assert('crm', 'CRM é obrigatório').notEmpty();
        req.assert('nome', 'Nome é obrigatório').notEmpty();
        req.assert('data_nascimento', 'Data de nascimento é obrigatório').notEmpty();
        req.assert('endereco_1', 'Endereço é obrigatório').notEmpty();
        req.assert('telefone_1', 'Telefone é obrigatório').notEmpty();
        req.assert('especialidade', 'Especialidade é obrigatório').notEmpty();

        var erros = req.validationErrors();
    
        if(erros) {
            res.status(400).render('cadastros/form', {errosValidacao:erros});
            console.log(erros);
            return;
        }
        
        var connection = app.infra.connectionFactory();
        var cadastrosDAO = new app.infra.cadastrosDAO(connection);

        cadastrosDAO.salva(medico, function(err, results) {
            console.log(erros);
            res.redirect('/central/listagem');
        });

        connection.end();
    });


    app.get("/central/listagem/:id",function(req,res) {
        var connection = app.infra.connectionFactory();
        var cadastrosDao = new app.infra.cadastrosDao(connection);

        cadastrosDao.buscaPorId(req.params.id,function(error,results,fields){
            if(results.length == 0){
                res.status(404).send();
                return ;
            }
            res.json(results);
        });

        connection.end();
    });
}

