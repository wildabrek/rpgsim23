export default {
  modules: {
    development: {
      // Number of simulation cycles the building must fail the abandonment
      // criteria before it has a chance of becoming abandoned
      abandonThreshold: 10,     
      // Probability of building being abandoned after it has met the
      // abandonment criteria for 'delay' cycles
      abandonChance: 0.25,  
      // Number of days it takes to build a building
      constructionTime: 3,
      // Probability of a building leveling up (prosperity increase)
      levelUpChance: 0.05,
      // Probability of building being re-developed after it is no longer
      // meeting the abandonment criteria
      redevelopChance: 0.25,         
    },
    jobs: {
      // Max # of workers at a building (serfs/craftsmen)
      maxWorkers: 2,       
    },
    residents: {
      // Max # of residents in a dwelling (peasants/nobles)
      maxResidents: 2,         
      // Chance for a peasant to move in
      residentMoveInChance: 0.5,
    },
    roadAccess: {
      // Max distance to search for a path when determining road access
      searchDistance: 3       
    },
  },
  citizen: {
     // Minimum working age for a citizen (young squire age)
    minWorkingAge: 14,       
     // Age when citizens retire (elder age)
    retirementAge: 55,       
    // Max Manhattan distance a citizen will search for work
    maxJobSearchDistance: 4   
  },
  vehicle: {
    // The distance travelled per millisecond (horse cart speed)
    speed: 0.0004,            
    // The start/end time where the vehicle should fade
    fadeTime: 500,  
    // Maximum lifetime of a vehicle (controls max # of carts on screen)     
    maxLifetime: 12000,
    // How often vehicles are spawned in milliseconds
    spawnInterval: 1500     
  },
  // Medieval-specific settings
  kingdom: {
    startingGold: 1000,
    taxRate: 0.1,
    // Building costs in gold
    buildingCosts: {
      residential: 50,
      commercial: 100,
      industrial: 150,
      road: 20,
      'power-plant': 200,
      'power-line': 75
    }
  }
}
