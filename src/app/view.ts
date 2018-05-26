import {EnvData} from './models/envData';
import {EventClass, EventData} from './models/eventData';

export class View {

    private hiddenClass: string = 'd-none';

    renderEnvInfo(data: EnvData) {
        if(data) {
            let wrapperElement = <HTMLElement>document.querySelector('#wa-div-env-info');
            let browserNameElement = <HTMLElement>document.querySelector("#wa-data-env-browserName");
            let browserVersionElement = <HTMLElement>document.querySelector("#wa-data-env-browserVersion");
            let osElement = <HTMLElement>document.querySelector("#wa-data-env-os");

            if(wrapperElement) {
                if(browserNameElement) browserNameElement.innerHTML = <string>data.browserName;
                if(browserVersionElement !== null) browserVersionElement.innerHTML = <string>data.browserVersion;
                if(osElement !== null) osElement.innerHTML = <string>data.os;

                this.showEl(wrapperElement);
            }
        }
    }

    renderDeviceInfo(data: EnvData) {
        if(data) {
            let wrapperElement = <HTMLElement>document.querySelector('#wa-div-device-info');
            let deviceNameElement = <HTMLElement>document.querySelector("#wa-data-device-name");
            let resElement = <HTMLElement>document.querySelector("#wa-data-device-res");

            if(wrapperElement) {
                if(deviceNameElement) deviceNameElement.innerHTML = <string>data.deviceName;
                if(resElement !== null) resElement.innerHTML = <string>(data.screenWidth + 'x' + data.screenHeight);

                this.showEl(wrapperElement);
            }
        }
    }

    renderEventInfo(event: EventData) {
        if(event) {
            let wrapperElement = <HTMLElement>document.querySelector('#wa-div-events-info');
            let eventsHistoryElement = <HTMLElement>document.querySelector("#wa-div-events-history");

            if(wrapperElement) {
                if(eventsHistoryElement) {
                    let info: string = 'Detected ' + event.name + ' event';

                    switch (event.eventClass) {
                        case EventClass.keyboard :
                            info += ' key: ' + event.key
                            break;
                        case EventClass.mouse :
                            info += ' at ' + event.x + 'x' + event.y;
                            break;
                    }

                    let node = document.createElement('div');
                    node.innerText = event.detectedOn.toLocaleString() + '> ' + info;

                    eventsHistoryElement.appendChild(node);
                }

                this.showEl(wrapperElement);
            }
        }
    }

    renderClicksPerMinuteInfo(cpm: number) {
        if(cpm) {
            let wrapperElement = <HTMLElement>document.querySelector('#wa-div-aggregation-info');
            let clicksPerMinuteElement = <HTMLElement>document.querySelector("#wa-div-aggregation-cpm");

            if(wrapperElement) {
                if(clicksPerMinuteElement) clicksPerMinuteElement.innerHTML = <string>clicksPerMinuteElement.innerHTML + (clicksPerMinuteElement.innerHTML.length ? ', ' : '') + cpm.toString();
                this.showEl(wrapperElement);
            }
        }
    }

    renderAvgClicksPerMinuteInfo(avgcpm: number) {
        if(avgcpm) {
            let wrapperElement = <HTMLElement>document.querySelector('#wa-div-aggregation-info');
            let avgClicksPerMinuteElement = <HTMLElement>document.querySelector("#wa-div-aggregation-avgcpm");

            if(wrapperElement) {
                if(avgClicksPerMinuteElement) avgClicksPerMinuteElement.innerHTML = <string>avgcpm.toString();
                this.showEl(wrapperElement);
            }
        }
    }

    renderErrorMessage(message: string) {
        if(message) {
            let wrapperElement = <HTMLElement>document.querySelector('#wa-div-error');
            let errorMessageElement = <HTMLElement>document.querySelector('#wa-div-error-message');

            if(wrapperElement) {
                if(errorMessageElement) errorMessageElement.innerHTML = message;
                this.showEl(wrapperElement);
            }
        }
    }

    private showEl(el: Element) {
        el.classList.remove(this.hiddenClass);
    }

    private hideEl(el: Element) {
        el.classList.add(this.hiddenClass);
    }
}