// Utility methods. End of each method must be followed by a comma before the next method starts.

var utils = {
    
    // =================== START SORTING FUNCTIONS ===================
    
    getLowestHitsInArray: function(arrayToSort) {
        var lowestHits = arrayToSort[0];
        for(var i = 1; i < arrayToSort.length; i++) {
            if(arrayToSort[i].hits < lowestHits.hits) {
                lowestHits = arrayToSort[i];
            }
        }
        
        return lowestHits;
    },
    
    getLowestStoreInArray: function(arrayToSort) {
        var lowestStore = arrayToSort[0];
        for(var i = 1; i < arrayToSort.length; i++) {
            if(arrayToSort[i].store.getUsedCapacity < lowestStore.store.getUsedCapacity) {
                lowestStore = arrayToSort[i];
            }
        }
        
        return lowestStore;
    },
    
    // =================== END SORTING FUNCTIONS ===================
    
    // =================== START SCREEP HELPER FUNCTIONS ===================
    
    pickUpFromGround: function(creep, target) {
        if(target != null) {
            console.log("Got in pickUpFromGround");
            if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    },
    
    // =================== END SCREEP HELPER FUNCTIONS ===================
    
    // =================== START SPAWNER HELPER FUNCTIONS ===================
    
    canSpawnCreep: function(currentNumOfCreep, maxNumOfCreep, arrayOfParts) {
        if((currentNumOfCreep < maxNumOfCreep) && (Game.spawns.Spawn1.canCreateCreep(arrayOfParts) == 0)) {
            return true;
        }
        return false;
    },
}

module.exports = utils;