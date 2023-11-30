import {processGameUpdate, getCurrentState} from "./state";
import * as serialized from "../../shared/types/serializedData";
import * as skimmer from "../../shared/util/skim";

let world:{[unit:string]:any} = {
    time: 0,
    me:null,
    others:[],
    entities:[]
}

function fattenWorldSkim(update:serialized.WorldSkim, then:{[unit:string]:any}):serialized.World {
    let copied = Object.assign({}, then);
    copied.others = skimmer.fattenSkim(update.others, then.others);
    copied.entities = skimmer.fattenSkim(update.entities, then.entities);
    copied.time = update.time;
    copied.me = update.me;

    return copied as unknown as any as serialized.World;
}

function getWorldDifference(update:serialized.WorldSkim):serialized.WorldDifference {
    return {
        others: skimmer.skimDifference(update.others),
        entities: skimmer.skimDifference(update.entities)
    }
}

export function handleGameUpdate(update:serialized.WorldSkim):void {
    let fullWorld = fattenWorldSkim(update, world);
    let worldDifference = getWorldDifference(update);

    if(fullWorld.me) processGameUpdate(fullWorld, worldDifference);

    world = fullWorld;
}