---
layout: post
title: "Migrating Git Repositories with Full History"
date: 2016-08-04 -0800
comments: true
categories: [Git]
summary: "Earlier this year GitHub announced a [pricing change and unlimited private repositories](https://github.com/blog/2164-introducing-unlimited-private-repositories).  I really like using GitHub and have decided to migrate my free Bitbucket repositories over to GitHub.  At first I was hesitant, because I wanted to retain my entire commit history.  Well, with Git this is a pretty trivial task." 
---

Earlier this year GitHub announced a [pricing change and unlimited private repositories](https://github.com/blog/2164-introducing-unlimited-private-repositories).  I really like using GitHub and have decided to migrate my free Bitbucket repositories over to GitHub.  At first I was hesitant, because I wanted to retain my entire commit history.  Well, with Git this is a pretty trivial task.

We are using some basic features in Git and it may be useful to check out the documentation for [mirror](https://git-scm.com/docs/git-clone) and [remote](https://git-scm.com/docs/git-remote).  Git mirror didn't have a fancy fragement URL so here are those docs for convenience.

> *--mirror*
>
> Set up a mirror of the source repository. This implies --bare. Compared to --bare, --mirror not only maps local branches of the source to local branches of the target, it maps all refs (including remote-tracking branches, notes etc.) and sets up a refspec configuration such that all these refs are overwritten by a git remote update in the target repository.



In order for this to work, we'll want to create an exact copy of the BitBucket repository locally.  We'll do this by creating a bare, mirrored clone.

```
 git clone --mirror https://your_username@bitbucket.org/your_username/your-git-repository.git
```

Once we've created the local clone, we'll want to change the `origin` of the repository.  Chances are, since this repository lives at Bitbucket, the `origin` is something like _https://your_username@bitbucket.org/your_username/your-git-repository.git_.  We'll want to swap this for the GitHub repository URL.

```
git remote set-url --push origin https://github.com/your_username/your-git-repository.git
```

After the `origin` remote was upated to point to the new GitHub repository we'll need to push the mirrored repository.

```
git push --mirror
```

These steps above are a good way to migrate your respositories with full history.  It is also possible to add a second `remote` to your existing repository, if you wanted to keep the existing `origin`.  [Here is a gist](https://gist.github.com/sgmeyer/08dd70ab28fca53aeaef6de028918eba#file-add-remote-cmd).
