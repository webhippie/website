---
layout: post
title: Mailman mit GMail
author: Danyel Bayraktar
categories: [mailman, gmail]
tags: [mailman, gmail, ruby, gems, imap]
---

Um Mailman mit GMail aufsetzen zu können, muss man einige Tricks verwenden.  
Anfangs hat es nicht so geklappt, wie es sollte, darum habe ich mich entschieden, diesen Post zu verfassen.

Das Standard Prozedere werde ich erst verfassen,
wenn ihr direkt zum GMail-Teil springen wollt, scrollt runter.

# Mailman aufsetzen
*Mailman* läuft standardmäßig in einem **eigenen Prozess**,
die Datei sollte deshalb ein ausführbares Skript sein,
das mit einem Shebang beginnt.
Wenn man *Mailman* **parallel** zu einer **Rails-Umgebung** laufen lassen will,
um Zugang zu *ActiveRecord* etc. zu haben, dann kann man das tun,
man braucht jedoch zwei zusätzliche **require** Anweisungen.  
So würde beispielsweise unsere Datei aussehen,
wenn wir eine Nachricht von der **Standardeingabe** lesen
und an die Standardausgabe feuern wolltet:

{% highlight ruby linenos %}
#!/usr/bin/env ruby

require 'rubygems'
require 'bundler/setup'
require 'mailman'

Mailman::Application.run do
  default do
    puts "I have received a message from #{message[:from].display_names.first}!"
    puts "Subject: #{message.subject}"
    puts "**************************"
    puts message.body.decoded
    puts "**************************"
  end
end
{% endhighlight %}

*Zeilen 3-4* sind nur notwendig, wenn man das Skript von einem Rails-Verzeichnis aufruft.

Zu *Zeile 8* können wir sogenannte Routen definieren,
die alle verschiedenen Formen annehmen können.
Meistens werden dort je nach Absender oder Betreff verschiedene Aktionen unternommen.
Für genauere Informationen lest
[hier](https://github.com/titanous/mailman/blob/master/USER_GUIDE.md#routes) nach.

Zu *Zeile 9* haben wir Zugriff auf das **message** Objekt,
dies ist eine Instanz der <code style="display: inline;">Mail::Message</code>-Klasse,
eine ausführliche Dokumentation findet ihr [hier](http://rdoc.info/github/mikel/mail/Mail/Message).

# Mailman mit GMail aufsetzen

Um *Mailman* mit *GMail* zu nutzen, müssen wir zunächst *Mailman* sagen,
von welchem Postfach er pollen soll. Ich benutze als Protokoll
**IMAP**, da es flexibler ist. Ihr könnt natürlich auch **POP3** verwenden,
*GMail* unterscheidet bei den Ports, soweit ich weiß, nicht.

Auf jeden Fall können wir das in Mailman folgendermaßen konfigurieren:

{% highlight ruby %}
Mailman.config.imap = {
  username: 'username@gmail.com',
  password: 'geheimes_passwort',
  server: 'imap.gmail.com',
  port: 993,
  ssl: true,
  # filter: 'SEEN'
  # done_flags: [Net::IMAP::DELETED]
}
{% endhighlight %}

Für zusätzliche Optionen könnt ihr 
[hier](https://github.com/titanous/mailman/blob/master/lib/mailman/receiver/imap.rb) nachschauen,
was ich jedoch noch anmerken will, ist: Um den Nachrichtenempfang zu debuggen,
kann es verdrießlich sein, ständig neue E-Mails zu senden.
Deshalb kann es manchmal nützlich sein, die *filter*-Option auf *'SEEN'* zu setzen,
wie auskommentiert gezeigt. Bei sehr vielen gelesenen Mails kann das aber schnell nervig werden.
Um Nachrichten beim Empfang zu löschen, muss das IMAP-Flag gesetzt werden (erneut, wie auskommentiert gezeigt).

## Nachricht von GMail holen

Jetzt kommen wir zum eigentlichen Teil:  
Eine Nachricht von *GMail* kommt in mehreren Teilen:
Standardmäßig mit Content-type *text/plain* und *text/html*,
um hier die richtige rauszusuchen (bei uns: *text/plain*),
machen wir folgendes:

{% highlight ruby %}
msg = message.body.parts.find{|m| m.content_type.start_with? "text/plain" }
{% endhighlight %}

Das Problem ist jetzt noch,
dass der **decoded** body von *Mail* nicht richtig encoded wird.
Mit zwei Zeilen ist das aber auch getan:

{% highlight ruby %}
body = msg.body.decoded
body.force_encoding(msg.charset)
{% endhighlight %}

Am Ende sieht unser Programm also ungefähr so aus:

{% highlight ruby linenos %}
#!/usr/bin/env ruby

# require "rubygems" # nur zu Rails
# require "bundler/setup" # nur zu Rails
require 'mailman'

Mailman.config.rails_root = nil # default: "."

Mailman.config.imap = {
  username: 'superman@gmail.com',
  password: 'clark kent',
  server: 'imap.gmail.com',
  port: 993,
  ssl: true,
}

Mailman::Application.run do
  default do
    msg = message.body.parts.find{|m| m.content_type.start_with? "text/plain" }
    body = msg.body.decoded
    body.force_encoding(msg.charset)

    # body können wir nun nach Lust und Laune verwenden.
    # Zu Rails können wir beispielsweise sowas machen:
    # Message.create! from: message.from, subject: message.subject, body: body
  end
end
{% endhighlight %}

Ich hoffe, dieser Post war hilfreich. Bei Fragen wendet euch an [mich](mailto:danyel@webhippie.de)

Liebe Grüße,  
Danyel.
