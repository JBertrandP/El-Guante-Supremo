import {useState, useEffect} from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import CustomNavbar from '../components/navbar';
import Footer from '../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/diccionario.css';

function Diccionario(){
  const [wordsList, setWordsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const [modalFrases, setModalFrases] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/dictionary/${currentPage}`,{
      headers:{
        'ngrok-skip-browser-warning': 'true',
        'Accept': 'application/json',
      }
    })
    .then((response) => {
      if (Array.isArray(response.data)){
        setWordsList(response.data);
      } else {
        setError('Respuesta invalida del server');
      }
    })
    .catch((error) => {
      console.error('Error al obtener diccionario: ', error);
      setError('Error de red o backend');
    });
  }, []);

    const handleShow = async (item) => {
      setLoading(true);
      try{
        const res = await axios.get(`${API_URL}/dictionary/word/${item._id}`,{
          headers:{
            'ngrok-skip-browser-warning': 'true',
            'Accept': 'application/json',
          }
        });
        console.log('Respuesta: ', res.data); 
        setModalFrases(res.data); 
        setShow(true);
      } catch (err) {
        console.error('Error al obtener detalles de la palabra: ', err);
      }
      setLoading(false);
    };

    const handleClose = () => setShow(false);

    return(
        <div className='layout-dicci'>
            <CustomNavbar/>

            <main>
                <div className='banner-dicci'>
                  <div className='loader-dicci'>
                    <span>D</span>
                    <span>I</span>
                    <span>C</span>
                    <span>C</span>
                    <span>I</span>
                    <span>O</span>
                    <span>N</span>
                    <span>A</span>
                    <span>R</span>
                    <span>I</span>
                    <span>O</span>
                  </div>
                  <p>
                    <a className='abajo-dicci' type='button' href='#diccionario'>
                      <i className="fas fa-chevron-down fa-lg"></i>
                    </a>
                  </p>
                </div>

                <div className='diccionario' id='diccionario'>
                  <div className='dicci-container'>

                    <div className='dicci-info'>
                      <div className='titulo-dicci'>
                        <p>Haz click en una palabra/frase para conocer más de ella.</p>
                      </div>

                      <div className='main-grid-dicci'>
                        {palabras.map((phrase) => (
                          <div className='grid-dicci text-center' key={phrase._id}>   
                            <Button className='btn-dicci' onClick={() => handleShow(item)}>
                              {phrase}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className='libro'>
                        <div className='book'>
                          <span className='page turn'></span>
                          <span className='page turn'></span>
                          <span className='page turn'></span>
                          <span className='page turn'></span>
                          <span className='page turn'></span>
                          <span className='page turn'></span>
                          <span className='cover'></span>
                          <span className='page'></span>
                          <span className='cover turn'></span>
                        </div>
                    </div>
                  </div>
                </div>

                <Modal className='modal-dicci' show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title className='modal-dicci-title'>
                          {modalFrases?.phrase
                            ?`¿Cómo se hace la frase "${modalFrases.phrase}"?`
                            : "Cargando..."}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {loading?(
                        <p>Cargando información...</p>
                      ): (
                        <>
                        {modalFrases?.image && (
                          <img 
                            src={modalFrases.imagen} 
                            alt={modalFrases.palabra} className="modal-img-dicci" 
                          />
                        )}
                        <p className='modal-dicci-text'>
                          {modalFrases.descripcion || "Descripción no disponible."}
                        </p>
                      </>
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='modal-dicci-close' onClick={handleClose}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </main>

            <Footer/>
        </div>
    )
}

export default Diccionario;