function Catcher (id, startingLocation, previousLocation) {
  this.id = id;
  this.posY = startingLocation[0];
  this.posX = startingLocation[1];
  this.lastPosY = previousLocation[0];
  this.lastPosX = previousLocation[1];
}

Catcher.prototype.move = function(previous) {

  let direction = this.seek();
  let nextTile = this.checkNext(direction);
  if (this.isBlocked(nextTile) === false) {
    previous = this.step(nextTile);
  }
  else {

    do {
      direction = Math.floor(Math.random() * (5 - 1) + 1);
      nextTile = this.checkNext(direction);
    }
    while(this.isBlocked(nextTile) === true || this.isEqual(nextTile.position, previous) === true);
    previous = this.step(nextTile);

  }

  return previous;
};

Catcher.prototype.isEqual = function(array1, array2) {
  let equal = true;
  if (array1.length === array2.length) {
    for (i = 0; i < array1.length; i++) {
      if(array1[i] !== array2[i]) {
        equal = false;
        break;
      }
    }
  }
  return equal;
};

Catcher.prototype.checkNext = function (direction) {
  let nextTile = {
    position: [],
    value: null
  };
  let currentPosition = newGame.mapFind(`catcher${this.id}`);
  let posY = currentPosition[0];
  let posX = currentPosition[1];

  if      (direction === 4) { nextTile.position = [posY - 1, posX];} //up
  else if (direction === 3) { nextTile.position = [posY, posX - 1];} //left
  else if (direction === 2) { nextTile.position = [posY + 1, posX];} //down
  else if (direction === 1) { nextTile.position = [posY, posX + 1];} //right

  nextTile.value = newGame.map[nextTile.position[0]][nextTile.position[1]];

  return nextTile;
};

Catcher.prototype.isBlocked = function (nextTile) {
  let posY = nextTile.position[0];
  let posX = nextTile.position[1];

  if (newGame.map[posY][posX] === 'wall') {
    return true;
  }
  return false;
};

Catcher.prototype.step = function (nextTile) {
  if (nextTile.value === 'beagle') {
    window.location.href = "game-over.html";
    return;
  }

  let previous = [this.posY, this.posX];

  if (nextTile.value === `catcher${this.id * -1}`) {
    return previous;
  }

  newGame.map[nextTile.position[0]][nextTile.position[1]] = `catcher${this.id}`;
  newGame.map[this.posY][this.posX] = nextTile.value;
  this.posY = nextTile.position[0];
  this.posX = nextTile.position[1];
  return previous;
};

Catcher.prototype.seek = function() {
  let beaglePosition = newGame.mapFind(`beagle`);
  let posY = beaglePosition[0];
  let posX = beaglePosition[1];
  let direction = null;

  if (posX < this.posX) {
    direction = 3;
  }
  else if (posX > this.posX) {
    direction = 1;
  }
  else {
    if (posY < this.posY) {
      direction = 4;
    }
    else if (posY > this.posY) {
      direction = 2;
    }
  }
  return direction;
};
