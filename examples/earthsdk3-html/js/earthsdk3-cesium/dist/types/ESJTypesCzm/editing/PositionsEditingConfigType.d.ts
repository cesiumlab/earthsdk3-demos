export type PositionsEditingConfigType = {
    editor?: {
        showCoordinates?: boolean;
        showCircle?: boolean;
        disableX?: boolean;
        disableY?: boolean;
        disableXY?: boolean;
        disableZ?: boolean;
        disableZAxis?: boolean;
    };
    picker?: {
        clickEnabled?: boolean;
        dbClickEnabled?: boolean;
    };
    noModifingAfterAdding?: boolean;
    hideCursorInfo?: boolean;
};
