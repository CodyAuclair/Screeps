/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('roleSoldierRanged');
 * mod.thing == 'a thing'; // true
 */

var rallyToFlag = require('method_rallyToFlag');
 
var roleSoldierRanged = {
    run: function(creep) {
        console.log('enter roleSoldierRanged');
        // All enemies
        var hostiles = creep.room.find(FIND_HOSTILE_CREEPS, {filter: (creeps) => {return (creeps.owner.username != "Brokndremes")}});
        // Closest enemy
        var closestHostile = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {filter: (Creep) => {return (creep.owner.username != "Brokndremes")}});
        
        if(closestHostile) {
            if(creep.rangedAttack(closestHostile) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestHostile);
            }
        } else {
            flagToRally = Game.flags.rallyPointWest;
            rallyToFlag.run(creep, flagToRally);
        }
        console.log('exit roleSoldierRanged');
    }
};

module.exports = roleSoldierRanged;