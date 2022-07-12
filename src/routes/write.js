import * as fs from 'fs'

let obj = {
    table: []
}

//add some data obj file

let objJson = JSON.stringify(obj)
//write
// fs.writeFile('recipes.json', json, 'utf8', callback)


//to append
function writeRecipe(datas) { fs.readFile('../keverza-nutritional-value-generator/src/api/recipes.json', 'utf8', function readFileCallback(err, data){
    if(err){
        console.log("error",err);
    }else{
        obj = JSON.parse(data)
        obj.table.push(datas) //add some data
        objJson = JSON.stringify(obj)
        fs.writeFile('../keverza-nutritional-value-generator/src/api/recipes.json', objJson, 'utf8', (err)=>{
            if(err){throw(err)}
            console.log('saved');
        })
    }
})
}


//svelte endpoint from form
export async function post({request}) {
    const formData = await request.json()    
    
    // console.table([...data.entries()])
    
    writeRecipe(formData)
    console.log('server', formData)
    // return {
    //     headers: {
    //         "content-type": "application/json",
    //         "accept":"application/json"},
    //     status: 200,
    //     body:JSON.stringify({
    //         message: 'received'
    //     })
    // }
    
    return {
        headers: {
                    "content-type": "application/json",
                    "accept":"application/json"},
                status: 200,
        body: {
            message: "saved"
        }
    }
}