---
layout: post
title: "Introduction to Content Negotiation"
date: 2016-07-11 -0800
comments: true
categories: [HTTP, Content Negotiation]
---

Content Negotiation, simply put, is a way for a client and/or server to determine how content is requested and received over HTTPS (or HTTP, [please be kind use HTTPS](https://www.httpvshttps.com)).  Fortunately, for developers, content negotiation has been defined by the W3C and you can find the specification on their site ([RFC2616 Section 12](https://www.w3.org/Protocols/rfc2616/rfc2616-sec12.html)).  There are three types of content negotiation, but for the purpose of this article we'll focus on server-driven negotiation.  That is when the agent or client requests content using HTTP headers to help the server make decisions on how to format data sent back to the client.  Here are the headers that are typically used in content negotiation: Accept, Accept-Charset, Accept-Encoding, Accept-Language, etc.

The fastest way to see content negotiation in action is to open up Chrome development tools, navigate to the network tab, and go to any website.  If you click on the requst you will notice Chrome automatically populates the Accept, Accept-Encoding, and Accept-Language with the values below.  These two headers are how Chrome negotiates with the server how it prefers to recieve content for the given request.

```
GET / HTTP/1.1
Host: www.google.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate, sdch, br
Accept-Language: en-US,en;q=0.8
```

Let's break this down a bit.  The **Accept** header is used to specify the media type for data returned in the response body.  The **Accept** header states a weighted preference for the desired media types.  In this example Chrome requested HTML, then xhtml, followed by xml as it highest preference.  After that, Chrome states it will accept an image/webp followed by anything.  Chrome uses the **Accept-Encoding** header to specificy how it wants the response encoded.  Finally, it requests the en-US language as its preferences otherwise a non-localized version of English second using hte **Accept-Language** header.

The server, if using server-driven negotiation, can opt to take any of these headers into account when making a decision on how to return the content.  It is important to note the user agent or client does not control how content is returned.  It simply declares preferences with each request.  In server-driven content negotiation the server's algorithm is reponsible for making a determination (or __Best Guess__ as it worded in the specification).  Most servers will look at these HTTP headers when deciding how to format content on the response.

As developers we often need to know more about content negotiation when building HTTP(S) based services.  After consuming a few APIs and web services it becomes apparent that many web services have different implmentations and limitations with content negotiation.

## Experimenting with content negotiation and the bits

Using Postman, I generated this request to an ASP.NET Web API running locally. The request uses the Accept HTTP header requesting the server respond with XML.

```
GET /api/Person HTTP/1.1
Host: localhost:65307
Accept: application/xml
Cache-Control: no-cache
```

By default, ASP.NET responded with the xml media type.  The server made its decision based on the Accept header. ASP.NET has a more complex set of rules than this, which we will dig deeper into in a future article.

```
HTTP/1.1 200 OK
Cache-Control: no-cache
Pragma: no-cache
Content-Type: application/xml; charset=utf-8
Expires: -1
Server: Microsoft-IIS/10.0
X-AspNet-Version: 4.0.30319
X-SourceFiles: =?UTF-8?B?XFxnY2MuaW50XHVzZXJzXGhvbWVcc2hhd25tXHZpc3VhbCBzdHVkaW8gMjAxNVxQcm9qZWN0c1xEZW1vXERlbW9cYXBpXFBlcnNvbg==?=
X-Powered-By: ASP.NET
Date: Sat, 09 Jul 2016 11:27:20 GMT
Content-Length: 194

<Person xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.datacontract.org/2004/07/Demo.Models"><Age>30</Age><FirstName>Some</FirstName><LastName>Dewd</LastName></Person>
```

Today, many developers prefer to use JSON.  To receive JSON data over XML, simply update the request's Accept header with the media type application/json.

```
GET /api/Person HTTP/1.1
Host: localhost:65307
Accept: application/json;q=0.9,application/xml;q=0.8
Cache-Control: no-cache
```

As one can see the server responded with equivalent data. This time, instaed receiving XML the server responded with a JSON string in the response body.

```
HTTP/1.1 200 OK
Cache-Control: no-cache
Pragma: no-cache
Content-Type: application/json; charset=utf-8
Expires: -1
Server: Microsoft-IIS/10.0
Date: Sat, 09 Jul 2016 11:34:22 GMT
Content-Length: 47

{"FirstName":"Some","LastName":"Dewd","Age":30}
```

To show off more interesting behavior in ASP.NET's server-driven content negotiation we can provide a media type not supported out of the box.  Optionally, if one were to leave off the Accept HTTP header one would get the same result.  The ASP.NET content negotiation algorithm cannot provide a response requested by the client, it will fall back to its default media type formatter (for .NET this is application/json).

```
GET /api/Person HTTP/1.1
Host: localhost:65307
Accept: text/html
Cache-Control: no-cache
```

```
HTTP/1.1 200 OK
Cache-Control: no-cache
Pragma: no-cache
Content-Type: application/json; charset=utf-8
Expires: -1
Server: Microsoft-IIS/10.0
Date: Sat, 09 Jul 2016 13:16:56 GMT
Content-Length: 47

{"FirstName":"Some","LastName":"Dewd","Age":30}
```

ASP.NET is just one technology of many for building web services.  GitHub also uses server-drive content negotiation, but implments a different behavior.  For example, unlike ASP.NET WebAPI's default behavior, GitHub does not fallback to a default media type formatter if one requests an unsupported media type.  Instead, GitHub opts to respond with an error formatted in JSON.

```
GET /user/sgmeyer/repos HTTP/1.1
Host: api.github.com
Accept: application/xml
Cache-Control: no-cache
```

```
HTTP/1.1 415 Unsupported Media Type
Server: GitHub.com
Date: Sat, 09 Jul 2016 13:23:14 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 167
Status: 415 Unsupported Media Type
X-GitHub-Media-Type: unknown
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 58
X-RateLimit-Reset: 1468074180
Access-Control-Expose-Headers: ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval
Access-Control-Allow-Origin: *
Content-Security-Policy: default-src 'none'
Strict-Transport-Security: max-age=31536000; includeSubdomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: deny
X-XSS-Protection: 1; mode=block
X-GitHub-Request-Id: 325142E0:2FFB:80ACDE9:5780FAC2

{
  "message": "Unsupported 'Accept' header: [\"application/xml\"]. Must accept 'application/json'.",
  "documentation_url": "https://developer.github.com/v3/media"
}
```

Content negotiation is a great way to improve the developer experience of an API. One can provide conveniences for customers by allowing them to determine the format of data coming back from the service.  There are many ways to implement content negotiation, but when understood it can be a power tool as a developer.