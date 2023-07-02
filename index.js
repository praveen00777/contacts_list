const port= 8000;
const express = require('express');
const mongoose = require('mongoose');
 const mongoDB="mongodb://127.0.0.1:27017/contact_list";
 //connecting odm to database uri
 
 mongoose.connect(mongoDB,{ useNewUrlParser: true , useUnifiedTopology: true},).then(()=>{
  console.log("system is up and connected to mongodb");
}).catch((err)=>{
  console.log("system faces error due to: ${err}");
});
// models and schemas connection
const Contact = require("./models/contacts");


const app = express();
const path = require('path');
const bodyparser =require('body-parser');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyparser.urlencoded({extended:false}));
//for static files
app.use(express.static('assets'));

// middleware
//app.use(function(req,res,next){
         //console.log("middleware 1 called");
         //next();
//});
//middleware 2
 //app.use(function(req,res,next){
      // console.log("middleware 2 called")
    //   next();
// })
var contactList=[
        {
              name:"praveen",
              phoneno:"7815919072"
        },
        {
                name:"Rambo",
                phoneno:"9959351401"
        },
        {
              name:"sujji",
              phoneno:"9246669740"
        },
        {
               name:"maneesha",
               phoneno:"8688443556"
        }
];
  
app.get('/',function(req,res){
     //    console.log(__dirname);
         Contact.find({},function(err,contacts){
                if(err){
                     console.log("error in getting data");
                }

                return res.render('home',{title:"my contact-list",
                       contact_list: contacts
            });
         });
       
});

 app.get('/practise',(req,res)=>{
        return res.render('practise',{
               title:"let us play with ejs"
        });
 });

   app.post('/contact-details',(req,res)=>{
            // res.redirect("/practise");
            //console.log(req.body);
            //console.log(req.body.name);
            //console.log(req.body.phoneno);
           // contactList.push({
            //     name:req.body.name,
           //      phoneno: req.body.phoneno
            //contactList.push(req.body);
            //res.redirect('back');

            Contact.create({
               name: req.body.name,
               phoneno: req.body.phoneno
           }, function(err, newContact){
               if(err){console.log('Error in creating a contact!')
                   return;
               }
                   console.log('******', newContact);
                   return res.redirect('back');

           });
         
       
       });

  app.get('/delete-contact',(req,res)=>{
             //console.log(req.query);
            // let phoneno= req.query.phoneno;
            //instead get by id
            let id = req.query.id;

            // let contactindex= contactList.findIndex(contact=>contact.phoneno == phoneno);

             //if(contactindex!=-1){
               //   contactList.splice(contactindex,1);
             //}
               Contact.findByIdAndDelete(id,function(err){
                     if(err){
                         console.log("error in deleting");
                         return;
                     }

                     return res.redirect('back');
               });

            

  });



app.listen(port,function(err){
         if(err){
              console.log("server has face some error:",err);
         }

         console.log("server working fine on port:" ,port);
});