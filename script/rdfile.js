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

function func(data) {
	
  var str = data;

  var obj = JSON.parse(str);  
  var substring_="staging";
  
 
var site="\\sites\\doc-demo";
var path="C:\\myapp\\NodeProject\\public\\development\\";
var common="jekyll build --source C:\\Users\\Administrator\\.jenkins\\workspace\\testProjectMd\\doc --destination";
var exec = require('child_process').exec;
  
	if (substring_==obj.branch){
		
		
		exec('jekyll build --source C:\\Users\\Administrator\\.jenkins\\workspace\\testProjectMd\\doc --destination "C:\\inetpub\\wwwroot\\staging\\sites\\doc-demo"',
		function (error, stdout, stderr) {
      
	  if (error !== null) {
        console.log('exec error: ' + error);
      }else 
	  {
		  
		  console.log('ok on staging branch');
		
	  }
     
  }); 

	}else {
		
		exec(common +" "+'"'+path+obj.URL+site+'"'+"'",
		function (error, stdout, stderr) {
      
	  if (error !== null) {
        console.log('exec error: ' + error);
      }else 
	  {
		  
		  console.log('ok on development branch');
		
	  }
     
  }); 
		
	}
  
  
}

var input = fs.createReadStream('message.txt');
readLines(input, func);

