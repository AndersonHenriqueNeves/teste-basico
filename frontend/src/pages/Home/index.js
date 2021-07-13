import React, { useEffect, useState, useCallback, useRef } from "react";

import api from '../../services/api';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


import { SiGoogleclassroom } from "react-icons/si";
import { GiTeacher } from "react-icons/gi";
import { FaUserGraduate } from "react-icons/fa";

import {
  Container,
  DivButtons,
  DivImageSalas,
  DivImageProfessores,
  DivImageAluno
} from './styles';

import { useHistory } from 'react-router-dom';

export default function Home() {
  const history = useHistory();
  
  return (
    <Container>
      <Card style={{ width: '50vw', height: '50vh', backgroundColor: '#EDEFF2' }}>
        <DivButtons>
            <DivImageSalas>
                <Button variant="danger" style={{width: '100%', height: '60%'}} onClick={() => history.push('/salas')}>
                    <SiGoogleclassroom style={{fontSize: '2em', marginRight: '10px'}} />
                    Salas
                </Button>
            </DivImageSalas>

            <DivImageProfessores>
                <Button variant="danger" style={{width: '100%', height: '60%'}} onClick={() => history.push('/professores')}>
                    <GiTeacher style={{fontSize: '2em', marginRight: '10px'}} />
                    Professores
                </Button>
            </DivImageProfessores>

            <DivImageAluno>
                <Button variant="danger" style={{marginBottom: '10px', width: '100%', height: '60%'}} onClick={() => history.push('/alunos')}>
                    <FaUserGraduate style={{fontSize: '2em', marginRight: '10px'}} />
                    Alunos
                </Button>
            </DivImageAluno>
        </DivButtons>
      </Card>
    </Container>
  );
};


