# 🚀 SKNI Web Platform & CMS

Oficjalna platforma internetowa **Studenckiego Koła Naukowego Informatyków (SKNI)**, zrzeszającego studentów kierunku Informatyka Przemysłowa. Projekt łączy nowoczesny frontend z autorskim, lekkim systemem CMS stworzonym całkowicie od zera.

## 🌟 Główne funkcje

- **W pełni autorski CMS:** Dedykowany Panel Redaktora i Administratora do zarządzania treścią bez konieczności używania ciężkich rozwiązań typu WordPress.
- **Modułowa struktura:** Blog (z systemem kategorii), dynamiczna Galeria (z efektem Lightbox i Glassmorphism), Portfolio Projektów, Kalendarz Wydarzeń oraz Hub użytecznych linków.
- **Promocja Gamedevu:** Wbudowany landing page (GameView) promujący autorską grę pt. *"Re-boot"* (Godot Engine) z możliwością pobrania buildów na Windows, macOS i Linux.
- **Nowoczesny UI/UX:** Stylizacja w nurcie Glassmorphism, zaawansowane animacje w tle (Parallax CSS), pełna responsywność (Mobile First) oraz integracja z meta tagami Open Graph.

## 🛠 Technologie

- **Frontend:** React.js, Tailwind CSS, Lucide Icons, Axios.
- **Backend:** PHP 8 (PDO), REST API.
- **Baza danych:** MySQL (MariaDB).

## 📂 Struktura Projektu

- `/src` - Komponenty React, routing (App.js) oraz style.
- `/Api` - Endpointy PHP odpowiadające za komunikację z bazą danych (CRUD).
- `/uploads` & `/downloads` - Katalogi na serwerze docelowym przechowujące grafiki i pliki gier.
- `database.sql` - Gotowy zrzut bazy danych ze strukturą tabel.

## ⚙️ Instalacja i Uruchomienie (Wersja Deweloperska)

1. **Sklonuj repozytorium:**
   ```bash
   git clone https://github.com/Pequtek2/SKNI-CMS.git
   ```

2. **Baza danych:**
   - Utwórz nową bazę danych (np. `skni_db`) w phpMyAdmin (z kodowaniem `utf8mb4_unicode_ci`).
   - Zaimportuj do niej plik `database.sql` dołączony do głównego folderu projektu.

3. **Konfiguracja backendu (PHP):**
   Utwórz plik `Api/db.php` na podstawie poniższego schematu (zmień dane logowania na swoje docelowe):
   
   *Schemat pliku `Api/db.example.php`:*
   ```php
   <?php
   // Ustawienia dostępu do bazy danych
   $host = 'localhost';
   $db_name = 'skni_db';
   $username = 'root';     // Twój użytkownik bazy (np. root dla XAMPP)
   $password = '';         // Twoje hasło (domyślnie puste dla XAMPP)

   // Nagłówki CORS (Ważne dla Reacta)
   header("Access-Control-Allow-Origin: *");
   header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
   header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

   try {
       $conn = new PDO("mysql:host=" . $host . ";dbname=" . $db_name . ";charset=utf8mb4", $username, $password);
       $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
       $conn->exec("SET NAMES utf8mb4"); 
   } catch(PDOException $exception) {
       echo "Błąd połączenia: " . $exception->getMessage();
       exit();
   }
   ?>
   ```

4. **Frontend:** W głównym katalogu projektu uruchom w terminalu komendy:
   ```bash
   npm install
   npm start
   ```

5. **Deploy (Produkcja):**
   Zbuduj aplikację poleceniem `npm run build` i przenieś zawartość wygenerowanego folderu `/build` oraz katalog `/Api` na swój serwer docelowy (np. Apache/Nginx). Pamiętaj o utworzeniu folderów `/uploads` i `/downloads` z odpowiednimi uprawnieniami (chmod 777 dla zapisu z poziomu PHP).
   Zalogujesz się do panelu admina przez login: admin i haslo: admin

## 👨‍💻 Autor

Projekt został zaprojektowany, zaprogramowany i wdrożony od podstaw przez:
**Adam Latała** – student Informatyki Przemysłowej i członek Studenckiego Koła Naukowego Informatyków (SKNI).