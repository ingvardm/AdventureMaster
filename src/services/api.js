const GAMES_URL = 'https://raw.githubusercontent.com/ingvardm/AdventureMaster/master/built-in-games/'

const get = url => fetch(url)

export const fetchGame = url => get(`${GAMES_URL}${url}?v=${Date.now()}`).then(r => r.text())