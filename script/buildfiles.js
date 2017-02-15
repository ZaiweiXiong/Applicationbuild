var fs = require('fs');
var i =0;
var strs=[];

function readLines(input, func) {
  var remaining = '';
  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
	  var t = line.toString();
	 
      index = remaining.indexOf('\n');
    }
	
  });
	
input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
  });
  
}

var common="jekyll build --source C:\\Users\\Administrator\\.jenkins\\workspace\\testUS257193\\doc --destination";
var message='C:/Users/Administrator/.jenkins/jobs/scripts/message.txt';
var exec = require('child_process').exec;

function func(data) {
	
var str = data;
var obj = JSON.parse(str);  
var substring_="staging";
var substring_hotfixes="hotfixes";
var substring_development="development";
  
var site="\\sites\\doc-demo";
var path="C:\\myapp\\NodeProject\\public\\development\\";
var pathhotfix="C:\\myapp\\NodeProject\\public\\hotfixes\\";
var staging="C:\\inetpub\\wwwroot\\staging\\sites\\doc-demo";


  
	if (substring_==obj.branch){
		
		console.log(existfolder(staging,'C:\\inetpub\\wwwroot\\staging'));
		

	}else if (substring_development==obj.branch) {
		
		console.log(existfolder(path+obj.URL+site,path+obj.URL));
		
		
		
	}else if (substring_hotfixes==obj.branch){
		
		console.log(existfolder(pathhotfix+obj.URL+site,pathhotfix+obj.URL));
		
	}
	
}

function existfolder(folderName,path){
	
  fs.stat(folderName, function (err, stats){
	 //console.log(folderName);
	 
  if (err) {
	  
    console.log('Folder doesn\'t exist, so I made the folder ');
	console.log('this isn\'t folder');
	//var exec = require('child_process').exec;
	
	exec(common+" "+folderName,
		
	function (error, stdout, stderr) {
      
	  if (error !== null) {
        console.log('exec error: ' + error);
      }else 
	  {
		  
		  console.log('ok on '+common+" "+folderName);
	  }
     
  }); 
	
  }else {
			console.log('Does exist');
			console.log('go to updating!');
			updatedfilesToSever(folderName,path);
			
	 
	}
});
   
}

//filename,SeverPath
var folder='updated';
var folderpath_='C:\\Users\\Administrator\\.jenkins\\workspace\\testUS257193\\doc\\'+folder;
var servepath='';
var serveOrigin='';

function updatedfilesToSever(folderName,path){
	
	
var strs=[];
var command_ ='git branch >C:/Users/Administrator/.jenkins/jobs/scripts/log/commitID.txt'; 
var file ='C:/Users/Administrator/.jenkins/jobs/scripts/log/commitID.txt';

exec(command_ ,
		function (error, stdout, stderr) {
      
	  if (error !== null) {
        console.log('exec error: ' + error);
      }else 
	  {
		  
		  console.log('check CimmitID.txt');
		  getCmid(file);
		
	  }
     
  }); 

}

function getCmid(file){
	
   fs.readFile(file, function (err, data) {
   if (err) {
       return console.error(err);
   }
   console.log(": " + data.toString());
   var str =data.toString().split(" ");
  
   getUpdateFileNames(str[4].replace(")"," ").trim());
   
});

}
function getUpdateFileNames(cmid){
	
var  command ='git diff-tree --no-commit-id --name-only -r '+
      cmid+' >C:/Users/Administrator/.jenkins/jobs/scripts/log/updatedfileName.txt';
 // 951e7fb
 exec(command,function 
      (error, stdout, stderr) {
      
      if (error) {
         console.log(error.stack);
         console.log('Error code: '+error.code);
         console.log('Signal received: '+error.signal);
      }
      console.log('check updatefiles!');
	   var file_='C:/Users/Administrator/.jenkins/jobs/scripts/log/updatedfileName.txt';
	    getFileName (file_)
   });
}

function getFileName (file) {
	
createfolder(folderpath_);
	
   fs.readFile(file, function (err, data) {
   if (err) {
       return console.error(err);
   }
   
   var i=0;
	    var str =data.toString().split(/\s+/);
		//console.log("str[].length " + str.length);
  
   for (var i=0;i<str.length;i++) {
	   
	   if(str[i].trim()!=""){
		    console.log("modified file is ->"+ str[i].trim());
			//fs.appendFileSync(fn, str[i].trim()+'\r\n');
			copyfilestofolder(str[i].trim());
			
	  }
	  
   }	   
});
	buildfiles(servepath);
}

function createfolder(folderpath){
	fs.mkdir(folderpath);
	
}
function copyfilestofolder(fileName){
	
var folderpath__ ='copy C:\\Users\\Administrator\\.jenkins\\workspace\\testUS257193\\doc\\';
var copy  = folderpath__+fileName+" "+folderpath_+'\\'

exec(copy,function 
      (error, stdout, stderr) {
      
      if (error) {
         console.log(error.stack);
         console.log('Error code: '+error.code);
         console.log('Signal received: '+error.signal);
      }
		console.log('copy->'+fileName);
   });
	xcopyfiletemplate();
	xcopyconfig();
}
function xcopyfiletemplate(){
	
	var copy ='xcopy C:\\Users\\Administrator\\.jenkins\\workspace\\testUS257193\\template'+ 
	' C:\\Users\\Administrator\\.jenkins\\workspace\\testUS257193\\doc\\updated '+'/s /e /y' ;
	
	exec(copy,function 
      (error, stdout, stderr) {
      
      if (error) {
         console.log(error.stack);
         console.log('Error code: '+error.code);
         console.log('Signal received: '+error.signal);
      }
		console.log('copy-> template');
   });

	
}
function xcopyconfig(){
	
	var copy ='copy C:\\Users\\Administrator\\.jenkins\\workspace\\testUS257193\\doc\\_config.yml'+
	' C:\\Users\\Administrator\\.jenkins\\workspace\\testUS257193\\doc\\updated';
	exec(copy,function 
      (error, stdout, stderr) {
      
      if (error) {
         console.log(error.stack);
         console.log('Error code: '+error.code);
         console.log('Signal received: '+error.signal);
      }
		console.log('copy->_config.yml');
   });

}

function buildfiles(servepath){
	
	console.log('servepath from buildfiles=>'+servepath);
	console.log('servepathorigin from buildfiles=>'+serveOrigin);
	
	var build ='jekyll build --source C:\\Users\\Administrator\\.jenkins\\workspace\\testUS257193\\doc\\updated --destination'+
	" "+servepath+'/temp';
	
	exec(build, {
	cwd: 'C:\\Users\\Administrator\\.jenkins\\workspace\\testUS257193\\doc\\updated'
}, function(error, stdout, stderr) {
	
		//console.log(stdout);
		 console.log('build files!');
		 copyfilestoSever(servepath,serveOrigin);
});
}
//serverP,tempfolder
function copyfilestoSever(servepath,serveOrigin){
	console.log('fromcopyfilestosever->'+servepath);
	console.log('fromcopyfilestosever->'+serveOrigin);
	
	var copy ='xcopy '+servepath+'\\temp'+
	' '+serveOrigin+'/s /e /y'  ;
	
	exec(copy,function 
      (error, stdout, stderr) {
      
      if (error) {
         console.log(error.stack);
         console.log('Error code: '+error.code);
         console.log('Signal received: '+error.signal);
      }
		console.log('copy-> file to server');
   });

}

var input = fs.createReadStream(message);
readLines(input, func);