import React, { useEffect, useState } from "react";

import api from '../../services/api';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import {
  Container,
  DivAction,
  Title,
  DivButton,
  DivOptions
} from './styles';

import Sidebar from '../../components/Sidebar';

import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

function Professores() {
  const [professores, setProfessores] = useState();

  const [salas, setSalas] = useState();

  const [nomeDoProfessor, setNomeDoProfessor] = useState('');
  const [novoNomeDoProfessor, setNovoNomeDoProfessor] = useState('');
  const [idProfessorEditado, setIdProfessorEditado] = useState()

  const [salaDoProfessor, setSalaDoProfessor] = useState();
  const [novaSalaDoProfessor, setNovaSalaDoProfessor] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  
  const [estado, setEstado] = useState(false);

  useEffect(() => {
    getProfessores();
    getSalas();
  }, [estado])

  async function getSalas() {
    await api.get('/salas/index').then(resp => {
      setSalas(resp.data);
    }).catch(err => {
      console.log(err.response);
    })
  }

  async function getProfessores() {
    await api.get('/professores/index').then(resp => {
      setProfessores(resp.data);
    }).catch(err => {
      console.log(err.response);
    })
  }

  async function deleteProfessor(id) {
    await api.delete(`/professores/delete/${id}`).then(resp => {
      toast.success('Professor deletado com sucesso')
    }).catch(err => {
      console.log(err.response);
    })

    if(estado) {
      setEstado(false);
    } else {
      setEstado(true);
    }
  }

  async function createProfessor() {
    const info = {
      nome: nomeDoProfessor,
      id_sala: salaDoProfessor
    }

    if(!nomeDoProfessor||typeof nomeDoProfessor == undefined || nomeDoProfessor == null) {
      return toast.error("Nome do Professor é obrigatório");
    }

    await api.post(`professores/store`, info).then(resp => {
      toast.success('Professor cadastrado com sucesso')
      setIsModalVisible(false)
      setSalaDoProfessor("")
    }).catch(err => {
      toast.error(err.response.data.error)
    })

    if(estado) {
      setEstado(false);
    } else {
      setEstado(true);
    }
  }
  
  async function updateProfessor(id) {
    let infoUpdate;

    if((novoNomeDoProfessor == "" || typeof novoNomeDoProfessor == undefined || novoNomeDoProfessor == null) &&
        (novaSalaDoProfessor == "" || typeof novaSalaDoProfessor == undefined || novaSalaDoProfessor == null)
    ) {
      infoUpdate = {
        id_sala: null
      }
    }

    if(novaSalaDoProfessor && novoNomeDoProfessor) {
      infoUpdate = {
        nome: novoNomeDoProfessor,
        id_sala: novaSalaDoProfessor
      }
    }

    if(novaSalaDoProfessor && !novoNomeDoProfessor) {
      infoUpdate = {
        id_sala: novaSalaDoProfessor
      }
    }

    if(novoNomeDoProfessor && !novaSalaDoProfessor) {
      infoUpdate = {
        nome: novoNomeDoProfessor
      }
    }

    await api.put(`/professores/update/${id}`, infoUpdate).then(resp => {
      toast.success('Professor atualizado com sucesso')
      setIsModalUpdateVisible(false)
      setNovoNomeDoProfessor("")
      setNovaSalaDoProfessor("")
    }).catch(err => {
      toast.error(err.response.data.error)
    })

    if(estado) {
      setEstado(false);
    } else {
      setEstado(true);
    }
  }

  return(
    <Container>
        <Sidebar />

        <DivAction>
          <Title>
            Professores
          </Title>

          <DivButton>
          <Button variant="danger" style={{height: '50px'}} onClick={() => setIsModalVisible(true)}>Cadastrar Professor</Button>
        </DivButton>

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Sala</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
              {
                professores ? (
                  professores.map((item, index) => {
                    return (
                      <>
                        <tr>
                          {
                            item.sala == null ? (
                              <>
                                <td style={{backgroundColor: '#add8e6'}}>{item.nome}</td>
                                <td style={{backgroundColor: '#add8e6'}}></td>
                                <td style={{backgroundColor: '#add8e6'}}>
                                  <DivOptions>
                                    <MdModeEdit style={{ fontSize: '1.5em', color: 'blue', cursor: 'pointer' }} onClick={() => { setIdProfessorEditado(item.id); setIsModalUpdateVisible(true)}}/>
                                    <AiFillDelete style={{ fontSize: '1.5em', color: 'red', cursor: 'pointer' }} onClick={() => deleteProfessor(item.id)}/>
                                  </DivOptions>
                                </td>
                              </>
                            ) : (
                              <>
                                <td>{item.nome}</td>
                                <td>{item.sala.nome_sala}</td>
      
                                <td>
                                  <DivOptions>
                                    <MdModeEdit style={{ fontSize: '1.5em', color: 'blue', cursor: 'pointer' }} onClick={() => { setIdProfessorEditado(item.id); setIsModalUpdateVisible(true)}}/>
                                    <AiFillDelete style={{ fontSize: '1.5em', color: 'red', cursor: 'pointer' }} onClick={() => deleteProfessor(item.id)}/>
                                  </DivOptions>
                                </td>
                              </>
                            )
                          }
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
            <Modal.Title>Cadastro de Professor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome do professor</Form.Label>
                <Form.Control type="text" placeholder="Insira o nome do professor" onChange={e => setNomeDoProfessor(e.target.value)}/>
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Sala</Form.Label>
              <Form.Control as="select" defaultValue="Selecionar" onChange={e => setSalaDoProfessor(e.target.value)}>
              <option value="Selecionar" disabled>Selecionar</option>
              <option value={null}>Sem sala</option>
              { salas.map((item, index) => {
                  return (
                    <option value={item.id}>{item.nome_sala}</option>
                  )
                })}
              </Form.Control>
            </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => createProfessor()}>Salvar</Button>
          </Modal.Footer>
        </Modal>
        ) : null}

      {isModalUpdateVisible ? (
        <Modal show={isModalUpdateVisible} fullscreen={true} onHide={() => setIsModalUpdateVisible(false)}>
          <Modal.Header closeButton>
            <div style={{flexDirection: 'column'}}>
              <Modal.Title>Edição de Professor</Modal.Title>
              <small>Preencha apenas o(s) campo(s) que você deseja editar</small>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome do professor</Form.Label>
                <Form.Control type="text" placeholder="Insira o nome do professor" onChange={e => setNovoNomeDoProfessor(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Sala</Form.Label>
              <Form.Control as="select" defaultValue="Selecionar" onChange={e => setNovaSalaDoProfessor(e.target.value)}>
              <option value="Selecionar" disabled>Selecionar</option>
              <option value={null}>Sem sala</option>
              { salas.map((item, index) => {
                  return (
                    <option value={item.id}>{item.nome_sala}</option>
                  )
                })}
              </Form.Control>
            </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => updateProfessor(idProfessorEditado)}>Salvar</Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </Container>
  );
}

export default Professores;