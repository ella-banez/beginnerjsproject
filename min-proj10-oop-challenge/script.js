function Player(name){
  this.name = name;
  this.lvl = 1;
  this.points = 0;
}

Player.prototype.gainXp = function (xp){
  this.points += xp;

  if(this.points >= 10){
    this.lvl += 1;
    this.points -= 10;
  }

  console.log(this.describe());
}

Player.prototype.describe = function(){
  return `${this.name}, Level ${this.lvl}, Points ${this.points}`;
}

let player1 = new Player('Ryan');
let player2 = new Player('Riel');

player1.gainXp(5);
player2.gainXp(10);
player1.gainXp(10);
player2.gainXp(7);
player1.gainXp(10);
player2.gainXp(2);