package Main;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import email.SendMail;
import Jenkins.TestPreemptive;

public class test {

	public static void main(String[] args) {
		
		SendMail smail = new SendMail();
		smail.sendMail();
	}
	public void t () {

		
		File file = new File("./log/branch.txt");
		TestPreemptive tp = new TestPreemptive();
		
		String temp="";
		try {
			BufferedReader reader =new BufferedReader(new FileReader(file));
			while ((temp = reader.readLine()) != null) {
				 tp.authenticating(temp);
				 System.out.println("build with branch test 123456789012 "+ temp);  
			}
			reader.close();
			
			
			
		}catch (Exception err){
			//err.printStackTrace();
			System.out.println("no log file");
		}
	   
		
		
		
		

	}

}


