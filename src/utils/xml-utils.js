import { Parser } from 'react-native-xml2js'

export const XML_KEYS = {
    CHILDREN: '_CHILDREN',
    TEXT: '_TEXT',
    ATTRIBUTES: '_ATTRIBUTES',
}

const parserOptions = {
    explicitChildren: true,
    preserveChildrenOrder: true,
    explicitArray: false,
    attrkey: XML_KEYS.ATTRIBUTES,
    charkey: XML_KEYS.TEXT,
    childkey: XML_KEYS.CHILDREN,
}

const parser = new Parser(parserOptions)

export function xml2objAsync(xml) {
    return new Promise((resolve, reject) => {
        parser.parseString(xml, (err, result) => {
            if(err)
                reject(err)
            else
                resolve(result)
        });
    })
}