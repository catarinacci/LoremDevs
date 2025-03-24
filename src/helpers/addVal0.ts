
export function addVal0(month:number):string{
    
let monthVal = month
let monthValS = ""

if(monthVal >=1 && monthVal <=9){
   monthValS = 0+ String(monthVal)
}else{
    monthValS = String(monthVal)
}

return String(monthValS)
}