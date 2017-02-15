var execSync = require('child_process').execSync;
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

var sleep = require('./sleep');

var path_doc = './pdfconfigs/';
fromDir(path_doc,'.yml');



function createpdf(file){
	
	if (file.indexOf('LA')!==-1){
		
		executeSh('pdf-product1_LA.sh');
		
	}else if(file.indexOf('PG')!==-1) {
	
		executeSh('pdf-product1_PG.sh');
		
	}else if(file.indexOf('PS')!==-1) {
	
		executeSh('pdf-product1_PS.sh');
		
	}else if(file.indexOf('RN')!==-1) {
		
		executeSh('pdf-product1_RN.sh');
		
	}else if(file.indexOf('TP')!==-1) {
		
		executeSh('pdf-product1_TP.sh');
		
	}else if(file.indexOf('VA')!==-1) {
		
		executeSh('pdf-product1_VA.sh');
		
	}else if(file.indexOf('GS')!==-1) {
		
		executeSh('pdf-product1_GS.sh');
		
	}else if(file.indexOf('SU')!==-1) {
		
		executeSh('pdf-product1_SU.sh');
		
	}
}


function executeSh(fileName){
	
	var pdf =fileName;
	
	execSync(pdf,function 
	
      (error, stdout, stderr) {
      
      if (error) {
         console.log(error.stack);
         }
		
   });
		console.log('build pdf with...'+fileName);
}
function closeService(){
	
	var takill ='tskill ruby';
	
	execSync(takill,function 
	
      (error, stdout, stderr) {
      
      if (error) {
         console.log(error.stack);
         }
		
		});
		console.log('close Service..');
}

function fromDir(startPath,filter){

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }
    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
		
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,filter); 
        }
        else if (filename.indexOf(filter)>=0) {
            
			console.log('file '+files[i]);
			var file = files[i];
			createpdf(file);
			sleep.sleep(8);
			closeService();
        };
    };			
};
//https://nodejs.org/api/child_process.html#child_process_child_process_execsync_command_options