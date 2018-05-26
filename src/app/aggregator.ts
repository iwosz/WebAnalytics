// todo: calculate clicks per minute
// todo: calculate mouse move speed
// todo: calculate backspace per minute (typing errors)
// todo: aggregate words

import {Injectable} from './utils/decorators';
import {App} from './app';
import {EventClass, EventName, EventData} from './models/eventData';
import {LoggerService} from './services/logger';

@Injectable()
export class Aggregator {

    private observer?: App;
    private clicksPerMinuteBuffer: number[] = [];
    private clicksInMinute: number = 0;
    private clickSeconds: number = 0;
    private firstClickSeconds: number = 0;
    private logger: LoggerService;

    constructor(logger: LoggerService) {
        this.logger = logger;
    }

    attach(observer: App) {
        this.observer = observer;
    }

    aggregateEvent(event: EventData) {
        if(event) {
            switch (event.eventClass) {
                case EventClass.mouse :
                    this.aggregateMouseEvent(event);
                    break;
            }
        }
    }

    private aggregateMouseEvent(event: EventData) {
        if(event.name === <string>EventName.click) {
            this.aggregateClickEvent(event);
        }
    }

    private aggregateClickEvent(event: EventData) {
        let clickSeconds = event.detectedOn.getTime();

        if(this.firstClickSeconds == 0) {
            this.firstClickSeconds = clickSeconds;
        }

        let period = (clickSeconds - this.firstClickSeconds)/1000;

        this.aggregateClicksPerMinute(60, period);
        this.clickSeconds = clickSeconds;
    }

    private aggregateClicksPerMinute(freq: number, period: number) {
        this.clicksInMinute++;
        if(period < freq) {
            this.logger.log('Agregator: click within ' + freq + 's agregated to ' + this.clicksInMinute + ' clicks. period: ' + period);
        } else {
            this.logger.log('Agregator: clicks/' + freq + 's calculated to ' + this.clicksInMinute + ' clicks.');
            this.bufferClicksPerMinute(this.clicksInMinute);
            if(this.observer) {
                this.observer.cpmAggregationHandler(this.clicksInMinute);
            }

            let avgClicksPerMinute = this.calculateAvgClicksPerMinute();

            this.logger.log('Agregator: Avg clicks/' + freq + 's calculated to ' + avgClicksPerMinute);
            this.firstClickSeconds = this.clickSeconds;
            this.clicksInMinute = 0;
            this.clickSeconds = 0;
        }
    }

    private bufferClicksPerMinute(cpm: number) {
        if(cpm) {
            this.clicksPerMinuteBuffer.push(cpm);
        }
    }

    private calculateAvgClicksPerMinute(): number {
        let clicksSum: number = 0;
        this.clicksPerMinuteBuffer.forEach(function (value, idx) {
            clicksSum += value;
        });

        let avgcpm = clicksSum/this.clicksPerMinuteBuffer.length;

        if(this.observer) {
            this.observer.avgCpmCalculationHandler(avgcpm);
        }

        return avgcpm;
    }
}