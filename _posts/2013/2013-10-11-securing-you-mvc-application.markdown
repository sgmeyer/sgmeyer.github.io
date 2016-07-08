---
layout: post
title: Securing An Mvc Application
date: 2013-10-15 -0800
comments: true
categories: [ASP.NET, MVC, Security, Authentication]
redirect_from:
  -  "/2013/10/securing-you-mvc-application"
  -  "/2013/10/securing-you-mvc-application/"
---

When building an MVC application authentication is an important part when securing your website.  I was recently creating a second application that consumed the authentication ticket from our main application.  In my last post I showed how to share the forms authentication ticket between multiple applications, and now that we have the ticket being shared we need to plug it into our site.

If you recall from the last post the secondary application delegates the authentication and credential verification.  Instead of using a form for the user to enter credentials, we validate the authentication ticket and establish the principal and identity.  This can be done in the Application_AuthenticateRequest method.

```csharp
// This is the Global.asax.cs file
public class MyApplicatoin : HttpApplication
{
    protected void Application_AuthenticateRequest(object sender, EventArgs e)
    {
        // Pulls the cookie name from the configuration (default .ASPXAUTH)
        string cookieNaame = FormsAuthentication.FormsCookieName;
        HttpCookie cookie = Context.Request.Cookies[cookieName];

        bool doesCookieExist =  cookie != null;

        if (cookieExists)
        {
                try
                {
                        FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(cookie.Value);
                        string[]  roles = //get your roles from somewhere.
                        FormsIdentity identity = new FormsIdentity(ticket);
                        GenericPrincipal principal = new GenericPrincipal(identity, roles);
                }
        }
    }
}
```

Once the authentication mechanism is in place we can handle the authorization by decorating controllers or actions with the AuthorizeAttribute.  By tagging the controller with the AuthorizeAttribute we are saying that any action in this class will require the user to be authenticated.  Since we did not provide any roles to the attribute it just prevents access to anonymous users.  This is all good until you want to allow certain actions in a controller to be accessible by anonymous users such as a login action.  We can enable anonymous users by tagging actions with the AllowAnonymousAttribute.

```csharp
[Authorize]
public class AccountController : Controller
{
    [AllowAnonymous]
    public ActionResult Login()
    {
        return View();
    }

    // Requires authorization
    public ActionResult Index()
    {
        return View();
    }
}
```

This model for authorization seems pretty good until we want to add another protected controller.  When adding another controller we realize we could easily forget to add the AuthorizeAttribute to the new controller or maybe another developer adds a controller and is not aware how to protect the code.

```csharp
public class AdminController : Controller
{
    public ActionResult Index()
    {
        return View();
    }

    public ActoinResult ManageUserPasswords()
    {
        return View();
    }
}
```

You or a another developer could easily miss this detail.  Now sensitive functionality is exposed to anonymous users and your application is just waiting to be compromised.  We can avoid these mistakes by implementing a global filter.  Instead of each controller and action opting into requiring authorization all controllers will require authorization and controls needing anonymous access must be tagged to opt out of requiring authorization.

```csharp
public class FilterConfig
{
    public static void RegisterGlobalFilter(GlobalFilterCollection filters)
    {
        filters.Add(new HandelErrorAttribute());
        filters.Add(new AuthorizeAttribute());
    }
}
```

Our code uses the AuthorizeAttribute as a global filter every controller and action prevents anonymous users.  If we wanted to continue to allow anonymous users on a certain action we simply decorate it with [AllowAnonymous].
