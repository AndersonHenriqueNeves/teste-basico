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

    let arrProfessores = [];
    let i;
    let k;
    let b;
    let w = 1;
    for(i = 0; i < professores.length; i++) {
      if(arrProfessores.length > 0) {
        for(k = w; k < arrProfessores.length; k++) {
          if(arrProfessores[k].id_sala == professores[i].id_sala) {
            b = "para";
          }
          if(professores[i].id_sala != null && b != "para") {
            arrProfessores.push(professores[i])
          }
        }
      } else {
        if(professores[i].sala != null) {
          arrProfessores.push(professores[i])
        }
      }
      w = w + 1;
    }

    return res.json(arrProfessores);
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