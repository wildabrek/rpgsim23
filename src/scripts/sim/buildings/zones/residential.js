import { City } from '../../city.js';
import { Zone } from './zone.js';
import { ResidentsModule } from '../modules/residents.js';
import { BuildingType } from '../buildingType.js';

export class ResidentialZone extends Zone {
  /**
   * @type {ResidentsModule}
   */
  residents = new ResidentsModule(this);

  constructor(x, y) {
    super(x, y);
    this.name = generateDwellingName();
    this.type = BuildingType.residential;
  }

  /**
   * Steps the state of the zone forward in time by one simulation step
   * @param {City} city 
   */
  simulate(city) {
    super.simulate(city);
    this.residents.simulate(city);
  }

  /**
   * Handles any clean up needed before a building is removed
   */
  dispose() {
    this.residents.dispose();
    super.dispose();
  }

  /**
   * Returns an HTML representation of this object
   * @returns {string}
   */
  toHTML() {
    let html = super.toHTML();
    html += this.residents.toHTML();
    return html;
  }
}

// Medieval dwelling name components
const prefixes = ['Stone', 'Oak', 'Willow', 'Iron', 'Silver', 'Golden', 'Raven', 'Wolf', 'Bear', 'Stag'];
const suffixes = ['Cottage', 'Hall', 'Manor', 'Keep', 'Lodge', 'House', 'Haven', 'Stead', 'Dwelling', 'Hearth'];
const locations = ['by the Brook', 'on the Hill', 'of the Vale', 'by the Woods', 'of the Moor', 'near the Mill', 'by the Well', 'of Eastgate', 'of Westholm', 'by the Cross'];

// Function to generate a random medieval dwelling name
function generateDwellingName() {
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  // 40% chance to add a location
  if (Math.random() < 0.4) {
    const location = locations[Math.floor(Math.random() * locations.length)];
    return prefix + ' ' + suffix + ' ' + location;
  }
  
  return prefix + ' ' + suffix;
}
