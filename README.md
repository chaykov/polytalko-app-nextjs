# PolyTalko App (alpha v1)

Ten projekt to mini aplikacja społecznościowa oparta na: **Next.js 15 + Convex + Clerk**.
Poniżej znajduje się **lista funkcji**, które planuję wdrożyć.

🚧 - w trakcie implementacji
⏳ - planowane

## 1. Autoryzacja i użytkownicy

- [x] Logowanie i rejestracja użytkownika (Clerk)
- [x] Pobieranie profilu użytkownika (imię, wiek, kraj, opis)
- [x] Edycja profilu użytkownika
- [x] System statusów: "online", "offline",
- [x] ⏳ Ostatnia aktywność użytkownika (np. "Ostatnio aktywny 10 min temu")
- [x] Pobieranie wszystkich zarejestrowanych użytkowników

## 2. System znajomych

- [x] Wysyłanie zaproszeń do znajomych
- [ ] 🚧 Akceptowanie lub odrzucanie zaproszenia
- [ ] Cofanie zaproszenia przed jego zaakceptowaniem
- [ ] Licznik oczekujących zaproszeń w nawigacji obok zakładki "Profile"
- [ ] 🚧 Usuwanie znajomych
- [ ] 🚧 Blokowanie użytkowników
- [ ] 🚧 Pobieranie listy znajomych w czasie rzeczywistym
- [ ] ⏳ Rekomendacje znajomych (np. znajomi znajomych)

## 3. Wiadomości (Czat 1:1)

- [ ] ⏳ Wysyłanie wiadomości tekstowych
- [ ] ⏳ Real-time odbieranie wiadomości
- [ ] ⏳ Historia rozmów między użytkownikami
- [ ] ⏳ Powiadomienia o nowych wiadomościach
- [ ] ⏳ Możliwość usunięcia wiadomości

## 4. Tablica postów (Social Feed)

- [ ] ⏳ Tworzenie postów (treść + zdjęcia)
- [ ] ⏳ Wyświetlanie postów znajomych
- [ ] ⏳ Lajkowanie postów
- [ ] ⏳ Komentowanie postów
- [ ] ⏳ Usuwanie postów
- [ ] ⏳ Filtrowanie postów według popularności lub daty

## 5. Powiadomienia (Real-time)

- [ ] ⏳ Powiadomienia o nowych zaproszeniach do znajomych
- [ ] ⏳ Powiadomienia o zaakceptowanych zaproszeniach
- [ ] ⏳ Powiadomienia o nowych wiadomościach
- [ ] ⏳ Powiadomienia o polubieniach i komentarzach do postów
- [ ] ⏳ Web Push Notifications (wyskakujące powiadomienia w przeglądarce)
- [ ] ⏳ Powiadomienia dźwiękowe (np. przy nowym zaproszeniu)

## 6. System statusów online/offline

- [ ] ⏳ Wykrywanie, kiedy użytkownik jest online
- [ ] ⏳ Oznaczanie użytkownika jako "away" po X minutach nieaktywności
- [ ] ⏳ Zmiana statusu na "offline" po zamknięciu aplikacji
- [ ] ⏳ Real-time aktualizacja statusu znajomych

## 7. Dodatkowe ulepszenia

- [ ] ⏳ Szybkie wyszukiwanie użytkowników
- [ ] ⏳ Sortowanie znajomych według statusu (online / offline)
- [ ] ⏳ Historia aktywności użytkownika (np. "Utworzył post 3 godziny temu")
- [ ] ⏳ System zapamiętywania wiadomości dla offline (późniejsza synchronizacja)
- [ ] ⏳ Możliwość ustawienia opisu statusu (np. "Zajęty", "Pracuję", "Dostępny")
- [ ] ⏳ Integracja z powiadomieniami e-mail

---

## Opis funkcji

### **Licznik oczekujących zaproszeń w nawigacji**

Aplikacja dynamicznie pobiera liczbę oczekujących zaproszeń i wyświetla ją obok zakładki **Profile** w nawigacji. Jeśli uzytkownik ma zaproszenia, obok **Profile** pojawi się wskaźnik `+X`, informujący o licznie oczekujących zaproszeń.

Przykłady wyświetlania:

- `Profile` -> Brak zaproszeń
- `Profile +1` -> Jedno oczekujące zaproszenie
- `Profile +3` -> Trzy oczekujące zaproszenia

Licznik aktualizuje się **automatycznie po wysłaniu lub zaakceptowaniu zaproszenia**.

---
