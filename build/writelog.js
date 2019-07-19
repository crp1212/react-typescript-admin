const fs = require('fs')
const SizeFormatHelpers = require('./SizeFormatHelpers.js')
const path = require('path')
const package = require('../package.json')
var oldInfo
try {
    oldInfo = require('../log.json')
} catch (error) {
    oldInfo = []
}
function log(jsonobj) {
    var infoObj = {
        assets: []
    }
    if (package.buildRemind) {
        infoObj.reason = package.buildRemind
    }
    infoObj.build_at = new Date(jsonobj.builtAt).toLocaleDateString(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit"
    })
    jsonobj.assets.forEach((x, y) => {
        if (/^css/.test(x.name) || /^js/.test(x.name)) {
            infoObj.assets.push({
                name: x.name,
                size: SizeFormatHelpers.formatSize(x.size)
            })
        }
    })
    oldInfo.push(infoObj)
    fs.writeFileSync(path.resolve(__dirname, '../log.json'), JSON.stringify(oldInfo), {
        encoding: 'utf8'
    })
}
module.exports = log