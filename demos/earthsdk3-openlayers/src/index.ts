import { copyright } from './copyright';
try {
    //@ts-ignore
    window.g_earthsdk_copyright_print = window.g_earthsdk_copyright_print ?? true;
    //@ts-ignore
    window.g_earthsdk_copyright_print && copyright.print();
} catch (error) {
    //打包后不会影响，运行时会报错正常
    console.warn('版本信息输出有误！');
}


export * from './ESOlViewer';
export * from './ESObjects';
