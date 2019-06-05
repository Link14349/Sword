module.exports = {
    entry: [ "./dist/index.js" ],
    output: {
        path: __dirname + "/release",
        filename: "Sword.js"
    },
    externals: {
        Sword: "Sword",
        sword: "sword"
    }
};