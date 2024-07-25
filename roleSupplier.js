/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('roleSupplier');
 * mod.thing == 'a thing'; // true
 */
 
var roleUpgrader = require('roleUpgrader');
var roleBuilder = require('roleBuilder');
var deliverToExtension = require('method_deliverToExtension');
var deliverToTower = require('method_deliverToTower');
var mineUntilFull = require('method_mineUntilFull');

var utility = require('utils');

var roleSupplier = {
	run: function(creep) {
	    console.log("entered roleSupplier");

        var storageTarget = creep.room.storage;
        var sources = creep.room.find(FIND_SOURCES);
		var towers = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity} } );
		var towersPartialFill = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_TOWER) && structure.energy <= .75*structure.energyCapacity} } );
		var extension = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity} } );
		
		var energyOnGround = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {filter: (resource) => {return ((resource.resourceType == RESOURCE_ENERGY) && (resource.amount >= 100))}});
		
		if((creep.store.getUsedCapacity < .8*creep.store.getCapacity) && (energyOnGround != null)) {
		    if(creep.store.getUsedCapacity < storageTarget.store.getFreeCapacity) {
		        if(creep.transfer(storageTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
		            creep.moveTo(storageTarget);
		        }
		    } else {
		        utility.pickUpFromGround(creep, energyOnGround);
		    }
		    
		}

		if(creep.memory.storageFull == false) {
		    if(energyOnGround != null) {
		        utility.pickUpFromGround(creep, energyOnGround);
		    } else if(storageTarget != undefined && creep.withdraw(storageTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && storageTarget.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getFreeCapacity()) {
			    creep.moveTo(storageTarget);
			} else {
			    mineUntilFull.run(creep, sources[0]);
			}
		}
		
		else if((towersPartialFill == null || towersPartialFill.length == 0) && (extension != null)) {
		    deliverToExtension.run(creep, extension);
		}
		
		else if(towers.length > 0 && towers != null) {
		    var i = Math.floor(Math.random() * Math.floor(towers.length));
			deliverToTower.run(creep, towers[i]);
		}
		
		else if(creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES) != null) {
		    roleBuilder.run(creep);
		}
		
		else {
		    roleUpgrader.run(creep);
		}
		
		console.log("exit roleSupplier");
	}
}

module.exports = roleSupplier;