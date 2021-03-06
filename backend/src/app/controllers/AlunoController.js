import Aluno from '../models/Aluno';
import Professor from '../models/Professor';
import * as yup from "yup";

class AlunoController {
  async store(req, res) {

    const schema = yup.object().shape({
        nome: yup.string().required("Nome é obrigatório"),
    });

    try {
        await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
        return res.json({ message: err.errors[0] });
    }

    const verificandoAluno = await Aluno.findOne(
        {
            where: {
                nome: req.body.nome
            }
        }
    )

    if(verificandoAluno) {
        return res.status(400).json({ error: 'Aluno já cadastrado'});
    }

    if(req.body.id_professor && req.body.id_professor != "Sem professor") {
        const verificandoProfessor = await Professor.findOne(
            {
                where: {
                    id: req.body.id_professor
                }
            }
        )

        if(!verificandoProfessor) {
            return res.status(400).json({ error: 'Professor não encontrado'});
        }

        await Aluno.create({
            nome: req.body.nome,
            id_professor: req.body.id_professor
        })

        return res.status(201).send();
    } else {
        await Aluno.create({
            nome: req.body.nome,
            id_professor: null
        })

        return res.status(201).send();
    }
  }

  async getNomeProfessores(req, res) {

    const alunos = await Aluno.findAll({
      order: [
        'nome'
      ],
      include: [
          {
            model: Professor,
            as: 'professor',
            attributes: ['id', 'nome'],
          },
        ]
    });

    let w = 0;
    
    for(var item = 0; item < alunos.length; item++) {
      for(var cont = w; cont < alunos.length; cont++) {
        if(alunos[item].id_professor === alunos[cont].id_professor) {
          alunos.splice(cont, 1);
        }
      }
      w = w + 1;
    }

    return res.json(alunos);
  }

  async getById(req, res) {
    const aluno = await Aluno.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Professor,
          as: 'professor',
          attributes: ['id', 'nome'],
        },
      ]
    })

    if(!aluno) {
      return res.status(400).json({ error: 'Aluno não encontrado' })
    }

    return res.json(aluno);
  }

  async index(req, res) {
    const alunos = await Aluno.findAll({
        order: [
          'nome'
        ],
        include: [
            {
              model: Professor,
              as: 'professor',
              attributes: ['id', 'nome'],
            },
          ]
      });

    return res.json(alunos);
  }

  async delete(req, res) {
    const aluno = await Aluno.findByPk(req.params.id);

    if (!aluno) {
      return res.status(400).json({ error: 'Aluno não encontrado' })
    }

    await Aluno.destroy({
    where: {
        id: req.params.id
    }
    })

    return res.status(200).send();
  }

  async update(req, res) {
    const aluno = await Aluno.findByPk(req.params.id);

    if(!aluno) {
      return res.status(400).json({error: 'Aluno não encontrado'});
    }

    if(req.body.nome) {
        const checandoNome = await Aluno.findOne(
            {
                where: {
                    nome: req.body.nome
                }
            }
        )

        if(checandoNome) {
            return res.status(400).json({error: 'Já existe um aluno com esse nome'});
          }
    }

    if(req.body.id_professor == undefined) {
      await aluno.update({
          nome: req.body.nome
      });

      return res.status(200).send();
    }

    if(req.body.id_professor != "Sem professor") {
        const professor = await Professor.findByPk(req.body.id_professor);

        if(!professor) {
          return res.status(400).json({error: 'Professor não encontrado'});
        }
    } else {
      req.body.id_professor = null;
    }

    await aluno.update(req.body);

    return res.status(200).send();
  }
};

export default new AlunoController();