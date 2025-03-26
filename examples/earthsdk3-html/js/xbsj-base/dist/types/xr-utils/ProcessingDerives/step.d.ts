import { CancelsManager } from '../Processings';
/**
 *
 * @param cancelsManager
 * @param asyncFunc
 * @param args
 * @returns
 *
 * @example
 *   await nextAsync(cancelsManager, async cancelsManager => {
 *       cancelsManager.disposer.dispose(czmViewer.interaction.pointerMoveEvent.disposableOn(pointerEvent => {
 *           computePickingInfo(pointerEvent, scene, mainCoordinates, coordinatesEditor.axisSnapPixelSize, pickingInfo);
 *           setCoordinatesColor(mainCoordinates, pickingInfo.constraintMode);
 *       }));

 *       await nextAsync(cancelsManager, cancelsManager => {
 *           return new Promise<void>(resolve => {
 *               cancelsManager.disposer.dispose(czmViewer.interaction.pointerDownEvent.disposableOn(pointerEvent => {
 *                   computePickingInfo(pointerEvent, scene, mainCoordinates, coordinatesEditor.axisSnapPixelSize, pickingInfo);
 *                   if (pickingInfo.constraintMode !== 'none') {
 *                       resolve();
 *                   }
 *               }));
 *           });
 *       });
 *   });
 */
export declare function step<CompleteValueType = void, StartValueType extends any[] = []>(cancelsManager: CancelsManager, asyncFunc: (cancelsManager: CancelsManager, ...args: StartValueType) => Promise<CompleteValueType>, ...args: StartValueType): Promise<CompleteValueType>;
