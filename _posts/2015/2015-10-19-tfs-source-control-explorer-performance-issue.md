---
layout: post
title: TFS Source Control Explorer Performance Issue
date: 2015-10-19 -0800
comments: true
categories: [ASP.NET, MVC, Security, Authentication]
redirect_from:
  -  "/2015/10/tfs-source-control-explorer-performance-issue"
  -  "/2015/10/tfs-source-control-explorer-performance-issue/"
---

The last few weeks I have noticed a steady decline in the performance of TFS Source Control Explorer. I first noticed performance degradation when I was traversing the tree view of the directories under source control. Each time I expanded a node in the explorer window it would spin for 5-10 seconds at each level. After a while I began to notice get latest, shelving, and committing was coming to a snail's pace. Today I had enough and decided to dig into the issue, admittedly I waited too long before solving this problem.

To keep this short and sweet TFS does not like to handle a workspace with over 100,000 files. The problem I was having is that each branch I created went into the same workspace. This was clearly a boneheaded move and one that was easy to mitigate. Ultimately, I decided to create a separate workspace for each branch. Once I had made this change TFS Source Control Explorer, and TFS management was much faster.
