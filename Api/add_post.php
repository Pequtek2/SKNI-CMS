<?php
// Włączamy wyświetlanie błędów (tylko na czas testów!)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'db.php';

// Obsługa zapytania wstępnego (CORS Preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$response = ["success" => false, "message" => "Nieznany błąd"];

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        
        $title = $_POST['title'] ?? '';
        $content = $_POST['content'] ?? '';
        // --- NOWOŚĆ: Odbieranie kategorii z Reacta ---
        $category = $_POST['category'] ?? 'Ogólne'; 
        
        $author_id = $_POST['author_id'] ?? 0;
        $is_featured = isset($_POST['is_featured']) && $_POST['is_featured'] === 'true' ? 1 : 0;
        $image_url = '';

        // --- DIAGNOSTYKA FOLDERU ---
        $upload_dir = '../uploads/';
        if (!is_dir($upload_dir)) {
            // Próba utworzenia folderu, jeśli nie istnieje
            if (!mkdir($upload_dir, 0777, true)) {
                echo json_encode(["success" => false, "message" => "Brak folderu 'uploads' i nie można go utworzyć."]);
                exit;
            }
        }

        // --- OBSŁUGA PLIKU ---
        if (isset($_FILES['image'])) {
            if ($_FILES['image']['error'] === UPLOAD_ERR_OK) {
                
                $file_ext = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
                $allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

                if (in_array($file_ext, $allowed)) {
                    $new_name = uniqid() . '.' . $file_ext;
                    $target_file = $upload_dir . $new_name;

                    if (move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
                        // Budowanie URL
                        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
                        $host = $_SERVER['HTTP_HOST'];
                        // Usuwamy nazwę skryptu ze ścieżki
                        $dir_path = dirname($_SERVER['SCRIPT_NAME']); 
                        // Cofamy się o jeden folder
                        $base_path = dirname($dir_path); 
                        $base_path = str_replace('\\', '/', $base_path);
                        if($base_path == '/' || $base_path == '.') $base_path = '';

                        $image_url = "$protocol://$host$base_path/uploads/$new_name";

                        // ==========================================
                        // Automatyczne dodawanie do galerii (Przywrócone!)
                        // ==========================================
                        $gallery_caption = "Z wpisu: " . $title;
                        $stmtGallery = $conn->prepare("INSERT INTO gallery (image_url, caption) VALUES (:img, :cap)");
                        $stmtGallery->execute([
                            ':img' => $image_url,
                            ':cap' => $gallery_caption
                        ]);
                        // ==========================================

                    } else {
                        throw new Exception("Nie udało się przenieść pliku (Sprawdź uprawnienia folderu uploads na 777).");
                    }
                } else {
                    throw new Exception("Niedozwolony format pliku.");
                }
            } elseif ($_FILES['image']['error'] !== UPLOAD_ERR_NO_FILE) {
                // Tłumaczenie kodów błędów PHP
                $codes = [
                    1 => 'Plik przekracza upload_max_filesize w php.ini',
                    2 => 'Plik przekracza MAX_FILE_SIZE w formularzu',
                    3 => 'Plik wysłany tylko częściowo',
                    4 => 'Nie wysłano pliku',
                    6 => 'Brak folderu tymczasowego',
                    7 => 'Nie udało się zapisać na dysk',
                    8 => 'Rozszerzenie PHP zatrzymało upload'
                ];
                $err_code = $_FILES['image']['error'];
                throw new Exception("Błąd uploadu: " . ($codes[$err_code] ?? "Kod $err_code"));
            }
        }

        // --- BAZA DANYCH W PISACH ---
        // Dodano :category do zapytania SQL
        $sql = "INSERT INTO posts (title, content, category, image_url, author_id, is_featured) 
                VALUES (:title, :content, :category, :image, :author, :featured)";
        
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            ':title' => $title,
            ':content' => $content,
            ':category' => $category, // Wstawiamy kategorię
            ':image' => $image_url,
            ':author' => $author_id,
            ':featured' => $is_featured
        ]);

        $response = ["success" => true, "message" => "Dodano wpis!"];
    }
} catch (Exception $e) {
    $response = ["success" => false, "message" => "Błąd serwera: " . $e->getMessage()];
}

echo json_encode($response);
?>