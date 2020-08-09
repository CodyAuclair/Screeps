/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('roleTower');
 * mod.thing == 'a thing'; // true
 */
 
var utility = require('utils');

var roleTower = {
    run: function(tower) {
        console.log("Entered roleTower");
        var hostiles = tower.room.find(FIND_HOSTILE_CREEPS, {filter: (creeps) => {return ((creeps.owner.username != "Brokndremes") || (creeps.owner.username != "DickFuckPussySuck"))}});
        
        var emergencyRepair = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_SPAWN || 
                                                                                                            structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_EXTENSION ||
                                                                                                            structure.structureType == STRUCTURE_RAMPART) && structure.hits < .2*structure.hitsMax} } );
        
        // var repairTargets = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_SPAWN || 
        //                                                                                                     structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_EXTENSION)
        //                                                                                                     && structure.hits < .8*structure.hitsMax} } );
        
        // var repairWalls = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART)
        //                                                                                                         && structure.hits < 1000000 /* .001*structure.hitsMax */} } );
        
        // var arrayTest = repairWalls;
        // var result = utility.getLowestHitsInArray(arrayTest);
        // console.log(result + " " + result.hits);
        
        if (hostiles.length > 0) {
            console.log("Entered Attack Hostile with tower energy at: " + tower.store.getUsedCapacity(RESOURCE_ENERGY));
            tower.attack(hostiles[0]);
        } else if((emergencyRepair.length > 0) && (tower.store.getUsedCapacity(RESOURCE_ENERGY) > 600)) {
            console.log("Entered Emergency Repair with tower energy at: " + tower.store.getUsedCapacity(RESOURCE_ENERGY));
            console.log("Lowest health emergencyRepair: " + utility.getLowestHitsInArray(emergencyRepair) + "\nHits: " + utility.getLowestHitsInArray(emergencyRepair).hits);
            tower.repair(utility.getLowestHitsInArray(emergencyRepair));
        } /* else if((repairTargets.length > 0) && (tower.store.getUsedCapacity(RESOURCE_ENERGY) > 600)) {
            console.log("Entered Standard Repair with tower energy at: " + tower.store.getUsedCapacity(RESOURCE_ENERGY));
            console.log("Lowest health repairTargets: " + utility.getLowestHitsInArray(repairTargets) + "\nHits: " + utility.getLowestHitsInArray(repairTargets).hits);
            tower.repair(utility.getLowestHitsInArray(repairTargets));
        } else if((repairWalls.length > 0) && (tower.store.getUsedCapacity(RESOURCE_ENERGY) > 600)) {
            console.log("Entered Wall Repair with tower energy at: " + tower.store.getUsedCapacity(RESOURCE_ENERGY));
            console.log("Lowest health repairWalls: " + utility.getLowestHitsInArray(repairWalls) + "\nHits: " + utility.getLowestHitsInArray(repairWalls).hits);
            // var lowestHealthTarget = utility.getLowestHitsInArray(repairWalls);
            tower.repair(utility.getLowestHitsInArray(repairWalls));
        } */
        
        console.log("Exit roleTower");
    }
}

module.exports = roleTower;