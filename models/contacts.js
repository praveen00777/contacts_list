const mongoose =require('mongoose');

const contactschema= mongoose.Schema({
      name:{
           type:String,
           required:true
      },
      phoneno:{
            type:String,
            required:true
      }
});

const Contact = mongoose.model('Contact', contactschema);
module.exports = Contact;