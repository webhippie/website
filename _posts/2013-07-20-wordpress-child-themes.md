---
layout: post
title: Wordpress Child-Themes
author: Armin Boß
categories: [wordpress, webdev]
tags: [wordpress, themes, webdev, blogging]
---

Child Themes in Wordpress sind ein sauberer Weg um Themes zu entwickeln die auf bereits vorhandenen Themes aufbauen.
Ein Vorteil von Child Themes ist das man nicht alle Änderungen erneut vornehmen muss wenn einmal Updates zum Eltern-Theme herausgebracht werden.

Um ein Child-Theme zu erstellen ist nichts weiter notwendig als ein neues Verzeichnis, sowie eine neue Datei anzulegen.
Das Verzeichnis muss in **/wp-content/themes/** liegen und kann theoretisch jeden beliebigen Namen tragen. Zur Verständlichkeit empfiehlt es sich jedoch den Namen des Themes das als Basis benutzt wird im Ordnernamen zu verwenden, z.B. nach dem Aufbau "\[Eltern Theme\]-child".
Innerhalb des child Verzeichnisses muss noch eine Datei **style.css** angelegt werden die neben den css Regeln auch noch einige Informationen über das Theme enthält.

Möchte man beispielsweise ein Child Theme vom Wordpress Standardtheme twentyeleven erstellen legt man zuerst den Ordner **/wp-content/themes/twentyeleven-child** an, und innerhalb davon eine Datei names **style.css** mit folgendem Inhalt:

	/*
		Theme Name: Mein neuer Theme Name
		Theme URI: http://url.zu.einer.seite.über.mein.theme
 		Description: Ein Theme das es mal mit Gemütlichkeit probiert.
 		Author: Mein Name (wenn möglich wordpress.org username)
 		Author URI: http://url.zu.meiner.webseite
 		Template: twentyeleven
 		Version: 0.1
	*/

Die wichtigste Information ist "Template:", die festlegt vom welchem Theme das Child-Theme abgeleitet werden soll. Alle anderen Informationen werden im Wordpress-Backend Theme auswahl Dialog angezeigt.
Ausserdem sollte man noch die Zeile 

	@import url("../twentyeleven/style.css");

gleich nach dem Kommentarblock einbinden. Sie bewirkt das alle CSS-Regeln aus der style.css Datei des Eltern Themes mit eingebunden werden.

Um das Eltern-Theme nun zu ändern legt man einfach neue Dateien im Child Verzeichnis an. Wenn ein Dateiname bereits im Ordner des Eltern-Themes vorkommt wird die Datei komplett ersetzt, mit ausnahme der functions.php.
Die Datei functions.php des Child-Themes wird immer direkt **vor** der functions.php des Eltern-Themes ausgeführt.
Bei den meisten Themes kann man trotzdem Funktionen überschreiben weil sie eine

{% highlight php %}
	if ( ! function_exists( 'funktionsname' ) )
{% endhighlight %}

Kondition benutzen.

Und das ist auch schon so ziemlich alles was es zu wissen gibt.
So einfach ist es Child-Themes zu erstellen. 
