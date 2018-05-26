export const enum EventClass {
    generic = 'generic',
    mouse = 'mouse',
    keyboard = 'keyboard'
}

export const enum EventName {
    click = 'click',
    keyup = 'keyup'
}

export class EventData {
    detectedOn: Date;
    eventClass?: EventClass;
    name?: string;
    x?: number;
    y?: number;
    key?: string;
    keyCode?: number;

    constructor(detectedOn: Date, eventClass?: EventClass, name?: string, x?: number, y?: number, key?: string, keyCode?: number) {
        this.detectedOn = detectedOn;
        this.eventClass = eventClass;
        this.name = name;
        this.x = x;
        this.y = y;
        this.key = key;
        this.keyCode = keyCode;
    }
}
