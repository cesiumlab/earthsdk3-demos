import { Component } from "vue";
import BooleanProperty from './propertiesMenu/properties/BooleanProperty.vue';
import NumberProperty from './propertiesMenu/properties/NumberProperty.vue';
import Number2Property from './propertiesMenu/properties/Number2Property.vue';
import Number2sProperty from './propertiesMenu/properties/Number2sProperty.vue';
import Number3Property from './propertiesMenu/properties/Number3Property.vue';
import Number3sProperty from './propertiesMenu/properties/Number3sProperty.vue';
import Number4Property from './propertiesMenu/properties/Number4Property.vue';
import StringProperty from './propertiesMenu/properties/StringProperty.vue';
import ColorProperty from './propertiesMenu/properties/ColorProperty.vue';
import DateProperty from './propertiesMenu/properties/DateProperty.vue';
import DatesProperty from './propertiesMenu/properties/DatesProperty.vue';
import EnumProperty from './propertiesMenu/properties/EnumProperty.vue';
import FunctionProperty from './propertiesMenu/properties/FunctionProperty.vue';
import JsonProperty from './propertiesMenu/properties/JsonProperty.vue';
import PositionProperty from './propertiesMenu/properties/PositionProperty.vue';
import NumberSliderProperty from './propertiesMenu/properties/NumberSliderProperty.vue';
import EvalStringProperty from './propertiesMenu/properties/EvalStringProperty.vue';
import LongStringProperty from './propertiesMenu/properties/LongStringProperty.vue';
import PlayerProperty from './propertiesMenu/properties/PlayerProperty.vue';
import PositionsProperty from './propertiesMenu/properties/PositionsProperty.vue';
import RotationProperty from './propertiesMenu/properties/RotationProperty.vue';
import UriProperty from './propertiesMenu/properties/UriProperty.vue';
export const propComps: { [k: string]: Component } = {
    BooleanProperty: BooleanProperty,
    NumberProperty: NumberProperty,
    Number2Property: Number2Property,
    Number2sProperty: Number2sProperty,
    Number3Property: Number3Property,
    Number3sProperty: Number3sProperty,
    Number4Property: Number4Property,
    StringProperty: StringProperty,
    ColorProperty: ColorProperty,
    DateProperty: DateProperty,
    DatesProperty: DatesProperty,
    EnumProperty: EnumProperty,
    FunctionProperty: FunctionProperty,
    JsonProperty: JsonProperty,
    PositionProperty: PositionProperty,
    NumberSliderProperty: NumberSliderProperty,
    EvalStringProperty: EvalStringProperty,
    LongStringProperty: LongStringProperty,
    PlayerProperty: PlayerProperty,
    PositionsProperty: PositionsProperty,
    RotationProperty: RotationProperty,
    UriProperty: UriProperty,
};
