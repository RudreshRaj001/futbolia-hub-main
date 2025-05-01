
import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="responsive-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      

          <div>
          <Logo size="md" />
            <h3 className="text-lg font-bold mb-4 text-white">PaseyGol</h3>
            <p className="text-sm text-gray-400">
              Tu portal de noticias deportivas para el fútbol ecuatoriano y sudamericano.
            </p>
            <div className="mt-4">
              <ThemeToggle variant="switch" />
            </div>
          </div>

         
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white text-sm">Inicio</Link></li>
              <li><Link to="/serie-a" className="hover:text-white text-sm">Serie A</Link></li>
              <li><Link to="/serie-b" className="hover:text-white text-sm">Serie B</Link></li>
              <li><Link to="/libertadores" className="hover:text-white text-sm">Libertadores</Link></li>
              <li><Link to="/sudamericana" className="hover:text-white text-sm">Sudamericana</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Información</h3>
            <ul className="space-y-2">
              <li><Link to="/informacion/nosotros" className="hover:text-white text-sm">Quiénes Somos</Link></li>
              <li><Link to="/informacion/contacto" className="hover:text-white text-sm">Contacto</Link></li>
              <li><Link to="/informacion/privacidad" className="hover:text-white text-sm">Política de Privacidad</Link></li>
              <li><Link to="/informacion/terminos" className="hover:text-white text-sm">Términos de Uso</Link></li>
              <li><Link to="/informacion/publicidad" className="hover:text-white text-sm">Publicidad</Link></li>
            </ul>
          </div>

         


          
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Fútbol Ecuatoriano. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
