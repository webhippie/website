---
layout: post
title: Custom Forms mit Foundation
author: Armin
categories: [foundation, css]
tags: [foundation, website, webdev, css, forms]
excerpt: Das Foundation CSS Framework von ZURB bietet uns neben vielen anderen grossartigen Features auch die Möglichkeit HTML Formular Elemente sehr einfach mit CSS zu stylen. Foundation stellt dazu fertige CSS Klassen und Javascript Methoden bereit die uns die Arbeit mit selbst gestalteten Formularen deutlich erleichtern. Wie das ganze funktioniert, und wie man die Optik und das Verhalten der Elemente auf ein Professionelles Niveau bringt werde ich hier kurz zeigen.
---

Das Feature
===========

Das Foundation CSS Framework von ZURB bietet uns neben vielen anderen grossartigen Features auch die Möglichkeit
HTML Formular Elemente sehr einfach mit CSS zu stylen. Foundation stellt dazu fertige CSS Klassen und Javascript Methoden
bereit die uns die Arbeit mit selbst gestalteten Formularen deutlich erleichtern. Wie das ganze funktioniert, und 
wie man die Optik und das Verhalten der Elemente auf ein Professionelles Niveau bringt werde ich hier kurz zeigen.

Um die Custom-Form Features von Foundation benutzen zu können, müssen wir *nach* der **foundation.js** noch **foundation.forms.js**
einbinden. Eine Beispiel Grundgerüst könnte also z.B. so aussehen:

{% highlight html linenos %}
<!DOCTYPE html>
<!--[if IE 8]><html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width" />
  <title>Custom Forms Demo</title>

  <link rel="stylesheet" href="css/normalize.css" />
  <link rel="stylesheet" href="css/foundation.css" />

  <script src="js/vendor/custom.modernizr.js"></script>
</head>
<body>



  <script src="js/vendor/jquery.js"></script>
  <script src="js/foundation/foundation.js"></script>
  <script src="js/foundation/foundation.forms.js"></script>

  <script>
    $(document).foundation();
  </script>
</body>
</html>
{% endhighlight %}


Eigene Formular Elemente
========================

Die [Dokumentation](http://foundation.zurb.com/docs/components/custom-forms.html) von Foundation beschreibt bereits
ausführlich welche Komponenten zur Verfügung stehen. 
Wir werden in diesem Beispiel eigene Radio-Buttons gestalten, da es dabei ein paar Dinge zu beachten gibt.
Sehen wir uns zuerst einmal den HTML Code an:

{% highlight html linenos %}
<form class="custom">
  <label for="radio1">
    <input name="radio1" type="radio" id="radio1" style="display:none;">
    <span class="custom radio"></span> Button 1 Beschriftung
  </label>
</form>
{% endhighlight %}

Als erstes geben wir dem kompletten Formular die Klasse **custom**, um alle entsprechenden
Javascripts und CSS Regeln von Foundation auf dieses Formular anzuwenden.

Ein Custom Radio-Button hat nun einen etwas anderen Aufbau als ein gewöhnlicher. Der **label-Tag**
für den Button umschliesst das eigentliche Formularelement und enthält gleichzeitig die Beschriftung.

Im **Input-Tag** steht ein **style** Attribut das dass komplette Element versteckt. Das was uns am Ende als klickbarer
Radio-Button angezeigt wird ist also nicht mehr das echte, vom Browser gestylte Radio-Button Element, sondern das **span**
mit den Klassen **custom** und **radio**, das sich ebenfalls mit im Label befindet.

Dieses ganze Konstrukt macht es sich zunutze das Formularelemente ihren Status auch dann ändern, wenn man nur auf ihre Beschriftung klickt.
Wir brauchen den echten Radio-Button garnicht um seinen Status ändern zu können, sondern lediglich das **label**, in dem sich nun auch unser
Selbstgebauter Button befindet.

Hier das Ergebnis des Beispielformulars von oben:

<div style="text-align: center">
	<img src="{{ site.url }}/assets/img/blog/custom_form_1.png" style="width: auto; padding-bottom: 20px;"/>
</div>
  
Foundation bietet schon einen fertigen Custom-Form Style für Radio Buttons den wir hier sehen.
Um ihm nun unseren eigenen Style zu geben binden wir ein neues Stylesheet ein,

{% highlight html linenos %}
<link rel="stylesheet" href="css/app.css" />
{% endhighlight %}

mit dem folgenden Inhalt:

{% highlight css linenos %}
form.custom .custom.radio
{
  width: 25px;
  height: 25px;
  border-color: #93AB00;
  border-width: 2px;
}
{% endhighlight %}

Dieser Selektor manipuliert das Aussehen des **Span-Tags** im Label des Radio-Buttons.
Da der vorgefertigte Style von Foundation schon dafür sorgt das der Rahmen des Buttons rund ist (border-radius: 1000px 1000px),
brauchen wir uns darum in diesem Fall nicht mehr zu kümmern. Möchte man einen eckigen Radio-Button kann man dieses Attribut einfach überschreiben.

Für dieses Beispiel geben wir dem Button eine grüne Rahmenfarbe und eine Rahmenstärke von 2 Pixeln. Ausserdem setzen wir die Grösse des Buttons auf 25x25 Pixel.
Das Ergebnis ist folgendes: 

<div style="text-align: center">
	<img src="{{ site.url }}/assets/img/blog/custom_form_2.png" style="width: auto; padding-bottom: 20px;"/>
</div>

Wenn wir den Button nun anklicken bekommt er von Foundation die Klasse **.checked** zugewiesen. Über diese Klasse können wir dem ausgewählten Radio-Button einen eigenen Style geben.
Besonders hilfreich ist dabei die **:before** Pseudoklasse mit der wir ihm einen Inhalt geben können, wie z.B. einen Punkt oder ein Kreuzchen.
Das könnte z.B. so aussehen:

{% highlight css linenos %}
form.custom .custom.radio.checked:before
{
  content: '\2717';
  font-size: 21px;
  background: none;
  color: #93AB00;
  line-height: 1;
}
{% endhighlight %}

Damit fügen wir ein Kreuz-Symbol in einer Grünen Farbe, mit einer Font Grösse von 21px im ausgewählten Radio-Button ein.
Wichtig ist hierbei das wir alle Attribute die von Foundations Standardstyle für den gecheckten Button gesetzt wurden überschreiben müssen.
Deshalb setzen wir hier den Wert für **background** auf **none** um den schwarzen Kreis zu verstecken der sonst angezeigt würde.

Um das Kreuz innerhalb des Buttons richtig zu positionieren fügen wir ausserdem noch folgende Zeile in die Styles für den kompletten Button ein,
und überschreiben damit nebenbei ebenfalls die Werte des Foundation-Standard-Styles:

{% highlight css linenos %}
  padding: 1px 0 0 2px; 
{% endhighlight %}

Unser ausgewählter Radio-Button sieht nun so aus:

<div style="text-align: center">
  <img src="{{ site.url }}/assets/img/blog/custom_form_3.png" style="width: auto; padding-bottom: 20px;"/>
</div>

Wunderschön :)

Textfluss
=========

Soweit sieht der Button schon sehr gut aus. Ein Problem tritt jedoch auf sobald die Beschriftung des Buttons etwas länger wird und der Text umbricht.

<div style="text-align: center">
  <img src="{{ site.url }}/assets/img/blog/custom_form_4.png" style="width: auto; padding-bottom: 20px;"/>
</div>

Wie man sieht Umfliesst der Text den Radio-Button, was man in vielen Designsituationen eher weniger gut aussieht.

Ein erster Lösungsansatz wäre es die Beschriftung in ein **DIV** zu packen und dieses mit **float: left** zu versehen.
Der Text würde dann den Button nicht länger umfliessen. Sobald man aber etwas anderes als Plaintext, wie zum Beispiel einen **DIV**-Tag, im Label des Buttons hat
ist die Beschriftung aber aus irgendeinem Grund nicht länger anklickbar und ändert den Status des Buttons nicht mehr. Auf mobilen Geräten kann es
die Userexperience deutlich schmälern wenn man mit dem Finger die checkbox nicht treffen kann. Ein anklickbarer Text sorgt für mehr Barrierefreiheit für Leute mit Fetten Fingern.
Diese Lösung ist also alles andere als zufriedenstellend.

Mit einem kleinen Trick können wir das Problem des Umbrechende Texts aber Lösen und gleichzeitig den klickbaren Text erhalten.
Da das Label in diesem Fall selbst schon einen Behälter für den Text darstellt in dem der angezeigte Button mit enthalten ist, müssen wir nur noch dafür Sorgen
das der Button den Fluss des Textes nicht mehr stört und stattdessen ausserhalb des Labels angezeigt wird.

Das erreichen wir sehr einfach indem wir dem **span** das unseren Radio-Button darstellt eine absolute Position geben.
Damit wir den Button aber trotz absoluter Positionierung neben unserem Text, also relativ zum Label platzieren können, müssen wir dem Umgebenden Element
das Attribut **position: relative** zuweisen. Danach können wir den Button einfach, mit einem negativen **left** Wert, aus dem Label herausschieben.
Ausserdem können wir der Beschriftung noch eine etwas grössere **line-height** geben um dem Text etwas mehr platz zu lassen.

Hier der finale Code für den Radio-Button:

{% highlight html linenos %}
<!-- HTML -->

<label for="radio1" id="radio-btn-label">
  <input name="radio1" type="radio" id="radio1" style="display:none;">
  <span class="custom radio"></span> Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
</label>
{% endhighlight %}

{% highlight css linenos %}
/* CSS */

form.custom label#radio-btn-label
{
  position: relative;
  margin-left: 40px;
  line-height: 1.2em;
}

form.custom .custom.radio
{
  width: 25px;
  height: 25px;
  border-color: #93AB00;
  border-width: 2px;
  padding: 1px 0 0 2px;

  position: absolute;
  left: -40px;
  top: 0px;
}

form.custom .custom.radio.checked:before
{
  content: '\2717';
  font-size: 21px;
  background: none;
  color: #93AB00;
  line-height: 1;
}
{% endhighlight %}

Sowie das Ergebnis:

<div style="text-align: center">
  <img src="{{ site.url }}/assets/img/blog/custom_form_5.png" style="width: auto; padding-bottom: 20px;"/>
</div>

Und schon können wir einen von uns selbst gestalteten Radio-Button bewundern der auch noch eine sauber formatierte Beschriftung bietet.

Ich hoffe ich konnte euch mit dieser kleinen Anleitung davon überzeugen wie einfach es ist mit Foundation eigene Formular Elemente zu gestalten, und wünsche euch viel Spass und Erfolg damit.


