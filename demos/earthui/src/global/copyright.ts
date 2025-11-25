// @ts-ignore
const name = `${NAME_}/${__webpack_runtime_id__}` ?? '-';
// @ts-ignore
const version = VERSION_ ?? '-';
// @ts-ignore
const date = DATE_ ?? '-';
// @ts-ignore
const owner = OWNER_ ?? '-';
// @ts-ignore
const description = DESCRIPTION_ ?? '';
// @ts-ignore
const commitId = COMMITID_ ?? '';
// @ts-ignore
const timestamp = TIMESTAMP_ ?? '';
const leftoverHoursStr = ((Date.now() - timestamp) / 3600000).toFixed(1);

const info = `%c🌏 ${name}%c ${version}.${commitId.slice(0, 8)}.${date} (距今${leftoverHoursStr}个小时)
%c${description ? description + '\n' : ''}当前网站正在使用${name}，此软件版权归${owner}所有
`
export const copyright = Object.seal({
    // @ts-ignore
    get owner() { return OWNER_ },
    // @ts-ignore
    get ownerlink() { return OWNERLINK_ },
    // @ts-ignore
    get gituri() { return GITURI_ && GITURI_.replace('${commitId}', COMMITID_) },
    // @ts-ignore
    get info() { return info; },
    // @ts-ignore
    get date() { return DATE_; },
    // @ts-ignore
    get author() { return AUTHOR_; },
    // @ts-ignore
    get version() { return VERSION_; },
    // @ts-ignore
    get name() { return NAME_; },
    // @ts-ignore
    get commitId() { return COMMITID_; },
    print() {
        console.info(this.info, `
            font-size: 18px;
            font-weight: 1000;
            line-height: 1;
            color: rgb(0, 120, 215);
            padding-top: 20px;
            padding-bottom: 10px;
            `,
            `
            font-size: 10px;
            font-weight: 1000;
            color: rgb(0, 120, 215);
            `,
            `
            font-size: 10px;
            line-height: 1.5;
            color: rgb(0, 120, 215);
            padding-bottom: 2px;
            padding-left: 35px;
            `,
            // qrcodeCss,
        );
    },
});

// @ts-ignore
window.g_xe2CopyRights = window.g_xe2CopyRights || {};
// @ts-ignore
window.g_xe2CopyRights[name] = copyright;
// copyright.print();
