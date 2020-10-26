import React, { useState, useReducer } from "react";

import { Form, Toast, Container, Button, Row, Modal } from "react-bootstrap";
import "./App.css";

import { initialState } from "./constants";
import { actions } from "./actions";
import { reducer } from "./reducer";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sendName, setName] = useState(false);
  const [sendEmail, setEmail] = useState(false);
  const [sendKm, setKm] = useState(false);

  const saveData = (e) => {
    let { name, value } = e.target;
    if (name === "name") {
      if (value.length === 0) {
        setName(true);
      } else {
        setName(false);
      }
    }

    if (name === "email") {
      if (value.length === 0) {
        setEmail(true);
      } else {
        setEmail(false);
      }
    }

    if (name === "km") {
      if (value.length === 0) {
        setKm(true);
      } else {
        setKm(false);
      }
    }

    if (value.length === 0) {
      saveData(true);
    } else {
      saveData(false);
    }

    dispatch({ type: actions.saveData, name, payload: value });
  };

  const hideModal = () => {
    dispatch({ type: actions.toggleModal });
  };

  const showModal = (id) => {
    dispatch({ type: actions.showModal, payload: id });
  };

  console.log("Datos:", state.data);
  return (
    <Container className="cont">
      <Row className="justify-content-center">
        <h1>Bienvenido al calculador de ejercicio inador</h1>
      </Row>
      <br />
      <h3>Por favor, complete los siguientes campos</h3>

      <Form>
        <Form.Group controlId="formBasicEmail">
          {sendName && (
            <p className="mensaje-2" style={{ color: "red", fontSize: "11px" }}>
              Nombre es requerido
            </p>
          )}
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            size="sm"
            name="name"
            type="name"
            placeholder="Ingrese su nombre"
            onChange={saveData}
            value={state.data.name}
            param={sendName}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          {sendName && (
            <p className="mensaje-2" style={{ color: "red", fontSize: "11px" }}>
              Correo electrónico es requerido
            </p>
          )}
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            size="sm"
            name="email"
            type="email"
            placeholder="Ingrese su correo electrónico"
            onChange={saveData}
            value={state.data.email}
            param={sendEmail}
          />
        </Form.Group>

        <Form.Group controlId="formBasicKilometer">
          {sendName && (
            <p className="mensaje-2" style={{ color: "red", fontSize: "11px" }}>
              Kilometros es requerido
            </p>
          )}
          <Form.Label>Kilometros</Form.Label>
          <Form.Control
            size="sm"
            name="km"
            type="kilometer"
            onChange={saveData}
            value={state.data.kilometers}
            placeholder="Ingrese los kilometros que camina al día"
            param={sendKm}
          />
        </Form.Group>
      </Form>
      <Button onClick={() => showModal()}>
        <span className="pcoded-micon">Enviar</span>
      </Button>
      <Modal show={state.showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Hola {state.data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {state.data.km >= 4
            ? "¡EXCELENTE! Eres una persona muy activa"
            : "¡QUE MAL! Debes caminar mas al dia"}
          <br />
          Te enviaremos un reporte general a {state.data.email}
          <br />
          ¡Gracias por usar nuestra app!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={hideModal}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default App;
