import { CommercialZone } from './buildings/zones/commercial.js';
import { IndustrialZone } from './buildings/zones/industrial.js';
import { ResidentialZone } from './buildings/zones/residential.js';
import config from '../config.js';

export class Citizen {
  /**
   * @param {ResidentialZone} residence 
   */
  constructor(residence) {
    /**
     * Unique identifier for the citizen
     * @type {string}
     */
    this.id = crypto.randomUUID();

    /**
     * Name of this citizen
     * @type {string}
     */
    this.name = generateMedievalName();

    /**
     * Age of the citizen in years
     * @type {number}
     */
    this.age = 1 + Math.floor(100*Math.random());

    /**
     * The current state of the citizen
     * @type {'idle' | 'apprentice' | 'employed' | 'unemployed' | 'elder'}
     */
    this.state = 'idle';

    /**
     * Number of simulation steps in the current state
     */
    this.stateCounter = 0;

    /**
     * Reference to the building the citizen lives at
     * @type {ResidentialZone}
     */
    this.residence = residence;

    /**
     * Reference to the building the citizen works at
     * @type {CommercialZone | IndustrialZone}
     */
    this.workplace = null;

    this.#initializeState();
  }

  /**
   * Sets the initial state of the citizen
   */
  #initializeState() {
    if (this.age < config.citizen.minWorkingAge) {
      this.state = 'apprentice';
    } else if (this.age >= config.citizen.retirementAge) {
      this.state = 'elder';
    } else {
      this.state = 'unemployed';
    }
  }

  /**
   * Steps the state of the citizen forward in time by one simulation step
   * @param {object} city 
   */
  simulate(city) {
    switch (this.state) {
      case 'idle':
      case 'apprentice':
      case 'elder':
        // Action - None

        // Transitions - None

        break;
      case 'unemployed':
        // Action - Look for work
        this.workplace = this.#findJob(city);

        // Transitions
        if (this.workplace) {
          this.state = 'employed';
        }

        break;
      case 'employed':
        // Actions - None

        // Transitions
        if (!this.workplace) {
          this.state = 'unemployed';
        }

        break;
      default:
        console.error(`Citizen ${this.id} is in an unknown state (${this.state})`);
    }
  }

  /**
   * Handles any clean up needed before a building is removed
   */
  dispose() {
    // Remove resident from its  workplace
    const workerIndex = this.workplace?.jobs.workers.indexOf(this);

    if (workerIndex !== undefined && workerIndex > -1) {
      this.workplace.jobs.workers.splice(workerIndex);
    }
  }

  /**
   * Search for a job nearby
   * @param {object} city 
   * @returns 
   */
  #findJob(city) {
    const tile = city.findTile(this.residence, (tile) => {
      // Search for an industrial or commercial building with at least one available job
      if (tile.building?.type === 'industrial' || 
          tile.building?.type === 'commercial') {
        if (tile.building.jobs.availableJobs > 0) {
          return true;
        }
      }

      return false;
    }, config.citizen.maxJobSearchDistance);

    if (tile) {
      // Employ the citizen at the building
      tile.building.jobs.workers.push(this);
      return tile.building;
    } else {
      return null;
    }
  }

  /**
   * Sets the workplace for the citizen
   * @param {CommercialZone | IndustrialZone} workplace 
   */
  setWorkplace(workplace) {
    this.workplace = workplace;
  }

  /**
   * Returns the title/role of this citizen
   * @returns {string}
   */
  getTitle() {
    if (this.state === 'apprentice') return 'Young Apprentice';
    if (this.state === 'elder') return 'Village Elder';
    if (this.state === 'employed') {
      if (this.workplace?.type === 'industrial') return 'Craftsman';
      if (this.workplace?.type === 'commercial') return 'Merchant';
      return 'Worker';
    }
    return 'Peasant';
  }

  /**
   * Returns an HTML representation of this object
   * @returns {string}
   */
  toHTML() {
    const stateDisplay = {
      'idle': 'Wandering',
      'apprentice': 'Training',
      'employed': this.getTitle(),
      'unemployed': 'Seeking Work',
      'elder': 'Resting'
    };

    return `
      <li class="info-citizen">
        <span class="info-citizen-name">${this.name}</span>
        <br>
        <span class="info-citizen-details">
          <span>
            <img class="info-citizen-icon" src="/icons/calendar.png">
            ${this.age} winters
          </span>
          <span>
            <img class="info-citizen-icon" src="/icons/job.png">
            ${stateDisplay[this.state] || this.state}
          </span>
        </span>
      </li>
    `;
  }
}

function generateMedievalName() {
  const firstNames = [
    // Male names
    'Aldric', 'Baldwin', 'Cedric', 'Duncan', 'Edmund',
    'Gareth', 'Harold', 'Ivar', 'Jasper', 'Leofric',
    'Magnus', 'Oswald', 'Percival', 'Roland', 'Siegfried',
    'Thorin', 'Ulric', 'Wilhelm', 'Yorick', 'Alaric',
    // Female names
    'Adelina', 'Beatrice', 'Clarice', 'Elspeth', 'Gwendolyn',
    'Helena', 'Isolde', 'Juliana', 'Matilda', 'Rosalind',
    'Adelaide', 'Brunhilde', 'Constance', 'Elowen', 'Freya',
    'Guinevere', 'Hildegard', 'Ingrid', 'Morgana', 'Rowena'
  ];

  const lastNames = [
    // Occupation-based
    'Blacksmith', 'Fletcher', 'Cooper', 'Thatcher', 'Miller',
    'Baker', 'Carpenter', 'Mason', 'Weaver', 'Tanner',
    // Location-based
    'of Ironwood', 'of Stonehill', 'of Ravenshollow', 'of Oakdale', 'of Thornbury',
    // Descriptive
    'the Bold', 'the Wise', 'the Swift', 'the Strong', 'the Fair',
    // Family names
    'Ironforge', 'Stormwind', 'Brightwood', 'Darkwater', 'Goldleaf',
    'Silverhammer', 'Whitestone', 'Redoak', 'Greymane', 'Blackwood'
  ];

  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return randomFirstName + ' ' + randomLastName;
}
