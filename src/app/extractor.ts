import {Injectable} from './utils/decorators';
import {App} from './app';
import {EnvData} from './models/envData';
import {EventClass, EventData} from './models/eventData';
import {Browser} from './plugins/browser';
import {Window} from './plugins/window';
import {Device} from './plugins/device';
import {LoggerService} from './services/logger';
import {Aggregator} from './aggregator';

@Injectable()
export class Extractor {

    private observer?: App;
    private browser: Browser;
    private window: Window;
    private device: Device;
    private eventHistory: EventData[] = [];
    private logger: LoggerService;
    private aggregator: Aggregator;

    constructor(browser: Browser, window: Window, device: Device, logger: LoggerService, aggregator: Aggregator) {
        this.browser = browser;
        this.window = window;
        this.device = device;
        this.logger = logger;
        this.aggregator = aggregator;
    }

    attach(observer: App) {
        this.observer = observer;
        this.aggregator.attach(observer);
    }

    obtainEnvData() {
        let clientData: EnvData = new EnvData();

        clientData.browserName = this.browser.getName();
        clientData.browserVersion = this.browser.getVersion();
        clientData.os = this.browser.getOS();
        clientData.deviceName = this.device.getName();
        clientData.screenWidth = this.device.getScreenWidth();
        clientData.screenHeight = this.device.getScreenHeight();

        return clientData;
    }

    subscribeToEvents() {
        let self = this;

        this.window.onEvent('click', function(e) { self.obtainMouseEventData(e); });
        this.window.onEvent('keyup', function(e) { self.obtainKeyEventData(e); });
        //this.window.onEvent('mousemove', function(e) { self.obtainMouseEventData(e); });
        this.window.onEvent('scroll', function(e) { self.obtainEventData(e); });
    }

    obtainEventData(event: Event): EventData {
        let eventData: EventData = new EventData(new Date(), EventClass.generic, event.type);

        this.logger.log('Extractor: obtained event ' + eventData.name, eventData);

        this.addEvent(eventData);

        return eventData;
    }

    obtainKeyEventData(event: KeyboardEvent): EventData {
        let eventData: EventData = new EventData(new Date(), EventClass.keyboard, event.type);

        eventData.keyCode = event.keyCode;
        eventData.key = String.fromCharCode(event.keyCode);
        // todo: convert words like String.fromCharCode(keyCode, keyCode, keyCode, keyCode, keyCode) if typed space

        this.logger.log('Extractor: obtained event ' + eventData.name + ' with code ' + eventData.key);

        this.addEvent(eventData);

        return eventData;
    }

    obtainMouseEventData(event: MouseEvent): EventData {
        let eventData: EventData = new EventData(new Date(), EventClass.mouse, event.type);

        eventData.x = event.clientX;
        eventData.y = event.clientY;

        this.logger.log('Extractor: obtained event ' + eventData.name + ' at ' + eventData.x + 'x' + eventData.y);

        this.addEvent(eventData);

        return eventData;
    }

    addEvent(event: EventData) {
        this.eventHistory.push(event);
        this.obtainEventHandler(event);
    }

    private obtainEventHandler(event: EventData) {
        this.aggregator.aggregateEvent(event);

        if(this.observer) {
            this.observer.eventHandler(event);
        }
    }
}