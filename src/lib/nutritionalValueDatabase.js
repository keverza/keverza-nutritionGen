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