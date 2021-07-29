import Sala from '../models/Sala';
import * as yup from "yup";

class SalaController {
  async store(req, res) {

    const schema = yup.object().shape({
        nome_sala: yup.string().required("Nome da sala é obrigatório"),
    });

    try {
        await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
        return res.json({ message: err.errors[0] });
    }

    const verificandoSala = await Sala.findOne(
        {
            where: {
                nome_sala: req.body.nome_sala
            }
        }
    )

    if(verificandoSala) {
        return res.status(400).json({ error: 'Sala já cadastrada'});
    }

    await Sala.create({
        nome_sala: req.body.nome_sala
    })

    return res.status(201).send();
  }

  async index(req, res) {
    const salas = await Sala.findAll({
      order: [
        'nome_sala'
      ],
    });

    return res.json(salas);
  }

  async delete(req, res) {
    const sala = await Sala.findByPk(req.params.id);

    if (!sala) {
      return res.status(400).json({ error: 'Sala não encontrada' })
    }

    await Sala.destroy({
    where: {
        id: req.params.id
    }
    })

    return res.status(200).send();
  }

  async update(req, res) {
    const sala = await Sala.findByPk(req.params.id);

    if(!sala) {
      return res.status(400).json({error: 'Sala não encontrada'});
    }

    const checandoSala = await Sala.findOne(
      {
        where: {
          nome_sala: req.body.nome_sala
        }
      }
    )

    if(checandoSala) {
      return res.status(400).json({error: 'O nome dessa sala já existe'});
    }

    await sala.update(req.body);

    return res.status(200).send();
  }

  async getById(req, res) {
    const sala = await Sala.findOne({
      where: {
        id: req.params.id
      }
    })

    return res.json(sala);
  }
};

export default new SalaController();