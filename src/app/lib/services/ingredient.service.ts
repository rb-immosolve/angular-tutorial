import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class IngredientService {
    errSubject = new Subject<string>()

    emit(msg: string): void {
        this.errSubject.next(msg)
    }
}