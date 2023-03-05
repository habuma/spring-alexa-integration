Essential Spring Authorization Server
=====================================
This project is an essential Spring Authorization Server. It can run as-is or you
can use it as the starting point to create your own authorization server.

It is not considered "production-ready", as a real authorization server wouldn't
use a hard-coded client or a single user in an in-memory user details service. But
it's a great start.

I created this project and pushed it to GitHub because I got tired of recreating
the same authorization server project over and over every time I needed one.

How to use
----------
Although the typical use of an authorization server would involve a resource
server (e.g., an API) that wants to accept OAuth2 tokens as authorization from a
client that wants access to the resources that the resource server serves. For
that, you'll need to see how to create a resource server with Spring. The books API
is such a resource server. The reading list Alexa skill is such a client.

But, focusing on the authorization server only, you can pretend to be a client
application using your web browser and `curl`. Here are the steps:

- Start the authorization server:

~~~
% ./mvnw spring-boot:run
~~~

- Point your web browser at http://localhost:9000/oauth2/authorize?response_type=code&client_id=myclient&redirect_uri=http://127.0.0.1:8080/authorized&scope=books.write&state=1234zyx (This is to simulate the redirect to
the authorization server that the client would do.)

- Login as habuma / password

- Grant "books.write" permission and click the "Submit Consent" button.

- This will redirect to http://127.0.0.1:8080/authorized, which is essentially
the client application's redirect URI. In this client-free pretending, you likely 
won't have anything listening there and you'll get an error in your browser. 
That's okay. You only really need the "code" parameter in the redirect URL. Copy 
the value of the "code" parameter from the browser's address bar.

- In a terminal window, assign the code to a shell variable:

~~~
% export code=<<CODE COPIED IN PREVIOUS STEP>>
~~~

- In the terminal, use `curl` to exchange the code for an access token:

~~~
% curl localhost:9000/oauth2/token \
-H"Content-type: application/x-www-form-urlencoded" \
-d"grant_type=authorization_code&redirect_uri=http://127.0.0.1:8080/authorized&code=$code" \
-u myclient:secret -v
~~~

- In the response you'll get an access token, a refresh token, the token's scope and type, and the token's expiration time (in seconds). Copy the access token value.

- Paste the token into the form at http://jwt.io to see the contents of the token.
Alternatively, use the `jwt` command line tool (https://www.npmjs.com/package/jwt-cli):

~~~
% jwt <<ACCESS TOKEN COPIED FROM RESPONSE>>
~~~

For More Details
----------------
If you're new to developing with Spring or want to learn more about Spring and
Spring Boot, check out my book "Spring in Action, 6th Edition", available at
[Amazon](http://www.amazon.com/gp/product/1617297577/?tag=habumacom-20) or 
from [Manning.com](https://www.manning.com/books/spring-in-action-sixth-edition?a_aid=habuma&a_bid=f205d999&chan=habuma).
