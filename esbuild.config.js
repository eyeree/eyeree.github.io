const {build, serve} = require("esbuild")
const fg = require('fast-glob');

const mode = process.argv[2] || "build";

const entryPoints = fg.sync("root/**/*.ts");
console.log("entryPoints", entryPoints.join(", "))

const buildOptions = {
    entryPoints: entryPoints,
    outdir: "root",
    outbase: "root",
    sourcemap: mode != "build",
    bundle: true,
    define: {
        DEBUG: mode != "build"
    },
    minify: mode == "build",
    target: "esnext",
    format: "esm"
    // incremental: mode == "dev",
}

if(mode == "watch") {
    buildOptions.watch = {
        onRebuild(error, result) {
            if (error) {
                console.error(error);
            } else {
                console.log(result)
            }
        }
    }

}

const serveOptions = {
    servedir: "root"
}

function error(reason) {
    console.error(reason);
    process.exit(1);
}

function success(result) {
    console.log(result)
}

switch(mode) {
    case "watch":
    case "build":
        build(buildOptions).then(success).catch(error);
        break;
    case "serve":
        serve(serveOptions, buildOptions).then(success).catch(error);
        break;
}

