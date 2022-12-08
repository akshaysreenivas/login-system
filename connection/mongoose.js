
const mongoose = require('mongoose');

mongoose.set('strictQuery', true)
mongoose.connect(`mongodb://127.0.0.1:27017/mywebsite`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
        console.log(" Successfully connected to MongoDB ");      
    })
    .catch(err => {
      console.error(" error connecting Data base ", err);
        process.exit();
    });



    

