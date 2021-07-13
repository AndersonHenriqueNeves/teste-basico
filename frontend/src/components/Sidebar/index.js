import React from 'react';

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';


import { SiGoogleclassroom } from "react-icons/si";
import { GiTeacher } from "react-icons/gi";
import { FaUserGraduate } from "react-icons/fa";

import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import { useHistory } from 'react-router-dom';

function Sidebar() {
    const history = useHistory();
    
    return (
        <SideNav
        >
            <SideNav.Toggle />
            <SideNav.Nav>
                <NavItem eventKey="Salas" onClick={() => history.push("/salas")}>
                    <NavIcon>
                        <SiGoogleclassroom style={{ fontSize: '2em' }} />
                    </NavIcon>
                    <NavText>
                        Salas
                    </NavText>
                </NavItem>
                <NavItem eventKey="professores" onClick={() => history.push("/professores")}>
                    <NavIcon>
                        <GiTeacher className="fa fa-fw fa-line-chart" style={{ fontSize: '2em' }} />
                    </NavIcon>
                    <NavText>
                        Professores
                    </NavText>
                </NavItem>
                <NavItem eventKey="alunos" onClick={() => history.push("/alunos")}>
                    <NavIcon>
                        <FaUserGraduate className="fa fa-fw fa-line-chart" style={{ fontSize: '2em' }} />
                    </NavIcon>
                    <NavText>
                        Alunos
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    );
}

export default Sidebar;