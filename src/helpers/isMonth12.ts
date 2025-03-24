import { addVal0 } from "./addVal0"


interface nextDate{
    month:string,
    year:string
}

export function isMonth12(month:number, year:number):nextDate{

    let nextMonth = ""
    let nextYear = ""

    let nextMonthVal = 0
    

    if(month == 12){

        nextMonth = "01"
        nextYear = String(year + 1)
       
    }else{
        nextMonthVal = month + 1
        nextMonth = addVal0(nextMonthVal)
        nextYear = String(year)
    }
    return {
        month: nextMonth,
        year: nextYear,
      };
}