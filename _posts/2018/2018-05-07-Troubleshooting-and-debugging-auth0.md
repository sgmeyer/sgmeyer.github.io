---
layout: post
title: "Debugging and Troubleshooting Auth0"
date: 2018-05-07 -0800
comments: true
categories: [Auth0, Debugging]
summary: "Auth0 provides a few tools to help trouble shoot and debug issues in your tenant.  This post explores how to debug your tenant." 
---

I have talked to a number of people about debugging and troubleshooting issues when using Auth0.  When writing code it doesn't take a long time to stumble across a need to get a deeper sense into what failures are ocurring.  In this quick post I want to share some of the tools that are available for tracking down issues in production or when developing new features.

## Production Issues

Auth0 makes it simple to build authentication and authorization into your product, but sometimes things can go wrong or users can stumble into unexpected workflows.  When these bugs happen we want to be able to identify the problem and respond quickly.  Fortunately, Auth0 provides a nice log function that expose the details we need.  For nearly all user and dashboard admin actions in your tenant (successful/failed login, success/failed code exchange, forgot password, etc) Auth0 logs information regarding these interaction.  Take a look at [Auth0's Data Event Listing](https://auth0.com/docs/logs#log-data-event-listing) document for a full list of all the events.

This is pretty straight forward.  Using these logs you can monitor and search for failures and information regarding the behavior.  In addition to this log Auth0 will share, per user, a historical view for each user.  Simply navigate to [Users](https://manage.auth0.com/#/users), select a user, and the click on history.  This will show roughly 30 days of history associated with that user.

In some environments it is not ideal to give dashboard access to everyone who needs access to the logs.  To handle this Auth0 supports various extensions that will pipe log data to a number of providers like Splunk, Mixpanel, Logly, etc.  Once you've setup integration you can monitor and search for various events.  Lastly, if Auth0 does not support the log provider you use there is a [Log API endpoint](https://auth0.com/docs/api/management/v2#!/Logs/get_logs) that is exposed so you can build your own integration.

## Debugging

Auth0 has several extensibility points where developers can run code to customize authentication and authorization workflows.  Whether we are build a custom database integration, creating a custom authorization policy via a rule, or using one of auth0 various hooks you can output `console.log('super helpful output.');` and stream this data live to your terminal or the [Real-tim Webtask Logs](https://auth0.com/docs/extensions/realtime-webtask-logs) extension.  These two tools will allow you see real-time log output in any of the Auth0 extensibility points (Hooks, Rules, Database Action Scripts).  Setting up the extension is the easiet way to get started.  Navigate to the [Extension Gallery](https://manage.auth0.com/#/extensions), search for *Real-time*, and click the extension to insall it.  Once the extension is installed you can click on it again to open the extension in a new tab.  Before you are able to view the log stream it will ask you to login with your Dashboard admin credentials.  Once you are authorized you will see a live stream of all the activity across Hooks, Rules, and Database Action Scripts.

Sometimes it is not ideal to use a browser to stream these details.  Instead you can stream this information straight to your terminal.

```
# Install the Webtask CLI
npm install -g wt-cli

# Setup your webtask profile
wt init --container "{your-tenant-name}" --url "https://sandbox.it.auth0.com" -p "{your-profile-name}" --auth0

# Stream Logs
wt logs -p "{your-profile-name}
```

If all is setup properly you will start seeing the data stream to your terminal!