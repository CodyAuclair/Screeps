/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('method_buildStructure');
 * mod.thing == 'a thing'; // true
 */

var method_buildStructure = {
	run: function(creep, constructionTarget) {
	    if(creep.build(constructionTarget) == ERR_NOT_IN_RANGE) {
	        creep.moveTo(constructionTarget);
	    }
	}
}

module.exports = method_buildStructure;