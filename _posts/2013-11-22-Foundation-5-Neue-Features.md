---
layout: post
title: Neue Features in Foundation 5
author: Armins
categories: [foundation 5, foundation, features, css]
tags: [foundation, website, webdev, css]
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


Massives Interchange Upgrade
----------------------------

Interchange ist ein Javascript Plugin für Foundation das seit Version 4 dafür sorgt das man auf verschiedenen Bildschirm größen verschiedene Bilder laden kann.
Auf einem kleinen Bildschirm kann Beispielsweise ein Bild in einer geringeren Auflösung geladen werden als auf einem Grossen. Die Betonung liegt hierbei auf "laden", denn die Inhalte werden nicht nur versteckt oder eingeblendet, wie bei den "hide-for-" und "show-for-" CSS Klassen, sondern sie werden nicht einmal geladen wenn sie nicht benötigt werden und verringern deshalb auch nicht die Ladegeschwindigkeit der Seite.

Mit Foundation 5 hat Interchange nochmal deutlich an Power gewonnen, denn nun können nicht nur Bilder je nach Bildschirmgrösse ausgetauscht werden sondern jeder Beliebige Inhalt.
Mit Interchange hat man nun die Möglichkeit HTML Partials (und Bilder links) dynamisch laden zu können. Dabei gibt man einem HTML Element, z.B. einem DIV, ein data-attribute names "data-interchange" in dem Links zu verschiedenen html Dateien stehen die zu einer Viewport-Grösse zugeordnet werden.

{% highlight html linenos %}
    <div data-interchange="[/pfad/klein.html, (small)], [/pfad/gross.html, (large)]"> 
        Standard Inhalt
    </div>
{% endhighlight %}

Der Inhalt des Containers mit dem data-interchange Attribut wird dabei komplett durch das geladene HTML Partial ausgetauscht, je nachdem welcher Viewport gerade aktiv ist.

Sexy!








