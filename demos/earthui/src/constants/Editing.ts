import { ESJEditingMode } from "earthsdk3";

const tip1 = '双击/ESC退出 ';
const tip2 = '空格键切换模式 ';
/**
 * 
 * @param mode 编辑模式
 * @param isCheck 是否可以切换编辑模式
 * @returns 
 */
export const getEditingMsg = (mode: ESJEditingMode, isCheck: boolean = false) => {
    const isTip2 = isCheck ? tip2 : '';
    const item = EDITING_MODES.find(item => item.type === mode);
    if (!item) return `${tip1}`;
    return `[ ${item.name} ] : ${tip1}  ${isTip2}  ${item.msg}`;
}

/**
 * name: 编辑模式名称
 * icon: 编辑模式图标,iconfont.js 图标库的图标名称
 * type: 编辑模式类型
 * allowEditing: 是否允许编辑
 * msg: 编辑模式提示信息
 * @returns 编辑模式列表
 */
export const EDITING_MODES = [
    {
        name: '单点放置',
        icon: 'place',
        type: ESJEditingMode.Place,
        allowEditing: false, msg: `右键移除点,左键放置点`,

    },
    {
        name: '平移编辑',
        icon: 'translation',
        type: ESJEditingMode.Translation,
        allowEditing: false, msg: `拖动坐标轴或网格区域进行平移`,

    },
    {
        name: '旋转编辑',
        icon: 'rotation',
        type: ESJEditingMode.Rotation,
        allowEditing: false, msg: `拖动编辑器进行旋转`
    },
    {
        name: '缩放编辑',
        icon: 'scale',
        type: ESJEditingMode.Scale,
        allowEditing: false, msg: `拖动坐标轴进行缩放`
    },
    {
        name: '双点追加编辑',
        icon: 'a-Doublepointsappend',
        type: ESJEditingMode.DoublePointsAppend,
        allowEditing: false, msg: `点击地球进行追加点(上限2个点)`
    },
    {
        name: '双点修改编辑',
        icon: 'a-Doublepointsmodify',
        type: ESJEditingMode.DoublePointsModify,
        allowEditing: false, msg: `选择点位拖动坐标轴修改`
    },
    {
        name: '折线追加点编辑',
        icon: 'a-Linestringappend',
        type: ESJEditingMode.LineStringAppend,
        allowEditing: false, msg: `点击地球进行追加点,右键移除点`
    },
    {
        name: '折线插入点编辑',
        icon: 'a-LinestringInsert',
        type: ESJEditingMode.LineStringInsert,
        allowEditing: false, msg: `点击中点插入点`
    },
    {
        name: '环形追加点编辑',
        icon: 'a-Circularappend',
        type: ESJEditingMode.CircularAppend,
        allowEditing: false, msg: `点击地球进行追加点,右键移除点`
    },
    {
        name: '环形插入点编辑',
        icon: 'a-CircularInsert',
        type: ESJEditingMode.CircularInsert,
        allowEditing: false, msg: `点击中点插入点`
    },
    {
        name: '散点追加编辑',
        icon: 'a-Scatterappend',
        type: ESJEditingMode.ScatterAppend,
        allowEditing: false, msg: `点击地球进行追加点,右键移除点`
    },
    {
        name: '散点修改编辑',
        icon: 'a-Scattermodify',
        type: ESJEditingMode.ScatterModify,
        allowEditing: false, msg: ``
    },
    {
        name: '通视追加编辑',
        icon: 'a-visibilityappend',
        type: ESJEditingMode.VisibilityAppend,
        allowEditing: false, msg: `点击地球进行追加点,右键移除点`
    },
    {
        name: '通视修改编辑',
        icon: 'a-visibilitymodify',
        type: ESJEditingMode.VisibilityModify,
        allowEditing: false, msg: `选择点位拖动坐标轴修改点`
    },
    {
        name: '高度修改编辑',
        icon: 'a-Heightmodify',
        type: ESJEditingMode.HeightModify,
        allowEditing: false, msg: `选择点位拖动坐标轴修改点`
    },
    {
        name: '单点编辑模式',
        icon: 'a-place_translation',
        type: ESJEditingMode.SinglePoint,
        allowEditing: false, msg: `右键移除点,左键放置点,拖动坐标轴进行平移`
    },
    {
        name: '双点编辑模式',
        icon: 'a-double_point_add_edit',
        type: ESJEditingMode.DoublePoints,
        allowEditing: false, msg: `点击地球追加点(上限2个点),选择点拖动坐标轴修改点`
    }
]
