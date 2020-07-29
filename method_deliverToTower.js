/*
* Module code goes here. Use 'module.exports' to export things:
* module.exports.thing = 'a thing';
*
* You can import it from another modules like this:
* var mod = require('method_deliverToExtension');
* mod.thing == 'a thing'; // true
*/

var method_deliverToTower = {
    /** @param {Creep} creep
        @param {StructureTower} tower**/
	run: function(creep, tower) {
	    
		console.log("entered deliverToTower");


        // var extensions = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity} } );
// 		console.log('Room has '+extensions.length+' extensions available');
		
		if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			creep.moveTo(tower);
		} else if(creep.transfer(tower, RESOURCE_ENERGY) == OK) {
		    
		}
		console.log("exit deliverToTower");
	}
}

module.exports = method_deliverToTower;
