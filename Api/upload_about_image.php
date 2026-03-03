<?php
// Api/upload_about_image.php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $upload_dir = '../uploads/';
    if (!is_dir($upload_dir)) mkdir($upload_dir, 0777, true);

    $tmp_name = $_FILES['image']['tmp_name'];
    $file_ext = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
    $allowed = ['jpg', 'jpeg', 'png', 'webp'];

    if (in_array($file_ext, $allowed)) {
        $target_file = $upload_dir . 'about_image.' . $file_ext;
        
        // Usuwamy stare zdjęcie "o nas" (żeby np. stare .png nie gryzło się z nowym .jpg)
        foreach (glob($upload_dir . 'about_image.*') as $old_file) {
            unlink($old_file);
        }

        if (move_uploaded_file($tmp_name, $target_file)) {
            echo json_encode(["success" => true, "message" => "Zdjęcie zaktualizowane"]);
        } else {
            echo json_encode(["success" => false, "message" => "Błąd zapisywania pliku na serwerze."]);
        }
    } else {
         echo json_encode(["success" => false, "message" => "Niedozwolony format pliku (tylko jpg, png, webp)."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Brak pliku."]);
}
?>