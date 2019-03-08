import Phaser, { Game } from 'phaser';
import GameScene from './GameScene'
//import { anagram, anagramFirstLastKept, scrambleSentence, scrambleSentenceFirstLastKept,scrambleSentenceFunctions, anagramPuncuation } from './utils';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: GameScene,
    physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: true
            }
    }
};


var game = new Game(config);
