const GAMES_URL = __DEV__ ? 'http://10.0.0.3:8888/' : 'https://raw.githubusercontent.com/ingvardm/AdventureMaster/master/built-in-games/'

const get = url => fetch(url)

export const fetchGame = url => get(`${GAMES_URL}${url}?v=${Date.now()}`).then(r => r.text())