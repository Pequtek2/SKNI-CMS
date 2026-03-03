<?php
require_once 'db.php';

// Obsługa zapytania wstępnego (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if(isset($data->id)) {
    // 1. Pobierz nazwę pliku, żeby go usunąć fizycznie z dysku
    $stmt = $conn->prepare("SELECT image_url FROM gallery WHERE id = ?");
    $stmt->execute([$data->id]);
    $item = $stmt->fetch(PDO::FETCH_ASSOC);

    // 2. Jeśli zdjęcie istnieje lokalnie (w folderze uploads/gallery/), usuń je
    if($item && !empty($item['image_url'])) {
        if(strpos($item['image_url'], 'uploads/gallery/') !== false) {
            $path_parts = explode('uploads/gallery/', $item['image_url']);
            $file_path = '../uploads/gallery/' . end($path_parts);
            if(file_exists($file_path)) {
                unlink($file_path); // Fizyczne usunięcie pliku
            }
        }
    }

    // 3. Usuń wpis z bazy danych
    $del = $conn->prepare("DELETE FROM gallery WHERE id = ?");
    if($del->execute([$data->id])) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Błąd bazy danych"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Brak ID"]);
}
?>