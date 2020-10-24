import React, { useState, useReducer } from "react";

import { Form, Toast, Container, Jumbotron, Button } from "react-bootstrap";
import "./App.css";

import { initialState } from "./constants";
import { actions } from "./actions";
import { reducer } from "./reducer";

const ExampleToast = ({ children }) => {
  const [show, toggleShow] = useState(false);

  return (
    <>
      {!show && <Button onClick={() => toggleShow(true)}>Enviar</Button>}
      <Toast show={show} onClose={() => toggleShow(false)}>
        <Toast.Header>
          <strong className="mr-auto">Gracias por llenar el formulario </strong>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const saveData = (e) => {
    let { name, value } = e.target;
    dispatch({ type: actions.saveData, name, payload: value });
  };

  console.log("Datos:", state.data);
  return (
    <Container className="cont">
        <h1 className="header">Bienvenido al calculador de ejercicio inador</h1>
        <br />
        <h3>Por favor, complete los siguientes campos</h3>

        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="name"
              type="name"
              placeholder="Ingrese su nombre"
              onChange={saveData}
              value={state.data.name}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Ingrese su correo electrónico"
              onChange={saveData}
              value={state.data.email}
            />
          </Form.Group>

          <Form.Group controlId="formBasicKilometer">
            <Form.Label>Kilometros</Form.Label>
            <Form.Control
              name="km"
              type="kilometer"
              onChange={saveData}
              value={state.data.kilometers}
              placeholder="ingrese los kilometros que camina al día"
            />
          </Form.Group>
        </Form>
        <ExampleToast>
          Hola {state.data.name} <br />
          {state.data.km >= 4
            ? "¡EXCELENTE! Eres una persona muy activa"
            : "¡QUE MAL! Debes caminar mas al dia"}
          <br />
          Te enviaremos un reporte general a {state.data.email} <br />
        </ExampleToast>
    </Container>
  );
};
export default App;
