function cadastrosDAO(connection) {
    this._connection = connection;
}

cadastrosDAO.prototype.lista = function(callback) {
    this._connection.query('select * from medicos',callback);
}

cadastrosDAO.prototype.salva = function(medico, callback){
    this._connection.query('insert into medicos set ?', medico, callback);
}

cadastrosDAO.prototype.buscaPorId = function (id,callback) {
    this._connection.query("select * from medicos where id = ?",[id],callback);
}
module.exports = function(){
    return cadastrosDAO;
};
