package Jenkins;
import java.io.IOException;
import org.apache.http.HttpEntity;
import org.apache.http.HttpException;
import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpRequestInterceptor;
import org.apache.http.HttpResponse;
import org.apache.http.auth.AuthScheme;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.AuthState;
import org.apache.http.auth.Credentials;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.protocol.ClientContext;
import org.apache.http.impl.auth.BasicScheme;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.protocol.ExecutionContext;
import org.apache.http.protocol.HttpContext;
import org.apache.http.util.EntityUtils;
public class TestPreemptive {
	
	
	public void authenticating(String branchName ){
		
		// Credentials
		String username = "admin";
		String password = "admin";

		// Jenkins url
		String jenkinsUrl = "http://155.35.87.158:8080/";

		// Build name
		//"testestUS257749OnFeatureB";
		String jobName = "US257749OnFeatureB";

		// Build token
		//master
		 //branchName = "testfeatureOne23";
		//testfeaturetwo
		String buildToken = "test&branch_to_build="+branchName; 

		// Create your httpclient
		DefaultHttpClient client = new DefaultHttpClient();

		// Then provide the right credentials
		client.getCredentialsProvider().setCredentials(new AuthScope(AuthScope.ANY_HOST, AuthScope.ANY_PORT),
				new UsernamePasswordCredentials(username, password));

		// Generate BASIC scheme object and stick it to the execution context
		BasicScheme basicAuth = new BasicScheme();
		BasicHttpContext context = new BasicHttpContext();
		context.setAttribute("preemptive-auth", basicAuth);

		// Add as the first (because of the zero) request interceptor
		// It will first intercept the request and preemptively initialize the authentication scheme if there is not
		client.addRequestInterceptor(new PreemptiveAuth(), 0);

		// You get request that will start the build
		String getUrl = jenkinsUrl + "/job/" + jobName + "/build?token=" + buildToken;
		String getUrl_ = jenkinsUrl + "/job/" + jobName + "/buildWithParameters?token="+buildToken;
		HttpGet get = new HttpGet(getUrl_);

		try {
			// Execute your request with the given context
			HttpResponse response = client.execute(get, context);
			HttpEntity entity = response.getEntity();
			EntityUtils.consume(entity);
		}
		catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	static class PreemptiveAuth implements HttpRequestInterceptor {
		
		
		

		/*
		 * (non-Javadoc)
		 *
		 * @see org.apache.http.HttpRequestInterceptor#process(org.apache.http.HttpRequest,
		 * org.apache.http.protocol.HttpContext)
		 */
		public void process(HttpRequest request, HttpContext context) throws HttpException, IOException {
			// Get the AuthState
			AuthState authState = (AuthState) context.getAttribute(ClientContext.TARGET_AUTH_STATE);

			// If no auth scheme available yet, try to initialize it preemptively
			if (authState.getAuthScheme() == null) {
				AuthScheme authScheme = (AuthScheme) context.getAttribute("preemptive-auth");
				CredentialsProvider credsProvider = (CredentialsProvider) context
						.getAttribute(ClientContext.CREDS_PROVIDER);
				HttpHost targetHost = (HttpHost) context.getAttribute(ExecutionContext.HTTP_TARGET_HOST);
				if (authScheme != null) {
					Credentials creds = credsProvider.getCredentials(new AuthScope(targetHost.getHostName(), targetHost
							.getPort()));
					if (creds == null) {
						throw new HttpException("No credentials for preemptive authentication");
					}
					authState.setAuthScheme(authScheme);
					authState.setCredentials(creds);
				}
			}

		}

	}

}
