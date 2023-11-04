import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class LoaderService {
    loaderChange: Subject<boolean> = new Subject<boolean>();
}