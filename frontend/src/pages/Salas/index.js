import React, { useEffect, useState } from "react";

import api from '../../services/api';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import {
  ContainerDiv,
  DivAction,
  Title,
  DivButton,
  DivOptions
} from './styles';

import Sidebar from '../../components/Sidebar';
import Button from 'react-bootstrap/Button'

import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

import { useHistory } from 'react-router-dom';

export default function Salas() {
  
  const [salas, setSalas] = useState();
  const [estado, setEstado] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);

  const [nomeDaSala, setNomeDaSala] = useState('');
  const [novoNomeDaSala, setNovoNomeDaSala] = useState('');
  const [idSalaEditada, setIdSalaEditada] = useState();

  useEffect(() => {
    getSalas();
  }, [estado])

  async function getSalas() {
    await api.get('/salas/index').then(resp => {
      setSalas(resp.data);
    }).catch(err => {
      console.log(err.response);
    })
  }

  async function deleteSala(id) {
    await api.delete(`/salas/delete/${id}`).then(resp => {
      toast.success('Sala deletada com sucesso')
    }).catch(err => {
      console.log(err.response);
    })

    if(estado) {
      setEstado(false);
    } else {
      setEstado(true);
    }
  }

  async function createSala() {
    const info = {
      nome_sala: nomeDaSala
    }

    if(nomeDaSala == "" || typeof nomeDaSala == undefined || nomeDaSala == null) {
      return toast.error("Nome da Sala é obrigatório");
    }

    await api.post(`/salas/store`, info).then(resp => {
      toast.success('Sala criada com sucesso')
      setIsModalVisible(false)
    }).catch(err => {
      toast.error(err.response.data.error)
    })

    if(estado) {
      setEstado(false);
    } else {
      setEstado(true);
    }
  }

  async function updateSala(id) {
    const infoUpdate = {
      nome_sala: novoNomeDaSala
    }

    if(novoNomeDaSala == "" || typeof novoNomeDaSala == undefined || novoNomeDaSala == null) {
      return toast.error("Nome da Sala é obrigatório");
    }

    await api.put(`/salas/update/${id}`, infoUpdate).then(resp => {
      toast.success('Sala atualizada com sucesso')
      setIsModalUpdateVisible(false)
    }).catch(err => {
      toast.error(err.response.data.error)
    })

    if(estado) {
      setEstado(false);
    } else {
      setEstado(true);
    }
  }

  return (
    <ContainerDiv>
      <Sidebar />

      <DivAction>
        <Title>
          Salas
        </Title>
        
        <DivButton>
          <Button variant="danger" style={{height: '50px'}} onClick={() => setIsModalVisible(true)}>Cadastrar Sala</Button>
        </DivButton>

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
              {
                salas ? (
                  salas.map((item, index) => {
                    return (
                      <>
                        <tr>
                          <td>{item.nome_sala}</td>
                          <td>
                            <DivOptions>
                              <MdModeEdit style={{ fontSize: '1.5em', color: 'blue', cursor: 'pointer' }} onClick={() => { setIdSalaEditada(item.id); setIsModalUpdateVisible(true)}} />
                              <AiFillDelete style={{ fontSize: '1.5em', color: 'red', cursor: 'pointer' }} onClick={() => deleteSala(item.id)} />
                            </DivOptions>
                          </td>
                        </tr>
                      </>
                    )
                  })
                ) : null
              }
          </tbody>
        </Table>
      </DivAction>

      {isModalVisible ? (
        <Modal show={isModalVisible} fullscreen={true} onHide={() => setIsModalVisible(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Cadastro de Sala</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome da sala</Form.Label>
                <Form.Control type="text" placeholder="Insira o nome da sala" onChange={e => setNomeDaSala(e.target.value)}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => createSala()}>Salvar</Button>
          </Modal.Footer>
        </Modal>
        ) : null}

      {isModalUpdateVisible ? (
        <Modal show={isModalUpdateVisible} fullscreen={true} onHide={() => setIsModalUpdateVisible(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edição de Sala</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome da sala</Form.Label>
                <Form.Control type="text" placeholder="Insira o nome da sala" onChange={e => setNovoNomeDaSala(e.target.value)} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => updateSala(idSalaEditada)}>Salvar</Button>
          </Modal.Footer>
        </Modal>
      ) : null}

    </ContainerDiv>
  );
};


