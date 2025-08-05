import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import CustomNavbar from '../components/navbar';
import Footer from '../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/abecedario.css';

function Abecedario() {
  const [alphabetList, setAlphabetList] = useState([]);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({
    letter: '',
    explanation: '',
    image:'',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
  axios.get(`${API_URL}/alphabet_ids`, {
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Accept': 'application/json',
    }
  })
  .then((response) => {
    if (Array.isArray(response.data.alphabet)) {
      setAlphabetList(response.data.alphabet);
    } else {
      setError('Respuesta inválida del servidor.');
    }
  })
  .catch((error) => {
    console.error('Error al obtener el alfabeto:', error);
    setError('Error de red o de backend.');
  });
}, []);

  const handleShow = async (item) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/alphabet/${item._id}`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Accept': 'application/json',
        }
      });
      console.log('Respuesta: ', res.data.letter_info)
      setModalData(res.data.letter_info);
      setShow(true);
    } catch (err) {
      console.error('Error al obtener detalles de letra:', err);
    }
    setLoading(false);
  };

  const handleClose = () => setShow(false);

  return (
    <div className='layout-abc'>
      <CustomNavbar />

      <main>
        <div className='banner-abc'>
          <div className='loader-abc'>
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
              {alphabetList.map((letter) => (
              <div className="grid-abc text-center" key={letter._id}>
                <Button className='btn-abc' onClick={() => handleShow(letter)}>
                  {letter.letter}
                </Button>
              </div>
              ))
              }
          </div>
        </div>

      <Modal className='modal-abc' show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className='modal-abc-title'>
            {modalData?.letter 
              ? `¿Cómo se hace la letra "${modalData.letter}"?` 
              : "Cargando..."}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
      <p>Cargando información...</p>
    ) : (
      <>
        {modalData?.image && (
          <img
            src={modalData.image}
            alt={modalData.letter}
            className="modal-img-abc"
          />
        )}
        <p className='modal-abc-text'>
          {modalData.explanation || "Descripción no disponible."}
        </p>
      </>
      )}
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