import CustomNavbar from "../components/navbar";
import Footer from "../components/footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/guante.css';

function Guante(){
    return(
        <div className="layout-guante">
            <CustomNavbar/>

            <main>
                <div className="banner-guante">
                    <div className="loader-guante">
                        <span>G</span>
                        <span>U</span>
                        <span>A</span>
                        <span>N</span>
                        <span>T</span>
                        <span>E</span>
                    </div>
                    <p>
                        <a className='abajo-guante' type='button' href='#guanteT'>
                            <i className="fas fa-chevron-down fa-lg"></i>
                        </a>
                    </p>
                </div>

                <div className="guanteT" id="guanteT">
                    <h2>Ir a...</h2>
                    <div class="list-group">
                        <a href="#general" class="list-group-item list-group-item-action">Información General</a>
                        <a href="#general" class="list-group-item list-group-item-action">Beneficios</a>
                        <a href="#sensores" class="list-group-item list-group-item-action">Sensores de Flexión</a>
                        <a href="#esp" class="list-group-item list-group-item-action">ESP32</a>
                        <a href="#giroscopio" class="list-group-item list-group-item-action">Giroscopio</a>
                    </div>
                </div>

                <div className="general" id="general">
                    <div className="general-container">
                        <div className="general-info">
                            <h2>¿Cómo funciona?</h2>
                            <p>
                                Signify funciona gracias a sensores de flexión colocados en los dedos, los cuales detectan los movimientos y posiciones característicos de cada seña. Estos sensores envían datos a un microcontrolador (como un ESP32), que procesa la información y la traduce en texto o voz mediante una pantalla o altavoz. Además, puede incluir un giroscopio para captar la orientación de la mano, lo que mejora la precisión. 
                            </p>
                            <h2>Beneficios</h2>
                            <p>
                                Este tipo de tecnología es muy útil para facilitar la comunicación entre personas sordas y oyentes que no conocen la lengua de señas, promoviendo la inclusión, reduciendo barreras lingüísticas y esperando mejorar la accesibilidad en espacios educativos, laborales y sociales.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="sensores" id="sensores">
                    <div className="sensores-container">
                        <div className="sensores-info">
                            <h2>Sensores de Flexión</h2>
                            <p>Los sensores de flexión son dispositivos electrónicos que cambian su resistencia eléctrica cuando se doblan. Están hechos de materiales conductivos flexibles que, al curvarse, aumentan su resistencia de forma proporcional al ángulo de flexión. Esta variación puede ser leída por microcontroladores mediante un divisor de voltaje, permitiendo detectar movimientos o posiciones en aplicaciones como guantes inteligentes, prótesis, robótica o interfaces por gestos. En el guante, permiten saber qué señas está haciendo una persona al medir cuánto se flexiona cada dedo.</p>
                        </div>
                        <div className="sensores-imagen">
                            <img src="https://electronicathido.com/assets/recursosImagenes/productos/743/imagenes/sensorfle2.PNG" alt="sensores"></img>
                        </div>
                    </div>
                </div>

                <div className="esp" id="esp">
                    <div className="esp-container">
                        <div className="esp-imagen">
                            <img src="https://docs.sunfounder.com/projects/esp32-starter-kit/es/latest/_images/esp32_wroom_32e.jpg" alt="esp32"></img>
                        </div>
                        <div className="esp-info">
                            <h2>ESP<span className="num">32</span></h2>
                            <p>El ESP32 es un microcontrolador de bajo costo y alto rendimiento desarrollado por Espressif Systems, que integra Wi-Fi, Bluetooth y múltiples pines de entrada/salida (GPIO). Funciona con un procesador dual-core y tiene soporte para sensores, pantallas, motores y más. Es muy usado en proyectos de IoT, automatización, domótica y electrónica en general, ya que permite conectar dispositivos a internet de forma fácil y eficiente que funciona como el cerebro del guante. Recibe los datos de los sensores y los envía a la aplicación para que se puedan traducir en tiempo real.</p>
                        </div>
                    </div>
                </div>

                <div className="giroscopio" id="giroscopio">
                    <div className="giroscopio-container">
                        <div className="giroscopio-info">
                            <h2>Giroscopio</h2>
                            <p>Un giroscopio es un sensor que mide la velocidad angular o rotación de un objeto en uno o más ejes (X, Y, Z). Funciona detectando cambios en la orientación basados en la fuerza de Coriolis, que actúa sobre una masa móvil interna cuando el sensor gira. Es comúnmente utilizado en smartphones, drones, videojuegos, robots y sistemas de navegación, ya que permite saber cómo y cuánto ha girado un objeto en el espacio.. Ayuda a entender cómo se mueve la mano durante una seña, lo cual mejora la precisión de la traducción y permite detectar palabras que requieran el movimiento de la mano en cuestión.</p>
                        </div>
                        <div className="giroscopio-imagen">
                            <img src="https://http2.mlstatic.com/D_NQ_NP_789957-MLU76294965676_052024-O.webp" alt="giroscopio"></img>
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default Guante;