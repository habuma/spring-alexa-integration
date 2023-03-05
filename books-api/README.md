Books API
=========
This project is a simple Spring WebFlux API that uses Spring Security's Resource
Server to enable authorization via an OAuth2 access token.

The API exposes three endpoints:

 - GET /books - Lists all books in the database. Does not require authorization.
 - GET /books/{id} - Lists a specific book by its ID. Does not require authorization.
 - POST /books - Adds a book. Requires a JWT token with "books.write" scope.

The token can be obtained from the authorization server. The authorization server 
must also be running when using this API so that tokens presented to the API can be
verified.

How to use
----------

 - Start the application:
 
~~~
% ./mvnw spring-boot:run
~~~

 - Make requests to the GET endpoints. Using (HTTPie)[https://httpie.io/] :

~~~
% http :8081/books
% http :8081/books/1
~~~

 - Try to add a book without a token (you should get "HTTP/1.1 401 Unauthorized"):
 
~~~
% http :8081/books title="Spring in Action" author="Craig Walls" publisher="Manning Publications"
~~~

 - Obtain an access token from the authorization server following the directions 
in that project's README, being sure to approve "books.write" scope.

 - Make a request to add a book with the access token obtained from the previous
 step (this time it should work):
 
~~~
% http :8081/books title="Spring in Action" author="Craig Walls" publisher="Manning Publications" -A bearer -a <<ACCESS TOKEN>>
~~~

 - Request the list of books again to prove that the book was added.

For More Details
----------------
If you're new to developing with Spring or want to learn more about Spring and
Spring Boot, check out my book "Spring in Action, 6th Edition", available at
[Amazon](http://www.amazon.com/gp/product/1617297577/?tag=habumacom-20) or 
from [Manning.com](https://www.manning.com/books/spring-in-action-sixth-edition?a_aid=habuma&a_bid=f205d999&chan=habuma).
