export const BuildingType = {
  residential: 'residential',    // Dwellings - Cottages, Houses, Manors
  commercial: 'commercial',      // Markets - Taverns, Shops, Guildhalls
  industrial: 'industrial',      // Workshops - Blacksmiths, Mills, Mines
  road: 'road',                  // Paths - Cobblestone roads
  powerPlant: 'power-plant',     // Mill - Windmills, Watermills
  powerLine: 'power-line'        // Watchtowers - Guard towers
}

// Medieval building name mappings for display
export const BuildingNames = {
  'residential': 'Dwelling',
  'commercial': 'Market',
  'industrial': 'Workshop',
  'road': 'Stone Path',
  'power-plant': 'Mill',
  'power-line': 'Watchtower'
}

// Medieval level names for buildings
export const BuildingLevelNames = {
  residential: {
    1: ['Peasant Hut', 'Cottage', 'Homestead'],
    2: ['Village House', 'Townhouse', 'Manor House'],
    3: ['Noble Estate', 'Lord\'s Manor', 'Castle Keep']
  },
  commercial: {
    1: ['Market Stall', 'Tavern', 'Inn'],
    2: ['Merchant Hall', 'Guild House', 'Trading Post'],
    3: ['Grand Bazaar', 'Royal Market', 'Trade Emporium']
  },
  industrial: {
    1: ['Blacksmith', 'Carpenter', 'Tannery'],
    2: ['Forge', 'Lumber Mill', 'Stoneworks'],
    3: ['Grand Forge', 'Royal Armory', 'Master Workshop']
  }
}
