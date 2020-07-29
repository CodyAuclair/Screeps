/*
* Module code goes here. Use 'module.exports' to export things:
* module.exports.thing = 'a thing';
*
* You can import it from another modules like this:
* var mod = require('method_deliverToExtension');
* mod.thing == 'a thing'; // true
*/

var method_deliverToExtension = {
    /** @param {Creep} creep
        @param {Structure} extensions**/
	run: function(creep, extension) {
	    
		console.log("entered deliverToExtension");
		
		if(creep.transfer(extension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			creep.moveTo(extension);
		} else if(creep.transfer(extension, RESOURCE_ENERGY) == OK) {
		    
		}
		console.log("exit deliverToExtension");
	}
}

module.exports = method_deliverToExtension;
