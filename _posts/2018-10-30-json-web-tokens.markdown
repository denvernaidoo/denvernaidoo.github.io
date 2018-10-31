---
layout: post
title:  "JSON Web Tokens"
date:   2018-10-30 19:18:39 +0200
categories: jekyll update
---
What is a JSON Web token?
A JSON Web Token or JWT is a standard that defines a way of sending information as a JSON object.
It is a string which is seperated into three part by `.`, here is an example.
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGVudmVyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW5pc3RyYXRvciIsIkVtcGxveWVlTnVtYmVyIjoiNCIsIm5iZiI6MTUwOTg4MzI0NSwiZXhwIjoxNTQxNDE5MjQ1LCJpc3MiOiJUaGUgbmFtZSBvZiB0aGUgaXNzdWVyIiwiYXVkIjoiVGhlIG5hbWUgb2YgdGhlIGF1ZGllbmNlIn0.J6lR5sUK02_kinMLCoRZDBCoDgI91V7xnUVXPxcrvQY`

The first and second parts are Base64Url encoded JSON objects

The first part is the header indicating the type of token and algorithm being used to sign the token (explained later)
{% highlight json %}
{
  "alg": "HS256",
  "typ": "JWT"
}
{% endhighlight %}

The second part is the payload and this contains the Base64Url encoded claims.
{% highlight json %}
{
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": "denver",
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "Administrator",
  "EmployeeNumber": "4",
  "nbf": 1509825834,
  "exp": 1541361834,
  "iss": "The name of the issuer",
  "aud": "The name of the audience"
}
{% endhighlight %}

The claims are simply statements about the enity making the call. 
Here the first two claims are saying that our user name is "denver" and that we have the role of "Administrator".



These first two parts are easy to decode and edit on the client side.  Try putting the second part of the token into the method `atob()` in your chrome developer tools, or pasting the token into the debugger at https://jwt.io
So could the client using this API just Base64Url encode any values they wanted into this second part of the JWT?
How could the API know if this was the token it sent you when it authenticated you initially?
That is the purpose of that third part of the JWT.

The third part of the JWT is the signature.  It is created by taking the first two parts of the JWT (int the base64Url encoded form, with the `.` in between)
and then applying the algorithm specified in the header (first part) of the JWT with the secret key (which is known to the API but not the client).
This way the API can verify if the signature is valid.  If it is, then only it will trust the data in the payload.

So the client could encode a role of "Super Super Administrator" in the token.  But, without knowing the secret key, would not be able to generate a valid signature.
