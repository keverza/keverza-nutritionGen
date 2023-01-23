// nutritional values of 100g
export const values = [  
    {
        name: "Kakavos sviestas",
        id:1,
        fat: 100,
        fatSat: 59.7,
        carbs: 0,
        sugar:0,
        fiber: 0,
        protein: 0,
        salt: 0,
        calories: 884,
        joules: 3968,
        weight: 10,
        coef: 0
    },
    {        
        name: "Kakava",
        id:2,
        fat: 46,
        fatSat: 25,
        carbs: 28,
        sugar:3,
        fiber: 32,
        protein: 11,
        salt: 0,
        calories: 460,
        joules: 1924,
        weight: 10,
        coef: 0
    },
    {        
        name: "Cukrus",
        id:3,
        fat: 0,
        fatSat: 0,
        carbs: 99,
        sugar:99,
        fiber: 0,
        protein: 0,
        salt: 0,
        calories: 396,
        joules: 1683,
        weight: 10,
        coef: 0
    },
    {        
        name: "Pieno milteliai",
        id:4,
        fat: 26.05,
        fatSat: 15.23,
        carbs: 38,
        sugar:38,
        fiber: 0,
        protein: 24.5,
        salt: 1.01,
        calories: 482,
        joules: 2016,
        weight: 10,
        coef: 0
    },
    {        
        name: "Druska",
        id:5,
        fat: 0,
        fatSat: 0,
        carbs: 0,
        sugar:0,
        fiber: 0,
        protein: 0,
        salt: 100,
        calories: 0,
        joules: 0,
        weight: 10,
        coef: 0
    },
    {        
        name: "Sojų lecitinas",
        id:6,
        fat: 91,
        fatSat: 12,
        carbs: 8,
        sugar:4,
        fiber: 0,
        protein: 0,
        salt: 0.1,
        calories: 851,
        joules: 3503,
        weight: 10,
        coef: 0
    },
    {        
        name: "Kava",
        id:7,
        fat: 16,
        fatSat: 0,
        carbs: 0,
        sugar:0,
        fiber: 32,
        protein: 0,
        salt: 0,
        calories: 300,
        joules: 1255,
        weight: 10,
        coef: 0
    },
    {        
        name: "Lazdynai",
        id:8,
        fat: 61.15,
        fatSat: 4.6,
        carbs: 17,
        sugar:3.49,
        fiber: 10,
        protein: 13.7,
        salt: 0.009,
        calories: 629,
        joules: 2654,
        weight: 10,
        coef: 0
    },
    {        
        name: "Migdolai",
        id:9,
        fat: 54.1,
        fatSat: 4.22,
        carbs: 10,
        sugar:6.9,
        fiber: 3,
        protein: 24.1,
        salt: 0.025,
        calories: 623,
        joules: 2608,
        weight: 10,
        coef: 0
    },   
     {        
        name: "PrOatein",
        id:10,
        fat: 13,
        fatSat: 2.6,
        carbs: 26,
        sugar:0.7,
        fiber: 4.6,
        protein: 52.5,
        salt: 0.1,
        calories: 423,
        joules: 1770,
        weight: 10,
        coef: 0
    },
    {        
        name: "Ghee sviestas",
        id:11,
        fat: 99.8,
        fatSat: 65.8,
        carbs: 0.1,
        sugar:0.1,
        fiber: 0.1,
        protein: 0.1,
        salt: 0.1,
        calories: 898,
        joules: 3693,
        weight: 10,
        coef: 0
    },

]

export class Ingredient{    
    constructor(data){
        this.data = data
    }
    setCoef(totalWeight){
        return this.data.coef = Math.round(this.weight / totalWeight *1000) /1000
    }

    setWeight(weight){
        return this.weight = parseInt(weight)
    }
    
}