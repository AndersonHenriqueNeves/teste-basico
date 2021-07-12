import Sequelize, { Model } from 'sequelize';

class Professor extends Model {
  static init(sequelize) {
    super.init({
      nome: Sequelize.STRING,
    },{
      sequelize,
      tableName: 'professores'
    });
    
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Sala, { foreignKey: 'id_sala', as: 'sala'});
    this.hasOne(models.Aluno, { foreignKey: 'id_professor', as: 'professor'});
  }
}

export default Professor;