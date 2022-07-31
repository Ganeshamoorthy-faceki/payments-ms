const mongoose = require('mongoose')
//mongoose.connect('mongodb+srv://varunjain0888:Admin@123@cluster0.az4pd.mongodb.net/faceki',{
mongoose.connect('mongodb://varun:Varun123@157.241.7.147/faceki?authSource=faceki&w=1',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
},()=>{
    console.log('database connected')
})