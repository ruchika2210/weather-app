const path=require('path')
const express=require('express')
const hbs=require('hbs')
const { title } = require('process')
const forecast=require('./forecast')



const app=express()
const port=process.env.PORT || 3000

//define paths for path join
const publicdirectorypath=path.join(__dirname,'../public')
//if we want to change the directory name of views to templates so we can handle it
const viewpath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')



//set up the route to render hbs files
//for setting up the handlebar
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialsPath)

//set us static directory to serve
app.use(express.static(publicdirectorypath))
app.get('',(req,res) =>{
    res.render('index',{   //noe providing dynamic data to handlebars
        title:'weather app',
        name:'Ruchika gohil'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'my life about',
        name:'Ruchika Gohil'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        name:'Ruchika Gohil',
        title:'Dont hesitate to take help'
    })
})





app.get('/weather',(req,res ) =>{
    if(!req.query.address){
        return res.send({
            error:'no weather data loaded'
        })
    }

    forecast(req.query.address,(error,forecastData=console.error()) =>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecast:forecastData,
            
            address:req.query.address
        })


    })

    // res.send({
    //     forecast:'It is raining',
    //     location:'Vadodara',
    //     address:req.query.address,
    //     title:'my weather'
    // })
})

//app.com
//app.com/help
//app.com/about

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:'404 help',
        name:'chika',
        errormessage:'help page not found'

    })
})

app.get('/products',(req,res) =>{
    if(!req.query.search){
        return res.send({
            error:'You must provide search items'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

//route for handling error
app.get('*',(req,res) =>{
    res.render('404',{
        title:'404',
        name:'Ruchika',
        errormessage:'Page not found'
    })
})

//starts up the server
app.listen(port,() =>{
    console.log('Server is up on port '+port)
})