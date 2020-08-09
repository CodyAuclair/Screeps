var runRoles = require('method_runRoles');
var spawner = require('method_spawner');

module.exports.loop = function () {
	// TESTING
    console.log("entered main");
	runRoles.run();
	spawner.run();
	console.log("Current CPU in bucket: " + Game.cpu.bucket);
	if(Game.cpu.bucket > 9000) {
        Game.cpu.generatePixel();
    }
	console.log("exit main");
}