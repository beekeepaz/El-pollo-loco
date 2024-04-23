let canvas;
let ctx;
let character = new Character();
let enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),
];

function init() {
    canvas = document.getElementById(`canvas`);
    ctx = canvas.getContext('2d');

    console.log('My Charckter is', character);

    character.src = `../img/2_character_pepe/2_walk/W-21.png`;

    setTimeout(function() {
        ctx.drawImage(character, 20, 20, 50, 150);
    }, 2000);
}
