const { System, isPrivate } = require('../lib/');
const axios = require('axios');

System({
  pattern: 'lyrics ?(.*)',
  fromMe: isPrivate,
  desc: 'Searches for lyrics',
  type: 'search',
}, async (message, match) => {
  if (!match) {
    await message.send('*Need a song name\n_Example: .lyrics let me die_');
    return;
  }

  const query = match.trim();
  const apiUrl = `https://api-ironman444ff.koyeb.app/ironman/lyrics?lrc=${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(apiUrl);
    const ironmanValue = response.data.ironman;

    await message.send(`*Lyrics for "${query}":*\n${ironmanValue}`);
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    await message.send(`Cannot Find lyrics for ${query}\nPlease check the song name.`);
  }
});
