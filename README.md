# Kanban
Programmierer: Simon Meili und Nicolas Kingsman

Programm-Anleitung:
Um dieses Programm zu verwenden, müsse man deno installieren, diese man via der Webseite verfolgen kann: https://deno.land/#installation
Um dieses Programm auszuführen, mus man unter dem Ordner "Kanban" in der Powershell "deno run --allow-read --allow-net api.js" eingeben.

GUI-Anleitung:
Per "+"-Button wird eine forms aufgerufen, wo man den Titel der Todo eingibt welches dann das Item erstellt.
Das Item enthält auch vier Buttons, welche sind:
    "Stift": Erlaubt die Möglihkeit, den Namen des Items zu ändern.
    "Mülleimer": Durch den Klick wird das Item gelöscht, achtung nicht wieder rückgängig.
    "Pfeil nach Links": Durch den Button wird das Item von der Tabelle nach rechts verschoben, ausser es befindet sich schon am Ende der linken Seite (die Reihenfolge der Items auf der Spalte wird sich auch verändern, diese nach Erstell-Zeit angeordnet sind)
    "Pfeil nach Rechts": Genau wir "Pfeil nach Links" nur dass diese nacch Rechts geht, ausser es ist am Ende der Rechten Seite.
Andere Funktionaliät besitzt das Item noch, dass diese durch Drag and Drop auf einer Leeren Spalte hingezogen werden können und das Item hinverschoben wird (Achtung: Position wird wackelig berechnet, und kann nach Fehlplatzierung führen.)

Programmstruktur:
In diesem Projekt entählt es folgende Dateien:
    "README.md": Diese Datei hier, dass sie gerade lesen, welches als eine Anleitung fungiert.
    "api.js": Dies ist der "Backend" vom Javascript und lässt die Webseite dynamisch hosten und agiert als lokale Datenbank für die Items (und beherbegt auch Methoden zur Änderung der Daten.)
    "frontend/client.js": Dies ist der "Frontend" vom Javascript und übersetzt alle Aktionen vom User ins Befehle um, welche zur "Api.js" verschickt werden und am Ende immer die Daten abgeholt werden, zur Aktualisierung.
    "frontend/index.html": Die html-Seite, die von der "api.js" dynamisch gehostet wird.
    "frontend/index.css": Diese Datei styled die "index.html" um, um diese schöner darstellen zu lassen.
    "frontend/icons": Dieser Ordner beherbegt alle icons, welche auf der Webseite verwendet werden.