---
layout: post
title: Tutorial - Instant Backend mit Hoodie
author: Sebastian
categories: [hoodie, javascript, backend]
tags: [hoodie, javascript, backend, jquery, node, couchdb]
excerpt: Auf der Suche nach einem Werkzeug mit dem man das Implementieren der immer gleichen Backend-Features einer Web-Applikation vereinfachen kann? [Hoodie](http://hood.ie/) könnte die richtige Lösung sein. Ein fertiges Backend mit all den Features die beinahe jede Web Applikation braucht. Wie z.B. User-Management, Sessions, Datenhaltung per User, etc.
---

Auf der Suche nach einem Werkzeug mit dem man das Implementieren der immer gleichen Backend-Features einer Web-Applikation vereinfachen kann?

[Hoodie](http://hood.ie/) könnte die richtige Lösung sein. Ein fertiges Backend mit all den Features die beinahe jede Web Applikation braucht. Wie z.B. User-Management, Sessions, Datenhaltung per User, etc.

In diesem Tutorial zeigen wir wie einfach man sich mit Hoodie ein Instant-Backend zusammenstecken kann, indem wir eine kleine Notizen-Anwendung inklusive Benutzerverwaltung und Datenhaltung bauen.
  
1\. Backend
-----------

Hoodie’s Abhänigkeiten sind **git**, **nodejs** and **couchdb**. Sobald wir diese bereit haben lässt sich Hoodie einfach als NPM Packet installieren.

{% highlight bash %}
$ npm install -g hoodie-cli
{% endhighlight %}

Nun erstellen wir ein neues Projekt mit dem frisch installierten Hoodie CLI:

{% highlight bash %}
$ hoodie new MyNotesApp
{% endhighlight %}

Anschliessend starten wir den Hoodie Server mit:

{% highlight bash %}
$ cd MyNotesApp
$ hoodie start
{% endhighlight %}

Das ist bereits alles was nötig ist um Hoodie als Backend nutzen zu können. 

2\. Client
----------

Hoodie serviert alle Dateien die im Unterordner **www** liegen direkt auf den entsprechenden Konfigurierten Port (Standardmässig 6001).
Beim initialisieren eines neuen Projektes wird automatisch eine kleine Demo Applikation erzeugt die sehr hilfreich ist um grundlegende Einblicke in Hoodies Funktionsweise zu bekommen. Wir möchten den **www** Ordner allerdings allein für unsere Notizen-App benutzen und löschen deshalb die Demo App

{% highlight bash %}
rm -rf www/*
{% endhighlight %}

Nun sind wir bereit Hoodies Funktionen auf der Clientseite in unserem eigenen kleinen Test-Frontend zu verwenden. 

Zuerst legen wir eine **index.html** an:

###index.html
{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
    <script src="/_api/_files/hoodie.js"></script>
    <script src="assets/js/myNoteApp.js"></script>
  </head>
  <body>
    <input type="text" id="email_input"/>
    <input type="password" id="password_input"/>
    
    <button onclick="signUp()">sign up</button>
    <button onclick="signIn()">sign in</button>
    <button onclick="signOut()">sign out</button>

    <div id="input-area"></div>
    <div id="note-list"></div>        
  </body>
</html>
{% endhighlight %}

Man beachte dass Hoodie die Frontend Javascript Library bereits selbst serviert. Zusätzlich binden wir noch jQuery ein, sowie **assets/js/myNoteApp.js** welche wir gleich im nächsten Schritt mit der Frontend Logik füllen werden.

3\. Usermanagement
------------------

Zunächst erzeugen wir mit einer Zeile Javascript eine neue Hoodie Instanz.

###assets/js/myNoteApp.js

{% highlight javascript %}
var hoodie = new Hoodie();
{% endhighlight %}

Auf unserer App sollen sich Benutzer mit Namen und Passwort registrieren und einloggen können, diese übergeben wir Hoodies **account.signUp()** bzw. **account.signIn()** Methoden, was in unserem Fall die beiden Funktionen **signUp** und **signIn** erledigen werden.

{% highlight javascript %}
function signUp() {
  var name = $('#email_input').val();
  var password = $('#password_input').val();

  hoodie.account.signUp(name, password);
}

function signIn() {
  var name = $('#email_input').val();
  var password = $('#password_input').val();

  hoodie.account.signIn(name, password);
}
{% endhighlight %}

Hoodie bietet uns die Möglichkeit an beinahe alle Aktionen Success- und Fail-Callbacks übergeben zu können, die jeweils ausgeführt werden sobald der entsprechende Aufruf erfolgreich oder erfolglos beendet wurde.

Callbacks können bei den meisten Aktionen mit den Funktionen **.fail()** und **.done()** gesetzt werden. Zudem wollen wir dem User gestatten sich wieder aus zu loggen, dafür benötigen wir eine weitere Funktion **signOut**.

Hier noch einmal derselbe Code mit den entsprechenden Callbacks.

{% highlight javascript %}
function signIn() {
  var name = $('#email_input').val();
  var password = $('#password_input').val();

  hoodie.account.signIn(name, password).fail(function(err) {
    console.log(err.message);
  }).done(function() {
    updateNoteList();
  });
}

function signUp() {
  var name = $('#email_input').val();
  var password = $('#password_input').val();

  hoodie.account.signUp(name, password).fail(function(err) {
    console.log(err.message);
  }).done(function() {
    updateNoteList();
  });
}

function signOut() {
  hoodie.account.signOut().done(function() {
    updateNoteList();
  });
}
{% endhighlight %}


In den jeweiligen **.done()** Callbacks rufen wir die Funktion **updateNoteList** auf die dafür zuständig ist unsere angezeigte Notizen Liste zu erneuern sobald sie sich ändert, oder wie in diesem Fall, sichtbar oder unsichtbar wird wenn sich ein User ein- oder ausloggt.

Wir müssen ausserdem darauf achten **updateNoteList** auch beim Laden der Seite aufzurufen, da der Benutzer bereits vom letzten Seitenbesuch noch eingeloggt sein könnte.

{% highlight javascript %}
$(document).ready(function() {
  updateNoteList();
});
{% endhighlight %}

4\. Store Funktionen
--------------------

Hoodie benutzt CouchDB um Benutzer bezogene Daten zu speichern, auf welche wir mit den Funktionen des Moduls **hoodie.store** zugreifen können.

Wir legen eine **storeNote** Funktion an, welche **hoodie.store.add()** benutzt um eine neue Notiz für den momentan eingeloggten Benutzer abzulegen. 
**hoodie.store.add()** benötigt die Parameter **type** und **attributes**, wobei **type** einen Identifier für die Art des zu speichernden Objekts beschreibt, und man für **attributes** ein Objekt übergibt welches all seine Eigenschaften enthält. Auf unser Beispiel bezogen bedeutet dies: Wir übergeben hoodie den **type** 'note', und als **attributes** einen vom Benutzer eingegebenen Text der als Notiz gespeichert werden soll.

{% highlight javascript %}
function storeNote() {
  var type = 'note';
  var attributes = {text: $('#text_input').val()};

  hoodie.store.add(type, attributes).done(function(){
    updateNoteList();
  });
}
{% endhighlight %}

Sobald das hinzufügen abgeschlossen ist rufen wir **updateNoteList** auf um die neue Notiz anzuzeigen.

Dies geschieht indem wir uns mit der Funktion **hoodie.store.findAll()** alle Objekte des eingeloggten Benutzers holen, die den Type “note” haben und daraus das HTML für die Notizen Liste zusammenbauen.

{% highlight javascript %}
function updateNoteList() {
  hoodie.store.findAll('note').done(function(notes) {

    var html = '<ul>';
    notes.forEach(function(note) {
      html += '<li>' + note.text + '</li>';
    });
    html += '</ul>';

    $('#note-list').html(html);
  });

  // Display / Hide Input Area
  var html = hoodie.account.username ? "<input type='text' id='text-input'><button onclick='storeNote()'>save</button>" : '';
  $("#input-area").html(html);
}
{% endhighlight %}

Zusätzlich wird das Eingabefeld für neue Notizen angezeigt oder versteckt je nachdem ob der Benutzer eingeloggt ist oder nicht.

5\. Profit
----------

Gehen wir nun auf **http://localhost:6001" können wir eine kleine Webanwendung mit User-Management bewundern für deren Backend wir keinen Finger krumm machen mussten.

<div style="text-align: center">
  <img src="{{ site.url }}/assets/img/blog/hoodie_notes_demo.png" style="width: auto; padding-bottom: 20px;"/>
</div>

Unserer Meinung nach ist Hoodie definit ein nützliches Werkzeug auf das es Wert ist aufmerksam zu machen. Auch Features wie Offline-First Fähigkeit und Shared Storage die Hoodie für die Zukunft angekündigt hat klingen äusserst vielversprechend. Man darf gespannt sein was [Hoodie](http://hood.ie/) noch alles vorzeigt!