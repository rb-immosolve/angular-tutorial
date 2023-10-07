export const UNITS = ['pcs', 'kg', 'g'] as const;
export type Unit = typeof UNITS[number]

export class Ingredient{
    constructor(public name:string, public amount:number, public unit:Unit){}
}