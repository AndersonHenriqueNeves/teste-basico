import { Router } from 'express';

import SalaController from './app/controllers/SalaController';
import ProfessorController from './app/controllers/ProfessorController';
import AlunoController from './app/controllers/AlunoController';

const routes = new Router();

routes.post('/salas/store', SalaController.store);
routes.get('/salas/index', SalaController.index);
routes.put('/salas/update/:id', SalaController.update);
routes.delete('/salas/delete/:id', SalaController.delete);

routes.post('/professores/store', ProfessorController.store);
routes.get('/professores/index', ProfessorController.index);
routes.put('/professores/update/:id', ProfessorController.update);
routes.delete('/professores/delete/:id', ProfessorController.delete);
routes.get('/professores/getNomeSalas', ProfessorController.getNomeSalas);

routes.post('/alunos/store', AlunoController.store);
routes.get('/alunos/index', AlunoController.index);
routes.put('/alunos/update/:id', AlunoController.update);
routes.delete('/alunos/delete/:id', AlunoController.delete);
routes.get('/alunos/getNomeProfessores', AlunoController.getNomeProfessores);

export default routes;