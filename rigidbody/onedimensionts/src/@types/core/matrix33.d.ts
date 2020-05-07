/**
 * 
 */

export as namespace matrix33;

export function identity():number[];
export function scaling(sx:number, sy:number):number[];
export function rotation(rad:number):number[];
export function translation(tx:number, ty:number):number[];
export function projection(width:number, height:number):number[];
export function multiply(a:number[], b:number[]):number[];
export function local2World(scale:number, angle:number, location:number[]):number[];
export function local2ClipSpace(scale:number, angle:number, location:number[], sw:number, sh:number):number[];

