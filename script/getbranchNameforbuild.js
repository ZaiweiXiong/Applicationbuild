var fs = require("fs");
var readline = require('readline');
var filename= 'C:\\Users\Administrator\\.jenkins\\jobs\\scripts\log\\branch.txt';
var exec = require('child_process').exec;
var branchname="";

var r2 = readline.createInterface({
  input: fs.createReadStream('C:\\Users\\Administrator\\.jenkins\\jobs\\scripts\\log\\logBranchs.log')
  //./log/logBranchs.log
});
var rl = readline.createInterface({
  input: fs.createReadStream('C:\\Users\\Administrator\\.jenkins\\jobs\\scripts\\log\\logBranch.log')
  //./log/logBranch.log
});

r2.on('line', (line) => {
		var str_=line;
		console.log('Line from file r2:'+'\r\n'+str_);
		rl.on('line', (line) => {
		var substring = line;
		
		compareString(str_,substring);
	});
		
	
});
function compareString(str1,str2){
	
	if (str1.indexOf(str2)!==-1){
			console.log('yes');
			console.log('str1->'+str1);
			var temp = str1.replace("/"," ").replace("/"," ").split(" ");
			console.log('branch'+"'s"+ " name-> "+temp[2]);
			//buildfileToStaging(temp[2])
			branchname=temp[2];
		}	
	
}

//
var message='C:/Users/Administrator/.jenkins/jobs/scripts/message.txt';//from test.js
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
		
		//console.log(existfolder(staging,'C:\\inetpub\\wwwroot\\staging'));
		console.log('branchname from func->'+branchname);
		buildfileToStaging(branchname);
		
	}else if (substring_development==obj.branch) {
		
		//console.log(existfolder(path+obj.URL+site,path+obj.URL));
		buildfileToDevelopment(path+branchname);
		
		
	}else if (substring_hotfixes==obj.branch){
		
		//console.log(existfolder(pathhotfix+obj.URL+site,pathhotfix+obj.URL));
		buildfileTohotfix(pathhotfix+branchname);
	}
	
}
var input = fs.createReadStream(message);
readLines(input, func);
//
function buildfileToStaging(branchName){
   var buildtoStaging="jekyll build --source C:\\Users\\Administrator\\.jenkins\\workspace\\teststagingServer\\doc --destination"+" "
   +"C:\\inetpub\\wwwroot\\staging\\sites\\"+branchName;
   
	exec(buildtoStaging,function 
      (error, stdout, stderr) {
      
      if (error) {
         console.log(error.stack);
         console.log('Error code: '+error.code);
         console.log('Signal received: '+error.signal);
      }
		 console.log('build to -> '+buildtoStaging);
   });
}
function buildfileToDevelopment(branchName){
	var buildtoDevelopment="jekyll build --source C:\\Users\\Administrator\\.jenkins\\workspace\\teststagingServer\\doc --destination"+" "
   +branchName;
   
	exec(buildtoDevelopment,function 
      (error, stdout, stderr) {
      
      if (error) {
         console.log(error.stack);
         console.log('Error code: '+error.code);
         console.log('Signal received: '+error.signal);
      }
		 console.log('build to -> '+buildtoDevelopment);
   });
}
function buildfileTohotfix(branchName){
	var buildtohotfix="jekyll build --source C:\\Users\\Administrator\\.jenkins\\workspace\\teststagingServer\\doc --destination"+" "
   +branchName;
   
	exec(buildtohotfix,function 
      (error, stdout, stderr) {
      
      if (error) {
         console.log(error.stack);
         console.log('Error code: '+error.code);
         console.log('Signal received: '+error.signal);
      }
		 console.log('build to -> '+buildtohotfix);
   });
}
