import Sequelize, { Model } from 'sequelize';

class Sala extends Model {
  static init(sequelize) {
    super.init({
      nome_sala: Sequelize.STRING,
    },{
      sequelize,
      tableName: 'salas'
    });
    
    return this;
  }

  static associate(models) {
    this.hasOne(models.Professor, { foreignKey: 'id_sala', as: 'sala'});
  }
}

export default Sala;