module.exports = {
    entry: [ "./dist/index.js" ],
    output: {
        path: __dirname,
        filename: "Ajax.js"
    },
    externals: {
        Ajax: "Ajax"
    }
};
