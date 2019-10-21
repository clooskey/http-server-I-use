let express = require('express') // web framework
let path = require('path') // well, path parser
let fs = require('fs') // filesystem framework
const parse = require('minimist') // command line arguments parser

fs.readFile("hello", (err, data) => {
    let msg;
    if (err) {
        msg = 'no helo :c'
    } else {
        msg = data.toString();
    }
    console.log(msg)
})

const args = parse(process.argv.slice(2), {
    default: {
        port: 8080,
        host: 'localhost',
        static: __dirname
    },
    alias: {
        p: 'port',
        h: 'host',
        s: 'static'
    }
})



const public = path.join(args.static, "public")

console.log(`Starting node server...`)

let app = express();

app.use(express.static('./public')); // hostuj statyczne pliki

app.listen(args.port, args.host, () => {
    console.log(`Listening at ${args.host}, port ${args.port}...\n Public static directory at ${public}.`)
})