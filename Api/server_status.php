<?php
require_once 'db.php';

// 1. Sprawdzenie czasu pracy serwera (Uptime)
$uptime = "Niedostępne na Windows";
if (strtoupper(substr(PHP_OS, 0, 3)) !== 'WIN') {
    // Komenda linuxowa
    $uptime = shell_exec('uptime -p'); 
} else {
    // Proteza dla Windowsa (pokazuje czas uruchomienia skryptu)
    $uptime = "System Windows (brak uptime)";
}

// 2. Wersja oprogramowania
$software = $_SERVER['SERVER_SOFTWARE']; 
$php_version = phpversion();

// 3. Status bazy danych (skoro plik db.php się załadował, to baza działa)
$db_status = "Połączono";

// Budujemy odpowiedź
$status = [
    "os" => PHP_OS,
    "php_version" => $php_version,
    "server_software" => $software,
    "uptime" => trim($uptime),
    "database_connection" => $db_status,
    "server_time" => date("Y-m-d H:i:s")
];

echo json_encode($status);
?>