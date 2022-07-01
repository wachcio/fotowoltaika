# Fotowoltaika

Część backend aplikacji służy do zbierania danych z falowników fotowoltaicznych firmy Fronius poprzez ich API oraz zapisuje dane do bazy MySQL. Część frontend napisana w React służy do wizualizacji danych za pomocą liczb i wykresów.

Aplikacja powstaje od 2021 jako alternatywa dla płatnych funkcji dotyczących historii w oryginalnej aplikacji Solar.Web firmy Fronius.

Pierwsza wersja napisana była w Express.js oraz React przy wykorzystaniu JavaScript. Ponieważ w tym samym czasie uczestniczyłem w kursie programowania MegaK gdzie poznałem takie technologie jak TypeScript czy NestJS stopniowo migruję projekt do tych nowoczesnych technologii jednocześnie pozostawiając stary kod w oddzielnych branch-ach.

Co aplikacja robi?

-   odpytanie Fronius API o dane z teraz i przesłanie na frontend
-   raz na dobę (po dopisaniu do cron np. na serwerze) odpytanie Fronius API oraz archiwizacja w bazie MYSQL szczegółowych danych z ostatniej doby
-   pokazanie za pomocą liczb i wykresów informacji z dziś (napięcia i natężenia prądu zarówno AC jak i DC, produkcję, temperaturę falownika, częstotliwość prądu AC), z danego dnia w historii, zestawienie miesięczne i roczne

Co jest do zrobienia?

-   migracja frontend do TypeScript
-   uporządkowanie kodu React i podział na mniejsze bardzie reużywalne komponenty
-   zabezpieczenie przed brakiem internetu w miejscu instalacji falownika (na razie trzeba ręcznie uruchamiać odpowiedni plik z katalogu cron po odzyskaniu połączenia z internetem aby uzupełnić dane w bazie danych)
-   wykorzystanie modułu CRON w NestJS i zastąpienie nim dotychczasowego rozwiązania
-   przy migracji frontend do TypeScript wykorzystaniu typów z backend
-   napisanie testów
