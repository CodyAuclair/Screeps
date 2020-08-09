var mineUntilFull = require('method_mineUntilFull');

var roleUpgrader = require('roleUpgrader');

var roleRepairer = {
	run: function(creep) {
	    var sources = creep.room.find(FIND_SOURCES);
        var emergencyRepair = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_SPAWN || 
                                                                                                            structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_EXTENSION)
                                                                                                            && structure.hits < .2*structure.hitsMax} } );

        var repairTargets = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_SPAWN || 
                                                                                                            structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_EXTENSION)
                                                                                                            && structure.hits < structure.hitsMax} } );        

        var repairWalls = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART)
                                                                                                                && structure.hits < .01*structure.hitsMax } } );

	    if(creep.memory.storageFull == false) {
            var sourceToMine = parseInt(creep.name.charAt(creep.name.length - 1), 10) % sources.length;
            if(sources[sourceToMine].energy > 0) {
                mineUntilFull.run(creep, sources[sourceToMine]);
            } else {
                mineUntilFull.run(creep, sources[(sourceToMine + 1) % sources.length]);
            }
        } else if(emergencyRepair != null) {
            if(creep.repair(emergencyRepair) == ERR_NOT_IN_RANGE) {
                creep.moveTo(emergencyRepair);
            }
        } else if(repairTargets != null) {
            if(creep.repair(repairTargets) == ERR_NOT_IN_RANGE) {
                creep.moveTo(repairTargets);
            }
        } else if(repairWalls != null) {
            if(creep.repair(repairWalls) == ERR_NOT_IN_RANGE) {
                creep.moveTo(repairWalls);
            }
        } else {
            roleUpgrader.run(creep);
        }
	}
}

module.exports = roleRepairer;