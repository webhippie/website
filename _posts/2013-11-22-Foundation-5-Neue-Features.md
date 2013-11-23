---
layout: post
title: Neue Features in Foundation 5
author: Armin Boß
categories: [foundation 5, foundation, features, css]
tags: [foundation, website, webdev, css, foundation 5, CLI]
excerpt: Für alle Webentwickler weltweit hat sich kürzlich etwas großartiges ereignet. Die [5te Version des Foundation CSS Frameworks](http://foundation.zurb.com) wurde Released, und sie bringt uns viele aufregende neue Features. Nicht nur am Foundation Framework selbst sondern auch am Angebot von Zurb und dem Umfeld von Foundation selbst. Hier eine Zusammenfassung der Neuerungen die ich am spannendsten finde.
---

Etwas wunderbares ist Passiert
==============================

Für alle Webentwickler weltweit hat sich kürzlich etwas großartiges ereignet. Die [5te Version des Foundation CSS Frameworks](http://foundation.zurb.com) wurde Released, und sie bringt uns viele aufregende neue Features. Nicht nur am Foundation Framework selbst sondern auch am Angebot von Zurb und dem Umfeld von Foundation selbst.

Hier eine Zusammenfassung der spannendsten Neuerungen:


Minimalistisches Design
-----------------------

Alle mitgelieferten GUI Elemente in Foundation 5 sind in einem neuen minimalistischen Flat-Design gehalten, und liegen somit voll im momentanen Design Trend.

<div style="text-align: center">
  <img src="{% asset_path blog/foundation_minimalistic.jpg %}" style="width: auto; padding-bottom: 20px;"/>
</div>
 
Das neue Design erleichtert uns Webentwickler das Leben mit Designern und Kunden enorm, da zurzeit viele Webseiten in einem schlicht gehaltenem Stil gewünscht werden.


Medium Viewport Support
-----------------------

Der Medium Viewport wird nun vollständig unterstützt, sowohl auf der Scss Seite als auch in allen anderen Foundation Features. Sexy!


Community und Dokumentation
---------------------------

Zurb hat für Foundation nun ein Forum eingerichtet auf dem man sich über sein Lieblings CSS-Framework austauschen kann.
Das wird dazu führen das viele Code Beispiele zur Verfügung stehen, und man bei dringenden Problemen sofort Unterstützung finden kann.
Erwähnenswert ist auch dass das Forum im Bewährten StackExchange Stil gehalten ist.

Die Dokumentation wurde ebenfalls komplett neu aufgezogen und ist um einiges Detailierter und einfacher Verständlich, ausserdem werden auf der Foundation Webseite in Zukunft Video-Tutorials und Online-Kurse angeboten.
Neulingen sollte es nun bedeutend einfacher fallen den Umgang mit Foundation zu lernen.

Sublime Snippets
----------------

Ebenfalls spannend wird es für Benutzer des beliebten Texteditors Sublime, denn Zurb hat nun einen [Github](https://github.com/zurb/foundation-5-sublime-snippets) veröffentlicht voller Foundation HTML Snippets die man mit Sublime benutzen kann.
Webseiten Prototypisieren wird damit, mit den Worten von Zurb "Crazy Fast".
Wir Webhippies haben die Sache noch etwas aufgepeppt und einen Fork der [Snippets in HAML](https://github.com/webhippie/foundation-5-sublime-snippets/tree/haml-snippets/Snippets/Sublime%20Snippets/haml) angelegt. Damit sollte das Entwickeln nun mindestens "Insanely Fast" sein.

Massives Interchange Upgrade
----------------------------

Interchange ist ein Javascript Plugin für Foundation das seit Version 4 dafür sorgt das man auf verschiedenen Bildschirm größen verschiedene Bilder laden kann.
Auf einem kleinen Bildschirm kann Beispielsweise ein Bild in einer geringeren Auflösung geladen werden als auf einem Grossen. Die Betonung liegt hierbei auf "laden", denn die Inhalte werden nicht nur versteckt oder eingeblendet, wie bei den "hide-for-" und "show-for-" CSS Klassen, sondern sie werden nicht einmal geladen wenn sie nicht benötigt werden und verringern deshalb auch nicht die Ladegeschwindigkeit der Seite.

Mit Foundation 5 hat Interchange nochmal deutlich an Power gewonnen, denn nun können nicht nur Bilder je nach Bildschirmgrösse ausgetauscht werden sondern jeder beliebige Inhalt.
Mit Interchange hat man nun die Möglichkeit HTML Partials (und Bilder links) dynamisch zu laden. Dabei gibt man einem HTML Element, z.B. einem DIV, ein data-attribute names "data-interchange" in dem Links zu verschiedenen html Dateien stehen die zu einer Viewport-Grösse zugeordnet werden.

{% highlight html linenos %}
    <div data-interchange="[/pfad/klein.html, (small)], [/pfad/gross.html, (large)]"> 
        Standard Inhalt
    </div>
{% endhighlight %}

Der Inhalt des Containers mit dem data-interchange Attribut wird dabei komplett durch das geladene HTML Partial ausgetauscht, je nachdem welcher Viewport gerade aktiv ist.

Kommandozeilen Interface
------------------------

Für Foundation 5 wurde ein neues CLI gebaut das man sich einfach als Ruby-Gem installieren kann. ("Bower" wird ebenfalls für Update Zwecke benötigt)

    [sudo] npm install -g bower
    gem install foundation

Danach kann man sich einfach neue Projekte anlegen, z.B. standardmässig mit Compass:

    foundation new PROJEKT_NAME

Oder mit dem neuen libsassy SASS Compiler, welcher in C++ geschrieben ist und bis zu 32x schneller werden kann als die Ruby Version:

    foundation new PROJEKT_NAME --libsass

Zusammenfassung
---------------

Version 5 des Foundation CSS Frameworks ist leichter zu lernen, schneller zu benutzen, und sieht einfach super aus. Bereits nach diesem kleinen Überblick wird deutlich wieviel Dampf Foundation 5 unter der Haube hat.

Ich wünsche viel Spaß beim Coden, wir sehen uns im Foundation Forum.
