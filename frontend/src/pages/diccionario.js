import {useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import CustomNavbar from '../components/navbar';
import Footer from '../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/diccionario.css';

const palabras = [
  {
    "palabra": "Hola",
    "imagen": "https://placehold.co/400",
    "descripcion": "Se realiza un leve movimiento hacia afuera con la mano abierta desde la sien, como un saludo militar relajado."
  },
  {
    "palabra": "Gracias",
    "imagen": "https://placehold.co/400",
    "descripcion": "La mano abierta toca ligeramente los labios y luego se aleja hacia adelante en un gesto suave."
  },
  {
    "palabra": "Por favor",
    "imagen": "https://placehold.co/400",
    "descripcion": "La palma abierta hace un movimiento circular sobre el pecho en el sentido de las agujas del reloj."
  },
  {
    "palabra": "Amigo",
    "imagen": "https://placehold.co/400",
    "descripcion": "Se entrelazan los índices de ambas manos una vez, como si se tomaran de los dedos."
  },
  {
    "palabra": "Te quiero",
    "imagen": "https://placehold.co/400",
    "descripcion": "Se forma la letra 'I', luego la 'L' y la 'Y' (combinadas) con una sola mano, representando la frase en lenguaje de señas internacional, común en LSM."
  },
  {
    "palabra": "Familia",
    "imagen": "https://placehold.co/400",
    "descripcion": "Se forman las letras 'F' con ambas manos, y se hace un círculo desde el frente hacia atrás, indicando unión familiar."
  },
  {
    "palabra": "Escuela",
    "imagen": "https://placehold.co/400",
    "descripcion": "Ambas manos planas chocan entre sí varias veces, como si aplaudieran suavemente."
  },
  {
    "palabra": "Ayuda",
    "imagen": "https://placehold.co/400",
    "descripcion": "Una mano abierta sostiene el puño de la otra, que está erguido con el pulgar arriba, y se eleva levemente."
  },
  {
    "palabra": "¿Cómo estás?",
    "imagen": "https://placehold.co/400",
    "descripcion": "Se hace un gesto de barrido con una mano, luego con ambas palmas hacia arriba en señal de pregunta."
  },
  {
    "palabra": "Baño",
    "imagen": "https://placehold.co/400",
    "descripcion": "Se hace el gesto de frotar el pulgar contra el costado del puño cerrado, imitando el movimiento de limpiarse."
  }
];


function Diccionario(){
    const [show, setShow] = useState(false);
    const [modalFrases, setModalFrases] = useState({});

    const handleShow = (item) => {
        setModalFrases(item);
        setShow(true);
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
                        {palabras.map((item,index) => (
                          <div className='grid-dicci text-center' key={index}>
                            <Button className='btn-dicci' onClick={() => handleShow(item)}>
                              {item.palabra}
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
                        <Modal.Title className='modal-dicci-title'>¿Cómo se dice "{modalFrases.palabra}"?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={modalFrases.imagen} alt={modalFrases.palabra} className="modal-img-dicci" />
                        <p className='modal-dicci-text'>{modalFrases.descripcion}</p>
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