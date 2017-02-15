package email;

import java.io.FileOutputStream;
import java.util.Date;

import email.SendMail;

import com.codecowboy.jxmail.JXMail;
import com.codecowboy.jxmail.JXMessage;

import javax.mail.Message; 
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import java.util.Properties;  

public class SendMail {
	



public void sendMail(){
	

	

	SendMail sentmail = new SendMail();
	try{
		sentmail.sendHtml ();
	}catch (Exception error){
		System.out.println("error!");
	}
	
	
   /*	   sentmail.send("DocOps 2.0 build notification",
			"Document build is generated with current new feature,"+"\\n"
					+ "and public them into staging servers,"+"/r/n"
					+ "please refer to the link as bleow:"+"/r/n"
					+"http://155.35.87.158/sites/doc-demo/index.html",
			"xioza01@ca.com");
			*/
	
		System.out.println("mail is sent!");

	
	
}
	
public static void send(String subject, String message, String address){

    	JXMessage msg = new JXMessage();
					
    	msg.setMailServer("mail.ca.com");
    	msg.setFromName("SnovaTeam@ca.com");
    
    	msg.addToAddress(address);
    	msg.setMailSubject(subject);
    	msg.setMessage(message);
    	    
    	JXMail mail = new JXMail();			    
	    try
	    {
       mail.send(msg);
	    }
	    catch(Exception ex1)
	    {
	        System.out.println("[Alert:] Email send failure!");
	    }	
	}

public static void sendHtml () throws Exception{ 
	//https://www.tutorialspoint.com/java/java_sending_email.htm
    String to = "xioza01@ca.com";

    // Sender's email ID needs to be mentioned
    String from = "SnovaTeam@ca.com";

    // Assuming you are sending email from localhost
    String host = "mail.ca.com";

    // Get system properties
    Properties properties = System.getProperties();

    // Setup mail server
    properties.setProperty("mail.smtp.host", host);

    // Get the default Session object.
    Session session = Session.getDefaultInstance(properties);

    try {
       // Create a default MimeMessage object.
       MimeMessage message = new MimeMessage(session);

       // Set From: header field of the header.
       message.setFrom(new InternetAddress(from));

       // Set To: header field of the header.
       message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

       // Set Subject: header field
       message.setSubject("DocOps 2.0 build notification");

       // Send the actual HTML message, as big as you like
       message.setContent("<h1>DocOps 2.0 build notification</h1>"
    		   +"Document build is generated with current new feature, and public them into staging servers"
    		   +"<p>please refer to the link as bleow:</p>"
       		+ "<p><a href = http://155.35.87.158/staging/sites/doc-demo/README.html /> Release staging Website</a></p>"+
    		   "<p><a href = http://155.35.87.158:8081/development/featureA/sites/doc-demo/README.html /> Development feature website</a></p>"+
    		   "<p><a href = http://155.35.87.158:8081/hotfixes/Defect0001/sites/doc-demo/README.html /> hotfixed</a></p>"+
       			"<p>plese contact SnovaTeam@ca.com "
       			+ "</p>", 
       		"text/html");
       	//http://155.35.87.158/staging/sites/doc-demo/index.html
       //http://155.35.87.158:8081/development/feature/sites/doc-demo/index.html
       // Send message
       Transport.send(message);
       System.out.println("Sent message successfully....");
    }catch (MessagingException mex) {
       mex.printStackTrace();
    }
 }
	
}
