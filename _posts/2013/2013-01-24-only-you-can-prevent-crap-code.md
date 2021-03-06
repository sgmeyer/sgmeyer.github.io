---
layout: post
title: "Only You Can Prevent Crap Code"
date: 2013-01-24 -0800
comments: true
categories: [Rant]
disqus_identifier: 142
redirect_from:
  -  "/2013/01/only-you-can-prevent-crap-code"
  -  "/2013/01/only-you-can-prevent-crap-code/"
---

Over the last few years I have evangelized about writing clean code.  I have read numerous resources, talked to developers, and spent time developing.  I have felt the pain of an ugly system, I have felt the love of beautiful code, and I have brought down pain and misery upon future developers.   Recently, I have reflected on the last eight years of my professional career and I realized why I obsess about clean code.   For me it comes down to respecting other developers and respecting my users.

What the hell are you talking about you ask?  Well, besides thinking that was a mean way to ask a question, I believe writing good code is an obligation and a way to show future developers you respect their time.  We all have spent a lot of time reading code.  Experience shows that reading code can be time consuming and it is typically more difficult than writing new code.  The more complex the code the harder it is to read and understand.  If the code has poor variable names, no encapsulation, high coupling, god classes, misleading or stale comments, hard coded dependencies, custom design patters, and the list goes on then it is going to take a lot longer to understand and modify the code.

It is easy to write bad code and maybe the developer thought they had to do this to meet a tight deadline.  This might sound convincing, however it just cost the next developer over an hour to understand the code before they could even start modifying the code and now they have to cut corners to meet their deadline.  On top of that, their level of confidence in the new code went down and they introduced a new bug.  If that developer doesn’t refactor the code, then the hour they spent figuring it out was wasted.  The next developer will have to spend another hour or more to understand the code.  Seems like a pretty awesome way to develop.  The problem gets worse overtime and inevitably something really bad is going to happen.

If you don’t care about the next developer, which isn’t professional by the way, then care about your users.  Initially, you could argue you wanted to ship new features to the users as quickly as possible.  This sounds great, but at what cost?  Future releases.  As you continue to build and enhance your software it will take longer to ship new features and you will increase the likelihood of defects.  Is this really what you want to give the user?  Of course it is, if you hate your users enough.  The users, PM, or stakeholders might be pushing for code quickly, but it is our responsibility to set expectations.  Writing sloppy code hurts the organization and the user, period.  Fight for good code.

I like to believe that most developers have good intentions and want to write SOLID code (<a href="http://en.wikipedia.org/wiki/SOLID_(object-oriented_design)">http://en.wikipedia.org/wiki/SOLID_(object-oriented_design)</a>.  So why are we stuck with systems that turn out to be evil, gnarly balls of hate? Code decays only if you let it.  Code rot is the guy you invite to the party that you know you shouldn’t because he invites all of his friends from prison.  Before you know it your house turns into a coke den full of dudes with Russian prison tattoos and rap sheets longer than an emo kid’s journal.  This is not a good place to be, trust me.   The bottom line is we have to be professional and write good code.  It is our job to create a system that is clean and maintainable.  Developers are responsible to fight for the health of the code.  We cannot expect PMs, stakeholders, managers, or anyone else to understand the importance and fight for the cause.   If you want to be a hero be like Batman he cleans up the streets of Gotham!  Batman is badass and you can be too.  Aquaman would stay late every day for a month to reach a deadline.  He would cut corners instead of set expectations.  Don’t be Aquaman, he sucks (<a href="http://www.youtube.com/watch?v=bBLaRSmqGS8">http://www.youtube.com/watch?v=bBLaRSmqGS8</a>).  Do yourself a favor, be Batman and not Aquaman.

Edit:
After reflecting on this article I want to emphasize that no one developer is perfect and we have and probably will write dirty code at some point.  I would like to see more developers provide constructive feedback about code to help each other learn and produce great software.  After all, as we learn and progress our source should evolve.  I believe sharing code is about helping and learning.  It shouldn't be about throwing daggers.
