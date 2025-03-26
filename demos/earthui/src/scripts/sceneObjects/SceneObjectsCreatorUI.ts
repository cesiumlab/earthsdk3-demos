import { createApp } from 'vue';

import { ESCustomDiv, ESSceneObject, ESViewer, FunctionProperty, GroupProperty, StringProperty } from "earthsdk3";
import { Destroyable, PartialWithUndefinedReactivePropsToNativeProps, ReactivePropsToNativePropsAndChanged, bind, createProcessingFromAsyncFunc, extendClassProps, react, track } from "xbsj-base";
import SceneObjectsCreator from "../../components/SceneObjectsCreator.vue";
import { SceneObjectTypeGetting } from './SceneObjectTypeGetting';

function createDivClass(sceneObject: SceneObjectsCreatorUI) {
    return class MyDiv extends Destroyable {
        // subContainer是外部视口的div容器，可以在这里创建自己需要的DOM元素
        // customDiv指向当前的CustomDiv场景对象
        // viewer指定当前的视口

        private _sceneTreeApp: any
        get sceneTreeApp() { return this._sceneTreeApp }

        constructor(subContainer: HTMLDivElement, customDiv: ESCustomDiv, viewer?: ESViewer | undefined) {
            super();

            const div = document.createElement('div');
            subContainer.appendChild(div);
            this.dispose(() => subContainer.removeChild(div));

            this._sceneTreeApp = createApp(SceneObjectsCreator, {
                show: sceneObject.showSceneObjectsCreatorRef,
                getTypeName: (type: string) => sceneObject.sceneObjectTypeGetting.setTypeName(type),
            });
            console.log("demo", this._sceneTreeApp);

            this._sceneTreeApp.mount(div);
            this.dispose(() => this._sceneTreeApp.unmount());

            // div.style.width = '200px';
            // div.style.height = '400px';
            div.style.left = '10px';
            div.style.top = '10px';
            // div.style.background = 'rgba(120, 120, 0, 0.7)';
            // div.style.color = 'white';
            // div.style.fontSize = '30px';
            // div.style.lineHeight = '50px';
            // div.style.border = '1px solid white';
            div.style.zIndex = '100'; // 特别重要，不能丢！很可能导致保存后打开看不到！
            div.style.pointerEvents = 'all';

            {
                // 控制显示隐藏
                const update = () => {
                    div.style.display = (customDiv.show ?? true) ? 'block' : 'none';
                };
                update();
                this.dispose(customDiv.showChanged.disposableOn(update));
            }

            {
                const update = () => {
                    if (!this._sceneTreeApp) return;
                    this._sceneTreeApp._container._vnode.component.props.show = sceneObject.showSceneObjectsCreatorRef;
                }
                update();
                this.dispose(sceneObject.showSceneObjectsCreatorRefChanged.disposableOn(update))
            }

        }
    }
}

export class SceneObjectsCreatorUI extends ESSceneObject {
    static readonly type = this.register('SceneObjectsCreatorUI', this, { chsName: 'SceneObjectsCreatorUI', tags: ['MiscObjects'], description: "SceneObjectsCreatorUI" });
    get typeName() { return 'SceneObjectsCreatorUI'; }
    override get defaultProps() { return SceneObjectsCreatorUI.createDefaultProps(); }
    get json() { return this._innerGetJson() as JsonType; }
    set json(value: JsonType) { this._innerSetJson(value); }

    private _sceneObjectTypeGetting = this.disposeVar(new SceneObjectTypeGetting());
    get sceneObjectTypeGetting() { return this._sceneObjectTypeGetting; }

    private _customDiv = this.disposeVar(new ESCustomDiv());
    get customDiv() { return this._customDiv; }

    // get container() { return this._customDiv.container; }
    // get containerChanged() { return this._customDiv.containerChanged; }
    // set container(value) { this._customDiv.container = value; }

    private _showSceneObjectsCreatorRef = this.disposeVar(react<boolean>(false))
    get showSceneObjectsCreatorRef() { return this._showSceneObjectsCreatorRef.value }
    set showSceneObjectsCreatorRef(value: boolean) { this._showSceneObjectsCreatorRef.value = value }
    get showSceneObjectsCreatorRefChanged() { return this._showSceneObjectsCreatorRef.changed }

    private _container = this.disposeVar(react<HTMLElement | undefined>(undefined));
    get container() { return this._container.value; }
    get containerChanged() { return this._container.changed; }
    set container(value: HTMLElement | undefined) { this._container.value = value; }

    getTypeName() {
        return new Promise<string>((resolve, reject) => {
            this.processing.restart();
            this.processing.completeFunc = typeName => resolve(typeName);
            this.processing.errorFunc = error => reject(error);
        });
    }

    private _processing = this.disposeVar(createProcessingFromAsyncFunc(async cancelsManager => {
        const promise = this.sceneObjectTypeGetting.start()
        const typeName = await cancelsManager.promise(promise);
        return typeName;
    }))
    get processing() { return this._processing; }

    constructor(id?: string) {
        super(id);

        const customDiv = this._customDiv;
        this.dispose(this.components.disposableAdd(customDiv));
        customDiv.instanceClass = createDivClass(this)

        this.dispose(bind([this, 'showSceneObjectsCreatorRef'], [this.sceneObjectTypeGetting, 'showDialog']));
        this.dispose(track([customDiv, 'show'], [this, 'showSceneObjectsCreatorRef']));

        {
            const update = () => {
                // @ts-ignore
                customDiv.container = this.container ?? document.body;
            };
            update();
            this.dispose(this.containerChanged.disposableOn(update));
        }

        {
            const update = () => {
                if (this.containerId === undefined || this.containerId === '') {
                    this.container = undefined;
                } else {
                    const e = document.getElementById(this.containerId);
                    if (e instanceof HTMLElement) {
                        this.container = e;
                    } else {
                        this.container = undefined;
                        console.warn(`Div from containerId(${this.containerId}) is not HTMLDivElement!`);
                    }
                }
            };
            update();
            this.dispose(this.containerIdChanged.disposableOn(update));
        }
    }

    static override defaults = {
        ...ESSceneObject.defaults,
        containerId: '',
    }

    override getProperties(language?: string) {
        return [
            ...super.getProperties(language),
            new GroupProperty('通用', '通用', [
                new StringProperty("containerId", "containerId", true, false, [this, 'containerId'], SceneObjectsCreatorUI.defaults.containerId),
                new FunctionProperty("getTypeName", "getTypeName", [], () => this.getTypeName(), []),
            ]),
        ];
    }
}

export namespace SceneObjectsCreatorUI {
    export const createDefaultProps = () => ({
        ...ESSceneObject.createDefaultProps(),
        containerId: undefined as string | undefined,
    });
}
extendClassProps(SceneObjectsCreatorUI.prototype, SceneObjectsCreatorUI.createDefaultProps);
export interface SceneObjectsCreatorUI extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof SceneObjectsCreatorUI.createDefaultProps>> { }
type JsonType = PartialWithUndefinedReactivePropsToNativeProps<ReturnType<typeof SceneObjectsCreatorUI.createDefaultProps> & { type: string }>;
