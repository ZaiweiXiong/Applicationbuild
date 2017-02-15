var fs = require("fs");
var readline = require('readline');
var filename= './log/branch.txt';
var exec = require('child_process').exec;

var path="C:\\Users\\Administrator\\.jenkins\\workspace\\testApplicationTrigger\\dev";

function ExcutelogBranch(path){
	
	var logBranch ='git rev-parse HEAD >C:\\Users\\Administrator\\.jenkins\\jobs\\scripts\\log\\logBranch.log';
	exec(logBranch, {
	cwd: path
}, function(error, stdout, stderr) {
		 console.log('logBranch file!');
		 
});
}
function ExcutelogBranchs(path){
	var logBranchs ='git ls-remote --heads origin >C:\\Users\\Administrator\\.jenkins\\jobs\\scripts\\log\\logBranchs.log';
	exec(logBranchs , {
	cwd: path
}, function(error, stdout, stderr) {
		 console.log('logBranchs file!');
		 tbranch();
});
}

function tbranch(){
  var r2 = readline.createInterface({
  input: fs.createReadStream('./log/logBranchs.log')
});
var rl = readline.createInterface({
  input: fs.createReadStream('./log/logBranch.log')
});

r2.on('line', (line) => {
		var str_=line;
		console.log('Line from file r2:'+'\r\n'+str_);
		rl.on('line', (line) => {
		var substring = line;
		
		compareString(str_,substring);
	});
		
	
});
}

function compareString(str1,str2){
	
	if (str1.indexOf(str2)!==-1){
			console.log('yes');
			console.log('str1->'+str1);
			var temp = str1.replace("/"," ").replace("/"," ").split(" ");
			console.log('branch'+"'s"+ " name-> "+temp[2]);
			writefile(temp[2]);
			
		}	
	
}
function writefile(data){
fs.writeFile(filename, '', function(){console.log('clean up ')});
string = data;
console.log('data string->'+string);
var temp = string.replace("/"," ").replace("/"," ").split(" ");
//console.log('changed string->'+temp[0].split(" "));
fs.appendFileSync(filename, string+'\r\n');
}

ExcutelogBranch(path);
ExcutelogBranchs(path);