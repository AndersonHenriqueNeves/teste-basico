import Professor from '../models/Professor';
import Sala from '../models/Sala';
import * as yup from "yup";

class ProfessorController {
  async store(req, res) {

    const schema = yup.object().shape({
        nome: yup.string().required("Nome é obrigatório"),
    });

    try {
        await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
        return res.json({ message: err.errors[0] });
    }

    const verificandoProfessor = await Professor.findOne(
        {
            where: {
                nome: req.body.nome
            }
        }
    )

    if(verificandoProfessor) {
        return res.status(400).json({ error: 'Professor já cadastrado'});
    }

    if(req.body.id_sala && req.body.id_sala != "Sem sala") {
        const verificandoSala = await Sala.findOne(
            {
                where: {
                    id: req.body.id_sala
                }
            }
        )

        if(!verificandoSala) {
            return res.status(400).json({ error: 'Sala não encontrada'});
        }

        await Professor.create({
            nome: req.body.nome,
            id_sala: req.body.id_sala
        })

        return res.status(201).send();
    } else {
        await Professor.create({
            nome: req.body.nome,
            id_sala: null
        })

        return res.status(201).send();
    }
  }

  async index(req, res) {
    const professores = await Professor.findAll({
        order: [
          'nome'
        ],
        include: [
            {
              model: Sala,
              as: 'sala',
              attributes: ['id', 'nome_sala'],
            },
          ]
      });

    return res.json(professores);
  }

  async getNomeSalas(req, res) {

    const professores = await Professor.findAll({
        order: [
          'nome'
        ],
        include: [
            {
              model: Sala,
              as: 'sala',
              attributes: ['id', 'nome_sala'],
            },
          ]
      });

      let w = 0;
    
      for(var item = 0; item < professores.length; item++) {
        for(var cont = w; cont < professores.length; cont++) {
          if(professores[item].id_sala === professores[cont].id_sala) {
            professores.splice(cont, 1);
          }
        }
        w = w + 1;
      }

    return res.json(professores);
  }

  async delete(req, res) {
    const professor = await Professor.findByPk(req.params.id);

    if (!professor) {
      return res.status(400).json({ error: 'Professor não encontrado' })
    }

    await Professor.destroy({
    where: {
        id: req.params.id
    }
    })

    return res.status(200).send();
  }

  async update(req, res) {
    const professor = await Professor.findByPk(req.params.id);

    if(!professor) {
      return res.status(400).json({error: 'Professor não encontrado'});
    }

    if(req.body.nome) {
        const checandoNome = await Professor.findOne(
            {
                where: {
                    nome: req.body.nome
                }
            }
        )

        if(checandoNome) {
            return res.status(400).json({error: 'Já existe um professor com esse nome'});
          }
    }

    if(req.body.id_sala == undefined) {
        await professor.update({
            nome: req.body.nome
        });

        return res.status(200).send();
    }

    if(req.body.id_sala != "Sem sala") {
        const sala = await Sala.findByPk(req.body.id_sala);

        if(!sala) {
          return res.status(400).json({error: 'Sala não encontrada'});
        }
        
    } else {
        req.body.id_sala = null;
    }

    await professor.update(req.body);

    return res.status(200).send();
  }
};

export default new ProfessorController();