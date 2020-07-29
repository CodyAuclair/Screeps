/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('method_deliverToStorage');
 * mod.thing == 'a thing'; // true
 */
 
var method_deliverToStorage = {
	run: function(creep, storageTarget) {
	    console.log("entered deliverToStorage");

		if(creep.transfer(storageTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			creep.moveTo(storageTarget);
		}
		console.log("exit deliverToStorage");
    }
}

module.exports = method_deliverToStorage;