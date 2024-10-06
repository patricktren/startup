Things learned
---------------------------------------


GitHub
---------------------------------------
I became much more familiar w/the basics of Github. It's quite simple (shown below)
Steps to use Github:
1) Verify you have the latest code (git pull)
2) Refactor, test, and/or implement a small portion of cohesive code (test code test)
3) Commit and push (git commit git push)
4) Repeat

---------------------------------------
Deploying a website
---------------------------------------
syntax: deployFiles.sh -k <pem key file> -h <hostname> -s <service>
You need a fairly complex file (deployFiles.sh) to deploy a website. Unsure of how this is made. It seems like the type of thing that can be auto-generated.
---------------------------------------

Extensions of your domain:
---------------------------------------
    In order to allow something like extension.yourdomain.com you need to create an A record that looks like *.yourdomain.com and then you can create any extension you want following that pattern

---------------------------------------


Flex-box
---------------------------------------
- You can simply make an element a flex box by giving it that property; this allows your elements to be dynamically changed in size, shape, etc. for different window sizes
- You can also make conditional CSS rules that apply when certain "@media" query conditions are met, like the max-size of window for the current device

Bootstrap
---------------------------------------
I've often heard of Bootstrap, but I didn't really know what it was.
- you can import CSS rules that conform to a certain look
- these include advanced web elements like accordion features. I also learned about how JS works to make buttons do certain things (like open up an accordion); it is important to give elements id's so that they can be referenced by other elements (like buttons) to do this sort of thing.