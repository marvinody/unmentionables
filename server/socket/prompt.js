const prompts = [
  'You are adventures on a quest to find an ancient relic.',
  'You find yourselves stranded on a desert island.',
  'Your group awakes to find themselves on an island inhabited with dinosaurs.',
  'To win against the supervillain plaguing the world, your superhero team must work together.',
  'You are a band of assassins and your mission is to kill a dictator that is torturing his people.',
  'Traveling on a starship, you arrive on a distant planet',
  'The only way to save Earth? By finding Waldo.'
]
module.exports = function() {
  const idx = Math.floor(Math.random() * prompts.length)
  return prompts[idx]
}
