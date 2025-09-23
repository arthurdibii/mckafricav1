import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Composant ScrollToTop
 * 
 * Ce composant remet automatiquement le scroll en haut de la page
 * lors de chaque changement de route dans l'application.
 * 
 * Il doit être placé dans le composant App pour fonctionner globalement.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Remettre le scroll en haut de la page lors du changement de route
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;