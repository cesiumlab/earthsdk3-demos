export type ESJEditingModeType = "Place" | "Translation" | "Rotation" | "Scale" | "DoublePointsAppend" | "DoublePointsModify" | "CircularAppend" | "CircularInsert" | "LineStringAppend" | "LineStringInsert" | "ScatterAppend" | "ScatterModify" | "VisibilityAppend" | "VisibilityModify" | "HeightModify";
export type ESJEditingBindModeType = "doublePoints" | "lineString" | "circular" | "singlePoint" | "visibility";
export declare enum ESJEditingMode {
    Place = "Place",
    Translation = "Translation",
    Rotation = "Rotation",
    Scale = "Scale",
    DoublePointsAppend = "DoublePointsAppend",
    DoublePointsModify = "DoublePointsModify",
    CircularAppend = "CircularAppend",
    CircularInsert = "CircularInsert",
    LineStringAppend = "LineStringAppend",
    LineStringInsert = "LineStringInsert",
    ScatterAppend = "ScatterAppend",
    ScatterModify = "ScatterModify",
    VisibilityAppend = "VisibilityAppend",
    VisibilityModify = "VisibilityModify",
    HeightModify = "HeightModify"
}
