/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('method_rallyToFlag');
 * mod.thing == 'a thing'; // true
 */
 
 var method_rallyToFlag = {
     run: function(creep, flagToRally) {
         creep.moveTo(flagToRally);
     }
 }

module.exports = method_rallyToFlag;