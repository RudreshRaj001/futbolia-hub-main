
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/utils/seo';
import { PageTransition } from '@/utils/animations';

interface InformationPageProps {
  pageId?: string;
}

const InformationPage: React.FC<InformationPageProps> = ({ pageId: propPageId }) => {
  const { page: paramPageId } = useParams<{ page?: string }>();
  const pageId = propPageId || paramPageId || 'informacion';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageId]);

  // Define page content based on pageId
  const pageContent = {
    informacion: {
      title: 'Información',
      content: (
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>Pase y GOL es tu portal de noticias deportivas para el fútbol ecuatoriano y sudamericano. Aquí encontrarás toda la información sobre el fútbol de Ecuador, incluyendo la Serie A, Serie B, Copa Libertadores, Copa Sudamericana y más.</p>
          <p>Navega por nuestras secciones para descubrir las últimas noticias, calendarios de partidos, posiciones, estadísticas de equipos y jugadores, y mucho más.</p>
        </div>
      )
    },
    nosotros: {
      title: 'Quiénes Somos',
      content: (
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>Pase y GOL nació en 2023 con la misión de ofrecer la mejor cobertura del fútbol ecuatoriano. Somos un equipo de periodistas apasionados por el fútbol, comprometidos con brindar información actualizada, análisis profundos y contenido exclusivo.</p>
          <p>Nuestra visión es convertirnos en el referente digital para los aficionados al fútbol ecuatoriano, ofreciendo una plataforma moderna e interactiva que satisfaga todas las necesidades informativas de nuestra audiencia.</p>
          <h3>Nuestro Equipo</h3>
          <p>Contamos con un equipo de profesionales especializados en diferentes áreas del periodismo deportivo, incluyendo:</p>
          <ul>
            <li>Periodistas de campo</li>
            <li>Analistas tácticos</li>
            <li>Especialistas en estadísticas</li>
            <li>Fotógrafos deportivos</li>
            <li>Editores de contenido</li>
          </ul>
        </div>
      )
    },
    contacto: {
      title: 'Contacto',
      content: (
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>Nos encantaría escuchar tus comentarios, sugerencias o consultas. Puedes contactarnos a través de los siguientes medios:</p>
          <h3>Información de Contacto</h3>
          <ul>
            <li><strong>Correo electrónico:</strong> info@paseygol.com</li>
            <li><strong>Teléfono:</strong> +593 9 1234 5678</li>
            <li><strong>Dirección:</strong> Av. Principal 123, Quito, Ecuador</li>
          </ul>
          <h3>Redes Sociales</h3>
          <p>También puedes seguirnos en nuestras redes sociales para estar al día con las últimas noticias:</p>
          <ul>
            <li>Facebook: /PaseyGOL</li>
            <li>Twitter: @PaseyGOL</li>
            <li>Instagram: @paseygol_oficial</li>
            <li>YouTube: PaseyGOL TV</li>
          </ul>
        </div>
      )
    },
    privacidad: {
      title: 'Política de Privacidad',
      content: (
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h3>Política de Privacidad</h3>
          <p>Esta Política de Privacidad describe cómo Pase y GOL recopila, utiliza y comparte información personal cuando visitas o interactúas con nuestro sitio web.</p>
          
          <h4>Información que Recopilamos</h4>
          <p>Recopilamos información personal cuando te registras en nuestro sitio, te suscribes a nuestro boletín, participas en encuestas o interactúas con nuestras publicaciones. Esta información puede incluir:</p>
          <ul>
            <li>Nombre y apellido</li>
            <li>Dirección de correo electrónico</li>
            <li>Información de perfil</li>
            <li>Datos de uso y preferencias</li>
          </ul>
          
          <h4>Cómo Utilizamos la Información</h4>
          <p>Utilizamos la información recopilada para:</p>
          <ul>
            <li>Proporcionar y mantener nuestro servicio</li>
            <li>Personalizar tu experiencia</li>
            <li>Enviarte notificaciones relacionadas con tu cuenta</li>
            <li>Proporcionarte noticias, ofertas especiales y contenido relacionado</li>
            <li>Analizar el uso de nuestro sitio para mejorar nuestros servicios</li>
          </ul>
          
          <h4>Cookies y Tecnologías de Seguimiento</h4>
          <p>Utilizamos cookies y tecnologías similares para rastrear la actividad en nuestro sitio y almacenar cierta información. Puedes configurar tu navegador para rechazar todas las cookies o para indicar cuándo se envía una cookie.</p>
          
          <h4>Seguridad de los Datos</h4>
          <p>La seguridad de tus datos es importante para nosotros, pero recuerda que ningún método de transmisión por Internet o método de almacenamiento electrónico es 100% seguro.</p>
          
          <h4>Cambios a esta Política de Privacidad</h4>
          <p>Podemos actualizar nuestra Política de Privacidad de vez en cuando. Te notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página.</p>
        </div>
      )
    },
    terminos: {
      title: 'Términos de Uso',
      content: (
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h3>Términos y Condiciones de Uso</h3>
          <p>Por favor, lee estos términos y condiciones cuidadosamente antes de utilizar el sitio web de Pase y GOL.</p>
          
          <h4>Aceptación de los Términos</h4>
          <p>Al acceder y utilizar este sitio web, aceptas cumplir y quedar vinculado por estos términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, no podrás acceder al sitio web.</p>
          
          <h4>Propiedad Intelectual</h4>
          <p>El contenido de este sitio web, incluyendo texto, gráficos, logotipos, imágenes y software, está protegido por derechos de autor y otros derechos de propiedad intelectual. No está permitido reproducir, distribuir o utilizar este contenido sin nuestro permiso previo por escrito.</p>
          
          <h4>Uso del Sitio</h4>
          <p>Te comprometes a utilizar nuestro sitio web solo para fines legítimos y de manera que no infrinja los derechos de terceros. Queda prohibido:</p>
          <ul>
            <li>Usar el sitio de manera fraudulenta o en conexión con un delito</li>
            <li>Introducir virus, troyanos u otro material malicioso</li>
            <li>Intentar obtener acceso no autorizado a nuestros sistemas</li>
            <li>Interferir con el funcionamiento normal del sitio</li>
          </ul>
          
          <h4>Enlaces a Terceros</h4>
          <p>Nuestro sitio puede contener enlaces a sitios web de terceros. No tenemos control sobre el contenido o las prácticas de estos sitios y no asumimos responsabilidad por ellos.</p>
          
          <h4>Limitación de Responsabilidad</h4>
          <p>En la medida permitida por la ley, Pase y GOL no será responsable por daños directos, indirectos, incidentales o consecuentes que resulten del uso o la imposibilidad de usar nuestro sitio web.</p>
          
          <h4>Cambios a los Términos</h4>
          <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web.</p>
        </div>
      )
    },
    publicidad: {
      title: 'Publicidad',
      content: (
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h3>Publicidad en Pase y GOL</h3>
          <p>Ofrecemos diversas oportunidades publicitarias para marcas y empresas que deseen llegar a nuestra audiencia de aficionados al fútbol ecuatoriano y sudamericano.</p>
          
          <h4>¿Por qué anunciarse con nosotros?</h4>
          <ul>
            <li>Audiencia comprometida: Miles de lectores apasionados por el fútbol</li>
            <li>Tráfico de calidad: Visitantes interesados en contenido deportivo</li>
            <li>Posicionamiento estratégico: Presencia en un sitio especializado en fútbol ecuatoriano</li>
            <li>Opciones flexibles: Diversos formatos publicitarios adaptados a tus necesidades</li>
          </ul>
          
          <h4>Formatos Publicitarios</h4>
          <p>Ofrecemos diferentes opciones para promocionar tu marca:</p>
          <ul>
            <li>Banners en posiciones premium</li>
            <li>Publicaciones patrocinadas</li>
            <li>Newsletters promocionales</li>
            <li>Patrocinio de secciones específicas</li>
            <li>Contenido de marca (branded content)</li>
            <li>Campañas personalizadas</li>
          </ul>
          
          <h4>Contáctanos</h4>
          <p>Si estás interesado en anunciarte en Pase y GOL, contáctanos para recibir información detallada sobre tarifas, disponibilidad y opciones personalizadas:</p>
          <p><strong>Correo electrónico:</strong> publicidad@paseygol.com</p>
          <p><strong>Teléfono:</strong> +593 9 8765 4321</p>
        </div>
      )
    }
  };

  const currentPage = pageContent[pageId as keyof typeof pageContent] || pageContent.informacion;

  return (
    <PageTransition>
      <SEO 
        title={`${currentPage.title} | Pase y GOL`} 
        description={`${currentPage.title} - Portal de noticias del fútbol ecuatoriano`}
      />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-20">
          {/* Header */}
          <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-900 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-4">
                  {currentPage.title}
                </h1>
                <div className="w-24 h-1 bg-secondary rounded-full mb-6"></div>
              </div>
            </div>
          </section>

          {/* Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {currentPage.content}
          </div>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default InformationPage;
