import { Destroyable } from '../../base';
import { Event } from '../../base';
import { CanvasPrimitivesContext } from './CanvasPrimitivesContext';
export declare abstract class CanvasPrimitive extends Destroyable {
    protected _canvasPrimitivesContext: CanvasPrimitivesContext;
    protected _needRedrawEvent?: Event;
    protected _needPickRedrawEvent?: Event;
    private _id;
    protected _clickEvent?: Event<[left: number, top: number, tag: string, self: CanvasPrimitive, pointerEvent: PointerEvent]>;
    protected _clickOutEvent?: Event<[left: number, top: number, tag: string, self: CanvasPrimitive, pointerEvent: PointerEvent]>;
    protected _dbclickEvent?: Event<[left: number, top: number, tag: string, self: CanvasPrimitive, pointerEvent: PointerEvent]>;
    protected _dbclickOutEvent?: Event<[left: number, top: number, tag: string, self: CanvasPrimitive, pointerEvent: PointerEvent]>;
    protected _actived: boolean;
    protected _activedChanged?: Event<[actived: boolean, self: CanvasPrimitive]>;
    protected _hovered: boolean;
    protected _hoveredChanged?: Event<[hovered: boolean, self: CanvasPrimitive]>;
    protected _selected: boolean;
    protected _selectedChanged?: Event<[selected: boolean, self: CanvasPrimitive]>;
    private _opacity;
    protected _opacityChanged?: Event<[show: number, self: CanvasPrimitive]>;
    protected _show: boolean;
    protected _showChanged?: Event<[show: boolean, self: CanvasPrimitive]>;
    constructor(_canvasPrimitivesContext: CanvasPrimitivesContext, options?: {
        needRedraw?: boolean;
        needPickRedraw?: boolean;
    });
    /**
     * 获取id
     */
    get id(): string;
    /**
     * 获取poi所属的管理器
     */
    get context(): CanvasPrimitivesContext;
    /**
     * 需要重绘
     */
    needRedraw(): void;
    /**
     * 需要拾取重绘
     */
    needPickRedraw(): void;
    /**
     * 获取深度值，用来进行排序和比较
     * 此方法需要子类需要自行实现
     */
    abstract get depth(): number;
    /**
     * 该函数仅仅供CanvasPoisManager内部调用，其他地方不能使用！
     * 此方法需要子类需要自行实现
     * @param ctx
     */
    abstract draw(ctx: CanvasRenderingContext2D): void;
    /**
     * 该函数仅仅供CanvasPoisManager内部调用，其他地方不能使用！
     * 此方法需要子类需要自行实现
     * @param ctx
     * @param createPickColor
     */
    abstract drawForPick(ctx: CanvasRenderingContext2D, createPickColor: (tag: string) => string): void;
    hasClickEvent(): boolean;
    /**
     * 鼠标点击触发的事件
     */
    get clickEvent(): Event<[left: number, top: number, tag: string, self: CanvasPrimitive, pointerEvent: PointerEvent]>;
    hasClickOutEvent(): boolean;
    /**
     * 鼠标点击触发的事件
     */
    get clickOutEvent(): Event<[left: number, top: number, tag: string, self: CanvasPrimitive, pointerEvent: PointerEvent]>;
    hasDbclickEvent(): boolean;
    /**
     * 鼠标点击触发的事件
     */
    get dbclickEvent(): Event<[left: number, top: number, tag: string, self: CanvasPrimitive, pointerEvent: PointerEvent]>;
    hasDbclickOutEvent(): boolean;
    /**
     * 鼠标点击触发的事件
     */
    get dbclickOutEvent(): Event<[left: number, top: number, tag: string, self: CanvasPrimitive, pointerEvent: PointerEvent]>;
    /**
     * 鼠标在图元上按下还没有抬起时的状态
     */
    set actived(value: boolean);
    get actived(): boolean;
    get activedChanged(): Event<[actived: boolean, self: CanvasPrimitive]>;
    /**
     * 鼠标悬停在图标之上时的状态
     */
    set hovered(value: boolean);
    get hovered(): boolean;
    get hoveredChanged(): Event<[hovered: boolean, self: CanvasPrimitive]>;
    /**
     * 鼠标悬停在图标之上时的状态
     */
    set selected(value: boolean);
    get selected(): boolean;
    get selectedChanged(): Event<[selected: boolean, self: CanvasPrimitive]>;
    set opacity(value: number);
    get opacity(): number;
    get opacityChanged(): Event<[show: number, self: CanvasPrimitive]>;
    set show(value: boolean);
    get show(): boolean;
    get showChanged(): Event<[show: boolean, self: CanvasPrimitive]>;
}
