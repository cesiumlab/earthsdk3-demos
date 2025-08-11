const fs = require('fs');
const path = require('path');

// TODO:在此替换版本号 在根目录运行 node update-version.js (pnpm run update:version)
const newVersion = {
    "xbsj-base": "1.0.3",
    "earthsdk3": "3.3.0-beta.10",
    "earthsdk3-cesium": "3.3.0-beta.17",
    "earthsdk3-ue": "3.3.0-beta.3",
    "earthsdk3-assets": "3.0.5",
}

//需要更新的package.json路径
const packageJsonPaths = [
    'demos/earthsdk3-openlayers/package.json',
    'demos/earthsdk-all-engine/package.json',
    'demos/earthui/package.json',
    'demos/earthsdk3-usage/package.json',
    'demos/vis-earth/package.json',
    'examples/earthsdk3-vite/package.json',
    'examples/earthsdk3-vite-js/package.json',
    'examples/earthsdk3-wbpk/package.json',
    'examples/earthsdk3-react-vite/package.json',
]

//替换package.json中的dependencies对应 newVersion 的版本号
const updatePackageJson = (filePath) => {
    const packageJsonPath = path.resolve(__dirname, filePath);
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const dependencies = { ...packageJson.dependencies };
    for (const key in dependencies) {
        if (newVersion[key]) {
            dependencies[key] = newVersion[key];
        }
    }
    packageJson.dependencies = { ...dependencies };
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8');
}

//更新所有package.json
const updateAllPackageJson = () => {
    packageJsonPaths.forEach(filePath => {
        updatePackageJson(filePath);
    });
    console.log('All package.json files updated successfully.');
}

updateAllPackageJson();
