import Phaser, { Game } from 'phaser';
import GameScene from './GameScene'
import { anagram, anagramFirstLastKept, scrambleSentence, scrambleSentenceFirstLastKept,scrambleSentenceFunctions, anagramPuncuation } from './utils';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: GameScene
};


var game = new Game(config);

function preload () {
    this.load.image('logo', 'assets/logo.png');
}

function create () {
    var logo = this.add.image(400, 150, 'logo');

    this.tweens.add({
        targets: logo,
        y: 450,
        duration: 2000,
        ease: 'Power2',
        yoyo: true,
        loop: -1
    });

}

console.log(anagram("boolean"))
console.log(anagramFirstLastKept("boolean"))
console.log(scrambleSentence("The rains in spain fall mainly on the plains"))
console.log(scrambleSentenceFirstLastKept("The rains in spain fall mainly on the plains"))
console.log(scrambleSentenceFunctions("The rains in spain fall mainly on the plains", anagramFirstLastKept))
console.log(anagramPuncuation("your-mine-ours?"));
// arrayPrint([32,14,5,8]);
//arrayPrint2D([33,15,6,9]);
//arrayPrint2D([ [1, 2, 3], [4, 5, 6], [7, 8, 9] ]);
// let board = arrayOfZeroes(4,6);
// console.log(combineArray([0,0,0,0,0,0], [5,4,3]));
// console.log(combineArray([0,0], [5,4,3]));
// console.log(combineArrayAt([0,0,0,0,0,0], [5,4,3], 2));
// console.log(combineArrayAt([0,0,0], [5,4,3], 2));
// console.log(board);
// let piece = [[0,1],[1,1]];
// console.log(piece);
// copyArray2D(board,piece, 2, 2);
// arrayPrint2D(board);
