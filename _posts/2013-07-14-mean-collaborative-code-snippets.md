---
layout: post
title: MEAN Collaborative Code Snippets
author: Felix Böhm
categories: [greatest]
tags: [code snippets, latest & greatest, node.js, angular, express, webentwicklung]
excerpt: Weekend Challange, Snippet Tool mit MEAN Stack
---

# COLLABORATIVE CODE SNIPPETS 
## oder MEAN: MongoDB, ExpressJS, AngularJS, Node.js

Ziel: Code Snippet Toll mit Editor Integration. Kollaborativ natürlich!
Unser Werkzeug: Node.js - Wir haben Übungsbedarf und wollen die latest & greatest Frameworks und Technologien in der java_script Welt erobern.

## Erste Schritte:
Erstmal Installieren

* node - ausführlich hier: [http://howtonode.org/how-to-install-nodejs](http://howtonode.org/how-to-install-nodejs) {% highlight bash %} brew install node # Mac OS{% endhighlight %}
* npm {% highlight bash %} curl https://npmjs.org/install.sh | sh # Mac OS & Linux {% endhighlight %}
* MongoDB [Installation](http://docs.mongodb.org/manual/tutorial/) {% highlight bash %} brew install mongodb # Mac OS {% endhighlight %}
* Mongoose {% highlight bash %} npm install mongoose {% endhighlight %}

oder Updaten {% highlight bash %}
sudo npm update npm -g  # Cool: Update dich selbst!
brew upgrade mongodb # Mac OS
{% endhighlight %}

Nun können Packete wie Express einfach installiert werden {% highlight bash %}
npm install express
{% endhighlight %}

## Gute Ausgangspunkte
Wir sind die hübsche Welt von HAML / SLIM und SASS gewöhnt, wird das auch mit Node.js gehen? Es nennt sich [Jade](http://jade-lang.com/).

Node mit Express und HAML gibts mit [haml-js](https://github.com/creationix/haml-js) oder [jquery-haml](https://github.com/creationix/jquery-haml) {% highlight bash %}
npm install hamljs 
{% endhighlight %}

Erfahrungsberichte, Tutorial und Seed Projekte, einen Blick wert:

* Angular.js und Express stecken hier schon drin: {% highlight bash %}
git clone git://github.com/btford/angular-express-seed my-project
{% endhighlight %}
  von [http://briantford.com/blog/angular-express.html](http://briantford.com/blog/angular-express.html)
* Slideshare zu [The MEAN Stack: MongoDB, ExpressJS, AngularJS and Node.js](http://de.slideshare.net/mongodb/mongodb2-21677032)
  Berichtet über den Einsatz von [Mongoose](http://mongoosejs.com/)
* Node, Express, Mongoose Seed Projekt {% highlight bash %}
git clone https://github.com/madhums/node-express-mongoose-demo.git
{% endhighlight %}
* Mongoose Tutorial [Mongoose and Node.js](http://theholmesoffice.com/mongoose-and-node-js-tutorial/)
* Hier wurde Bootstrap mit verwurstet: [Node, Express, Angular, Bootstrap](https://github.com/jimakker/angular-express-bootstrap-seed)
* [ExpressOnSteroids](https://github.com/the-teacher/ExpressOnSteroids)
* [Express MongoDB](http://howtonode.org/f8553a94aea5117c7236bb73cf85340269ea6602/express-mongodb)
* [Mongo Tutorial](http://blog.ijasoneverett.com/2013/03/a-sample-app-with-node-js-express-and-mongodb-part-1/)

## Code Snippets Konzept
* [Snippets in Sublime](http://www.sublimetext.com/docs/key-bindings)

