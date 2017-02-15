var execSync = require('child_process').execSync;
var fs = require('fs');
var path = require('path');
var path_doc = './pdfconfigs/';


fromDir(path_doc,'.yml');

function startService(file){
	
	var jekyll ='jekyll serve --config _config.yml,pdfconfigs/'+file;
	
	console.log('start..'+file);
	execSync(jekyll,function 
	
      (error, stdout, stderr) {
      
      if (error) {
         console.log(error.stack);
         }
		 console.log('close...'+file);
		});
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
            fromDir(filename,filter); //recurse
        }
        else if (filename.indexOf(filter)>=0) {
            
			console.log('file '+files[i]);
			var file = files[i];
			startService(file);
        };
    };
			
};