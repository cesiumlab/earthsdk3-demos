export type UeEventsType = {
    click: {
        et: 'click';
        eid: string;
        screenPosition: [number, number];
        mouseEvent?: MouseEvent;
    };
    dbclick: {
        et: 'dbclick';
        eid: string;
        screenPosition: [number, number];
        mouseEvent?: MouseEvent;
    };
    hoverEvent: {
        et: "hoverEvent";
        eid: string;
        screenPosition: [number, number];
        mouseEvent?: MouseEvent;
    };
    hoverOutEvent: {
        et: "hoverOutEvent";
        eid: string;
        screenPosition?: [number, number];
        mouseEvent?: MouseEvent;
    };
    mouseMoveEvent: {
        et: "mouseMoveEvent";
        eid: string;
        screenPosition: [number, number];
        mouseEvent?: MouseEvent;
    };
    mouseUpEvent: {
        et: "mouseUpEvent";
        eid: string;
        screenPosition: [number, number];
        mouseEvent?: MouseEvent;
    };
    mouseDownEvent: {
        et: "mouseDownEvent";
        eid: string;
        screenPosition: [number, number];
        mouseEvent?: MouseEvent;
    };
    propChanged: {
        et: 'propChanged';
        eid: string;
        objId: string;
        props: {
            [k: string]: any;
        };
    };
    objectEvent: {
        et: 'objectEvent';
        eid: string;
        type: string;
        id: string;
        p: {
            [k: string]: any;
        };
    };
    widgetEvent: {
        et: 'widgetEvent';
        eid: string;
        objId: string;
        type: "leftClick" | "rightClick" | "mouseEnter" | "mouseLeave" | "childMouseLeave" | "childMouseEnter";
        add?: {
            children?: string[];
            mousePos?: [number, number];
            className?: string;
            mouseRelativePos?: [number, number];
        };
    };
    speechRecognition: {
        "et": "speechRecognition";
        "eid": string;
        "result": string;
        "error": string;
    };
    customMessage: {
        "et": "customMessage";
        "eid": string;
        "message": string;
    };
    statusUpdate: {
        et: "statusUpdate";
        eid: string;
        FPS: number;
        length: number;
        position: [number, number, number];
        rotation: [number, number, number];
    };
};
