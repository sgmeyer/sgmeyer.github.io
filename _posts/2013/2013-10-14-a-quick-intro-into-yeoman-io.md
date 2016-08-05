---
layout: post
title: A Quick Intro Into Yeoman.io
date: 2013-10-14 -0800
comments: true
categories: [Bower, Grunt, Yeoman]
redirect_from:
  -  "/2013/10/a-quick-intro-into-yeoman-io"
  -  "/2013/10/a-quick-intro-into-yeoman-io/"
---

When I built my first HTML5 game, Super Space Odyssey, I did things the hard way.  I created everything from scratch and I did not leverage a game engine to do some of the heavy lifting.  I was looking around on the web and found several options, but I decided to go with Crafty.js for my next game.

As it turns out I get distracted easily…  I found, just like every framework, setting up dependencies and the structure of the application is tedious and time consuming.  While searching the <a href="http://craftyjs.com">Crafty site</a>.  I found the developers at Crafty recommend a particular structure for games, and they also supplied a handy boilerplate to get things rolling (<a href="http://github.com/ahiles107/CraftyBoilerplate">CraftyBoilerplate</a>).

I have wanted to create my own Yeoman generator and now I have a reason.  Yeoman.io is a self declared “workflow; a collection of tools and best practices working in harmony to make developing for the web even better.”  This sounded pretty <a href="http://www.urbandictionary.com/define.php?term=totes+mcgoats">Totes McGoats</a>, but I didn’t really know how awesome it could get.  With a little terminal kung fu, I was able to setup a new game faster and a lot easier (first world problems, I know).

Before I can get started, I need to understand essence de Yeoman.  There are three main pieces to Yeoman: Yo, Grunt, and Bower.  Yo is the templating engine that I will use to push the scaffolding for Crafty games.  Grunt is the javascript based task runner that I use for minifying, build, and deploy my game to a local node server.  Bower does all the dependency management so we don’t have too!

To start things off I used Node Package Manager (npm) to install yeoman, which installs Grunt and Bower as well.  Both node and npm are required for yo, grunt, and bower.

```
npm install -g yo
```

This basically installs npm so it is accessible through the terminal globally.  Once yo (Yoeman) is installed we can start creating a generator.  Generators are what we want to create, they are the magic that makes starting new projects easier.  Specifically, this is what will scaffold our application, setup our local dev env, and allow us to use bower dependency management when building our games.  Once the game is created the scaffolding will setup the Gruntfile.js, package.json, and bower.json file.

Generator: This is the definition of the scaffolding.  The generator will be used to start a new project.  It is basically a command line installer.  It will ask you various questions about your project and push out the boilerplate you need so you can just get things done right (GTDR).

Gruntfile.js: This file is created by the generated and used by Grunt to build, deploy, setup a webserver, minify, clean the project, etc.  We will use grunt during the development phase to help us test our site on a local node server.

Package.json: This file has metadata about the project.  It can be used by NPM to publish data.  It isn’t needed for much more than that.  This too will be created by the generator, but the generator will also have one to describe itself as well.

Bower.json: Here is where we describe the dependencies of our project.  We can use Bower to update and pull our projects dependencies.  No more navigating to sites, downloading JS files, unpacking, and inserting the scripts.  Nope, only magic here.

Ok, so now we need to get started with our generator.  I don’t know about you, but I don’t want to start from scratch.  After all we are going through this in the first place because we don’t want the tedious work.  So my first step is download yo’s generator-generator.  This bad boy is all the scaffolding you need to create yo generators.

```
npm install -g generator-generator
```

Once the generator to scaffold generators is installed we need to create a new directory to contain our generator code.

```
mkdir /Users/shawnmeyer/Documents/Projects/Generators/generator-crafty
yo generator
```

This will spit out various questions.  Fill them in accordingly to have the generator setup your local project, but be sure to name you directory generator-blank where blank is the name of your generator.  This naming convention is important.  The second part is how we will tell yo to scaffold using your generator.  In my scenario it would be:

```
yo crafty
```

In your new generator project you will have a package.json file.  This file contains the metadata and dependencies of your application.  When the user installs your generator using the Node Package Manager, the npm will download and install of the dependencies of your generator if you need them.

I am not going to show you all the steps I took to create the generator-crafty package, but  you can check it out at <a href="https://github.com/sgmeyer/generator-crafty">https://github.com/sgmeyer/generator-crafty</a>.  I do have some handy tips.  When you are creating your generator you can test locally a couple of ways.

First, you can run unit tests by entering the command in the root director of your generator.  This command looks at your test/*js files and runs those tests in the terminal.

```
npm test
```

Next you can link the generator to npm and test the generator to create the scaffolding.  This is handy if you don’t want to publish your generator and you just want to horde and kee all your fancy generators to your self.   Run this command in the root directory of you generator.

```
npm link
```

And then you can use yo to run your generator. To run your generator and setup the scaffolding navigate to your directory.  Since I used generator-crafty as my name I will go to the crafty directory.  Use the command below will tell yo to run generator-crafty, and the generator will setup all the scaffolding we defined in the Index.js file of our generator.  I didn’t show this step, but you can check out my code to see an example (<a href="http://www.urbandictionary.com/define.php?term=totes+mcgoats">http://github.com/sgmeyer/generator-crafty">Generator-Crafty Repo</a>).

```
yo crafty
```

Assuming you added some grunt support to your Gruntfile.js you could also use the grunt command in this directory to execute your tasks.  In my code I setup a custom grunt task that creates a node server, opens a browser, and runs live reload to detect updates to the JS and HTML to give you live preview.

```
grunt server
```

Grunt lets you setup a default task as well that it pulls from the Gruntfile.js or you can call tasks by name.  In my example I am calling the server task by name, however I have it setup to work by calling grunt without a task name.

Once the scaffolding is done running you might want to add some more magic to your project and this is where Bower comes in.  Let’s say we want to add a dependency to underscore.  Bower will let us do this.

```
bower install --save underscore
```

This will install your underscore dependencies in the bower_components directory of your new project (in my crafty directory) and it will update the bower.json file's dependency list.  if you don't want to update your bower.json file you can drop the --save flag.  Again, Bower is just a package manager.  It does not replace RequireJS or other front-end dependency loader.  Bower simply installs and updates your local dependencies.

When new developers pull your project from source control, they can run the command below to install and pull the projects dependencies.  This makes it convenient and you won't have to commit your js files.

```
bower install
```

This is just a quick glimpse at the Yeoman workflow.  There is a ton of power available to us by using Yo, Grunt, and Bower.  These tools really can work together and help us be more productive.
