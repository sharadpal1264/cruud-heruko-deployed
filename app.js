var express = require('express');
var app = express();
let port =process.env.PORT || 8080;

app.get('/',(req,res)=>{
  res.send("Route is working fine");
})

app.listen(port,()=>{
  console.log(`server is running on port: ${port}`);
})
 