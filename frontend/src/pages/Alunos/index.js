import React , { useEffect, useState }from 'react';

import {
  Container,
  DivAction,
  Title,
  DivButton,
  DivOptions
} from './styles';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import api from '../../services/api';

import Sidebar from '../../components/Sidebar';

import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'


import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

function Alunos() {
  const [alunos, setAlunos] = useState();

  const [professores, setProfessores] = useState();

  const [nomeDoAluno, setNomeDoAluno] = useState('');
  const [novoNomeDoAluno, setNovoNomeDoAluno] = useState('');
  const [idAlunoEditado, setIdAlunoEditado] = useState()

  const [professorDoAluno, setProfessorDoAluno] = useState();
  const [novoProfessorDoAluno, setNovoProfessorDoAluno] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  
  const [estado, setEstado] = useState(false);

  useEffect(() => {
    getAlunos();
    getProfessores();
  }, [estado])

  async function getProfessores() {
    await api.get('/professores/index').then(resp => {
      setProfessores(resp.data);
    }).catch(err => {
      console.log(err.response);
    })
  }

  async function getAlunos() {
    await api.get('/alunos/index').then(resp => {
      setAlunos(resp.data);
    }).catch(err => {
      console.log(err.response);
    })
  }

  async function deleteAluno(id) {
    await api.delete(`/alunos/delete/${id}`).then(resp => {
      toast.success('Aluno deletado com sucesso')
    }).catch(err => {
      console.log(err.response);
    })

    if(estado) {
      setEstado(false);
    } else {
      setEstado(true);
    }
  }

  async function createAluno() {
    const info = {
      nome: nomeDoAluno,
      id_professor: professorDoAluno
    }

    if(!nomeDoAluno|| nomeDoAluno == "" ||typeof nomeDoAluno == undefined || nomeDoAluno == null) {
      return toast.error("Nome do Aluno é obrigatório");
    }

    await api.post(`alunos/store`, info).then(resp => {
      toast.success('Aluno cadastrado com sucesso')
      setIsModalVisible(false)
      setProfessorDoAluno("")
    }).catch(err => {
      toast.error(err.response.data.error)
    })

    if(estado) {
      setEstado(false);
    } else {
      setEstado(true);
    }
  }

  async function updateAluno(id) {

    let infoUpdate;
    
    if((novoNomeDoAluno == "" || typeof novoNomeDoAluno == undefined || novoNomeDoAluno == null) &&
        (novoProfessorDoAluno == "" || typeof novoProfessorDoAluno == undefined || novoProfessorDoAluno == null)
    ) {
      infoUpdate = {
        id_professor: null
      }
    }

    if(novoProfessorDoAluno && novoNomeDoAluno) {
      infoUpdate = {
        nome: novoNomeDoAluno,
        id_professor: novoProfessorDoAluno
      }
    }

    if(novoProfessorDoAluno && !novoNomeDoAluno) {
      infoUpdate = {
        id_professor: novoProfessorDoAluno
      }
    }

    if(novoNomeDoAluno && !novoProfessorDoAluno) {
      infoUpdate = {
        nome: novoNomeDoAluno
      }
    }

    await api.put(`/alunos/update/${id}`, infoUpdate).then(resp => {
      toast.success('Aluno atualizado com sucesso')
      setIsModalUpdateVisible(false)
      setNovoNomeDoAluno("")
      setNovoProfessorDoAluno("")
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
      <Container>
          <Sidebar />
          <DivAction>
          <Title>
            Alunos
          </Title>

          <DivButton>
          <Button variant="danger" style={{height: '50px'}} onClick={() => setIsModalVisible(true)}>Cadastrar Aluno</Button>
        </DivButton>

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Professor</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
              {
                alunos ? (
                  alunos.map((item, index) => {
                    return (
                      <>
                        <tr>
                          {
                            item.professor == null ? (
                              <>
                                <td style={{backgroundColor: '#DB3D44'}}>{item.nome}</td>
                                <td style={{backgroundColor: '#DB3D44'}}></td>
                                <td style={{backgroundColor: '#DB3D44'}}>
                                  <DivOptions>
                                    <MdModeEdit style={{ fontSize: '1.5em', color: 'blue', cursor: 'pointer' }} onClick={() => { setIdAlunoEditado(item.id); setIsModalUpdateVisible(true)}}/>
                                    <AiFillDelete style={{ fontSize: '1.5em', color: 'red', cursor: 'pointer' }} onClick={() => deleteAluno(item.id)}/>
                                  </DivOptions>
                                </td>
                              </>
                            ) : (
                              <>
                                <td>{item.nome}</td>
                                <td>{item.professor.nome}</td>
                                <td>
                                  <DivOptions>
                                    <MdModeEdit style={{ fontSize: '1.5em', color: 'blue', cursor: 'pointer' }} onClick={() => { setIdAlunoEditado(item.id); setIsModalUpdateVisible(true)}}/>
                                    <AiFillDelete style={{ fontSize: '1.5em', color: 'red', cursor: 'pointer' }} onClick={() => deleteAluno(item.id)}/>
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
            <Modal.Title>Cadastro de Aluno</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome do aluno</Form.Label>
                <Form.Control type="text" placeholder="Insira o nome do aluno" onChange={e => setNomeDoAluno(e.target.value)}/>
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Professor</Form.Label>
              <Form.Control as="select" defaultValue="Selecionar" onChange={e => setProfessorDoAluno(e.target.value)}>
              <option value="Selecionar" disabled>Selecionar</option>
              <option value={null}>Sem professor</option>
              { professores.map((item, index) => {
                  return (
                    <option value={item.id}>{item.nome}</option>
                  )
                })}
              </Form.Control>
            </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => createAluno()}>Salvar</Button>
          </Modal.Footer>
        </Modal>
        ) : null}

      {isModalUpdateVisible ? (
        <Modal show={isModalUpdateVisible} fullscreen={true} onHide={() => setIsModalUpdateVisible(false)}>
          <Modal.Header closeButton>
            <div style={{flexDirection: 'column'}}>
              <Modal.Title>Edição de Aluno</Modal.Title>
              <small>Preencha apenas o(s) campo(s) que você deseja editar</small>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome do aluno</Form.Label>
                <Form.Control type="text" placeholder="Insira o nome do aluno" onChange={e => setNovoNomeDoAluno(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Professor</Form.Label>
              <Form.Control as="select" defaultValue="Selecionar" onChange={e => setNovoProfessorDoAluno(e.target.value)}>
              <option value="Selecionar" disabled>Selecionar</option>
              <option value={null}>Sem professor</option>
              { professores.map((item, index) => {
                  return (
                    <option value={item.id}>{item.nome}</option>
                  )
                })}
              </Form.Control>
            </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => updateAluno(idAlunoEditado)}>Salvar</Button>
          </Modal.Footer>
        </Modal>
      ) : null}
      </Container>
  );
}

export default Alunos;