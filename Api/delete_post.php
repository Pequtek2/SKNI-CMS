<?php
require_once 'db.php';
$data = json_decode(file_get_contents("php://input"));

if(isset($data->id)) {
    // 1. Najpierw pobierz nazwę pliku, żeby go usunąć z dysku
    $stmt = $conn->prepare("SELECT image_url FROM posts WHERE id = ?");
    $stmt->execute([$data->id]);
    $post = $stmt->fetch(PDO::FETCH_ASSOC);

    // Jeśli jest zdjęcie lokalne (w folderze uploads), usuń je
    if($post && !empty($post['image_url'])) {
        // Sprawdzamy czy to nasz plik (zawiera 'uploads')
        if(strpos($post['image_url'], 'uploads/') !== false) {
            // Wyciągamy ścieżkę relatywną
            $path_parts = explode('uploads/', $post['image_url']);
            $file_path = '../uploads/' . end($path_parts);
            if(file_exists($file_path)) {
                unlink($file_path);
            }
        }
    }

    // 2. Usuń wpis z bazy
    $del = $conn->prepare("DELETE FROM posts WHERE id = ?");
    if($del->execute([$data->id])) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Błąd bazy"]);
    }
}
?>