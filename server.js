const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname+'/'));
app.listen(process.env.PORT || 8080);
app.get('*', (req, res) => {
    res.sendFile(`./front-end/dist/index.html`); // load the single view file (angular will handle the page changes on the front-end)
});
// app.get('/*',function(req,res){
//     res.sendFile(path.join(__dirname+'/index.html'));
// });

console.log('__dirname::::' , __dirname);
console.log('Consola escuchando ...!!!');