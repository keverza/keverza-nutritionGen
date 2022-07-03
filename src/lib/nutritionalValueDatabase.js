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
        weight: 0,
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
        weight: 0,
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
        weight: 0,
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
        weight: 0,
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