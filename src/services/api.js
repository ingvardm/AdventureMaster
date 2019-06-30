// const GAMES_URL = __DEV__ ? 'http://10.0.0.3:8888/' : 'https://raw.githubusercontent.com/ingvardm/AdventureMaster/master/built-in-games/'
const GAMES_URL = 'https://raw.githubusercontent.com/ingvardm/AdventureMaster/master/built-in-games/'
const GAMES_LIST_URL = 'https://raw.githubusercontent.com/ingvardm/AdventureMaster/master/src/built-in-games.json'

const get = url => fetch(url)

export const fetchGame = url => get(`${GAMES_URL}${url}?v=${Date.now()}`).then(r => r.json())
export const fetchGamesList = () => get(`${GAMES_LIST_URL}?v=${Date.now()}`).then(r => r.json())