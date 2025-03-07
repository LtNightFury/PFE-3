import { Icon, icon, Point } from 'leaflet';

// Fix the icon paths for Leaflet markers
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Icon.Default.prototype.options.iconSize = iconDefault.options.iconSize;
Icon.Default.prototype.options.iconAnchor = iconDefault.options.iconAnchor;
Icon.Default.prototype.options.popupAnchor = iconDefault.options.popupAnchor;
Icon.Default.prototype.options.tooltipAnchor = iconDefault.options.tooltipAnchor;
Icon.Default.prototype.options.shadowSize = iconDefault.options.shadowSize;
Icon.Default.prototype.options.iconUrl = iconDefault.options.iconUrl;
Icon.Default.prototype.options.iconRetinaUrl = iconDefault.options.iconRetinaUrl;
Icon.Default.prototype.options.shadowUrl = iconDefault.options.shadowUrl;
Icon.Default.prototype.options.iconSize = iconDefault.options.iconSize;