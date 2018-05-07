---
layout: post
title: "Managing Auyth0 Configuration with Continuous Integration"
published: false
date: 2018-04-25 -0800
comments: true
categories: [Auth0]
summary: "When building applications that rely on Auth0 for authentication and authorization we must manage numerous configuration associated with our Auth0 tenant.  this post outlines some ways to manage your Auth0 configurations inside your CI processes." 
---

Over the last several years Continuous Integration and Delivery has become common place for many development teams.  So much so that it is considered crazy if we have to manage our environment configurations manually.  There are many well documented problems with managing configuration manually that we won't cove those here, but I will share with you how I manage my Auth0 tenant configurations inside CircleCI.

It is worth noting that Auth0 does have some native capabilities for shipping some of your configurations.  If you simply want to deploy rules, hosted pages, and custom database action scripts after checking into version control then utilizing one of the deployment extensions may be enough.  These deployment extensions are limited to GitHub, Bitbucket, GitLab, and Visual Studio Version Control (or git).  There isn't much configuration you can do to control the CI workflow, but it is a simple and cheap way to get started.  At the time of this blog Auth0 is scheduled to support rule settings and client configurations, but these have not yet been deployed.  Beyond the deployment extensions there is also a [deploy CLI ](https://github.com/auth0/auth0-deploy-cli) that supports some of the capabilities one might want for a CI tool.  Currently, this tool lives as a community effort (open source) and does not get direct maintenance from Auth0.

If none of these tools fit your need then building our own scripts is the way to go.  Auth0 does have quite and extension [Management API](auth0.com/docs/api/management/v2) which opens the possibility for us managing and building our own CI process.  When I am building a CI process I like to take a declarative configuration approach.  I then write a tool that simply consumes my configuration and pushes that to Auth0 using the Management API.

```

```

