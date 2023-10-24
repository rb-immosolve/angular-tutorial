import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";

@Injectable({providedIn:'root'})
export class CustomValidators{
  nameBlacklist(f : FormControl) : { [s:string] : boolean } {
    const blacklistedNames:string[] = ['Test'];
    if(blacklistedNames.indexOf(f.value) !== -1){
      return {'nameBlacklisted': true};
    }
    return null;
  }

  emailBlacklist(f: FormControl) : Promise<any> | Observable<any> {
    const promise = new Promise((resolve,reject) => {
      setTimeout(()=>{
        const blacklistedEmails:string[] = ['admin@test.com'];
        if(blacklistedEmails.indexOf(f.value) !== -1){
          resolve({'emailBlacklisted':true});
        }
        resolve(null);
      },2000);
    });
    return promise;
  }
}