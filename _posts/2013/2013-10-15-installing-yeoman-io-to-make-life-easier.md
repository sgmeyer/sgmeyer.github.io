---
layout: post
title: Installing Yeoman.io to Make Life Easier
date: 2013-10-15 -0800
comments: true
categories: [Bower, Grunt, Yeoman]
redirect_from:
  -  "/2013/10/installing-yeoman-io-to-make-life-easier"
  -  "/2013/10/installing-yeoman-io-to-make-life-easier/"
---

Yeoman.io is a collection of 3 technologies.  The idea behind Yeoman is to help developers accomplish the common, tedious tasks such as building, linting, minification, scaffolding, previewing/running our code, etc.  Yeoman isn't just a tool, but it is a companion for helping you at all stages of the development phase, that is from starting, developing, testing, and deploying a project.  Earlier I gave a quick dive into the various components of Yoeman.io and you can check it out at <a href="http://www.shawnmeyer.com/2013/10/a-quick-intro-into-yeoman-io/">A Quick Into Into Yeoman.io</a>.  Next, I wanted to show you how easy it is to install Yeoman to start taking advantage of its power.

First, you are going to need to have node.js and the node.js package manager (npm) installed.  This is easy enough, simply navigate to <a href="http://nodejs.org/download/">node.js download page</a> and follow the node.js instructions.  By default the node package manager will be installed.  Be sure not to omit that from the installation as we will need it to install Yeoman, Grunt, and Bower.

Once you have installed node.js open your terminal or command window.  To test you have successfully installed node.js and npm type the following commands.

```
node --version
npm --version
```

If your terminal window spits out a version number then you are good to go.  Now that node.js and npm are installed we need to install Yeoman.  We are going to use npm to install Yeoman locally, and this will automagically install Grunt and Bower as they are dependencies of Yeoman.  To install Yeoman npm makes this easy.  With the terminal window still open run the commands below to being installation.

```
npm install -g yo
```

This will take a bit of time to download the app as well as it's dependencies, but you only have to do this one time.  Once, the Yeoman (yo) is done installing we can being using the tool.  Unfortunately, Yeoman doesn't come with many generators out of the box it does however allow you to download many generators that will meet your needs.  So we can start downloading generators we will commonly use to help make Yeoman more useful.  For the purpose of this we will use generator-angualar to scaffold our next application, and first we must download the generator.

```
npm install -g generator-angular
```

This generator provides instructions to yo for scaffolding your next angular project.  There are many more generators available to you, but here are some listed on <a href="http://yeoman.io/community-generators.html">Yeoman</a>.

Once the generator is installed you can begin using it.  It is just that easy!

```
mkdir c:/project/projectName
cd c:/project/projectName
yo angular
```

After a few seconds of downloading your dependencies and scaffolding the application your new angular project is good to go.  Each generator may ask you a set of questions about your application.  These steps are to help Yeoman create a more customized project to meet your needs.  Help Yeoman out so he can help you out.

Enjoy!
