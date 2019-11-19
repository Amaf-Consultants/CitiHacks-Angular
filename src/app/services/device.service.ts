import { Injectable } from "@angular/core";
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject } from 'rxjs';

export const enum DeviceType {
    Desktop,
    Tablet,
    Mobile
}

@Injectable({
    providedIn: 'root'
})
export class DeviceService {
    deviceChanged: Subject<DeviceType> = new Subject();

    constructor(private deviceService: DeviceDetectorService) {
        window.addEventListener('resize', () => {
            this.windowResized();
        })
    }

    getDevice(): DeviceType {
        if (this.deviceService.isDesktop()) return DeviceType.Desktop;
        else if (this.deviceService.isTablet) return DeviceType.Tablet;
        else return DeviceType.Mobile;
    }

    windowResized() {
        console.log('window resized', this.getDevice())
        this.deviceChanged.next(this.getDevice());
    }


}