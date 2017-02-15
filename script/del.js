var fs = require('fs');
var child_process = require('child_process');
var folder='updated';
var folderpath_='C:\\Users\\Administrator\\.jenkins\\workspace\\testUS257193\\doc\\'+folder;
var path='C:\\mynode\\'+folder;

var  command ='rd/s/q '+folderpath_;
console.log("command->"+command);
   
 var deletefolder = child_process.exec(command,function 
      (error, stdout, stderr) {
      
      if (error) {
         console.log('delete folder!');
         //console.log('Error code: '+error.code);
         //console.log('Signal received: '+error.signal);
      }
     
	  //var file_='C:/mynode/log/updatedfileName.txt';
	
   });

  deletefolder.on('exit', function (code) {
      console.log('Child process exited with exit code '+code);
   });