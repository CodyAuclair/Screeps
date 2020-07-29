/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('roleHarvesterAway');
 * mod.thing == 'a thing'; // true
 */
 
// Find exit to room
// Move to exit
// Exit room
// Find source
// Move to source
// Mine until full
// Return to entrance
// Exit room
// Deliver energy/fulfil roles as needed until empty
// Repeat

var mineUntilFull = require('method_mineUntilFull');
var deliverToSpawn = require('method_deliverToSpawn');
var deliverToExtension = require('method_deliverToExtension');
var deliverToStorage = require('method_deliverToStorage');
var deliverToTower = require('method_deliverToTower');
var setStorageFullFlag = require('method_setStorageFullFlag');

var utility = require('utils');

var roleBuilder = require('roleBuilder');
var roleUpgrader = require('roleUpgrader');

var roleHarvesterAway = {

}

module.exports = roleHarvesterAway;