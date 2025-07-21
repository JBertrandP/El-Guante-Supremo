import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CustomNavbar from '../components/navbar';
import Footer from '../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/abecedario.css';

const data = [
  {
    "letra": "A",
    "imagen": "https://placehold.co/400",
    "descripcion": "La mano se cierra dejando el pulgar hacia un lado, similar a un puño."
  },
  {
    "letra": "B",
    "imagen": "https://placehold.co/400",
    "descripcion": "La palma abierta con los dedos juntos apuntando hacia arriba."
  },
  {
    "letra": "C",
    "imagen": "https://placehold.co/400",
    "descripcion": "La mano forma una curva como si se sujetara una lata imaginaria."
  },
  {
    "letra": "D",
    "imagen": "https://placehold.co/400",
    "descripcion": "El índice apunta hacia arriba mientras los otros dedos tocan el pulgar formando una 'D'."
  },
  {
    "letra": "E",
    "imagen": "https://placehold.co/400",
    "descripcion": "Los dedos se flexionan hacia la palma sin tocarla del todo, como si se formara una garra."
  },
  {
    "letra": "F",
    "imagen": "https://placehold.co/400",
    "descripcion": "El pulgar y el índice se tocan formando un círculo, los demás dedos extendidos."
  },
  {
    "letra": "G",
    "imagen": "https://placehold.co/400",
    "descripcion": "La mano se coloca de perfil con el índice extendido y el pulgar apuntando al frente."
  },
  {
    "letra": "H",
    "imagen": "https://placehold.co/400",
    "descripcion": "El índice y el medio se extienden juntos, los demás dedos doblados hacia la palma."
  },
  {
    "letra": "I",
    "imagen": "https://placehold.co/400",
    "descripcion": "Solo el meñique se extiende hacia arriba, los demás dedos están cerrados."
  },
  {
    "letra": "J",
    "imagen": "https://placehold.co/400",
    "descripcion": "Se usa el meñique extendido para trazar una 'J' en el aire."
  }
];

function Abecedario() {
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleShow = (item) => {
    setModalData(item);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <div className='layout-abc'>
      <CustomNavbar />

      <main>
        <div className='banner-abc'>
          <div className='loader'>
            <span>A</span>
            <span>B</span>
            <span>E</span>
            <span>C</span>
            <span>E</span>
            <span>D</span>
            <span>A</span>
            <span>R</span>
            <span>I</span>
            <span>O</span>
          </div>
          <p>
            <a className='abajo-abc' type='button' href='#abecedario'>
              <i className="fas fa-chevron-down fa-lg"></i>
            </a>
          </p>
        </div>

        <div className='abecedario' id='abecedario'>
          <div className='titulo-abc'>
            <p>Haz clic en una letra para descubrir cómo se hace.</p>
          </div>

          <div className='main-grid-abc'>
              {data.map((item, index) => (
              <div className="grid-abc text-center" key={index}>
                <Button className='btn-abc' onClick={() => handleShow(item)}>
                  {item.letra}
                </Button>
              </div>
              ))}
          </div>
        </div>

      <Modal className='modal-abc' show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className='modal-abc-title'>¿Cómo se hace la letra "{modalData.letra}"?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={modalData.imagen} alt={modalData.letra} className="modal-img-abc" />
          <p className='modal-abc-text'>{modalData.descripcion}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className='modal-btn-close' onClick={handleClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
      </main>

      <Footer />
    </div>
  );
}

export default Abecedario;