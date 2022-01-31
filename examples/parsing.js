const { AssetParser } = require('../');

const GET_ALLS = require('./GET_ALLS.json').DATA;
const GET_STDT = require('./GET_STDT.json').DATA;

const ap = new AssetParser({
    get_alls: GET_ALLS,
    get_stdt: GET_STDT,
}).parsedData;

if (ap.flagHasFanMain) {
    console.log('Product has main fan!');
} else {
    console.log('Product has no fan!');
}

if (ap.valueProductIsOn) {
    console.log('Product is ON!!');
} else {
    console.log('Product is OFF!!');
}
