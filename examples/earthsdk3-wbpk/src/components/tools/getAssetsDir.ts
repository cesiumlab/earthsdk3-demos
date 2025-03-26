import { ESSceneObject } from "earthsdk3";

export function getAssetsDir(str: string) {
    // return ESSceneObject.context.getEnv(`vue-xe2-plugin-assets-dir`);
    return ESSceneObject.context.getStrFromEnv('${earthsdk3-assets-script-dir}' + str);
}

export function setAssetsDir(dir: string | undefined) {
    return ESSceneObject.context.setEnv(`vue-xe2-plugin-assets-dir`, dir);
}

export function getEnvironmentVariable(name: string) {
    return ESSceneObject.context.getEnv(name);
}

export function setEnvironmentVariable(name: string, dir: string | undefined) {
    return ESSceneObject.context.setEnv(name, dir);
}
