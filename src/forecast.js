const request=require('request')
const forecast=(address,callback) =>{
    
    // const city=process.argv[2]
    // console.log(city)
    const url='https://api.openweathermap.org/data/2.5/weather?q='+encodeURIComponent(address)+'&appid=2719362f3bd3fa2968404fd82e6fd8d1'

    
    // request({url:url,json:true},(error,response) =>{
        request({url,json:true},(error,{body}) =>{  //destructuring

        if(error) callback('Unable to connect  to weather services',undefined)
        // else if(response.body.error) callback('Unable to find the location',undefined)
        else if(body.error) callback('Unable to find the location',undefined)

        else {
            callback(undefined,`the maximum temperature of ${address} is ${body.main.temp_max-273.15} and the minimum temperature of ${address} is ${body.main.temp_min-273.15} and Weather condition is ${body.weather[0].main} and current temperature is ${body.main.temp-273.15}`)

        }
    })

}









module.exports=forecast