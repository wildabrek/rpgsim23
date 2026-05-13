import { City } from '../../city.js';
import { Zone } from './zone.js';
import { JobsModule } from '../modules/jobs.js';
import { BuildingType } from '../buildingType.js';

export class CommercialZone extends Zone {
  /**
   * @type {JobsModule}
   */
  jobs = new JobsModule(this);

  constructor(x, y) {
    super(x, y);
    this.name = generateMarketName();
    this.type = BuildingType.commercial;
  }

  /**
   * Steps the state of the zone forward in time by one simulation step
   * @param {City} city 
   */
  simulate(city) {
    super.simulate(city);
    this.jobs.simulate();
  }

  /**
   * Handles any clean up needed before a building is removed
   */
  dispose() {
    this.jobs.dispose();
    super.dispose();
  }

  /**
   * Returns an HTML representation of this object
   * @returns {string}
   */
  toHTML() {
    let html = super.toHTML();
    html += this.jobs.toHTML();
    return html;
  }
}

// Medieval market/tavern name components
const prefixes = ['The Prancing', 'The Golden', 'The Silver', 'The Rusty', 'The Jolly', 'The Wandering', 'The Dancing', 'The Sleeping', 'The Laughing', 'The Roaring'];
const creatures = ['Dragon', 'Griffin', 'Phoenix', 'Unicorn', 'Stag', 'Boar', 'Fox', 'Raven', 'Lion', 'Bear'];
const objects = ['Crown', 'Sword', 'Shield', 'Chalice', 'Harp', 'Rose', 'Oak', 'Star', 'Moon', 'Sun'];
const establishments = ['Tavern', 'Inn', 'Market', 'Trading Post', 'Guild Hall', 'Merchant House', 'Emporium', 'Bazaar', 'Shop', 'Hall'];

// Function to generate a random medieval market/tavern name
function generateMarketName() {
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  
  // 50% chance for creature name, 50% for object name
  const subject = Math.random() < 0.5 
    ? creatures[Math.floor(Math.random() * creatures.length)]
    : objects[Math.floor(Math.random() * objects.length)];
  
  // 30% chance to add establishment type
  if (Math.random() < 0.3) {
    const establishment = establishments[Math.floor(Math.random() * establishments.length)];
    return prefix + ' ' + subject + ' ' + establishment;
  }
  
  return prefix + ' ' + subject;
}
