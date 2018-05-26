import {Injectable} from './utils/decorators';
import {Extractor} from './extractor';
import {LoggerService} from './services/logger';
import {View} from './view';
import {EventData} from './models/eventData';

@Injectable()
export class App {

    private extractor: Extractor;
    private view: View;

    constructor(extractor: Extractor, view: View) {
        // todo: session start
        // todo: aggregator start
        this.extractor = extractor;
        this.view = view;
    }

    start() {
        this.extractor.attach(this);

        try {
            let envData = this.extractor.obtainEnvData();

            this.view.renderEnvInfo(envData);
            this.view.renderDeviceInfo(envData);
            this.extractor.subscribeToEvents();
        } catch (e) {
            let logger = new LoggerService();

            logger.error('App start failed due to error!', e);
            this.view.renderErrorMessage('App start failed due to error: ' + e.message);
        }
    }

    eventHandler(event: EventData) {
        this.view.renderEventInfo(event);
    }

    cpmAggregationHandler(cpm: number) {
        this.view.renderClicksPerMinuteInfo(cpm);
    }

    avgCpmCalculationHandler(avgcpm: number) {
        this.view.renderAvgClicksPerMinuteInfo(avgcpm);
    }
}