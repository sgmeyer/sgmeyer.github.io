---
layout: post
title: "ASP.NET Scalability and Optimization Part 1"
date: 2010-10-31 -0800
comments: true
categories: [ASP.NET, CDN, Optimization, ScriptManager]
redirect_from: 
  -  "/2010/10/asp-net-scalability-and-optimization-part-1"
  -  "/2010/10/asp-net-scalability-and-optimization-part-1/"
---

Lately I have been spending a lot of time optimizing a fairly high traffic .NET web application.  Over the last few months, performance has become a pretty big concern.  Based on current traffic, we are pushing our monthly bandwidth limitations while memory and server load continue to become a growing concern.

Over the course of the next few posts I will talk about what I did to remedy these scalability issues.  As bandwidth was my initial concern, I will start by talking about what I did to decrease bandwidth and some of the concerns I faced.

<strong>Where To Start</strong>

When optimizing code it can be difficult to know where to start, however taking advantage of good tools can simplify this task.  I used our web metrics tool to find bandwidth and traffic hot spots.  In my case, our website’s metrics are collected through Google Analytics.

When working on a tight deadline it can be a difficult task to weigh bandwidth consumption per visit versus high traffic pages.  In our case we could make significant improvements just about anywhere so I started with the high traffic pages.

Once I found a starting point, I navigated to those pages using FireFox with the YSlow plug-in installed.  I found YSlow to be particularly useful.  If you have not already used YSlow it is a tool that grades your websites performance based on well-defined and accepted criteria (<a href="http://developer.yahoo.com/yslow/">Yahoo! YSlow</a>).  This tool is very well documented so I will not spend a lot of time discussing its merits.

<strong>JavaScript Woes and Sorrows… Saved by the ScriptManager</strong>

Using YSlow, I found the biggest problems were related to JavaScript.  The biggest bandwidth hog contained inline script as well as fourteen JavaScript files; amongst those were the Microsoft AJAX JavaScript libraries.  The JavaScript footprint had a total weight of 556 KB despite being GZipped.

To setup some of the enhancements, I moved the inline JavaScript into a file.  This may sound counter intuitive now, but as we will see next this will play to our benefit.

My first priority was to decrease the size of the JavaScript files.  If you are not already familiar with minifying it is the process of reducing the size of HTML, CSS, or JavaScript.  There are many free tools available to minify JavaScript.  I chose to use the Microsoft AJAX Minifier.  Using the command below, I was able to minify all of the JavaScript files.  For simplicity's sake I am running the minifier manually, but it is possible to integrate the tool within Visual Studio 2010 (<a href="http://stephenwalther.com/blog/archive/2009/10/16/using-the-new-microsoft-ajax-minifier.aspx">Using the New Microsoft AJAX Minifier</a>).

```
ajaxmin &#45;hc scriptName.debug.js &#45;out scriptName.js
```

This script takes advantage of Hyper Crunching (-hc), which is an aggressive minifying feature provided by the Microsoft AJAX Minifier.  This performs basic file reduction by removing whitespace and unneeded characters.  It also reduces non-global variable names, extra curly braces, dead code, and more.  As a precaution always test the minified JavaScript prior to deploying.

Once my JavaScript files were minified I was already boasting good reduction in JavaScript file size.  Although, with the minified files in place, I still did not see the bandwidth cut I was hoping to achieve.

<strong>Reducing Bandwidth By Hosting Files on a CDN</strong>

YSlow has a category that grades your usage of a CDN.  Many developers ignore this grade, as hosting content on a CDN used to require a paid service.  Now there are several free CDNs available to use including those provided by Microsoft and Google.

Our application uses the Microsoft AJAX Library’s JavaScript, which is managed by a ScriptManager control.  Since we are hosting the AJAX libraries we spend our own bandwidth to host these files.  Through the use of the ScriptManager we can take advantage of the Microsoft CDN to host the AJAX Libraries.  This technique does not reduce the amount of data downloaded by a user, unless previously cached.  Instead, we are now using Microsoft’s bandwidth to host those files rather than our own.   Hosting on a CDN provides other benefits such as localized content and quicker page loads.

```xml
<asp:ScriptManager ID="ScriptManager1" EnableCdn="true" runat="server">
</asp:ScriptManager>
```
It is important to note that we now have a dependency on Microsoft’s CDN.  If the CDN is not available your AJAX files will also be unavailable.  As unlikely as it may seem it is important to know the risks no matter how marginal they may appear.

<strong>Finishing Touches</strong>

Now that that we have taken a big bite out of the bandwidth usage; I took one last step to reduce the number of HTTP requests.  As mentioned earlier I had a number of small JavaScript files that I wanted to combine into a single file.  Again, I can rely on ScriptManager to combine these files for me.  As a side note, the ScriptManager is more efficient at combining assembly-based JavaScript when compared to path-based scripts.

```xml
<asp:ScriptManager EnableCdn="true">
  <CompositeScript>
    <Scripts>
      <asp:ScriptReference Path="script1.js" />
      <asp:ScriptReference Path="script2.js" />
    </Scripts>
  </CompositeScript>
</asp:ScriptManager>
```

Be cautious when combining scripts.  This is not a silver bullet.  Combining too many files can be detrimental to page load.  Today’s browsers allow concurrent HTTP requests.  If you combine too many files this could slow down content retrieval since the browser cannot download the content in parallel.  Also, by splitting our content between Microsoft’s CDN and our own servers it allowed the browser to be more efficient when retrieving content.  Typically, browsers can perform parallel requests, however they limit the number of concurrent requests per domain.  By spreading our content across multiple domains the browser was able to download the content more efficiently.  Finding the right balance is definitely something you should experiment with to find the best gains.

As a side note, you can leverage the ScriptManager to combine scripts even if you do not want to host the AJAX Library.  The ScriptManager exposes an enumeration allowing the developer to leverage the benefit of ScriptManager without hosting the AJAX Library.

```xml
<asp:ScriptManager AjaxFrameworkMode="Enable|Disable|Explicit"></asp:ScriptManager>
```

More details can be found <a href="http://msdn.microsoft.com/en-us/library/system.web.ui.ajaxframeworkmode.aspx">here</a> and <a href="http://msdn.microsoft.com/en-us/library/system.web.ui.scriptmanager.ajaxframeworkmode.aspx">here</a>.

<strong>Conclusion</strong>

When used properly minifying, script combining, and CDN hosting can be good ways to improve user experience and improve performance.  Microsoft has provided many of the tools you need to employ these techniques and observe these benefits immediately.  With any good tool it is possible to misuse it.  I recommend experimenting with these techniques to find the best implementation for your web application.
