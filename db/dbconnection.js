//db server integration
const mongoose=require('mongoose')

//connect
mongoose.connect(process.env.BASE_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("...Mongodb Atlas  Connect...");
}).catch(()=>{
    console.log("...Mongodb Connection Error...");
})