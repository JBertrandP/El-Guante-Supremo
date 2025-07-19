import '../styles/footer.css'

function Footer(){
    return (
    <footer>
      <div className="container">
        <div className="row">

          <div className="col-md-6 mb-6">
            <h5 className="subtitles">Signify</h5>
            <p className='text'>Transformando la comunicación con soluciones innovadoras en lenguaje de señas.</p>
          </div>

          <div className="col-md-6 mb-6">
            <h5 className="subtitles">Contáctanos</h5>
            <p className='text'><i className="fas fa-envelope me-2"></i> contacto@signify.com</p>
            <p className='text'><i className="fas fa-phone me-2"></i> +52 614 132 0311</p>
            <div className="mt-3">
              <a href="#" className="text me-3"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text me-3"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

        </div>

        <div className="text-center py-3 border-top border-secondary mt-3">
          <small className='text'>@2025 Signify. Todos los derechos reservados.</small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;