import { Icon } from 'leaflet';

// This extends the L.Icon.Default prototype to use the correct marker icon URLs
export const fixLeafletIcon = () => {
  // Fix the default icon path issue
  Icon.Default.imagePath = 'assets/';
  
  // Alternative method if the above doesn't work:
  (Icon.Default.prototype as any)._getIconUrl = function(name: string) {
    return `assets/marker-${name}.png`;
  };
};