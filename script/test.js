var lineReader = require('line-reader');
var fs = require('fs');

var string = "foo",
    substring = "development";
	var substring_="staging";
	
	
fs.writeFile('message.txt', '', function(){console.log('clean up ')});

lineReader.eachLine('C:\\Users\\Administrator\\.jenkins\\workspace\\testProjectMd\\doc\\_config.yml', function(line, last) {
	
	string =line;
	if(string.indexOf(substring) !== -1 |string.indexOf(substring_) !== -1 ) {
		var str =  string;
		var arr= str.split(" ");
		//console.log('arr[1]->'+arr[1]);
		var arr_=arr[1].split("/");
		//var res = arr_[1];
		//console.log('res->'+ arr_[1]);
		//console.log('res[2]->'+ arr_[2]);//res+'\r\n' writeFile appendFile
		fs.appendFile('message.txt', '{"branch":'+'"'+arr_[1]+'"'+","+'"URL":'+'"'+arr_[2]+'"'+'}'+'\r\n', function (err) {
			
		 if (err) {
				
				return console.error(err);
	   
			}
		console.log('The "data to append" was appended to file!');
		
		});
	
	}
	
});
