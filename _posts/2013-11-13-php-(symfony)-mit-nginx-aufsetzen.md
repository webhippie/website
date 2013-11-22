---
layout: post
title: PHP (Symfony) mit nginx/FastCGI aufsetzen.
author: Danyel Bayraktar
categories: []
tags: [nginx, php, symfony, fastcgi, fpm, php-fpm]
---

In diesem Blog Post will ich beschreiben, wie man einen nginx Server zum Laufen bringt und PHP mit FastCGI betreibt,
um so die Rechte korrekt zu verwalten und schlussendlich ein kleines Symfony App zu erstellen,
in welchem ein kleines Plugin (Timestampable) eingebunden werden soll.

Ich werde den Artikel so gestalten, dass man mit einem *neu aufgesetzten* System zum Ziel kommt.

# nginx aufsetzen
Um **nginx** aufzusetzen, müssen wir uns vorerst die Quelle holen,
wie auf der [Webseite](http://wiki.nginx.org/Install) beschrieben wird:

{% highlight bash linenos %}
'sudo' -s
nginx=stable # use nginx=development for latest development version
add-apt-repository ppa:nginx/$nginx
apt-get update 
apt-get install nginx
{% endhighlight %}

# Starte den nginx Service.
service nginx start

Wenn wir nun [http://localhost](http://localhost) besuchen,
müssten wir eine Bestätigung von nginx erhalten, dass es geklappt hat.

# Symfony Projekt erstellen.

Ein Symfony Projekt erstellen wir am besten wie auf der [Webseite](http://symfony.com/download) beschrieben. 
## Vorbedingungen
Um das Projekt richtig zum Laufen zu bringen, sollten wir zuerst folgende Pakete installieren:

`sudo apt-get install curl php5 php5-cli php5-json`
<code style="display: inline;">curl</code> benötigen wir, um composer zu installieren (und ist ohnehin ein sehr nützliches Programm).  
<code style="display: inline;">php5</code> ist zurzeit die neueste Version von PHP und ohne PHP läuft auch kein Symfony.  
<code style="display: inline;">php5-cli</code> ist für den Kommandozeilenbefehl <code style="display: inline;">php</code> zuständig.  
<code style="display: inline;">php5-json</code> ist nötig, um JSON für PHP zugängig zu machen. JSON ist ein cooles Format,
das komplexe Datenstrukturen maschinenlesbar beinhalten kann und somit universell verwendet werden können.
Hier benötigen wir es, weil wir [Composer](http://getcomposer.org/download/) verwenden werden!

Wir benötigen also noch [Composer](http://getcomposer.org/download/):
Dies kann einfach mit dem Befehl <code style="display: inline;">curl -sS https://getcomposer.org/installer | php</code> heruntergeladen werden.  
Die Datei <code style="display: inline;">composer.phar</code> wird im momentanen Verzeichnis (bsp. **~**) gespeichert.

## Projekt erstellen
Wir sind fast soweit. Das Symfony Projekt ist sogut wie erstellt. Wir benötigen nur noch diesen Befehl:

`php composer.phar create-project symfony/framework-standard-edition MySymfonyProject`

Den Namen *MySymfonyProject* können wir natürlich anpassen.
Ich werde jedoch einfachheitshalber davon ausgehen, dass das Projekt so benannt wurde.

# nginx mit unserem Projekt verheiraten
Dieser Schritt ist wohl der größte, daher teile ich ihn in kleine Schritte auf:

## PHP-FPM (FastCGI) aufsetzen.
Der Hauptserver läuft unter dem Benutzer <code style="display: inline;">www-data</code> und deshalb müssten wir unsere
Dateien in unserem Projekt alle diesem Benutzer *schenken*, damit er Zugriff drauf hat.
Oder die Zugriffsrechte so ändern, dass **jeder** darauf zugreifen kann. Aber das will man natürlich nicht!
Für so etwas kommt FastCGI wie gerufen: Der Server gibt die Anfrage weiter an einen Prozess,
der mit **deinen** Rechten läuft und somit auf all deine Dateien Zugriff hat. Zusätzlich bedeutet das,
dass irgendwelche geglückten Software-Attacken keine globalen Auswirkungen haben können.

Um es aufzusetzen, müssen wir das Paket <code style="display: inline;">php5-fpm</code> installieren via <code style="display: inline;">sudo apt-get install php5-fpm</code>  
Danach gehen wir in das Verzeichnis <code style="display: inline;">/etc/php5/fpm/pool.d</code> und erstellen unsere Konfigurationsdatei:  
<code style="display: inline;">sudo cp {www,$USER}.conf</code>  
Die entstandene Datei bearbeiten wir nun so, dass wir einen Socket unter unserem Namen freigeben,
der dann von nginx verwendet wird, um alle Anfragen zu steuern.  
Die Zeilen  
{% highlight ini %}
[www]
user = www-data
group = www-data
listen = /var/run/php5-fpm.sock
{% endhighlight %}
ersetzen wir durch unseren Namen (in diesem Beispiel **danyel**)
{% highlight ini %}
[danyel]
user = danyel
group = danyel
listen = /var/run/php5-fpm.danyel.sock
{% endhighlight %}

Jetzt müssen wir nur noch den <code style="display: inline;">php5-fpm</code> starten: <code style="display: inline;">sudo service php5-fpm start</code> oder <code style="display: inline;">restart</code> falls er schon läuft.

Alle Anfragen, die nun über diesen angegeben Socket gehen, laufen mit unseren Rechten.
Das wird im nächsten Schritt ziemlich interessant!

## nginx auf unser Projekt verweisen lassen.

Zu allererst erstellen wir eine Verknüpfung vom *Webverzeichnis* unseres Projekts in den Ordner <code style="display: inline;">/var/www</code> (optional, aber sinnvoll):
{% highlight bash %}
sudo mkdir /var/www
sudo ln -s ~/MySymfonyProject/web /var/www/symfony
{% endhighlight %}

Wenn wir bei der Installation alles richtig gemacht haben,
müsste im Verzeichnis <code style="display: inline;">/etc/nginx/sites-available</code> eine Datei <code style="display: inline;">default</code> stehen.
Diese kopieren wir mit <code style="display: inline;">sudo cp default symfony</code>.
Wenn wir nun <code style="display: inline;">symfony</code> öffnen, suchen wir vorerst nach der Zeile  
{% highlight nginx %}
root /usr/share/nginx/html;
{% endhighlight %}
und ändern diese um in unsere Verknüpfung:  
{% highlight nginx %}
root /var/www/symfony;
{% endhighlight %}
Die Zeile darunter können wir auch gleich anpassen, um <code style="display: inline;">index.php</code> vorzuziehen:  
{% highlight nginx %}
index index.php index.html index.htm;
{% endhighlight %}

Jetzt müssen wir nur noch einstellen, dass er PHP automatisch erkennt:  
Nach  
<code class="nginx"><span class="k">location</span> <span class="s">/</span> <span class="p">{</span>
  <span class="kn">...</span>
<span class="p">}</span>
</code>

suchen und dahinter Folgendes einfügen:
{% highlight nginx %}
location ~ [^/]\.php(/|$) {
  fastcgi_split_path_info ^(.+?\.php)(/.*)$;
  if (!-f $document_root$fastcgi_script_name) {
    return 404;
  }
  fastcgi_pass unix:/var/run/php5-fpm.BENUTZERNAME.sock;
  fastcgi_index index.php;
  include fastcgi_params;
}
{% endhighlight %}
Den *BENUTZERNAMEN* anpassen nicht vergessen!

Nun müssen wir von dieser Datei eine Verknüpfung in <code style="display: inline;">sites-enabled</code> erstellen
und die Verknüpfung <code style="display: inline;">default</code> daraus löschen:
{% highlight bash %}
sudo cp /etc/nginx/{sites-available/symfony,sites-enabled}
sudo rm /etc/nginx/sites-enabled/default
{% endhighlight %}
Wenn wir nun mit <code style="display: inline;">service nginx restart</code> nginx neu starten. müsste alles geklappt haben!
Dies überprüfen wir, indem wir [config.php](http://localhost/config.php) besuchen.

Falls alles geklappt hat und ich nichts vergessen habe, müsste dort nun eine Seite von Symfony angezeigt werden!

Folgende Warnungen können auftreten:

* PDO Treiber: <code style="display: inline;">sudo apt-get install php5-mysql</code> hat bei mir den Fehler behoben.
* intl: <code style="display: inline;">sudo apt-get install php5-intl</code>
* timezone: In <code style="display: inline;">/etc/php5/{fpm,cli,cgi}/php.ini</code> die Zeile <code style="display: inline;">;date.timezone</code> mit <code style="display: inline;">date.timezone = Europe/Berlin</code> ersetzen.


# Extra: Timestampable einrichten.

Wir richten ein User-Model ein und wollen, dass es Timestamps **createdAt** und **updatedAt** innehat.
Diese sollen automatisch bei der Erstellung zugewiesen werden:  
Wir wechseln zuerst in unser Symfony Projekt, erstellen ein Bundle sowie die Entity:  
{% highlight bash %}
cd MySymfonyProject
app/console generate:bundle --namespace="WebHippie\Bundle" --dir="src" --bundle-name="MySymfonyBundle" --format="yml" --structure
app/console generate:doctrine:entity --entity=MySymfonyBundle:User --format=yml --fields="name:string(255) age:integer created_at:datetime updated_at:datetime"
{% endhighlight %}

## Timestampable als Abhängigkeit unserers Projekts festlegen

Wie wir nun **Timestampable** in unser Projekt eingliedern, wird z.B. [hier](https://github.com/stof/StofDoctrineExtensionsBundle/blob/master/Resources/doc/index.rst) beschrieben:

Doctrine-Extensions in **composer.json** erwähnen:
<code class="json"><span class="p">{</span>
  <span class="nt">"require"</span><span class="p">:</span> <span class="p">{</span>
    <span class="nt">"php"</span><span class="p">:</span> <span class="s2">"&gt;=5.3.2"</span><span class="p">,</span>
    <span class="c">/* ... */</span>
    <span class="nt">"stof/doctrine-extensions-bundle"</span><span class="p">:</span> <span class="s2">"~1.1@dev"</span>
  <span class="p">}</span>
<span class="p">}</span>
</code>

In **app/AppKernel.php** ebenfalls erwähnen:

{% highlight php %}
public function registerBundles()
{
    return array(
        // ...
        new Stof\DoctrineExtensionsBundle\StofDoctrineExtensionsBundle(),
        // ...
    );
}
{% endhighlight %}

Am Schluss von **app/config/config.yml** einfügen:
{% highlight yaml %}
stof_doctrine_extensions:
    orm:
        default:
            timestampable: true
{% endhighlight %}

Letztendlich mit <code style="display: inline;">php composer.phar update</code> die Abhängigkeiten festschreiben und man kann nun Timestampable verwenden!

## Timestampable unserer UserKlasse zuweisen:

Unsere <code style="display: inline;">src/WebHippie/Bundle/Resources/config/doctrine/User.orm.yml</code> sollte in etwa so aussehen:

{% highlight yaml linenos %}

WebHippie\Bundle\Entity\User:
    type: entity
    table: null
    fields:
        id:
            type: integer
            id: true
            generator:
                strategy: AUTO
        name:
            type: string
            length: '255'
        age:
            type: integer
        createdAt:
            column: created_at
            type: datetime
            gedmo:
                timestampable:
                    on: create
        updatedAt:
            column: updated_at
            type: datetime
            gedmo:
                timestampable:
                    on: update
    lifecycleCallbacks: {  }

{% endhighlight %}

Die Zeilen hinter den **gedmo**s müssen manuell eingefügt werden. Damit wird bei Änderung **updated_at** und bei Erstellung **created_at** überschrieben.

Ich hoffe, dieser Blog war hilfreich und hat einen kleinen Einblick in die FastCGI / nginx Welt gegeben,
welche ja die Schwerpunkte dieses Posts darstellen sollten. Bei Fragen schreibt mir eine E-Mail!
