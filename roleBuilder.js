 /*
------------------------------------------------------------------------------------------------------------------------------
    Builders are responsible for constructing any unbuilt construction sites. If all structures are built, a builder will
    assume the role of an UPGRADER.
    
    Workflow of BUILDER:
        MINE source.
        BUILD the nearest unfinished structure.
        REPEAT as needed.
        
        Become an UPGRADER if there are no structures that need to be built
------------------------------------------------------------------------------------------------------------------------------
*/

var mineUntilFull = require('method_mineUntilFull');
var buildStructure = require('method_buildStructure');

var roleUpgrader = require('roleUpgrader');

var roleBuilder = {
	run: function(creep) {
	    var sources = creep.room.find(FIND_SOURCES);
	    var constructionTarget;
	    var mediumPriorityBuilds = creep.room.find(FIND_CONSTRUCTION_SITES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION)}})
	    var highPriorityBuilds = creep.room.find(FIND_CONSTRUCTION_SITES, {filter: (structure) => {return (structure.structureType == STRUCTURE_TOWER)}});
	    
	    if((highPriorityBuilds != null) && (highPriorityBuilds.length > 0)) {
	        constructionTarget = highPriorityBuilds[0];
	    } else if((mediumPriorityBuilds != null) && (mediumPriorityBuilds.length > 0)) {
	        constructionTarget = mediumPriorityBuilds[0];
	    } else {
	         constructionTarget = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
	    }
	    
	    if(creep.memory.storageFull == false) {
	        var sourceToMine = parseInt(creep.name.charAt(creep.name.length - 1), 10) % sources.length;
            if(sources[sourceToMine].energy > 0) {
                mineUntilFull.run(creep, sources[sourceToMine]);
            } else {
                mineUntilFull.run(creep, sources[(sourceToMine + 1) % sources.length]);
            }
		} else if(constructionTarget != null) {
		    buildStructure.run(creep, constructionTarget);
		    console.log("Building: " + constructionTarget);
		} else {
		    roleUpgrader.run(creep);
		}
	}
}

module.exports = roleBuilder;