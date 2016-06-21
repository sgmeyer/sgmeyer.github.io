---
layout: post
title: ASP.NET Scalability and Optimization Part 2
date: 2011-03-15 -0800
comments: true
categories: [ASP.NET, Scalability, Session]
redirect_from:
  -  "/2011/03/asp-net-scalability-and-optimization-part-2"
  -  "/2011/03/asp-net-scalability-and-optimization-part-2/"
---

In the last post I showed a few ways to reduce bandwidth usage by taking advantage of the Microsoft CDN, ScriptManager, and the AJAX Minifier. In this post I will explain a scalable approach used to better manage session state while scaling with a changing environment.

<strong>The Problem</strong>

Over the last few months we had seen increased traffic on our servers and higher memory usage. At first, our solution was to vertically improve the existing servers’ hardware, and then horizontally by adding more nodes to our web farm. Initially, this worked; however, it introduced a new set of problems for maintenance and load balancing. It soon became obvious we were out-growing our current design. We knew we needed to find a scalable solution if we wanted a maintenance-friendly and highly available web application.

Our web application contains state data for each user in a session. Each session was stored on the server in-process. This meant the session was not accessible by other instances of the web application running on other servers (or other processes on the same server). This design choice provided a fast performing session state solution, but caused problems with load balancing and maintenance.

For load balancing we sent new requests, requests not tied to an active session, to the node with the least traffic. For existing requests, requests tied to an active session, we sent all subsequent requests to the same node until the session expired. This worked for a while, until we needed to perform maintenance. When we had to bring down a server we needed to prevent new sessions and had to wait for all existing sessions to end (wait for users to log out or the session to timeout) before bringing down a server for maintenance. As you can see this became time consuming as the number of nodes continued to grow.

<strong>Why Session State</strong>

Originally our design choices were made based on our current demands. We chose a solution that fit our needs and also provided the quickest performance. As our environment changed so did our needs. We believed our design choice for managing session state would fix many of our issues.

We thought that sacrificing some speed by storing session data in a database would payback dividends in reduced memory usage, shared session state, and persisted session data.

<strong>Installing the ASPState Database</strong>

The first thing to do is setup the database. Fortunately, Microsoft has made this easy by providing the T-SQL DDL and shipping it with ASP.Net. To build the tables start by opening the Visual Studio Command Prompt and use the aspnet_reqsql.exe tool to build the database.

```
aspnet_regsql.exe  -?
```

This command displays all of the options available to use with aspnet_reqsql.exe. For this purpose we want to look at the options below.

```
-ssadd        Install the SQL Server session state.
-sstype p   Use a persisted session state (t: temporary and c: custom).
-S                A connection string to the database server.
-U               SQL Server Login ID
-P               Password
-E               Alternatively, this users Windows Authentication
```

<h5>For additional aspnet_regsql.exe options and details read the article <a href="http://msdn.microsoft.com/en-us/library/ms229862(v=vs.80).aspx">ASP.NET SQL Server Registration Tool (Aspnet_regsql.exe)</a>.</h5>
I have decided to use the following command to install the ASPState database using SQL Server Authentication.

```
aspnet_regsql.exe -ssadd -sstype p -S MyServer -L sgmeyer –P *****
```

Once the installation is complete you can view the tables in the newly created ASPState database. This database contains all of the tables, views, and stored procedures you need.

<strong>Configuring the Session State Mode</strong>

Next, tell ASP.NET to start storing the state in the new server. Start by opening up the Web.config, and update it with the following configuration.

```xml
<system.web>
  <sessionState mode="SQLServer" cookieless="UseCookies"
  sqlConnectionString="Server=MyServer;Database=ASPState;Integrated Security=SSPI"
  compressionEnabled="True" allowCustomSqlDatabase="True" timeout="60"
  sqlCommandTimeout="10" />
</system.web>
```

Now, spin up your application, and open the ASPState database and you can see the tables are being updated with the session.

<strong>A Piece of Advice</strong>

When working with SQLServer session mode all objects are serialized and written to the database. When you work with an in-process session, objects are referenced in local memory and are not serialized. If you are converting an existing application or creating a new object to be stored in a persisted session, be sure those objects and the objects they reference are serializable. The compiler does not check if you add a non-serializable object to a persisted session, instead you will receive a runtime exception.

Note that if you subscribe to the Session_End event this will not work with SQLServer mode. The Session_End event will only be fired when using InProc session state, while the Session_Start event will continue to work as expected.
<h5>For more information or serialization see the article <a href="http://msdn.microsoft.com/en-us/library/ms973893.aspx">Object Serialization in the .NET Framework</a>.</h5>
<strong>Conclusion</strong>

Every project has its own priorities and objectives. The .NET Framework offers a rich set of options for managing session state, each with a different set of pros and cons. It is important to understand the benefits of each option before making a decision. There is not a silver bullet solution for every problem. Identify your objective before picking a solution.
