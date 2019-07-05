const GAMES_URL = __DEV__ ? 'http://10.0.0.3:8888/' : 'https://raw.githubusercontent.com/ingvardm/AdventureMaster/master/built-in-games/'
const GAMES_LIST_URL = __DEV__ ? 'http://10.0.0.3:8888/built-in-games.json' : 'https://raw.githubusercontent.com/ingvardm/AdventureMaster/master/built-in-games/built-in-games.json'

const get = url => fetch(url)
const getJson = url => get(url).then(r => r.json())

export const fetchGame = url => getJson(`${GAMES_URL}${url}?v=${Date.now()}`)
export const fetchGamesList = () => getJson(`${GAMES_LIST_URL}?v=${Date.now()}`)