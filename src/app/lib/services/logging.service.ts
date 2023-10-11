import { Injectable } from "@angular/core"

@Injectable({ providedIn: 'root' })
export class Logger {
    error = (message: string): void => {
        console.log("Error! : %s", message)
    }

    warn = (message: string): void => {
        console.log("Warn! : %s", message)
    }

    info = (message: string): void => {
        console.log("Info! : %s", message)
    }
}