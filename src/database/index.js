import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Sala from '../app/models/Sala';
import Professor from '../app/models/Professor';
import Aluno from '../app/models/Aluno';

const connection = new Sequelize(databaseConfig);

Sala.init(connection);
Professor.init(connection);
Aluno.init(connection);

Sala.associate(connection.models);
Professor.associate(connection.models);
Aluno.associate(connection.models);

module.exports = connection;

