
export const deepValid = <T extends {[name:string]: any}>(v1:T,v2:T,keys:Array<string>):boolean=>{

    let isValid = true;

    keys.forEach((key)=>{
        if (v1[key] != v2[key]) {
            isValid = false
        }
    })

    return isValid

}