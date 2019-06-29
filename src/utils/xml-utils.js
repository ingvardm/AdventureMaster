import { Parser } from 'react-native-xml2js'

const parserOptions = {
    explicitChildren: true,
    preserveChildrenOrder: true,
    explicitArray: false,
    attrkey: '_ATTRIBUTES',
    charkey: '_TEXT'
}

const parser = new Parser(parserOptions)

export function xml2objAsync(xml) {
    return new Promise((resolve, reject) => {
        parser.parseString(xml, function (err, result) {
            if(err) reject(err)
            else resolve(result)
        });
    })
}