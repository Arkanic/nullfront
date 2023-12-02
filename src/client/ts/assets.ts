let assetNames:{[unit:string]:string} = handleRequireContext(require.context("../assets/", false, /\.(gif|png|jpe?g|svg|obj|glb|wav|ogg|mp3)$/i));

export function getAssetUrl(name:string):string {
    return assetNames[name];
}

function handleRequireContext(r:__WebpackModuleApi.RequireContext):{[unit:string]:string} {
    let names:Array<string> = r.keys();
    let urls:Array<string> = r.keys().map(r) as Array<string>;

    let assetData:{[unit:string]:string} = {};
    for(let i in names) {
        assetData[names[i]] = urls[i];
    }

    return assetData;
}