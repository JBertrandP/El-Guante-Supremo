import CustomNavbar from "../components/navbar";
import Footer from "../components/footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/empresa.css';

function Empresa(){
    return(
        <div className="layout-empresa">
            <CustomNavbar/>

            <main>
                <div className="empresa-index">
                    <h2>Ir a...</h2>
                    <div class="list-group">
                        <a href="#nosotros" class="list-group-item list-group-item-action">¿Quiénes somos?</a>
                        <a href="#mision" class="list-group-item list-group-item-action">Mision</a>
                        <a href="#vision" class="list-group-item list-group-item-action">Visión</a>
                        <a href="#valores" class="list-group-item list-group-item-action">Valores</a>
                        <a href="#solucion" class="list-group-item list-group-item-action">¿Por qué crear esta solución?</a>
                        <a href="#enfoque" class="list-group-item list-group-item-action">Enfoque en la inclusión, accesibilidad y tecnología</a>
                    </div>
                </div>

                <div className="nosotros" id="nosotros">
                    <div className="nosotros-container">
                        <div className="nosotros-info">
                            <h2>¿Quiénes somos?</h2>
                            <p>CRINS (Centro de Recursos e Innovacion en Sistemas ) es una empresa tecnológica dedicada a crear soluciones accesibles para personas con discapacidad auditiva. La empresa se centra en el diseño de dispositivos innovadores que reducen las brechas de comunicación entre personas sordas y oyentes. Su producto estrella es el guante SIGNIFY, una herramienta innovadora que interpreta la lengua de señas en lenguaje hablado, facilitando las interacciones de forma fluida e inclusiva.</p>
                        </div>
                        <div className="nosotros-imagen">
                            <img src="https://raona.com/wp-content/uploads/2023/05/Collaboration_Team_Forming.jpg" alt="crins" ></img>
                        </div>
                    </div>
                </div>

                <div className="mision" id="mision">
                    <div className="mision-container">
                        <div className="mision-imagen">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRItyPf85WRrH5LJr2w9UZ7G5qu-38pgyIunA&s" alt="mision"></img>
                        </div>
                        <div className="mision-info">
                            <h2>Nuestra misión</h2>
                            <p>Facilitar la comunicación de las personas con discapacidad auditiva mediante un guante fácil de usar que interpreta la lengua de señas, lo que permite una interacción fluida entre personas sordas y oyentes. Esto permitirá a las personas comunicarse de forma eficaz e inclusiva sin necesidad de un traductor ni intermediario.</p>
                        </div>
                    </div>
                </div>

                <div className="vision" id="vision">
                    <div className="vision-container">
                        <div className="vision-info">
                            <h2>Nuestra visión</h2>
                            <p>Ayudar a las personas con discapacidad auditiva a comunicarse con libertad e independencia. Nuesto objetivo es proporcionar una herramienta fiable que permita a las personas sordas conversar con personas oyentes, mejorando así su inclusión social. El guante ofrecerá traducción al lenguaje de señas en tiempo real y avisará a los usuarios cuando necesiten asistencia profesional o adicional. Esto facilitará la comunicación y eliminará barreras sin necesidad de servicios costosos o especializados.</p>
                        </div>
                        <div className="vision-imagen">
                            <img src="https://img.freepik.com/vector-premium/ilustracion-diseno-moderno-plano-mision-empresarial_566886-174.jpg" alt="vision"></img>
                        </div>
                    </div>
                </div>

                <div className="valores" id="valores">
                    <div className="valores-container">
                        <div className="valores-imagen">
                            <img src="https://centresukha.com/wp-content/uploads/2024/06/whatsapp-image-2024-06-13-at-18.55.31.jpeg" alt="valores"></img>
                        </div>
                        <div className="valores-info">
                            <h2>Nuestros valores</h2>
                            <p>Nos regimos por valores fundamentales como la empatía, la inclusión, la accesibilidad, la colaboración interdisciplinaria y la búsqueda constante de la mejora social a través de la tecnología.</p>
                        </div>
                    </div>
                </div>

                <div className="solucion" id="solucion">
                    <div className="solucion-container">
                        <div className="solucion-info">
                            <h2>¿Por qué crear esta solución?</h2>
                            <p>Esta solución nace de la necesidad de eliminar las barreras que muchas personas enfrentan para acceder a herramientas digitales y servicios esenciales. Al detectar vacíos en accesibilidad, comprensión tecnológica y representación, buscamos ofrecer una alternativa concreta, ética y sostenible, que dé voz y acceso a quienes históricamente han sido excluidos de los beneficios de la innovación digital.</p>
                        </div>
                        <div className="solucion-imagen">
                            <img src="https://images.ecestaticos.com/rI1Ll-ZQnCT5cW2AYfLgW7yKfkw=/3x126:2271x1403/1600x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F104%2F5a4%2Fa65%2F1045a4a65327f6c248787befde478b57.jpg" alt="solucion"></img>
                        </div>
                    </div>
                </div>

                <div className="enfoque" id="enfoque">
                    <div className="enfoque-container">
                        <div className="enfoque-imagen">
                            <img src="https://iveconsultores.com/wp-content/uploads/2020/08/imagen-principal-enfoque-basado-en-procesos.jpg" alt="enfoque"></img>
                        </div>
                        <div className="enfoque-info">
                            <h2>Nuestro enfoque en la inclusión, accesibilidad y tecnología</h2>
                            <p>El núcleo de nuestro trabajo es la inclusión. Nos enfocamos en diseñar experiencias tecnológicas que sean verdaderamente accesibles para personas con distintas capacidades, contextos culturales y niveles de alfabetización digital. Usamos la tecnología no solo como una herramienta, sino como un puente: entre personas, ideas y oportunidades.</p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
}

export default Empresa;