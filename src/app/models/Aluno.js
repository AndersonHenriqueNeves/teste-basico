import Sequelize, { Model } from 'sequelize';

class Aluno extends Model {
  static init(sequelize) {
    super.init({
      nome: Sequelize.STRING,
    },{
      sequelize,
      tableName: 'alunos'
    });
    
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Professor, { foreignKey: 'id_professor', as: 'professor'});
  }
}

export default Aluno;