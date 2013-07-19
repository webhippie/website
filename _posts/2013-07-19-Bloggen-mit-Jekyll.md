---
layout: post
title: Bloggen mit Jekyll
author: Armin
categories: [jekyll, markdown]
tags: [jekyll, website, startup, markdown, blogging, blog, example]
excerpt: Um mit Jekyll einen neuen Blogpost zu beginnen legt man zuerst eine neue Datei im Verzeichnis *\_posts* an. Der Dateiname muss hierbei bereits das Datum und den Titel des Posts beinhalten ...
---


Grundsätzliches
===============

Um mit Jekyll einen neuen Blogpost zu beginnen legt man zuerst eine neue Datei im Verzeichnis *\_posts* an.
Der Dateiname muss hierbei bereits das Datum und den Titel des Posts beinhalten:

	YEAR-MONTH-DAY-title.MARKUP

So hat dieser Post z.B. folgenden Dateinamen:

	2013-07-19-Bloggen-mit-Jekyll.md

Die Endung .md steht für die Sprache Markdown welche sehr leicht zu erlernen ist und von Jekyll standardmässig unterstützt wird. Es ist allerdings auch möglich normale HTML dateien zu benutzen. 
Aus dem Dateinamen wird später der Permalink zum Blogpost generiert, also zum Beispiel **http://webhippie.de/blog/Bloggen-mit-Jekyll/**

Zu beginn der neu angelegten Datei steht immer ein [YAML Front Matter](http://jekyllrb.com/docs/frontmatter/) Block der einige Notwendige Informationen und Einstellungen für den Post festlegt.
Für diesen Post sieht er beispielsweise so aus:

	---
	layout: post
	title: Bloggen mit Jekyll
	author: Armin Boß
	categories: [jekyll, markdown]
	tags: [jekyll, website, markdown, blogging, blog, example]
	---

* **layout:** legt fest welches Layout benutzt werden soll um den Post anzuzeigen. Im Falle unseres Webhippie Blogs benutzen wir immer das Layout *post*. 
* **title:** bezeichnet den Titel des Blogposts der angezeigt wird. (Der Wert der hier angegeben wird hat keinen Einfluss auf den Permalink!)
* **author:** der Name des Authors.
* **categories:** Liste von Kategorien denen der Post zugeordnet wird (wird momentan noch nicht benutzt). Listenelemente müssen mit komma getrennt werden und in eckigen Klammern stehen.
* **tags:** Liste von Tags denen der Post zugeordnet wird. Blogposts können auf diese weise nach Themen sortiert werden.

Es gibt noch ein weiteres wichtiges Attribut, und zwar "excerpt".  
Jekyll erstellt Automatisch die variable *page.excerpt* die benutzt wird um einen kurzen Auszug des Posts in Postlisten auszugeben.
Dafür nimmt es standardmässig den ersten Textabschnitt her, ganz egal was das auch sein mag. Es kann der erste Paragraph des Posts sein, aber auch nur eine Überschrift, oder eine Liste.
Je nach dem was als erstes im Post steht kann das Ergebnis also mal gut und mal miserabel sein. Für den Fall das letzteres zutrifft gibt es das *excerpt* Attribut, mit dem man den Auszug der benutzt werden soll fest vorgeben kann.

	excerpt: Um mit Jekyll einen neuen Blogpost zu beginnen legt man zuerst eine neue Datei im Verzeichnis *\_posts* an. Der Dateiname muss hierbei bereits das Datum und den Titel des Posts beinhalten ...

Schreiben mit Markdown
======================

Markdown ist eine Auszeichnungssprache die in HTML umgewandelt wird, und sowohl leicht zu lesen als auch leicht zu schreiben ist.
Eine komplette Auflistung aller Syntax Elemente findet sich [hier](http://daringfireball.net/projects/markdown/syntax), einige wichtige möchte ich aber hier direkt vorstellen.

#### Paragraphen

Ein Paragraph ist schlicht und einfach ein oder mehrere Zeilen Text die von einer oder mehreren leeren Zeilen getrennt werden.   
Ein Zeilenumbruch wird dabei nicht in ein &lt;br/&gt; tag übersetzt. Möchte man einen Zeilenumbruch am Ende einer Zeile verwendet, beendet man sie stattdessen mit einem doppelten Leerzeichen und drückt dann Return.
Ausserdem sollten Paragraphen nicht mit Tabs oder Leerzeichen begonnen werden, da diese unter Umständen eigene Bedeutungen haben können.

#### Überschriften

Für Überschriften beginnt man eine Zeile mit einer Anzahl an Hashes die ihrem Level entspricht:

	# Überschrift h1
	## Überschrift h2
	### Überschrift h3
	#### Überschrift h4
	##### Überschrift h5
	###### Überschrift h6

Um die Lesbarkeit des Markdown-Codes zu erhöhen kann man wahlweise die ersten beiden Levels (h1 und h2) auch mit = oder - Zeichen unterstreichen: 

	Überschrift h1
	==============

	Überschrift h2
	--------------

#### Links

Links können in Markdown mit folgender Syntax platziert werden:

	[Ein Beispiel](http://example.com/ "Titel")

In eckigen Klammern steht der Text der verlinkt werden soll, und in runden Klammern direkt dahinter die URL auf die verwiesen werden soll. Optional kann auch noch ein Link-Titel mit angegeben werden, der z.B. als Tooltip sichtbar wird wenn man mit der Maus über den Link fährt.
Markdown unterstützt aber auch noch eine einfachere Syntax:

	<http://example.com>

Eine URL in spitzen Klammern wird von Markdown in folgendes umgewandelt:

	<a href="http://example.com/">http://example.com/</a>

#### Betonung

Auf folgende Weise kann Text **fett** oder *kursiv* dargestellt werden:

	**Fetter Text**
	__Fetter Text__

	*Kursiver Text*
	_Kursiver Text_

\* und \_ Zeichen sind in diesem Fall austauschbar.

#### Listen

Listen können einfach angelegt werden in dem man eine Zeile mit einem \*, \- oder \+ beginnt.  
Für nummerierte Listen beginnt man die Zeile stattdessen mit einer Zahl.

	* Äpfel
	* Käsechips
	* Dschungelbuch DVD

	1. MongoDB
	2. AngularJS
	3. NodeJS

#### Gefärbter Quelltext

In Jekyll hat man standardmässig die Code-coloring Engine PyGments zur verfügung, welche mit Liquid-Tags eingesetzt werden kann.
Ein Code-Block beginnt mit

<code>&#123;% highlight &lt;sprache&gt; [linenos] %&#125;</code>
und endet mit

<code>&#123;% endhighlight %&#125;</code>

Anstelle von &lt;sprache&gt; wird eine der von PyGments unterstützten [Sprachen](http://pygments.org/languages/) eingesetzt, und optional der Parameter *linenos* angegeben, der dafür sorgt das neben dem Code Zeilennummern angezeigt werden.
Folgender Code:

<code>&#123;% highlight ruby linenos %&#125;
def show
  @widget = Widget(params[:id])
  respond_to do |format|
	format.html # show.html.erb 
	format.json { render json: @widget }
  end
end
&#123;% endhighlight %&#125;</code>

wird also zum Beispiel so ausgegeben:

{% highlight ruby linenos %}
def show
  @widget = Widget(params[:id])
  respond_to do |format|
	format.html # show.html.erb 
	format.json { render json: @widget }
  end
end
{% endhighlight %}

#### HTML

Wenn alle Stricke reissen (und das passiert hin und wieder!) kann man in Markdown jederzeit HTML code verwenden.
HTML muss nicht speziell eingeleitet werden, und kann deswegen z.B. auch direkt in den Textfluss integriert werden.

- - -

Damit solltet ihr die wichtigsten Bausteine haben um spitzenmässige Blogposts mit Jekyll schreiben zu können. Ausserdem verweise ich hier noch einmal auf die [komplette Markdown Syntax](http://daringfireball.net/projects/markdown/syntax) in der noch einige andere nützliche Elemente zu finden sind.    


Ich wünsche extrem hartes Bloggen!
