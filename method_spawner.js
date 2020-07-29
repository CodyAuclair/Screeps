var utility = require('utils');

var method_spawner = {
    
    run: function()
    {
        console.log("entered spawner");
        /* Number of Each Worker Type to Have at Once */
        var maxHarvesters = 2;      // Harvesters are useful for mining energy nodes and supply that energy to spawners, extensions, or storages.
        var maxUpgraders = 2;       // Upgraders will upgrade the room controller of the room they reside in.
        var maxBuilders = 2;        // Builders will construct any construction sites in the room they reside in.
        var maxSuppliers = 1;       // Suppliers will retrieve energy from storage structures and trasfer them to towers, then extensions, then act as slow harvesters.
        var maxSoldierMelee = 0;    // SoldierMelees will punch and tank the shit out of badguys.
        var maxSoldierRanged = 0;   // SoldierRangeds will shoot the shit out of badguys.
        
        var isConstructionTargetExist = Game.rooms["W7S23"].find(FIND_CONSTRUCTION_SITES).length > 0;
        var hostiles = Game.spawns["Spawn1"].room.find(FIND_HOSTILE_CREEPS, {filter: (creeps) => {return ((creeps.owner.username != "Brokndremes") || (creeps.owner.username != "DickFuckPussySuck"))}});
        
        /* 
        Cost Assignment for Each Type
            workCost = 100      -- Harvest 2 energy, harvest 1 non-energy resource, build 5 hits per 1 energy, repair 100 hits per 1 energy, dismantle 50 hits for 12.5% energy, upgrade 1 per 1 energy, per tick.
            carryCost = 50      -- Add 50 carry capacity.
            moveCost = 50       -- Remove 2 fatigue per tick.
            attackCost = 80     -- Deal 30 hits in melee, per tick.
            rangedCost = 150    -- Deal 10 hits within 3 range to one target, or 10/4/1 hits in 1/2/3 range to all targets, per tick.
            healCost = 250      -- Heal 12 hits in melee, or 4 in ranged, per tick.
            claimCost = 600     -- Claim neutral controller, reserve for 1 tick, attack hostile controller for 300 ticks, attack reserved controller for 1 tick. Reduces life to 600 ticks.
            toughCost = 10      -- Ne effect, 100 extra hits per part.
            
        Total energy available with max extenders at Room Level:
            1: 300              --  0 extensions,   0 capacity, 300 from 1 spawner
            2: 550              --  5 extensions,  50 capacity, 300 from 1 spawner
            3: 800              -- 10 extensions,  50 capacity, 300 from 1 spawner
            4: 1300             -- 20 extensions,  50 capacity, 300 from 1 spawner
            5: 1800             -- 30 extensions,  50 capacity, 300 from 1 spawner
            6: 2300             -- 40 extensions,  50 capacity, 300 from 1 spawner
            7: 5600             -- 50 extensions, 100 capacity, 600 from 2 spawners
            8: 12900            -- 60 extensions, 200 capacity, 900 from 3 spawners
        */
        
        /* Modules for each worker type */
        /* The first modules are the first to break in an attack */
        /* Limit of 50 parts on any single creep. */
        var harvesterModules =      [WORK, WORK, WORK, WORK, WORK,
                                     CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                                     MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
        var harvesterBasicModules = [WORK, WORK,
                                     CARRY, CARRY, CARRY,
                                     MOVE];
        var upgraderModules =       [WORK, WORK, WORK, WORK, WORK,
                                     CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                                     MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
        var upgraderBasicModules =  [WORK,
                                     CARRY,
                                     MOVE];
        var builderModules =        [WORK, WORK, WORK, WORK, WORK,
                                     CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                                     MOVE, MOVE, MOVE, MOVE];
        var builderBasicModules =   [WORK, CARRY, MOVE];
        var supplierModules =       [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
        var supplierBasicModules =  [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
        var soldierMeleeModules =   [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                                     TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                                     ATTACK, MOVE];
        var soldierRangedModules =  [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                                     RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE];
        
        /* Count current number of each type */
        var harvesterCount      = _.filter(Game.creeps, (creep) => creep.memory.role == "Harvester").length;
        var upgraderCount       = _.filter(Game.creeps, (creep) => creep.memory.role == "Upgrader").length;
        var builderCount        = _.filter(Game.creeps, (creep) => creep.memory.role == "Builder").length;
        var supplierCount       = _.filter(Game.creeps, (creep) => creep.memory.role == "Supplier").length;
        var soldierMeleeCount   = _.filter(Game.creeps, (creep) => creep.memory.role == "SoldierMelee").length;
        var soldierRangedCount  = _.filter(Game.creeps, (creep) => creep.memory.role == "SolderRanged").length;
        var totalCount          = harvesterCount + upgraderCount + builderCount + supplierCount + soldierMeleeCount + soldierRangedCount;
        
        /* Build and name each Creep as necessary */
        if(utility.canSpawnCreep(harvesterCount, maxHarvesters, harvesterModules)) {
            Game.spawns['Spawn1'].spawnCreep(harvesterModules, 'Harvester'+(Math.floor(Math.random() * maxHarvesters)), {memory: {role: 'Harvester', storageFull: false}});
        }
        
        else if(utility.canSpawnCreep(harvesterCount, maxHarvesters/2, harvesterBasicModules)) {
            Game.spawns['Spawn1'].spawnCreep(harvesterBasicModules, 'Harvester'+(Math.floor(Math.random() * maxHarvesters)), {memory: {role: 'Harvester', storageFull: false}});
        }
        
        else if(utility.canSpawnCreep(upgraderCount, maxUpgraders, upgraderModules)) {
            Game.spawns['Spawn1'].spawnCreep(upgraderModules, 'Upgrader'+(Math.floor(Math.random() * maxUpgraders)), {memory: {role: 'Upgrader', storageFull: false}});
        }
        
        /* else if(utility.canSpawnCreep(upgraderCount, maxUpgraders/2, upgraderBasicModules)) {
            Game.spawns['Spawn1'].spawnCreep(upgraderBasicModules, 'Upgrader'+(Math.floor(Math.random() * Math.floor(maxUpgraders))), {memory: {role: 'Upgrader', storageFull: false}});
        } */
            
        else if(utility.canSpawnCreep(builderCount, maxBuilders, builderModules)){
            Game.spawns['Spawn1'].spawnCreep(builderModules, 'Builder'+(Math.floor(Math.random() * maxBuilders)), {memory: {role: 'Builder', storageFull: false}});
        }
        
        else if(utility.canSpawnCreep(builderCount, maxBuilders/2, builderBasicModules)) {
            Game.spawns['Spawn1'].spawnCreep(builderBasicModules, 'Builder'+(Math.floor(Math.random() * maxBuilders)), {memory: {role: 'Builder', storageFull: false}});
        }
        
        else if(utility.canSpawnCreep(supplierCount, maxSuppliers, supplierModules)) {
            Game.spawns['Spawn1'].spawnCreep(supplierModules, 'Supplier'+(Math.floor(Math.random() * maxSuppliers)), {memory: {role: 'Supplier', storageFull: false}});
        }
        
        else if(utility.canSpawnCreep(supplierCount, maxSuppliers/2, supplierBasicModules)) {
            Game.spawns['Spawn1'].spawnCreep(supplierBasicModules, 'Supplier'+(Math.floor(Math.random() * maxSuppliers)), {memory: {role: 'Supplier', storageFull: false}});
        }
        
        else if(utility.canSpawnCreep(soldierMeleeCount, maxSoldierMelee, soldierMeleeModules) && (hostiles.length > 0)) {
            Game.spawns['Spawn1'].spawnCreep(soldierMeleeModules, 'Brawler'+(Math.floor(Math.random() * maxSoldierMelee)), {memory: {role: 'SoldierMelee'}});
        }
        
        else if(utility.canSpawnCreep(soldierRangedCount, maxSoldierRanged, soldierRangedModules) && (hostiles.length > 0)) {
            Game.spawns['Spawn1'].spawnCreep(soldierRangedModules, 'Ranger'+(Math.floor(Math.random() * maxSoldierRanged)), {memory: {role: 'SoldierRanged'}});
        }
        
        console.log("exit spawner");
    }
};

module.exports = method_spawner;