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

    if(req.body.id_professor) {
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

  async index(req, res) {
    const alunos = await Aluno.findAll();

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

    if(req.body.id_professor) {
        const professor = await Professor.findByPk(req.body.id_professor);

        if(!professor) {
          return res.status(400).json({error: 'Professor não encontrado'});
        }
    }

    await aluno.update(req.body);

    return res.status(200).send();
  }
};

export default new AlunoController();