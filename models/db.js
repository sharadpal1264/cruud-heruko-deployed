const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sharad:Vermasaloni@12644@myfirstcluster.q3xza.mongodb.net/DB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true
 }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./employee.model');