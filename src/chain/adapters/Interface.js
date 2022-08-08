

function not_defined(name) {
    throw "Not defined Chain Adapter method";
}

let AdapterInterface = {
    getMarket: not_defined,
    getNft: not_defined
}

export default AdapterInterface;