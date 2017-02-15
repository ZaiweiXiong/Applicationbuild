var execSync = require('child_process').execSync;
var exec = require('child_process').exec;

exports.sleep = function(number) {
	
  var sleep ='ping 127.0.0.1 -n' +' '+number+' '+'-w 1000 > nul';
	
	console.log('start..build pdf in '+number +' seconds');
	execSync(sleep,function 
	
      (error, stdout, stderr) {
      
      if (error) {
         console.log(error.stack);
         }
		 console.log('close...'+number);
		});
		console.log('build pdf done');
}
function sleep(number,file){
	
	setTimeout(function(){
	console.log('build pdf...->'+file);
  },number*6000);
}

