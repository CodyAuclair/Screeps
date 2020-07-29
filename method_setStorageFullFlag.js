/*
* Module code goes here. Use 'module.exports' to export things:
* module.exports.thing = 'a thing';
*
* You can import it from another modules like this:
* var mod = require('method_setStorageFullFlag');
* mod.thing == 'a thing'; // true
*/

var method_setStorageFullFlag = {
	run: function(creep) {
	    console.log("entered setStorageFullFlag");
		if(creep.store.getUsedCapacity() == creep.store.getCapacity()) {
			creep.memory.storageFull = true;
		} else if(creep.store.getUsedCapacity() == 0) {
			creep.memory.storageFull = false;
		}
		console.log("exit setStorageFullFlag");
	}
}

module.exports = method_setStorageFullFlag;
