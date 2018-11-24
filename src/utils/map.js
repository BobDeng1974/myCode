export function MP(ak, callBack) {
    return new Promise(function (resolve, reject) {  
        if(typeof(BMap) === "undefined"){
            window.onload = () => {
                resolve(BMap);
            }
        }else{
            resolve(BMap);
        } 
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://union.mapbar.com/apis/maps/free?f=mapi&v=31.3&k=aCW9cItqL7sqT7AxaB0zdHZoZSWmbBsuT7JhMHTsMeD6ZIl9NzFsZHT=@JBL979@Iu7lJJZWWq0IDu9xZMzMxq7I9AhH7LAAA6hqzZHZZLTbZZauxlDz7C7DD9ZCFGT=";
        script.onerror = reject;
        document.head.appendChild(script); 
        if(typeof(callBack) === "function"){
            callBack(resolve);
        }
    })
}
