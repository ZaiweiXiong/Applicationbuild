var fs = require("fs");
var exec = require('child_process').exec;

var folder='Discourse';
var folder_='Discourse';
var folder__='site';
var path ='C:\\gitProject';

xcopy(folder);

function xcopy(folder){
	
	var xcopy= 'xcopy templates '+folder+' /s /e /y';
	exec(xcopy , {
	cwd: path
}, function(error, stdout, stderr) {
		 
		 if(error){
			 console.log(error);
		 }
		 console.log('xcopy done!');
		 executepython(folder_);
		 executebuild(folder__);
});	
		 
}
function executepython(folder_){
	
	var python='python .\\'+folder_+'\\scripts\\mdtoc2yml.py -i .\\'+folder_+'\\SUMMARY.md -o .\\'+folder_+'\\_data\\toc.yml';
	exec(python , {
	cwd: path
}, function(error, stdout, stderr) {
	
		 if(error){
			 console.log(error);
		 }
			 console.log('python done!');
		  
});
	
}
function executebuild(folder__){
	
	var jekyll= 'jekyll build --destination'+" C:/myapp/NodeProject/public/"+folder__
	"/ca-api-developer-portal/9-0/en";
	
	exec(jekyll , {
	cwd: 'C:\\gitProject\\Discourse\\'
}, function(error, stdout, stderr) {
		 
		 if(error){
			 console.log(error);
		 }
			 console.log('build done!');
		 });
 
}

