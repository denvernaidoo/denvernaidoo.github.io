---
layout: post
title:  "JSON Web Tokens"
date:   2018-10-30 19:18:39 +0200
categories: posts
---
What is a JSON Web token?
A JSON Web Token or JWT is a standard that defines a way of sending information as a JSON object.
It is a string which is seperated into three parts by `.`'s, here is an example.

{% highlight plaintext %}
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRXRoYW4iLCJyb2xlIjoiQWRtaW5pc3RyYXRvciIsImVtcGxveWVlbnVtYmVyIjoiNCJ9.V8YSt1fUDQOVb54bP0mt3DO-yUd1nw3irL4Z7F3SPTU
{% endhighlight %}

The first and second parts are Base64Url encoded JSON objects

The first part is the header indicating the type of token and algorithm being used to sign the token (explained later)
{% highlight json %}
{
  "alg": "HS256",
  "typ": "JWT"
}
{% endhighlight %}

The second part is the payload and it contains the claims.
{% highlight json %}
{
  "name": "Ethan",
  "role": "Administrator",
  "employeenumber": "4"
}
{% endhighlight %}

The claims are simply statements about the enity making the call. 
Here the first two claims are saying that our user name is "Ethan" and that we have the role of "Administrator".



These first two parts are easy to decode and edit on the client side.  Try putting the second part of the token into the method `atob()` in your chrome developer tools, or pasting the entire token into the debugger at [JWT.IO](https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRXRoYW4iLCJyb2xlIjoiQWRtaW5pc3RyYXRvciIsImVtcGxveWVlbnVtYmVyIjoiNCJ9.V8YSt1fUDQOVb54bP0mt3DO-yUd1nw3irL4Z7F3SPTU){:target="_blank"}
So could the client using this API just Base64Url encode any values they wanted into this second part of the JWT?
How could the API know if this was the token it sent you when it authenticated you initially?
That is the purpose of that third part of the JWT.

The third part of the JWT is the signature.  It is created by taking the first two parts of the JWT (in the base64Url encoded form, with the `.` in between)
and then applying the algorithm specified in the header (first part) of the JWT with the secret key (which is known to the API but not the client).
This way the API can verify if the signature is valid.  Only then will it trust the data in the payload.

So the client could encode a role of "Super Super Administrator" in the token.  But, without knowing the secret key, would not be able to generate a valid signature.
