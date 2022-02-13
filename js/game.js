
    
// declare global variables for game
// global variables

var gameStartImage, gameTitle, playBtn, retryBtn, pauseBtn;
var gameOverText, totScoreText;
var bgBtn, pauseBg
var retryIntent = false;
var healthBar,healthLabel, backgroundBar, scoreLabel;
var playerScore = 0;
var totalShoots = -1;//as on touching play button 1 arrow is shot
var onTarget = 0;
doubleArrows = false;
const dimensions = [document.documentElement.scrollWidth,screen.height];

const pageWidth  = Math.max(...dimensions);
const pageHeight = Math.min(...dimensions);

const groundY = pageHeight-20;
var remainingEnemy = {
    spittingBugs: 24,
    goblins: 14,
    flyingMonsters: 16,
    gunMen: 12,
    catapults: 7
};
const minReplaceDist = {
    e1: 250,
    e2: 250,
    e3: 300,
    e4: 250,
    e5: 100
}; //spittingBug, goblin, flyingMonster, gunMan, catapult resp.

const bgs = ["snowNight","forest","desert","snow"];
var currBgIndex = 0;

var game = new Phaser.Game(pageWidth, pageHeight, Phaser.CANVAS, 'my-game',
    { preload: preload, create: create, update: update });


// preload game assets - runs once at start
function preload() {

game.load.image('startScene', 'assets/startScene.jpg');
game.load.image('playBtnImg', 'assets/play.png');
game.load.image("retryBtnImg","assets/retry.png");
game.load.image("pauseBtnImg","assets/pause.png");
game.load.image("btnBackground","assets/btnBackground.png");
game.load.image('greenPlayBtnImg', 'assets/greenPlay.png');
game.load.image('greenBtnBackground', 'assets/greenBtnBackground.png');
game.load.image('forest', 'assets/forestBg.jpg');
game.load.image('desert', 'assets/desertBg.jpg');
game.load.image('snow', 'assets/snowBg.jpg');
game.load.image('snowNight', 'assets/snowNightBg.jpg');
game.load.spritesheet('player', 'assets/playerSheet.png',64,52);
game.load.image('redSmallEnemy', 'assets/redSmallEnemy_6.png');
game.load.spritesheet('gunMan', 'assets/gunMan.png',26,22);
game.load.spritesheet('redFlying', 'assets/flyingMonster.png',76,60);
game.load.spritesheet('catapultSheet', 'assets/catapultFlip.png',127,108);
game.load.spritesheet('spearManSheet', 'assets/spearMan.png',55,56);
game.load.spritesheet('goblinSheet', 'assets/goblinSwordSheet.png',64,53);
game.load.spritesheet('bossSheet', 'assets/bossSheet.png',146,209);
game.load.image('bowArrow', 'assets/bowArrow.png');
game.load.image('arrow', 'assets/arrowFinal.png');
game.load.image('acid', 'assets/saliva.jpg');
game.load.image('fireBall', 'assets/fireBall.png');
game.load.image('gunBullet', 'assets/gunBullet.png');
game.load.image('catapultRock', 'assets/catapultRock.png');
game.load.image('green-bar', 'assets/health-green.png');
game.load.image('red-bar', 'assets/health-red.png');
game.load.image("arrowKiller","assets/arrowKiller.png");

//sounds 
game.load.audio('arrowShoot-sound', 'assets/arrowShoot.wav');
game.load.audio('spittingBugShot-sound', 'assets/spittingBugShot.wav');
game.load.audio('goblinShot-sound', 'assets/goblinShot.mp3');
game.load.audio('gunManShot-sound', 'assets/gunManShot.mp3');
game.load.audio('flyingMonsterShot-sound', 'assets/flyingMonsterShot.mp3');
game.load.audio('catapultShot-sound', 'assets/catapultShot.wav');
game.load.audio('catapultFire-sound', 'assets/catapultFire.wav');
game.load.audio('fireBallFire-sound', 'assets/fireBallFire.wav');
game.load.audio('gunBulletFire-sound', 'assets/gunBulletFire.wav');
game.load.audio('arrowBulletCollision-sound', 'assets/arrowBulletCollision.wav');
game.load.audio('arrowRockCollision-sound', 'assets/arrowRockCollision.wav');
game.load.audio('arrowFireballCollision-sound', 'assets/arrowFireballCollision.wav');
game.load.audio('catapultKill-sound', 'assets/catapultKill.wav');
game.load.audio('catapultKill-sound', 'assets/catapultKill.wav');
game.load.audio('stab-sound', 'assets/stab.wav');
game.load.audio('acidTouch-sound', 'assets/acidTouch.wav');
game.load.audio('gunBulletHit-sound', 'assets/gunBulletHit.wav');
game.load.audio('fireBallTouch-sound', 'assets/fireBallTouch.wav');
game.load.audio('rockHit-sound', 'assets/rockHit.wav');
game.load.audio('bossSmash-sound', 'assets/bossSmash.wav');

//game.load.audio('introBgm', 'assets/introBgm.ogg');
game.load.audio('gameBgm', 'assets/gameBgm.mp3');
}

// create game world - runs once after "preload" finished
function create() {
//game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
game.physics.startSystem(Phaser.Physics.ARCADE);
//game.scale.forceOrientation(true, false);
currBgIndex = localStorage.getItem("bgIndex");
if (typeof(currBgIndex)!="number") {
    currBgIndex=0
}

if (currBgIndex == bgs.length-1) {
    currBgIndex = 0;
    alert("poing")
}
else {
    currBgIndex += 1;
}
localStorage.setItem("bgIndex",0)
bgImage = game.add.image(0, 0, bgs[currBgIndex]);
bgImage.scale.setTo(pageWidth/806,pageHeight/377);
player = game.add.sprite(10,groundY,"player");
player.anchor.set(0, 1);
//bowArrow = game.add.sprite(40,groundY,"bowArrow");
//bowArrow.anchor.set(0, 1);
arrow1 = game.add.weapon(20, 'arrow');
arrow2 = game.add.weapon(20, 'arrow');
acid1 = game.add.weapon(10, 'acid');
acid2 = game.add.weapon(10, 'acid');
acid3 = game.add.weapon(10, 'acid');
acid4 = game.add.weapon(10, 'acid');
acid5 = game.add.weapon(10, 'acid');
acid6 = game.add.weapon(10, 'acid');
gun1Bullet = game.add.weapon(10,"gunBullet");
gun2Bullet = game.add.weapon(10,"gunBullet");
gun3Bullet = game.add.weapon(10,"gunBullet");
fireBall1 = game.add.weapon(10,"fireBall");
fireBall2 = game.add.weapon(10,"fireBall");
fireBall3 = game.add.weapon(10,"fireBall");
fireBall4 = game.add.weapon(10,"fireBall");
catapult1Rock = game.add.weapon(10,"catapultRock");
catapult2Rock = game.add.weapon(10,"catapultRock");
catapult3Rock = game.add.weapon(10,"catapultRock");
goblin1 = game.add.sprite(3*pageWidth,groundY,"goblinSheet");
goblin2 = game.add.sprite(3*pageWidth+50,groundY,"goblinSheet");
goblin3 = game.add.sprite(3*pageWidth+120,groundY,"goblinSheet");
goblin4 = game.add.sprite(4*pageWidth+50,groundY,"goblinSheet");
goblin5 = game.add.sprite(6*pageWidth+150,groundY,"goblinSheet");
goblin6 = game.add.sprite(16*pageWidth,groundY,"goblinSheet");
spittingBug1 = game.add.sprite(pageWidth+20,groundY,"redSmallEnemy");
spittingBug2 = game.add.sprite(3*pageWidth/2,groundY,"redSmallEnemy");
spittingBug3 = game.add.sprite(3*pageWidth/2 +20,groundY,"redSmallEnemy");
spittingBug4 = game.add.sprite(2*pageWidth+100,groundY,"redSmallEnemy");
spittingBug5 = game.add.sprite(4*pageWidth-30,groundY,"redSmallEnemy");
spittingBug6 = game.add.sprite(4*pageWidth-40,groundY,"redSmallEnemy");
gunMan1 = game.add.sprite(8*pageWidth,groundY,"gunMan");
gunMan2 = game.add.sprite(10*pageWidth,groundY,"gunMan");
gunMan3 = game.add.sprite(14*pageWidth,groundY,"gunMan");
flyingMonster1 = game.add.sprite(5*pageWidth,groundY-160,"redFlying");
flyingMonster2 = game.add.sprite(6*pageWidth,groundY-160,"redFlying");
flyingMonster3 = game.add.sprite(6*pageWidth+50,groundY-160,"redFlying");
flyingMonster4 = game.add.sprite(11*pageWidth,groundY-160,"redFlying");
catapult1 = game.add.sprite(12*pageWidth,groundY+20,"catapultSheet");
catapult2 = game.add.sprite(13*pageWidth,groundY+20,"catapultSheet");
catapult3 = game.add.sprite(15*pageWidth,groundY+20,"catapultSheet");
bossEnemy = game.add.sprite(pageWidth+50,groundY,"bossSheet");
rightBar = game.add.sprite(pageWidth+20,0,"arrowKiller");
spittingBug1.anchor.set(0, 1);
spittingBug2.anchor.set(0, 1);
spittingBug3.anchor.set(0, 1);
spittingBug4.anchor.set(0, 1);
spittingBug5.anchor.set(0, 1);
spittingBug6.anchor.set(0, 1);
goblin1.anchor.set(0, 1);
goblin2.anchor.set(0, 1);
goblin3.anchor.set(0, 1);
goblin4.anchor.set(0, 1);
goblin5.anchor.set(0, 1);
goblin6.anchor.set(0, 1);
gunMan1.anchor.set(0, 1);
gunMan2.anchor.set(0, 1);
gunMan3.anchor.set(0, 1);
flyingMonster1.anchor.set(0, 1);
flyingMonster2.anchor.set(0, 1);
flyingMonster3.anchor.set(0, 1);
flyingMonster4.anchor.set(0, 1);
catapult1.anchor.set(0, 1);
catapult2.anchor.set(0, 1);
catapult3.anchor.set(0, 1);
bossEnemy.anchor.set(0, 1);
game.physics.arcade.enable(player);
game.physics.arcade.enable(arrow1);
game.physics.arcade.enable(arrow2);
game.physics.arcade.enable(acid1);
game.physics.arcade.enable(acid2);
game.physics.arcade.enable(acid3);
game.physics.arcade.enable(acid4);
game.physics.arcade.enable(acid5);
game.physics.arcade.enable(acid6);
game.physics.arcade.enable(gun1Bullet);
game.physics.arcade.enable(gun2Bullet);
game.physics.arcade.enable(gun3Bullet);
game.physics.arcade.enable(fireBall1);
game.physics.arcade.enable(fireBall2);
game.physics.arcade.enable(fireBall3);
game.physics.arcade.enable(fireBall4);
game.physics.arcade.enable(catapult1Rock);
game.physics.arcade.enable(catapult2Rock);
game.physics.arcade.enable(catapult3Rock);
game.physics.arcade.enable(goblin1);
game.physics.arcade.enable(goblin2);
game.physics.arcade.enable(goblin3);
game.physics.arcade.enable(goblin4);
game.physics.arcade.enable(goblin5);
game.physics.arcade.enable(goblin6);
game.physics.arcade.enable(spittingBug1);
game.physics.arcade.enable(spittingBug2);
game.physics.arcade.enable(spittingBug3);
game.physics.arcade.enable(spittingBug4);
game.physics.arcade.enable(spittingBug5);
game.physics.arcade.enable(spittingBug6);
game.physics.arcade.enable(gunMan1);
game.physics.arcade.enable(gunMan2);
game.physics.arcade.enable(gunMan3);
game.physics.arcade.enable(flyingMonster1);
game.physics.arcade.enable(flyingMonster2);
game.physics.arcade.enable(flyingMonster3);
game.physics.arcade.enable(flyingMonster4);
game.physics.arcade.enable(catapult1);
game.physics.arcade.enable(catapult2);
game.physics.arcade.enable(catapult3);
game.physics.arcade.enable(bossEnemy);
game.physics.arcade.enable(rightBar);

player.body.immovable = true;
goblin1.body.immovable = true;
goblin2.body.immovable = true;
goblin3.body.immovable = true;
goblin4.body.immovable = true;
goblin5.body.immovable = true;
goblin6.body.immovable = true;
spittingBug1.body.immovable = true;
spittingBug2.body.immovable = true;
spittingBug3.body.immovable = true;
spittingBug4.body.immovable = true;
spittingBug5.body.immovable = true;
spittingBug6.body.immovable = true;
gunMan1.body.immovable = true;
gunMan2.body.immovable = true;
gunMan3.body.immovable = true;
flyingMonster1.body.immovable = true;
flyingMonster2.body.immovable = true;
flyingMonster3.body.immovable = true;
flyingMonster4.body.immovable = true;
catapult1.body.immovable = true;
catapult2.body.immovable = true;
catapult3.body.immovable = true;
bossEnemy.body.immovable = true;
rightBar.body.immovable = true;

player.health = 100;
player.maxHealth = 100;
goblin1.health = 20;
goblin1.maxHealth = 20;
goblin2.health = 20;
goblin2.maxHealth = 20;
goblin3.health = 20;
goblin3.maxHealth = 20;
goblin4.health = 20;
goblin4.maxHealth = 20;
goblin5.health = 20;
goblin5.maxHealth = 20;
goblin6.health = 20;
goblin6.maxHealth = 20;
spittingBug1.health = 10;
spittingBug1.maxHealth = 10;
spittingBug2.health = 10;
spittingBug2.maxHealth = 10;
spittingBug3.health = 10;
spittingBug3.maxHealth = 10;
spittingBug4.health = 10;
spittingBug4.maxHealth = 10;
spittingBug5.health = 10;
spittingBug5.maxHealth = 10;
spittingBug6.health = 10;
spittingBug6.maxHealth = 10;
gunMan1.health = 30;
gunMan1.maxHealth = 30;
gunMan2.health = 30;
gunMan2.maxHealth = 30;
gunMan3.health = 30;
gunMan3.maxHealth = 30;
flyingMonster1.health = 40;
flyingMonster1.maxHealth = 40;
flyingMonster2.health = 40;
flyingMonster2.maxHealth = 40;
flyingMonster3.health = 40;
flyingMonster3.maxHealth = 40;
flyingMonster4.health = 40;
flyingMonster4.maxHealth = 40;
catapult1.health = 100;
catapult1.maxHealth = 100;
catapult2.health = 100;
catapult2.maxHealth = 100;
catapult3.health = 100;
catapult3.maxHealth = 100;
bossEnemy.health = 200;
bossEnemy.maxHealth = 200;

goblin1.body.velocity.x = -80;
//goblin1.body.setSize(20, 40, 8, 8);
goblin2.body.velocity.x = -80;
goblin3.body.velocity.x = -80;
goblin4.body.velocity.x = -80;
goblin5.body.velocity.x = -80;
goblin6.body.velocity.x = -80;
spittingBug1.body.velocity.x = -100;
spittingBug2.body.velocity.x = -100;
spittingBug3.body.velocity.x = -100;
spittingBug4.body.velocity.x = -100;
spittingBug5.body.velocity.x = -100;
spittingBug6.body.velocity.x = -100;
gunMan1.body.velocity.x = -60;
gunMan2.body.velocity.x = -60;
gunMan3.body.velocity.x = -60;
flyingMonster1.body.velocity.x = -50;
flyingMonster2.body.velocity.x = -50;
flyingMonster3.body.velocity.x = -50;
flyingMonster4.body.velocity.x = -50;
catapult1.body.velocity.x = -50;
catapult2.body.velocity.x = -50;
catapult3.body.velocity.x = -50;
bossEnemy.body.velocity.x = 0;

player.body.setSize(12, 43, 14, 3);
goblin1.body.setSize(9, 43, 27, 9);
//bossEnemy.body.setSize(24,72,122,106);

player.events.onKilled.add(function() {
    gameOver();
});
enemySprites = [goblin1,goblin2,goblin3,goblin4,goblin5,goblin6,spittingBug1,spittingBug2,spittingBug3,spittingBug4,spittingBug5,spittingBug6,flyingMonster1,flyingMonster2,flyingMonster3,flyingMonster4,gunMan1,gunMan2,gunMan3,catapult1,catapult2,catapult3];


goblin1.events.onKilled.add(function() {
   reviveSprite(goblin1);
});
goblin2.events.onKilled.add(function() {
   reviveSprite(goblin2);
});
goblin3.events.onKilled.add(function() {
   reviveSprite(goblin3);
});
goblin4.events.onKilled.add(function() {
   reviveSprite(goblin4);
});
goblin5.events.onKilled.add(function() {
   reviveSprite(goblin5);
});
goblin6.events.onKilled.add(function() {
   reviveSprite(goblin6);
});
spittingBug1.events.onKilled.add(function() {
   reviveSprite(spittingBug1);
});
spittingBug2.events.onKilled.add(function() {
   reviveSprite(spittingBug2);
});
spittingBug3.events.onKilled.add(function() {
   reviveSprite(spittingBug3);
});
spittingBug4.events.onKilled.add(function() {
   reviveSprite(spittingBug4);
});
spittingBug5.events.onKilled.add(function() {
   reviveSprite(spittingBug5);
});
spittingBug6.events.onKilled.add(function() {
   reviveSprite(spittingBug6);
});
gunMan1.events.onKilled.add(function() {
   reviveSprite(gunMan1);
});
gunMan2.events.onKilled.add(function() {
   reviveSprite(gunMan2);
});
gunMan3.events.onKilled.add(function() {
   reviveSprite(gunMan3);
});
flyingMonster1.events.onKilled.add(function() {
   reviveSprite(flyingMonster1);
});
flyingMonster2.events.onKilled.add(function() {
   reviveSprite(flyingMonster2);
});
flyingMonster3.events.onKilled.add(function() {
   reviveSprite(flyingMonster3);
});
flyingMonster4.events.onKilled.add(function() {
   reviveSprite(flyingMonster4);
});
catapult1.events.onKilled.add(function() {
   reviveSprite(catapult1);
});
catapult2.events.onKilled.add(function() {
   reviveSprite(catapult2);
});
catapult3.events.onKilled.add(function() {
   reviveSprite(catapult3);
});
bossEnemy.events.onKilled.add(function() {
   victory();
});


gunMan1.scale.setTo(2.7);
gunMan2.scale.setTo(2.7);
gunMan3.scale.setTo(2.7);
spittingBug1.scale.set(0.6);
spittingBug2.scale.set(0.6);
spittingBug3.scale.set(0.6);
spittingBug4.scale.set(0.6);
spittingBug5.scale.set(0.6);
spittingBug6.scale.set(0.6);
catapult1.scale.set(0.6);
catapult2.scale.set(0.6);
catapult3.scale.set(0.6);
bossEnemy.scale.setTo(0.5)
rightBar.scale.setTo(pageHeight/256)

//bowArrow.angle = 45;

arrow1.autofire = false;
arrow1.fireAngle = -45;
arrow1.fireRate = 250;
arrow1.bulletSpeed = 450;
arrow1.bulletLifespan = 10000;
arrow1.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
arrow1.bulletGravity.y = 500;
  //arrow1.bulletGravity.x = 80
arrow1.bulletRotateToVelocity = true;
arrow1.trackSprite(player,10,-26);
arrow1.onFire.add(function() {
        arrowSound.play();
});
arrow2.autofire = false;
arrow2.fireAngle = -45;
arrow2.fireRate = 250;
arrow2.bulletSpeed = 450;
arrow2.bulletLifespan = 4000;
arrow2.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
arrow2.bulletGravity.y = 500;
  //arrow1.bulletGravity.x = 80
arrow2.bulletRotateToVelocity = true;
arrow2.trackSprite(player,10,-26);
  
acid1.autofire = false;
acid1.fireAngle = 210;
acid1.fireRate = 2500;
acid1.bulletSpeed = 100;
acid1.bulletLifespan = 1500;
acid1.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
acid1.trackSprite(spittingBug1);
acid2.autofire = false;
acid2.fireAngle = 210;
acid2.fireRate = 2500;
acid2.bulletSpeed = 100;
acid2.bulletLifespan = 1500;
acid2.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
acid2.trackSprite(spittingBug2);
acid3.autofire = false;
acid3.fireAngle = 210;
acid3.fireRate = 2500;
acid3.bulletSpeed = 100;
acid3.bulletLifespan = 1500;
acid3.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
acid3.trackSprite(spittingBug3);
acid4.autofire = false;
acid4.fireAngle = 210;
acid4.fireRate = 2500;
acid4.bulletSpeed = 100;
acid4.bulletLifespan = 1500;
acid4.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
acid4.trackSprite(spittingBug4);
acid5.autofire = false;
acid5.fireAngle = 210;
acid5.fireRate = 2500;
acid5.bulletSpeed = 100;
acid5.bulletLifespan = 1500;
acid5.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
acid5.trackSprite(spittingBug5);
acid6.autofire = false;
acid6.fireAngle = 210;
acid6.fireRate = 2500;
acid6.bulletSpeed = 100;
acid6.bulletLifespan = 1500;
acid6.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
acid6.trackSprite(spittingBug6);

gun1Bullet.autofire = false;
gun1Bullet.fireAngle = 180;
gun1Bullet.fireRate = 4000;
gun1Bullet.bulletSpeed = 150;
gun1Bullet.bulletLifespan = 10000;
gun1Bullet.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
gun1Bullet.trackSprite(gunMan1,5,-15);
gun2Bullet.autofire = false;
gun2Bullet.fireAngle = 180;
gun2Bullet.fireRate = 4000;
gun2Bullet.bulletSpeed = 150;
gun2Bullet.bulletLifespan = 10000;
gun2Bullet.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
gun2Bullet.trackSprite(gunMan2,5,-15);
gun3Bullet.autofire = false;
gun3Bullet.fireAngle = 180;
gun3Bullet.fireRate = 4000;
gun3Bullet.bulletSpeed = 150;
gun3Bullet.bulletLifespan = 10000;
gun3Bullet.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
gun3Bullet.trackSprite(gunMan3,5,-15);

fireBall1.autofire = true;
fireBall1.fireAngle = -180;
fireBall1.fireRate = 3500;
fireBall1.bulletSpeed = 150;
fireBall1.bulletLifespan = 8000;
fireBall1.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
fireBall1.bulletRotateToVelocity = true;
fireBall1.trackSprite(flyingMonster1);
fireBall4.autofire = true;
fireBall4.fireAngle = -180;
fireBall4.fireRate = 3500;
fireBall4.bulletSpeed = 150;
fireBall4.bulletLifespan = 8000;
fireBall4.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
fireBall4.bulletRotateToVelocity = true;
fireBall4.trackSprite(flyingMonster4);
fireBall3.autofire = true;
fireBall3.fireAngle = -180;
fireBall3.fireRate = 3500;
fireBall3.bulletSpeed = 150;
fireBall3.bulletLifespan = 8000;
fireBall3.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
fireBall3.bulletRotateToVelocity = true;
fireBall3.trackSprite(flyingMonster3);
fireBall2.autofire = true;
fireBall2.fireAngle = -180;
fireBall2.fireRate = 3500;
fireBall2.bulletSpeed = 150;
fireBall2.bulletLifespan = 8000;
fireBall2.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
fireBall2.bulletRotateToVelocity = true;
fireBall2.trackSprite(flyingMonster2);

catapult1Rock.autofire = false;
//catapultRock.fireAngle = -150;
catapult1Rock.fireRate = 6000;
catapult1Rock.bulletSpeed = 150;
catapult1Rock.bulletGravity.y = 30;
catapult1Rock.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
catapult1Rock.bulletRotateToVelocity = true;
catapult1Rock.trackSprite(catapult1,30,-80);
catapult2Rock.autofire = false;
//catapultRock.fireAngle = -150;
catapult2Rock.fireRate = 6000;
catapult2Rock.bulletSpeed = 150;
catapult2Rock.bulletGravity.y = 30;
catapult2Rock.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
catapult2Rock.bulletRotateToVelocity = true;
catapult2Rock.trackSprite(catapult2,30,-80);
catapult3Rock.autofire = false;
//catapultRock.fireAngle = -150;
catapult3Rock.fireRate = 6000;
catapult3Rock.bulletSpeed = 150;
catapult3Rock.bulletGravity.y = 30;
catapult3Rock.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
catapult3Rock.bulletRotateToVelocity = true;
catapult3Rock.trackSprite(catapult3,30,-80);

catapult1Player_dx = 520;
catapult1Rock.fireAngle = ((Math.asin(catapult1Player_dx*catapult1Rock.bulletGravity.y / Math.pow(catapult1Rock.bulletSpeed, 2)))*180/Math.PI)/2 - 185;
catapult2Player_dx = 530;
catapult2Rock.fireAngle = ((Math.asin(catapult2Player_dx*catapult2Rock.bulletGravity.y / Math.pow(catapult2Rock.bulletSpeed, 2)))*180/Math.PI)/2 - 185;
catapult3Player_dx = 540;
catapult3Rock.fireAngle = ((Math.asin(catapult3Player_dx*catapult3Rock.bulletGravity.y / Math.pow(catapult3Rock.bulletSpeed, 2)))*180/Math.PI)/2 - 185;

//audio
gameBgMusic = game.add.audio('gameBgm', 0.2);
gameBgMusic.loop = true;
arrowSound = game.add.audio('arrowShoot-sound', 1);
spittingBugShotSound = game.add.audio('spittingBugShot-sound', 0.8);
goblinShotSound = game.add.audio('goblinShot-sound', 0.3);
gunManShotSound = game.add.audio('gunManShot-sound', 0.1);
flyingMonsterShotSound = game.add.audio('flyingMonsterShot-sound', 0.3);
catapultFireSound = game.add.audio('catapultFire-sound', 0.8);
catapultShotSound = game.add.audio('catapultShot-sound', 0.8);
gunBulletFireSound = game.add.audio('gunBulletFire-sound', 0.8);
fireBallFireSound = game.add.audio('fireBallFire-sound', 1);
arrowBulletCollisionSound = game.add.audio('arrowBulletCollision-sound', 0.8);
arrowFireballCollisionSound = game.add.audio('arrowFireballCollision-sound', 0.8);
arrowRockCollisionSound = game.add.audio('arrowRockCollision-sound', 0.8);
catapultKillSound = game.add.audio('catapultKill-sound', 0.8);
stabSound = game.add.audio('stab-sound', 1);
acidTouchSound = game.add.audio('acidTouch-sound', 1);
gunBulletHitSound = game.add.audio('gunBulletHit-sound', 1);
fireBallTouchSound = game.add.audio('fireBallTouch-sound', 1);
rockHitSound = game.add.audio('rockHit-sound', 1);
bossSmashSound = game.add.audio("bossSmash-sound",0.8);

player.animations.add("getReady",[0,1,2,3,4,5],5,false);
player.animations.add("stretchBow",[6,7,8],8,false);
player.animations.add("release",[9,10,11,12,5],10,false);
goblin1.animations.add('left', [0,1,2,3,4,5,6], 10, true);
goblin1.animations.add("attack",[7,8,9,10],5,false);
goblin2.animations.add('left', [0,1,2,3,4,5,6], 10, true);
goblin2.animations.add("attack",[7,8,9,10],5,false);
goblin3.animations.add('left', [0,1,2,3,4,5,6], 10, true);
goblin3.animations.add("attack",[7,8,9,10],5,false);
goblin4.animations.add('left', [0,1,2,3,4,5,6], 10, true);
goblin4.animations.add("attack",[7,8,9,10],5,false);
goblin5.animations.add('left', [0,1,2,3,4,5,6], 10, true);
goblin5.animations.add("attack",[7,8,9,10],5,false);
goblin6.animations.add('left', [0,1,2,3,4,5,6], 10, true);
goblin6.animations.add("attack",[7,8,9,10],5,false);

gunMan1.animations.add('left', [0,1,2,3,4,5,6,7,8,9], 10, true);
gunMan2.animations.add('left', [0,1,2,3,4,5,6,7,8,9], 10, true);
gunMan3.animations.add('left', [0,1,2,3,4,5,6,7,8,9], 10, true);
flyingMonster1.animations.add('left', [9,10,11,12,13,14,15,16,17], 10, true);
flyingMonster1.animations.add('fall', [0,1,2,3,4,5,6,7], 10, true);
flyingMonster2.animations.add('left', [9,10,11,12,13,14,15,16,17], 10, true);
flyingMonster2.animations.add('fall', [0,1,2,3,4,5,6,7], 10, true);
flyingMonster3.animations.add('left', [9,10,11,12,13,14,15,16,17], 10, true);
flyingMonster3.animations.add('fall', [0,1,2,3,4,5,6,7], 10, true);
flyingMonster4.animations.add('left', [9,10,11,12,13,14,15,16,17], 10, true);
flyingMonster4.animations.add('fall', [0,1,2,3,4,5,6,7], 10, true);
catapult1.animations.add("release", [0,1,2,3,4,9,8,7,6,5,0], 20, false);
catapult2.animations.add("release", [0,1,2,3,4,9,8,7,6,5,0], 20, false);
catapult3.animations.add("release", [0,1,2,3,4,9,8,7,6,5,0], 20, false);
bossEnemy.animations.add("walk", [5,6,7,9], 5, true);
bossEnemy.animations.add("attack", [5,4,0,1,2,1,0,3,5], 15, false);


player.animations.play("getReady");
goblin1.animations.play('left');
goblin2.animations.play('left');
goblin3.animations.play('left');
goblin4.animations.play('left');
goblin5.animations.play('left');
goblin6.animations.play('left');
gunMan1.animations.play('left');
gunMan2.animations.play('left');
gunMan3.animations.play('left');
flyingMonster1.animations.play('left');
flyingMonster2.animations.play('left');
flyingMonster3.animations.play('left');
flyingMonster4.animations.play('left');
bossEnemy.animations.play("walk");

fireBall1.onFire.add(function() {
        fireBallFireSound.play();
});
fireBall2.onFire.add(function() {
        fireBallFireSound.play();
});
fireBall3.onFire.add(function() {
        fireBallFireSound.play();
});
fireBall4.onFire.add(function() {
        fireBallFireSound.play();
});
gun1Bullet.onFire.add(function() {
        gunBulletFireSound.play();
});
gun2Bullet.onFire.add(function() {
        gunBulletFireSound.play();
});
gun3Bullet.onFire.add(function() {
        gunBulletFireSound.play();
});
catapult1Rock.onFire.add(function() {
        catapultFireSound.play();
        catapult1.animations.play('release');
});
catapult2Rock.onFire.add(function() {
        catapultFireSound.play();
        catapult2.animations.play('release');
});
catapult3Rock.onFire.add(function() {
        catapultFireSound.play();
        catapult3.animations.play('release');
});


isPlayerAlive = true;
playerWon = false;

backgroundBar = game.add.image(300, 20, 'red-bar');
backgroundBar.fixedToCamera = true;

healthBar = game.add.image(300, 20, 'green-bar');
healthBar.fixedToCamera = true;

// add text label to left of bar
healthLabel = game.add.text(210, 20, 'Health', {fontSize:'20px', fill:'#ffffff',stroke: "#000000",strokeThickness: 3});
healthLabel.fixedToCamera = true;
scoreLabel = game.add.text(10,20, 'Damage: '+playerScore+'%', {fontSize:"20px", fill:"#FF7100",stroke: "#000000",strokeThickness: 3});
scoreLabel.fixedToCamera = true;

pauseBg = game.add.image(pageWidth-80, 20, 'btnBackground');
pauseBg.scale.setTo(0.2);
pauseBtn = game.add.image(pageWidth-68, 30, 'pauseBtnImg');
pauseBtn.fixedToCamera = true;
pauseBtn.scale.setTo(0.2);
pauseBtn.inputEnabled = true;
pauseBtn.events.onInputDown.add(pauseGame, this);
pauseBg.events.onInputDown.add(pauseGame, this);
pauseBg.visible = false;
pauseBtn.visible = false;

//display overlay when player killed
overlay = game.add.image(0, 0, bgs[currBgIndex]);
overlay.scale.setTo(pageWidth/806,pageHeight/377);
overlay.visible = false;


// START SCREEN - add images and/or text to display
gameStartImage = game.add.image(0, 0, 'startScene');
gameStartImage.scale.setTo(pageWidth/1756,pageHeight/900);

gameTitle = game.add.text(game.world.centerX, 30, 'Arjuna: The Archer', {fontSize: '60px', fill: '#00ff00',stroke: "#000000",strokeThickness: 8});
gameTitle.anchor.setTo(0.5);
bgBtn = game.add.image(game.world.centerX, pageHeight-100, 'btnBackground');
bgBtn.scale.setTo(0.7)
bgBtn.anchor.setTo(0.5);
playBtn = game.add.image(game.world.centerX, pageHeight-100, 'playBtnImg');
playBtn.scale.setTo(0.7);
playBtn.anchor.setTo(0.5);
playBtn.inputEnabled = true;
playBtn.events.onInputDown.add(startGame, this);
bgBtn.inputEnabled = true;
bgBtn.events.onInputDown.add(startGame, this);

greenBgBtn = game.add.image(game.world.centerX, game.world.centerY, 'greenBtnBackground');
greenBgBtn.scale.setTo(0.7)
greenBgBtn.anchor.setTo(0.5);
greenPlayBtn = game.add.image(game.world.centerX, game.world.centerY, 'greenPlayBtnImg');
greenPlayBtn.scale.setTo(0.7);
greenPlayBtn.anchor.setTo(0.5);
greenPlayBtn.inputEnabled = true;
greenPlayBtn.events.onInputDown.add(resumeGame, this);
greenBgBtn.inputEnabled = true;
greenBgBtn.events.onInputDown.add(resumeGame, this);
greenBgBtn.visible = false;
greenPlayBtn.visible = false;

gameOverText = game.add.text(game.world.centerX,50, 'Game Over', {fontSize:"60px", fill:"#FF001F",stroke: "#000000",strokeThickness: 8})
gameOverText.anchor.setTo(0.5);
retryBtn = game.add.image(game.world.centerX, pageHeight-100, 'retryBtnImg');
retryBtn.anchor.setTo(0.5);
retryBtn.inputEnabled = true;
retryBtn.events.onInputDown.addOnce(restart);

gameOverText.visible = false;
retryBtn.visible = false;
//damageLabel.visible = false;
//accuracyLabel.visible = false;

// pause game until start signal occurs
game.paused = true;



if (retryIntent){
    startGame();
}
}

// update gameplay - runs in continuous loop after "create" finished
function update() {
    
if (!isPlayerAlive || playerWon) {
    return;
  }
game.physics.arcade.overlap(rightBar, arrow1.bullets, barCollide, null, this);
game.physics.arcade.collide(rightBar, arrow2.bullets, barCollide, null, this);
game.physics.arcade.collide(goblin1, arrow1.bullets, enemyShot, null, this);
game.physics.arcade.collide(goblin2, arrow1.bullets, enemyShot, null, this);
game.physics.arcade.collide(goblin3, arrow1.bullets, enemyShot, null, this);
game.physics.arcade.collide(goblin4, arrow1.bullets, enemyShot, null, this);
game.physics.arcade.collide(goblin5, arrow1.bullets, enemyShot, null, this);
game.physics.arcade.collide(goblin6, arrow1.bullets, enemyShot, null, this);
game.physics.arcade.collide(spittingBug1, arrow1.bullets, enemyShot, null, this);
game.physics.arcade.collide(spittingBug2, arrow1.bullets, enemyShot, null, this);
game.physics.arcade.collide(spittingBug3, arrow1.bullets, enemyShot, null, this);
game.physics.arcade.collide(spittingBug3, arrow1.bullets, enemyShot, null, this);
game.physics.arcade.collide(spittingBug3, arrow1.bullets, enemyShot, null, this);
game.physics.arcade.collide(spittingBug4, arrow1.bullets, enemyShot, null, this);
game.physics.arcade.collide(spittingBug5, arrow1.bullets, enemyShot, null, this);
game.physics.arcade.collide(spittingBug6, arrow1.bullets, enemyShot, null, this);
game.physics.arcade.collide(gunMan1, arrow1.bullets, enemyShot, null, this);
game.physics.arcade.collide(gunMan2, arrow1.bullets, enemyShot, null, this);
game.physics.arcade.collide(gunMan3, arrow1.bullets, enemyShot, null, this);
game.physics.arcade.collide(flyingMonster1, arrow1.bullets, flyingMonsterShot, null, this);
game.physics.arcade.collide(flyingMonster2, arrow1.bullets, flyingMonsterShot, null, this);
game.physics.arcade.collide(flyingMonster3, arrow1.bullets, flyingMonsterShot, null, this);
game.physics.arcade.collide(flyingMonster4, arrow1.bullets, flyingMonsterShot, null, this);
game.physics.arcade.collide(catapult1, arrow1.bullets, catapultShot, null, this);
game.physics.arcade.collide(catapult2, arrow1.bullets, catapultShot, null, this);
game.physics.arcade.collide(catapult3, arrow1.bullets, catapultShot, null, this);
game.physics.arcade.collide(bossEnemy, arrow1.bullets, bossEnemyShot, null, this);
game.physics.arcade.collide(goblin1, arrow2.bullets, enemyShot, null, this);
game.physics.arcade.collide(goblin2, arrow2.bullets, enemyShot, null, this);
game.physics.arcade.collide(goblin3, arrow2.bullets, enemyShot, null, this);
game.physics.arcade.collide(goblin4, arrow2.bullets, enemyShot, null, this);
game.physics.arcade.collide(goblin5, arrow2.bullets, enemyShot, null, this);
game.physics.arcade.collide(goblin6, arrow2.bullets, enemyShot, null, this);
game.physics.arcade.collide(spittingBug1, arrow2.bullets, enemyShot, null, this);
game.physics.arcade.collide(spittingBug2, arrow2.bullets, enemyShot, null, this);
game.physics.arcade.collide(spittingBug3, arrow2.bullets, enemyShot, null, this);
game.physics.arcade.collide(spittingBug4, arrow2.bullets, enemyShot, null, this);
game.physics.arcade.collide(spittingBug5, arrow2.bullets, enemyShot, null, this);
game.physics.arcade.collide(spittingBug6, arrow2.bullets, enemyShot, null, this);
game.physics.arcade.collide(gunMan1, arrow2.bullets, enemyShot, null, this);
game.physics.arcade.collide(gunMan2, arrow2.bullets, enemyShot, null, this);
game.physics.arcade.collide(gunMan3, arrow2.bullets, enemyShot, null, this);
game.physics.arcade.collide(flyingMonster1, arrow2.bullets, flyingMonsterShot, null, this);
game.physics.arcade.collide(flyingMonster2, arrow2.bullets, flyingMonsterShot, null, this);
game.physics.arcade.collide(flyingMonster3, arrow2.bullets, flyingMonsterShot, null, this);
game.physics.arcade.collide(flyingMonster4, arrow2.bullets, flyingMonsterShot, null, this);
game.physics.arcade.collide(catapult1, arrow2.bullets, catapultShot, null, this);
game.physics.arcade.collide(catapult2, arrow2.bullets, catapultShot, null, this);
game.physics.arcade.collide(catapult3, arrow2.bullets, catapultShot, null, this);
game.physics.arcade.collide(bossEnemy, arrow2.bullets, bossEnemyShot, null, this);
var spittingBug1distance = game.physics.arcade.distanceBetween(player, spittingBug1);
if (spittingBug1distance < 100) {
   spittingBug1.body.velocity.x = 0;
   acid1.fire();
}
var spittingBug2distance = game.physics.arcade.distanceBetween(player, spittingBug2);
if (spittingBug2distance < 90) {
   spittingBug2.body.velocity.x = 0;
   acid2.fire();
}
var spittingBug3distance = game.physics.arcade.distanceBetween(player, spittingBug3);
if (spittingBug3distance < 110) {
   spittingBug3.body.velocity.x = 0;
   acid3.fire();
}
var spittingBug4distance = game.physics.arcade.distanceBetween(player, spittingBug4);
if (spittingBug4distance < 90) {
   spittingBug4.body.velocity.x = 0;
   acid4.fire();
}
var spittingBug5distance = game.physics.arcade.distanceBetween(player, spittingBug5);
if (spittingBug5distance < 100) {
   spittingBug5.body.velocity.x = 0;
   acid5.fire();
}
var spittingBug6distance = game.physics.arcade.distanceBetween(player, spittingBug6);
if (spittingBug6distance < 110) {
   spittingBug6.body.velocity.x = 0;
   acid6.fire();
}
var goblin1Distance = game.physics.arcade.distanceBetween(player, goblin1);
if (goblin1Distance < 20) {
   goblin1.body.velocity.x = 0;
   goblin1.animations.play("attack");
   spearTouch();
}
var goblin2Distance = game.physics.arcade.distanceBetween(player, goblin2);
if (goblin2Distance < 20) {
   goblin2.body.velocity.x = 0;
   goblin2.animations.play("attack");
   spearTouch();
}
var goblin3Distance = game.physics.arcade.distanceBetween(player, goblin3);
if (goblin3Distance < 20) {
   goblin3.body.velocity.x = 0;
   goblin3.animations.play("attack");
   spearTouch();
}
var goblin4Distance = game.physics.arcade.distanceBetween(player, goblin4);
if (goblin4Distance < 20) {
   goblin4.body.velocity.x = 0;
   goblin4.animations.play("attack");
}
var goblin5Distance = game.physics.arcade.distanceBetween(player, goblin5);
if (goblin5Distance < 20) {
   goblin5.body.velocity.x = 0;
   goblin5.animations.play("attack");
}
var goblin6Distance = game.physics.arcade.distanceBetween(player, goblin6);
if (goblin6Distance < 20) {
   goblin6.body.velocity.x = 0;
   goblin6.animations.play("attack");
}
var flyingMonster1Distance = game.physics.arcade.distanceBetween(player, flyingMonster1);
var flyingMonster2Distance = game.physics.arcade.distanceBetween(player, flyingMonster2);
var flyingMonster3Distance = game.physics.arcade.distanceBetween(player, flyingMonster3);
var flyingMonster4Distance = game.physics.arcade.distanceBetween(player, flyingMonster4);
if (flyingMonster1Distance < 180) {
   flyingMonster1.body.velocity.x = 0;
}
if (flyingMonster2Distance < 180) {
   flyingMonster2.body.velocity.x = 0;
}
if (flyingMonster3Distance < 180) {
   flyingMonster3.body.velocity.x = 0;
}
if (flyingMonster4Distance < 180) {
   flyingMonster4.body.velocity.x = 0;
}
var gunMan1Distance = game.physics.arcade.distanceBetween(player, gunMan1);
if (gunMan1Distance < 200) {
   gunMan1.body.velocity.x = 0;
   gunMan1.animations.stop();
   gun1Bullet.fire();
}
var gunMan2Distance = game.physics.arcade.distanceBetween(player, gunMan2);
if (gunMan2Distance < 210) {
   gunMan2.body.velocity.x = 0;
   gunMan2.animations.stop();
   gun2Bullet.fire();
}
var gunMan3Distance = game.physics.arcade.distanceBetween(player, gunMan3);
if (gunMan3Distance < 190) {
   gunMan3.body.velocity.x = 0;
   gunMan3.animations.stop();
   gun3Bullet.fire();
}
var catapult1Distance = game.physics.arcade.distanceBetween(player, catapult1);
if (catapult1Distance < 500) {
   catapult1.body.velocity.x = 0;
   catapult1Rock.fire();
}
var catapult2Distance = game.physics.arcade.distanceBetween(player, catapult2);
if (catapult2Distance < 510) {
   catapult2.body.velocity.x = 0;
   catapult2Rock.fire();
}
var catapult3Distance = game.physics.arcade.distanceBetween(player, catapult3);
if (catapult3Distance < 520) {
   catapult3.body.velocity.x = 0;
   catapult3Rock.fire();
}
flyingMonster1Player_dx = flyingMonster1.x - player.x;
flyingMonster1Player_dy = (player.y-30) - flyingMonster1.y;
fireBall1AngleRad = Math.atan(flyingMonster1Player_dx/flyingMonster1Player_dy)
fireBall1AngleDeg = fireBall1AngleRad * 180 / Math.PI;
fireBall1.fireAngle = (fireBall1AngleDeg+90);
//fireBall1.fireAngle += game.rnd.normal() * 5;
flyingMonster2Player_dx = flyingMonster2.x - player.x;
flyingMonster2Player_dy = (player.y-30) - flyingMonster2.y;
fireBall2AngleRad = Math.atan(flyingMonster2Player_dx/flyingMonster2Player_dy)
fireBall2AngleDeg = fireBall2AngleRad * 180 / Math.PI;
fireBall2.fireAngle = (fireBall2AngleDeg+90);
flyingMonster3Player_dx = flyingMonster3.x - player.x;
flyingMonster3Player_dy = (player.y-30) - flyingMonster3.y;
fireBall3AngleRad = Math.atan(flyingMonster3Player_dx/flyingMonster3Player_dy)
fireBall3AngleDeg = fireBall3AngleRad * 180 / Math.PI;
fireBall3.fireAngle = (fireBall3AngleDeg+90);
flyingMonster4Player_dx = flyingMonster4.x - player.x;
flyingMonster4Player_dy = (player.y-30) - flyingMonster4.y;
fireBall4AngleRad = Math.atan(flyingMonster4Player_dx/flyingMonster4Player_dy)
fireBall4AngleDeg = fireBall4AngleRad * 180 / Math.PI;
fireBall4.fireAngle = (fireBall4AngleDeg+90);

game.physics.arcade.collide(acid1.bullets, player, acidTouch, null, this);
game.physics.arcade.collide(acid2.bullets, player, acidTouch, null, this);
game.physics.arcade.collide(acid3.bullets, player, acidTouch, null, this);
game.physics.arcade.collide(acid4.bullets, player, acidTouch, null, this);
game.physics.arcade.collide(acid5.bullets, player, acidTouch, null, this);
game.physics.arcade.collide(acid6.bullets, player, acidTouch, null, this);
game.physics.arcade.collide(goblin1, player, spearTouch, null, this);
game.physics.arcade.collide(goblin2, player, spearTouch, null, this);
game.physics.arcade.collide(goblin3, player, spearTouch, null, this);
game.physics.arcade.collide(goblin4, player, spearTouch, null, this);
game.physics.arcade.collide(goblin5, player, spearTouch, null, this);
game.physics.arcade.collide(goblin6, player, spearTouch, null, this);
game.physics.arcade.collide(gun1Bullet.bullets, player, gunBulletTouch, null, this);
game.physics.arcade.collide(gun2Bullet.bullets, player, gunBulletTouch, null, this);
game.physics.arcade.collide(gun3Bullet.bullets, player, gunBulletTouch, null, this);
game.physics.arcade.collide(fireBall1.bullets, player, fireBallBulletTouch, null, this);
game.physics.arcade.collide(fireBall2.bullets, player, fireBallBulletTouch, null, this);
game.physics.arcade.collide(fireBall3.bullets, player, fireBallBulletTouch, null, this);
game.physics.arcade.collide(fireBall4.bullets, player, fireBallBulletTouch, null, this);
game.physics.arcade.collide(catapult1Rock.bullets, player, catapultRockTouch, null, this);
game.physics.arcade.collide(catapult2Rock.bullets, player, catapultRockTouch, null, this);
game.physics.arcade.collide(catapult3Rock.bullets, player, catapultRockTouch, null, this);
game.physics.arcade.collide(gun1Bullet.bullets, arrow1.bullets, gunBulletArrowBulletCollide, null, this);
game.physics.arcade.collide(gun2Bullet.bullets, arrow1.bullets, gunBulletArrowBulletCollide, null, this);
game.physics.arcade.collide(gun3Bullet.bullets, arrow1.bullets, gunBulletArrowBulletCollide, null, this);
game.physics.arcade.collide(fireBall1.bullets, arrow1.bullets, fireBallBulletArrowBulletCollide, null, this);
game.physics.arcade.collide(fireBall2.bullets, arrow1.bullets, fireBallBulletArrowBulletCollide, null, this);
game.physics.arcade.collide(fireBall3.bullets, arrow1.bullets, fireBallBulletArrowBulletCollide, null, this);
game.physics.arcade.collide(fireBall4.bullets, arrow1.bullets, fireBallBulletArrowBulletCollide, null, this);
game.physics.arcade.collide(catapult1Rock.bullets, arrow1.bullets, catapultRockBulletArrowBulletCollide, null, this);
game.physics.arcade.collide(catapult2Rock.bullets, arrow1.bullets, catapultRockBulletArrowBulletCollide, null, this);
game.physics.arcade.collide(catapult3Rock.bullets, arrow1.bullets, catapultRockBulletArrowBulletCollide, null, this);
game.physics.arcade.collide(gun1Bullet.bullets, arrow2.bullets, gunBulletArrowBulletCollide, null, this);
game.physics.arcade.collide(gun2Bullet.bullets, arrow2.bullets, gunBulletArrowBulletCollide, null, this);
game.physics.arcade.collide(gun3Bullet.bullets, arrow2.bullets, gunBulletArrowBulletCollide, null, this);
game.physics.arcade.collide(fireBall1.bullets, arrow2.bullets, fireBallBulletArrowBulletCollide, null, this);
game.physics.arcade.collide(fireBall2.bullets, arrow2.bullets, fireBallBulletArrowBulletCollide, null, this);
game.physics.arcade.collide(fireBall3.bullets, arrow2.bullets, fireBallBulletArrowBulletCollide, null, this);
game.physics.arcade.collide(fireBall4.bullets, arrow2.bullets, fireBallBulletArrowBulletCollide, null, this);
game.physics.arcade.collide(catapult1Rock.bullets, arrow2.bullets, catapultRockBulletArrowBulletCollide, null, this);
game.physics.arcade.collide(catapult2Rock.bullets, arrow2.bullets, catapultRockBulletArrowBulletCollide, null, this);
game.physics.arcade.collide(catapult3Rock.bullets, arrow2.bullets, catapultRockBulletArrowBulletCollide, null, this);


healthBar.scale.setTo(player.health / player.maxHealth, 1);
scoreLabel.text = 'Damage: ' + playerScore+'%';
if (playerScore == 95) {
    bossEnemy.body.velocity.x = -50;
    game.camera.shake(0.003, 250);
}
bossDist = game.physics.arcade.distanceBetween(player, bossEnemy);
if (bossDist < 40) {
    bossSmashSound.play();
    bossEnemy.animations.play("attack");
    player.kill();
    bossEnemy.frame = 4;
    bossEnemy.body.velocity.x = 0;
    //bossShoutSound.play();
    isPlayerAlive = false;
}
}


// add custom functions (for collisions, etc.)


function touchStartHandler (e) {
    touchDown = e.touches[0];
    downX = touchDown.clientX;
    downY = touchDown.clientY;
    touchDownTime = game.time.totalElapsedSeconds();
    player.animations.play("stretchBow");
}

function touchEndHandler (e) {
    touchUp = e.changedTouches[0];
    upX = touchUp.clientX;
    upY = touchUp.clientY;
    touchUpTime = game.time.totalElapsedSeconds();
    calculateAndFire();
}

function calculateAndFire() {
    if (!isPlayerAlive || game.paused || playerWon) {
        return;
    }
    dx = downX - upX;
    dy = upY - downY;
    velocityChange(dx);
    oppSide = dy;
    adjacentSide = dx;
    var elapsedTime = touchUpTime - touchDownTime;
    if (elapsedTime >= 1) {
        doubleArrows = true;
    }
    else {
        doubleArrows = false;
    }
    angleRad = Math.atan(dy/dx);
    angleDeg = angleRad * 180 / Math.PI;
    angleChange(angleDeg);
    player.animations.play("release");
    arrow1.fire();
    totalShoots ++;
    if (doubleArrows) {
        arrow2.fire();
        totalShoots ++;
    }
}

document.getElementById("my-game").ontouchstart = touchStartHandler;
document.getElementById("my-game").ontouchend = touchEndHandler;


function angleChange(angle) {
    //player.angle = -angle
    if (doubleArrows) {
        arrow1.fireAngle = (-angle-5);
        arrow2.fireAngle = (-angle+5);
    }
    arrow1.fireAngle = (-angle);
}
function velocityChange(velocity) {
    arrow1.bulletSpeed = velocity*10;
    arrow2.bulletSpeed = velocity*10;
}
function barCollide(barSprite, bullet) {
    bullet.kill();
}
function enemyShot(enemySprite, bullet) {
   if (enemySprite == spittingBug1 || enemySprite == spittingBug2 || enemySprite == spittingBug3 || enemySprite == spittingBug4 || enemySprite == spittingBug5 || enemySprite == spittingBug6) {
       spittingBugShotSound.play();
   }
   if (enemySprite == goblin1 || enemySprite == goblin2 || enemySprite == goblin3 || enemySprite == goblin4 || enemySprite == goblin5 || enemySprite == goblin6) {
       goblinShotSound.play();
   }
   if (enemySprite == gunMan1 || enemySprite == gunMan2 || enemySprite == gunMan3) {
       gunManShotSound.play();
   }
   
   if (enemySprite.health - 10 == 0) {
        layDead(enemySprite);
        playerScore += 1;
   }
   else {
       enemySprite.damage(10);
   }
   bullet.kill();
   onTarget ++;
}
function flyingMonsterShot(enemySprite,bullet) {
    if (enemySprite.health - 10 == 0) {    //keeping precisely 0 as if hit when falling down then also score will increase
        enemySprite.damage(1);
        //just coz it does not match condition again and playerScore increases
        playerScore += 1;
        onTarget ++;
        enemySprite.animations.play("fall")
        enemySprite.body.velocity.x = -1;
        enemySprite.body.velocity.y = 100;
        enemySprite.lifespan = 2000;
    }
    if (enemySprite.health == 9) {
        //nothing
    }
    else {
        enemySprite.frame = 8;
        enemySprite.damage(10);
        onTarget ++;
    }
    bullet.kill();
    flyingMonsterShotSound.play();
}
function catapultShot(catapultSprite,bullet) {
    if (catapultSprite.health - 10 == 0) {
        playerScore += 1;
        catapultKillSound.play();
        catapultSprite.kill();
    }
    else {
        catapultShotSound.play();
        catapultSprite.damage(10);
    }
    bullet.kill();
    onTarget ++;
}
function bossEnemyShot(bossSprite, bullet) {
    if (bossSprite.health - 10 == 0) {
        onTarget ++;
       // bossKilledSound.play();
        playerScore += 5;
        bossSprite.kill();
        playerWon = true;
        
    }
    else {
        //bossShotSound.play();
        bossSprite.damage(10);
    }
    bullet.kill();
    onTarget ++;
}
function spearTouch(playerSprite,goblinSprite) {
    stabSound.play();
    player.kill();
}
function acidTouch(playerSprite,bullet) {
    acidTouchSound.play();
    playerSprite.damage(5);
    bullet.kill();
}
function gunBulletTouch(playerSprite,bullet) {
    gunBulletHitSound.play();
    playerSprite.damage(15);
    bullet.kill()
}
function fireBallBulletTouch(playerSprite,bullet) {
    fireBallTouchSound.play();
    playerSprite.damage(10);
    bullet.kill()
}
function catapultRockTouch(playerSprite, rockBul) {
    rockHitSound.play();
    playerSprite.damage(20);
    rockBul.kill();
}
function gunBulletArrowBulletCollide(gunBul,arrowBul) {
    arrowBulletCollisionSound.play();
    gunBul.kill();
    arrowBul.kill()
    //explosion and sound
}
function fireBallBulletArrowBulletCollide(fireBallBul,arrowBul) {
    arrowFireballCollisionSound.play();
    fireBallBul.kill();
    arrowBul.kill()
    //explosion and sound
}
function catapultRockBulletArrowBulletCollide(rockBul,arrowBul) {
    arrowRockCollisionSound.play();
    rockBul.kill();
    arrowBul.kill()
    //explosion and sound
}
function layDead(sprite) {
    sprite.kill();
}
function reviveSprite(sprite) {
    
    if (sprite == goblin1 || sprite == goblin2 || sprite == goblin3 || sprite == goblin4 || sprite == goblin5 || sprite == goblin6) {
        if (remainingEnemy.goblins > 0) {
        sprite.revive();
        remainingEnemy.goblins --;
        sprite.x = pageWidth+minReplaceDist.e2+game.rnd.integerInRange(10,100);
        sprite.y = groundY;
        sprite.body.velocity.x = -80;
        }
        else {
        //alert("gobs over")
        }
    }
    if (sprite == spittingBug1 || sprite == spittingBug2 || sprite == spittingBug3 || sprite == spittingBug4 || sprite == spittingBug5 || sprite == spittingBug6) {
        if (remainingEnemy.spittingBugs > 0) {
        sprite.revive();
        remainingEnemy.spittingBugs --;
        sprite.x = pageWidth+minReplaceDist.e1+game.rnd.integerInRange(30,150);
        sprite.y = groundY;
        sprite.body.velocity.x = -100;
        }
       else {
           sprite.x = 5*pageWidth;
           //increasing distance so after killed, distance condition of update does not match and hence weapon not fired
           
       }
    }
    if (sprite == gunMan1 || sprite == gunMan2 || sprite == gunMan3) {
        if (remainingEnemy.gunMen > 0) {
        sprite.revive();
        remainingEnemy.gunMen --;
        sprite.x = pageWidth+minReplaceDist.e4+game.rnd.integerInRange(200,300);
        sprite.y = groundY;
        sprite.body.velocity.x = -60;
        }
        else {
            sprite.x = 5*pageWidth;
        }
    }
    if (sprite == flyingMonster1 || sprite == flyingMonster2 || sprite == flyingMonster3 || sprite == flyingMonster4) {
        if (remainingEnemy.flyingMonsters > 0) {
        sprite.revive();
        remainingEnemy.flyingMonsters --;
        sprite.x = pageWidth+minReplaceDist.e3+game.rnd.integerInRange(30,150);
        sprite.y = groundY-160;
        sprite.body.velocity.x = -50;
        sprite.body.velocity.y = 0;
        }
        
        else {
            sprite.x = 5*pageWidth;
        }
    }
    if (sprite == catapult1 || sprite == catapult2 || sprite == catapult3) {
        if (remainingEnemy.catapults > 0) {
        sprite.revive();
        remainingEnemy.catapults --;
        sprite.x = pageWidth+minReplaceDist.e5+game.rnd.integerInRange(30,150);
        sprite.body.velocity.x = -10;
        sprite.body.velocity.y = 0;
        sprite.y = groundY + 20;
        
        if (sprite == catapult1) {
            catapult1Rock.autofire = false;
        }
        if (sprite == catapult2) {
            catapult2Rock.autofire = false;
        }
        if (sprite == catapult3) {
            catapult3Rock.autofire = false;
        }
        }
        else {
            sprite.x = 5*pageWidth;
        }
    }
    sprite.angle = 0;
    sprite.animations.play("left");
}
function victory() {
       healthBar.visible = false;
       healthLabel.visible = false;
       backgroundBar.visible = false;
       scoreLabel.visible = false;
       pauseBg.visible = false;
       pauseBtn.visible = false;
       player.frame = 0;
       gameOverText.text = "You Won !!!";
       gameOverText.fill = "#1AFF00"
       displayBoard();
}
function gameOver() {
   healthBar.visible = false;
   healthLabel.visible = false;
   backgroundBar.visible = false;
   scoreLabel.visible = false;
   pauseBg.visible = false;
   pauseBtn.visible = false;
   game.camera.flash(0xFF0500, 2000);
   game.time.events.add(2000, function () {
       overlay.visible = true;
       displayBoard();
   });
   
   //game.time.events.add(1700, displayBoard);
   /*game.time.delayedCall(250, function() {
    game.cameras.fade(0x000000,250);
  }, [], this);*/
   //game.camera.fade(0x000000, 700);
   isPlayerAlive = false;
   
}

function displayBoard() {
    gameOverText.visible = true;
    bgBtn.events.onInputDown.addOnce(restart);
    bgBtn.visible = true;
    retryBtn.visible = true;
    damageLabel = game.add.text(pageWidth/4,game.world.centerY, 'Damage:\n'+playerScore+" %", {fontSize:"30px", fill:"#FF7100",stroke: "#000000",strokeThickness: 5});
    accuracyLevel = (onTarget/totalShoots)*100;
    accuracyLabel = game.add.text(3*pageWidth/4,game.world.centerY, 'Accuracy:\n'+accuracyLevel.toFixed(2)+" %", {fontSize:"30px", fill:"#FF7100",stroke: "#000000",strokeThickness: 5});
    damageLabel.anchor.setTo(0.5);
    accuracyLabel.anchor.setTo(0.5);
}
function restart() {
    playerScore = 0;
    totalShoots = -1;
    onTarget = 0;
    var remainingEnemy = {
    spittingBugs: 24,
    goblins: 14,
    flyingMonsters: 16,
    gunMen: 12,
    catapults: 7
    };
    retryIntent = true;
    gameBgMusic.stop();
    alert("re-start")
    game.state.restart(false);
}
function pauseGame() {
    game.paused = true;
    greenBgBtn.visible = true;
    greenPlayBtn.visible = true;
}
function resumeGame() {
    greenBgBtn.visible = false;
    greenPlayBtn.visible = false;
    game.paused = false;
    totalShoots --; //as arrow shot upon pressing resume button
}
function startGame() {
    gameTitle.visible = false;
    playBtn.visible = false;
    bgBtn.visible = false;
    gameStartImage.visible = false;
    game.paused = false;
    pauseBg.visible = true;
    pauseBtn.visible = true;
    //introBgMusic.stop();
    gameBgMusic.play();
}
