import CustomNavbar from '../components/navbar';
import Footer from '../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/index.css';
import mano from '../assets/images/logo_sn.png';
import guante from '../assets/images/guante2.0.png'

function Index(){
  return(
    <div className="layout-index">
      <CustomNavbar />

      <main>
        <div className='banner-index'>
          <picture><img className='logo' src={mano} alt='mano'></img></picture>
          <p className='slogan'>Conoce más</p>
          <a className='abajo' type='button' href='#guante'>
            <i className="fas fa-chevron-down fa-lg"></i>
          </a>
        </div>

        <div className='guante' id='guante'>
          <div className='guante-container'>
            <div className='guante-info'>
              <h2>Nuestro guante:</h2>
              <p>Te presentamos nuestro guante traductor de señas. Con unas cuantas señas por parte de la otra persona, podrás entenderlo todo viendo el texto aparecer en tiempo en la pantalla de tu dispositivo móvil.</p>
            </div>
            <div className='guante-imagen'>
              <img src={guante} alt='nuestro guante'></img>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;