function randomizer(players, matches) {
  const names = []
  for (let i=0; i < players.length; i++) {
    names.push(players[i].name)
  }
  var range = names.length;
  while (range != 0) {
    var random = Math.floor(Math.random() * range);
    range--;
    [names[range], names[random]] = [names[random], names[range]];
  }
  updateMatches(names)
};
