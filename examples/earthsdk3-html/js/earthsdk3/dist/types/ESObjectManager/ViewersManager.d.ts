import { Destroyable, Event, Listener } from "xbsj-base";
import { ESVOption } from "../ESJTypes";
import { ESViewer } from "../ESViewer";
import { SceneObjectsManager } from "./SceneObjectsManager";
export declare class ViewersManager extends Destroyable {
    private _sceneObjectsManager;
    private _viewersChanged;
    get viewersChanged(): Event<[toDels: ESViewer[], toAdds: ESViewer[]]>;
    private _viewers;
    get viewers(): Readonly<Set<ESViewer>>;
    getViewers(): readonly ESViewer[];
    private _viewersToChange;
    get viewersToChange(): Listener<[toDels: ESViewer[], toAdds: ESViewer[]]>;
    createViewer<T extends ESViewer>(option: ESVOption): T;
    destroyViewer<T extends ESViewer>(viewer: T): boolean;
    constructor(_sceneObjectsManager: SceneObjectsManager);
}
