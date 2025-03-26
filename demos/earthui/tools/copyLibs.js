const { ncp } = require('ncp');
const rimraf = require('rimraf');
const fs = require('fs');

async function copyLib(dirName, srcDir, destDir) {
    const source = srcDir + '/' + dirName;
    const destination = destDir + '/' + dirName;

    await new Promise((resolve, reject) => {
        rimraf(destination, error => {
            if (error) {
                console.error(error);
                resolve();
                return;
            }
            console.log(`rimraf success!`);
            resolve();
        });
    });

    await new Promise((resolve, reject) => {
        ncp(source, destination, error => {
            if (error) {
                console.error(error);
                resolve();
                return;
            }
            console.log('ncp success!');
            resolve();
        });
    });
}

async function copyLibs() {
    let srcDir = './misc/node_modules_ext';
    if (!fs.existsSync(srcDir)) {
        srcDir = '.' + srcDir;
    }

    if (!fs.existsSync(srcDir)) {
        console.error(`目录不存在！`);
        return;
    }

    const destDir = './node_modules';

    const libs = [
        'xbsj-renderer',
        'xbsj-xe2',
        'esobjs-xe2-plugin',
        'vue-xe2-plugin',
    ];

    for (let libName of libs) {
        console.log(`copy ${libName}`);
        await copyLib(libName, srcDir, destDir);    
    }
}

copyLibs();
