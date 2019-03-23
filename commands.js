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
       break;
      case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      default:
      process.stdout.write('\nPlease input: \'echo\', \'cat\',\'head\', \'tail\'');
      process.stdout.write('\nprompt > ');
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
   "head": function(userInput){

     let lineAmount = userInput[0];
     let fileName = userInput[1];

     //split dash off line number
     lineAmount = lineAmount.split('-').slice(1);

     fs.readFile(fileName, 'utf8', (err, data) => {
         if (err) throw err;
         let linesOfCode = lineAmount[0];
         let splitData = data.toString().split('\n').slice(0,linesOfCode).join('\n');
         data = splitData;
         done(data);

     });
   },
   "tail": function(userInput){

     let lineAmount = userInput[0];
     let fileName = userInput[1];

     //split dash off line number
     lineAmount = lineAmount.split('-').slice(1);

     fs.readFile(fileName, 'utf8', (err, data) => {
         if (err) throw err;
         let linesOfCode = lineAmount[0];
         let splitData = data.toString().split('\n').slice(linesOfCode).join('\n');
         data = splitData;
         done(data);

     });
   }

 };

 module.exports.commandLibrary = commandLibrary;
 module.exports.evaluateCmd = evaluateCmd;
