---
layout: post
title: Wordpress Themes mit Foundation 
author: Armin
categories: [wordpress, foundation]
tags: [wordpress, theme, foundation, zurb, framework, responsive]
excerpt: In diesem Post erkläre ich wie man mit dem Zurb-Foundation CSS Framework ein Wordpress Theme komplett from-scratch baut.
---

Vorbereitung
============

Hier wird ein einfacher Weg gezeigt ein neues und eigenständiges Theme mit Foundation zu bauen. In diesem Fall ohne auf Starterkits wie z.B. [Thematic](http://thematictheme.com/) zurückzugreifen.  

Zuerst wird wie üblich ein neuer Ordner für das Theme im Verzeichnis **/wp-content/themes** angelegt, in welches wir in diesem Fall das hart-kompilierte Foundation Zip von der [Zurb Webseite](http://foundation.zurb.com/download.php) entpacken (auf SCSS und HAML werde ich in einem späteren Blogpost eingehen).
Damit hat man schon eine grundlegende Ordnerstruktur und eine Beispiel **index.html**. Mitgeliefert werden auch **humans.txt** und **robots.txt** die wir aber sofort löschen können, sie werden für ein Wordpress Theme nicht gebraucht.

<code>.
├── <span style="color:blue">css</span>
├── <span style="color:blue">img</span>
├── <span style="color:blue">js</span>
└── index.html</code>

Wenn wir **index.html** in einem Browser öffnen sehen wir bereits eine Demonstration einiger Elemente aus dem Foundation Framework.

Nun müssen wir aber zuerst noch zwei Dinge erledigen damit man diese Dateien in Wordpress als Theme benutzen kann.

1. **index.html** in **index.php** umbenennen.  
	Wordpress verlangt das jedes Theme eine **index.php** enthält.

2. Eine **style.css** Datei erstellen und mit einem Theme-Header füllen.  
	Wie auch [hier](http://webhippie.de/blog/wordpress-child-themes/) erklärt benötigt Wordpress sowohl die Datei als auch die
	Informationen darin um das Theme im System bereitstellen zu können.

<code>.
├── <span style="color:blue">css</span>
├── <span style="color:blue">img</span>
├── <span style="color:blue">js</span>
├── style.css
└── index.php</code>

Sobald das erledigt ist können wir unser neues Theme im Wordpress-Backend unter Appearance->Themes auswählen und aktivieren.

Wordpressifizierung
=========================

Nun werden wir aus den statischen HTML Dateien ein dynamisches Wordpress Theme bauen.

Grundgerüst
-----------

Wenn man nun das Theme aktiviert und die Wordpress-Seite aufruft sieht man sofort das offensichtlich keinerlei CSS Regeln geladen werden. Das liegt daran das die relativen links im Quelltext, die auf die CSS und Javascript Dateien zeigen, 
jetzt nicht mehr vom tatsächlichen Ort der **index.php** aus gelesen werden, sondern vom Wurzelverzeichnis der Wordpress Installation.  

Um den Pfad des Momentan benutzten Themes herauszufinden benutzen wir folgende PHP Funktion:

 	bloginfo('template_url');

Um also zum Beispiel das foundation Stylesheet einzubinden benutzt man nicht mehr

{% highlight html %}
<link rel="stylesheet" href="css/foundation.css">
{% endhighlight %}
Sondern
{% highlight html %}
<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/css/foundation.css">
{% endhighlight %}

Um mir die Erklärung etwas zu erleichtern habe ich die **index.php** etwas angepasst und alle Pfade mit der *bloginfo()* Funktion richtiggestellt.

{% highlight html linenos %}
<!DOCTYPE html>
<!--[if IE 8]><html class="no-js lt-ie9" lang="en" ><![endif]-->
<!--[if gt IE 8]><!--><html class="no-js" lang="en" ><!--<![endif]-->
<!DOCTYPE html>
<!--[if IE 8]><html class="no-js lt-ie9" lang="en" ><![endif]-->
<!--[if gt IE 8]><!--><html class="no-js" lang="en" ><!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width">

	<title>Foundation 4</title>  

	<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/css/foundation.min.css">

	<script src="<?php bloginfo('template_url'); ?>/js/vendor/custom.modernizr.js"></script>
	<script src="<?php bloginfo('template_url'); ?>/js/vendor/jquery.js"></script>
	<script src="<?php bloginfo('template_url'); ?>/js/foundation.min.js"></script>
</head>
<body>

	<!-- Unser HTML kommt hier hin -->

	<script>$(document).foundation();</script>
</body>
</html>
{% endhighlight %}

Veränderungen gegenüber der Beispiel **index.html**:  

1. Zepto Abfrage entfernt, es wird immer jQuery benutzt
2. Einzelne Javascript Includes entfernt, es wird die komplette **foundation.min.js** eingebunden
3. Es wird die minified Version der **foundation.css** verwendet

Um zu testen ob alles funktioniert hat kann man z.B. einen [Foundation Button](http://foundation.zurb.com/docs/components/buttons.html) in den body Bereich einfügen und die Wordpress Seite erneut im Browser aufrufen.

Header und Footer
-----------------

Soweit so gut. Wenn wir aber mehrere HTML Dateien anlegen wollen, müssen wir dieses Grundgerüst in jeder dieser Dateien wieder neu einbauen. Um das zu vereinfachen kann man in Wordpress Header und Footer Dateien anlegen und deren Inhalt mit simplen PHP Funktionen in anderen Dateien einbinden.
Wir lagern also den Teil vor dem Content in eine Datei namens **header.php** aus, und den Teil danach in **footer.php**.  

**header.php:**
{

