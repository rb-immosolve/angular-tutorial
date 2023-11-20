import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class ModalService {
    loaderChange: Subject<boolean> = new Subject<boolean>();
    popupMsg: Subject<string> = new Subject<string>();

    isLoading(value: boolean) {
        this.loaderChange.next(value);
    }

    showMessage(value: string) {
        this.popupMsg.next(value);
    }

}