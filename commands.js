const fs = require("fs");

//write out data
 function done(output) {
     process.stdout.write(output);
     process.stdout.write('\nprompt > ');
 }

//where we will store our commands
 function evaluateCmd(userInput) {
  //parses the user input to understand which command was typed
   const userInputArray = userInput.split(" ");
   const command = userInputArray[0];

   switch (command) {
     case "echo":
       commandLibrary.echo(userInputArray.slice(1).join(" "));
       break;
     case "cat":
       commandLibrary.cat(userInputArray.slice(1));
       break;
     case "head":
       commandLibrary.head(userInputArray.slice(1));
   }
 }

//where we will store the logic of our commands
 const commandLibrary = {
   //the echo command
   "echo": function(userInput) {
       done(userInput);
   },

   "cat": function(fullPath) {
       const fileName = fullPath[0];
       fs.readFile(fileName, (err, data) => {
           if (err) throw err;
           done(data);
       });

   },
   "head": function(number){

     fs.readFile(fileName, (err, data) => {
         if (err) throw err;

         //display number of lines of file
         
         // for(var i = 0; i < number; i++){
         //    console.log(line i of file);
         // }

     });
   }

 };

 module.exports.commandLibrary = commandLibrary;
 module.exports.evaluateCmd = evaluateCmd;
