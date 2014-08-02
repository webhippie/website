---
layout: post
title: Tutorial - Instant Backend mit Hoodie
author: Sebastian
categories: [hoodie, javascript, backend]
tags: [hoodie, javascript, backend, jquery, node, couchdb]
excerpt: Are you looking for a tool that helps you avoid implementing those ever same features when creating a backend for a web application? [Hoodie](http://hood.ie/) might just be the right solution for you. It’s a premade backend with all the features that most web apps need, like user management, sessions, data storage per user and shared data. In this tutorial we show you how you can easily cook up an instant backend with hoodie. We will build a little note taking application with user management and user data storage.
---

Auf der Suche nach einem Werkzeug mit dem man das Implementieren der immer gleichen Backend-Features einer web Applikation vermeiden kann?

[Hoodie](http://hood.ie/) könnte die richtige Lösung sein. Ein vorgefertigtes Backend mit all den Features die die meisten Web Apps brauchen. Wie z.B. User-Management, Sessions, Datenhaltung per User, etc.

In diesem Tutorial zeigen wir wie einfach man sich mit Hoodie ein fertiges backend kochen kann, indem wir eine kleine Notizen-Anwendung inklusive Benutzer Verwaltung und Datenhaltung bauen.

###1. Das Backend

Hoodie’s Abhänigkeiten sind *git*, *nodejs* and *couchdb*. Wenn wir diese bereit haben, können wir hoodie installieren. Dies ist so einfach, wie es nur sein könnte. Wir benutzen dazu den berühmten *note package manager* (npm).


{% highlight bash %}
$ npm install -g hoodie-cli
{% endhighlight %}

Nun erstellen wir ein neues Projekt mit dem frisch installierten hoodie CLI:

{% highlight bash %}
$ hoodie new MyNotesApp
{% endhighlight %}

So, rein in den Ordner und hoodie starten.

{% highlight bash %}
$ cd MyNotesApp
$ hoodie start
{% endhighlight %}

Fertig mit unserem Backend? Klar! Mehr muss für die meisten Apps nicht getan werden. Hoodie bringt den Rest von Haus aus mit, bzw. wer mehr möchte installiert sich schlicht ein Plugin-in.


###2. Das Markup

Nun sind wir bereit im Frontend die uns von hoodie bereit gestellten Features zu nutzen. 

Es wird sich nun nicht groß um stylisches Markup gekümmert, da es sich hier um um hoodie drehen soll. 


####index.html
{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <script src="jquery.js"></script>
    <script src="/_api/_files/hoodie.js"></script>
    <script src="myNoteApp.js"></script>
  </head>
  <body>
    <input type="text" id="email_input"/>
    <input type="password" id="password_input"/>
    
    <button onclick="signUp()">sign up</button>
    <button onclick="signIn()">sign in</button>
    <button onclick="signOut()">sign out</button>

    <div id="note-list"></div>        
  </body>
</html>
{% endhighlight %}

###3. Das Usermanagement

Zunächst wird mit einer Zeile js eine neue Hoodie Instanz erzeugt.

####scripts/myNoteApp.js

{% highlight javascript %}
var hoodie = new Hoodie();
{% endhighlight %}

Ok, die User sollen sich auf unserer App registrieren und einloggen können. Dafür brauchen wir einen Namen und ein Passwort des neuen Users, die wir hoodies account.signUp() bzw. account.signIn() Funktionen übergeben können. Also schreiben wir eine signUp() und eine signIn() Funktion, die dies erledigt.

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

Wir hängen .fail() und .done() an die hoodie function an um via Callbacks zum richtigen Zeitpunkt Rückmeldung geben können. Zudem wollen wir dem User gestatten sich wieder aus zu loggen, daher einer signOut() Funktion.

{% highlight javascript %}
function signIn() {
  var name = $('#email_input').val();
  var password = $('#password_input').val();

  hoodie.account.signIn(name, password).fail(function(err){
    console.log(err.message);
  }).done(function(){
    updateNoteList();
  });
}

function signUp() {
  var name = $('#email_input').val();
  var password = $('#password_input').val();

  hoodie.account.signUp(name, password).fail(function(err){
    console.log(err.message);
  }).done(function(){
    updateNoteList();
  });
}

function signOut() {
  hoodie.account.signOut();
}

{% endhighlight %}


###4. Die Store Funktionen
Dem aufmerksamen Leser dürfte aufgefallen sein, dass im .done() eine updateNoteList() Funtion aufgerufen wird.

Da sich nun eingeloggt werden kann, kommen wir zu unserer Notizenliste. Wie können wir denn, nun hoodies couchdb mit daten füttern? - Wir schreiben eine storeNote Funtion(). Die hoodie.store.add() Funktion benötigt einen *type* und *attributes*. Der type beschreibt die Art des zu speichernden Objekts. In attributes können via key, value Paar dem Objekt jene Dinge zuordnen, welche unserer Meinung nach zu Type gehören. Auf unser Beispiel bezogen bedeutet dies: Wir übergeben übergeben hoodie ein Objekt mit dem type=”note” und als attributes={text = des Users input text}.

{% highlight javascript %}
function storeNote() {
  var type = 'note';
  var attributes = {text: $('#text_input').val()};

  hoodie.store.add(type, attributes).done(function(){
    updateNoteList();
  });
}
{% endhighlight %}

Um dem User nun seine/ ihre Notitzen  an zu zeigen brauchen wir die updateNoteList() Funktion, die oben breits mehrmals in .done aufgerufen wird. Dies geschieht indem wir uns alle Objekte von hoodie holen, die den type “note” haben und jene in einer globalen Variable currentNotes speichern. Nun gehen wir mit einer forEach Schleife durch den currentNotes Array und übergeben dem View via jquery eine Liste an den aktuellen Notizen.

{% highlight javascript %}
function updateNoteList() {
  hoodie.store.findAll('note').done(function(notes){
    currentNotes = notes;
  });

  var html = '<input type="text", id="text_input">' + '<button onclick="storeNote()"> save </button>' + '<ul>';
  currentNotes.forEach(function(note){
    html += '<li>' + note.text + '</li>';
  });
  html += '</ul>';

  $('#note-list').html(html);
}

{% endhighlight %}

Zuletzt sagen wir unserer signOut() Funktion noch, dass sie den View klären soll, wenn der User sich ausloggt und fertig ist unsere kleine hoodie Notizen Application.

{% highlight javascript %}
function signOut() {
  hoodie.account.signOut().done(function(){
    $('#note-list').html('');
  });
}
{% endhighlight %}
