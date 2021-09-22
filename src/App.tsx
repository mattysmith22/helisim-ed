import './App.css';
import React, {useState} from 'react';
import {Container, Navbar, Tab, Tabs} from 'react-bootstrap';
import BodyTab from './tabs/BodyTab'

function App() {
  return <>
    <PageNavbar/>
    <Body/>
  </>;
}

function PageNavbar() {
  return <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand>
        HeliSim Editor
      </Navbar.Brand>
    </Container>
    </Navbar>
}

function Body() {
  const [key, setKey] = useState('bodyData');

  const handleTabSelect = (tabName: string | null) => {
    if (tabName) {
      setKey(tabName);
    }
  }
  
  
  return <Container><Tabs
    id="body-tabs"
    activeKey={key}
    onSelect={handleTabSelect}
    className="mb-2"
  >

    <Tab eventKey="bodyData" title="Body Data">
      <BodyTab/>
    </Tab>
    
    <Tab eventKey="rotorData" title="Rotor Data">
      <></>
    </Tab>

    <Tab eventKey="wingData" title="Wing Data">
      <p>Stuff and things but about wings</p>
    </Tab>

    <Tab eventKey="engData" title="Engine Data">
      <p>Stuff and things but about rotors</p>
    </Tab>

    <Tab eventKey="airfoilData" title="Airfoil Data">
      <p>Stuff and things but about rotors</p>
    </Tab>

    <Tab eventKey="simOutput" title="Output">
      <p>Stuff and things but about rotors</p>
    </Tab>
  </Tabs></Container>
}



export default App;
