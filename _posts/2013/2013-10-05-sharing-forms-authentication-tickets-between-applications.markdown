---
layout: post
title: "Sharing Forms Authentication Tickets Between Applications"
date: 2013-10-05 -0800
comments: true
categories: [ASP.NET, CDN, Optimization, ScriptManager]
disqus_identifier: 178 http://www.shawnmeyer.com/?p=178
redirect_from:
  -  "/2013/10/sharing-forms-authentication-tickets-between-applications"
  -  "/2013/10/sharing-forms-authentication-tickets-between-applications/"
  -  "/?p=178"
---

Recently, I ran across a fun challenge. I have an application modularized across multiple websites. I also need to allow users to navigate between these applications seamlessly with a single authentication mechanism or a single sign on and minimal HTTP redirects. What I have traditionally done is link the two applications using some form of SSO (e.g. encrypted query strings or SAML). My personal opinion is that these solutions are ideal when talking between two separate entities such as integration between two websites owned by two different organizations. After thinking about this problem I wanted to eliminate redirecting the user for SSO purposes. Consider my typical scenario.

As a user I click a link on my intranet to log into the application. The initial URL sends me to a website that attempts to pull my credentials and builds the SSO request. Once the SSO request is built the user is returned an HTTP response directing them to POST or GET the new a URL with the SSO request. The service provider then verifies the SSO request and then redirects the user to their landing page. That is a lot of work to get into the application, but for communication between entities it is pretty standard.

When a user originally authenticates with the application from the Identity Provider this is pretty standard. My personal opinion is that once a user authenticates into your website the user should not see authentication between multiple websites owned by the service provider. I do not like the idea of exposing the authentication between each application and that is what multiple redirects do. Instead, I want the applications to share authentication. So when the user goes from one application to the next they are sent directly to the URL and not an intermediary sign on handler that eventually redirects the user to the requested page. I want one of the applications to handle authentication and allow users to move between applications without requiring re-authentication on each website. After doing some digging I found that ASP.NET provides an easy solution, sharing the forms authentication ticket.

<strong>The Authentication Ticket:</strong>

The basic purpose of the Authentication Ticket is to tell your web application who you are and that you are authenticated. When using forms authentication, each authenticated user will have a forms authentication ticket. This ticket is encrypted, signed, and then stored in a cookie (I am ignoring cookieless configurations). It is also important to know, ASP.NET uses the Machine Key secure your authentication cookie. According to the MSDN .NET 1.0 and 1.1 are different than .NET 2.0 and later. For the purpose of this article we are going to assume .NET 4.5, but I will mention a configuration for .NET 2.0 SP1. For more information on authentication tickets check out the MSDN article <a href="http://support.microsoft.com/kb/910441">http://support.microsoft.com/kb/910441</a>.

<strong>Configuring Forms Authentication</strong>

```xml
<system.web>
  <machineKey validationKey="validationKeyA" decryptionKey="decryptionKeyA" validation="SHA1" decryption="AES" />
  <authentication mode="Forms">
    <forms name=".ASPXAUTH" domain="shawnmeyer.com"></forms>
  </authentication>
</system.web>
```

This configuration needs to be configured in every application's Web.config file. The machineKey node is used to allow applications to read the authentication ticket across sites. If one of your applications is a .NET 2.0 application that was if it was upgraded to .NET 4.5 and it still uses the legacy mode you might need to add the compatibilityMode="Framework20SP1" attribute to the machineKey element to all applications. If not then you can ignore this attribute.

The authentication element is where we configure forms authentication. The child element is used to set the properties of forms authentication. Each application must have the same name as this is what the cookie will be named. If your applications live in the same subdomain you can ignore that attribute, however if they live across multiple subdomains and the same domain you will need to set the domain without a subdomain.

<strong>Troubleshooting:</strong>
<ol>
	<li>If your browser is not sending the cookie this might be caused by the domain attribute needing to be set. When reading the cookie the domain should read '.shawnmeyer.com' and the web.config attribute for domain should read domain="shawnmeyer.com".</li>
	<li>If your browser is sending the cookie, but the cookie does not show up in the server's HttpCookieCollection it means the cookie is probably not passing validation. Ensure the machineKey elements match across each application. If they do match you should ensure they are using the same compatibility mode.</li>
</ol>

<strong>Creating the cookie</strong>

In the application that hands authentication you can create and store the authentication ticket. This will setup the cookie and ticket so it can be consumed by each application.

```cs
// Gets the cookie
var cookie = FormsAuthentication.GetAuthCookie(username, rememberMe);


// Gets an authentication ticket with the appropriate default and configured values.
var ticket = FormsAuthentication.Decrypte(cookie.Value);
var newTicket = new FormsAuthenticationTicket(
                             ticket.Version,
                             username,
                             createDate,
                             expirationDate,
                             isPersistent,
                             userDate);

var encryptedTicket = FormsAuthentication.Encrypt(newTicket);
cookie.Value = encryptedTicket;
Response.Cookies.Add(cookie);
```

<strong>Reading the Authentication Ticket from the Cookie</strong>

To read the cookie you can use this code.

```cs
var cookieName = FormsAuthentication.FormsCookieName;
var authCookie = Request.Cookies[cookieName];

// This could throw an exception if it fails the decryption process. Check MachineKeys for consistency.
var authenticationTicket = FormsAuthentication.Decrypt(authCookie.Value);

// Retrieve information from the ticket
var username = authenticationTicket.Name;
var userData = authenticationTicket.UserData;
```

<strong>Magic</strong>

Once you have these applications configured to share the authentication ticket. From this point we can more seamlessly handle authentication between sites. Enjoy!
