let canvas;
let world;

function init() {
    canvas = document.getElementById(`canvas`);
    world = new World(canvas);

    console.log('My Charckter is', world.character);

    // character.src = `../img/2_character_pepe/2_walk/W-21.png`;

    // setTimeout(function() {
    //     ctx.drawImage(character, 20, 20, 50, 150);
    // }, 2000);
}
