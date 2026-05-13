import { City } from '../../city.js';
import { JobsModule } from '../modules/jobs.js';
import { BuildingType } from '../buildingType.js';
import { Zone } from './zone.js';

export class IndustrialZone extends Zone {
  /**
   * @type {JobsModule}
   */
  jobs = new JobsModule(this);

  constructor(x, y) {
    super(x, y);
    this.name = generateWorkshopName();
    this.type = BuildingType.industrial;
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

// Medieval workshop/craft name components
const ownerNames = ['Aldric', 'Bjorn', 'Cedric', 'Duncan', 'Edmund', 'Gareth', 'Harold', 'Magnus', 'Oswald', 'Wilhelm'];
const crafts = ['Blacksmith', 'Armory', 'Forge', 'Tannery', 'Carpentry', 'Stoneworks', 'Pottery', 'Weaving', 'Brewery', 'Bakery'];
const qualities = ['Master', 'Royal', 'Grand', 'Ancient', 'Renowned', 'Humble', 'Sturdy', 'Fine', 'Iron', 'Stone'];

// Function to generate a random medieval workshop name
function generateWorkshopName() {
  const craft = crafts[Math.floor(Math.random() * crafts.length)];
  
  // 60% chance for owner's name format, 40% for quality format
  if (Math.random() < 0.6) {
    const owner = ownerNames[Math.floor(Math.random() * ownerNames.length)];
    return owner + "'s " + craft;
  } else {
    const quality = qualities[Math.floor(Math.random() * qualities.length)];
    return "The " + quality + ' ' + craft;
  }
}
