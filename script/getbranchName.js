var fs = require("fs");
var readline = require('readline');
var filename= './log/branch.txt';

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

//str.localeCompare(strb);
function writefile(data){
fs.writeFile(filename, '', function(){console.log('clean up ')});
string = data;
console.log('data string->'+string);
var temp = string.replace("/"," ").replace("/"," ").split(" ");
console.log('changed string->'+temp[0].split(" "));
var s ="foo";
var s1 = "e";
compareString(s,s1);
fs.appendFileSync(filename, string+'\r\n');
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

