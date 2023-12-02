let assetNames:{[unit:string]:string} = handleRequireContext(require.context("../assets/", false, /\.(gif|png|jpe?g|svg|obj|glb|wav|ogg|mp3)$/i));
//let assets:{[unit:string]:any} = {};

//const downloadPromise:Promise<Array<void>> = Promise.all(assetNames.map(downloadAsset));

/*interface AssetData {
    name:string;
    url:string;
}*/

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

/*function downloadAsset(meta:AssetData):Promise<void> {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", meta.url, true);
        xhr.addEventListener("readystatechange", e => {
            if(xhr.readyState != 4) return;
            if(xhr.status != 200) reject();

            let slashSplit:Array<string> = meta.url.split("/");
            let hash:string = slashSplit[slashSplit.length-1].split(".")[0];
            console.log(`Successfully downloaded ${hash}`);

            assets[meta.name] = xhr.responseText;
            resolve();
        });
        xhr.send();
    });
}*/

//export const downloadAssets = () => downloadPromise;
//export const get = (assetName:string) => assets[assetName];