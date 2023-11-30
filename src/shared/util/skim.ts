import _ from "lodash";
import {Entity} from "../types/serializedData";

function objectify<T extends Entity>(array:Array<T>):{[unit:string]:T} {
    let obj:{[unit:string]:T} = {};
    for(let i in array) {
        obj[array[i].id] = array[i];
    }
    return obj;
}

export interface Skim<T extends Entity> {
    added:Array<T>,
    modified:Array<T>,
    removed:Array<T>
}

export interface SkimDifference {
    added:Array<string>,
    modified:Array<string>,
    removed:Array<string>
}

export function skimArray<T extends Entity>(now:Array<T>, then:Array<T>):Skim<T> {
    let nowObj = objectify(now);
    let thenObj = objectify(then);

    let addedIds = Object.keys(nowObj).filter(x => !Object.keys(thenObj).includes(x));
    let added = addedIds.map(i => nowObj[i]);

    let removedIds = Object.keys(thenObj).filter(x => !Object.keys(nowObj).includes(x));
    let removed = removedIds.map(i => thenObj[i]);

    let persistsIds = Object.keys(nowObj).filter(x => Object.keys(thenObj).includes(x));
    let modifiedIds = persistsIds.filter(x => !(_.isEqual(nowObj[x], thenObj[x])));
    let modified = modifiedIds.map(i => nowObj[i]);

    let skim = {added, removed, modified};

    return skim;
}

export function fattenSkim<T extends Entity>(skim:Skim<T>, then:Array<T>):Array<T> {
    let copied = [...then];

    for(let i in skim.removed) {
        _.remove(copied, {
            id: skim.removed[i].id
        } as unknown as any);
    }

    for(let i in skim.modified) {
        _.remove(copied, {
            id: skim.modified[i].id
        } as unknown as any);
        copied.push(skim.modified[i]);
    }

    for(let i in skim.added) {
        copied.push(skim.added[i]);
    }

    return copied;
}

export function skimDifference<T extends Entity>(skim:Skim<T>):SkimDifference {
    return {
        added: skim.added.map(a => a.id),
        modified: skim.modified.map(m => m.id),
        removed: skim.removed.map(r => r.id)
    }
}