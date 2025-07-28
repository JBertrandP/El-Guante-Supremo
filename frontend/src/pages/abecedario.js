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
    console.log('Llamando a:', `${API_URL}/alphabet_ids`);
    axios.get(`${API_URL}/alphabet_ids`, {
      headers:{
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      console.log("Respuesta:", res.data);
      if (res.data && Array.isArray(res.data.alphabet)) {
        setAlphabetList(res.data.alphabet);
      } else {
        console.warn("No se recibió un alfabeto válido:", res.data);
      }
    })
    .catch((err) => {
      console.error('Error al obtener datos:', err);
    });
}, []);



  const handleShow = async (item) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/alphabet/${item._id}`);
      console.log('Respuesta: ', res.data)
      setModalData(res.data);
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
              {Array.isArray(alphabetList) && alphabetList.length > 0 ? (
                alphabetList.map((letter) => (
              <div className="grid-abc text-center" key={letter._id}>
                <Button className='btn-abc' onClick={() => handleShow(letter._id)}>
                  {letter.letter}
                </Button>
              </div>
              ))
            ):(
            <p className="text-muted">Cargando alfabeto...</p>
            )}
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