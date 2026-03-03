<?php
require_once 'db.php';
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $role = $_POST['role'] ?? '';
    $desc = $_POST['description'] ?? '';
    $is_board = ($_POST['is_board'] === 'true') ? 1 : 0;
    $is_marketing = ($_POST['is_marketing'] === 'true') ? 1 : 0; // NOWE
    $image_url = null;

    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $ext = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
        $new_name = uniqid() . '.' . $ext;
        if(move_uploaded_file($_FILES['image']['tmp_name'], '../uploads/' . $new_name)) {
            $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
            $base = str_replace('\\', '/', dirname(dirname($_SERVER['SCRIPT_NAME'])));
            if($base == '/' || $base == '.') $base = '';
            $image_url = "$protocol://" . $_SERVER['HTTP_HOST'] . "$base/uploads/$new_name";
        }
    }

    $stmt = $conn->prepare("INSERT INTO members (name, role, description, image_url, is_board, is_marketing) VALUES (?, ?, ?, ?, ?, ?)");
    if($stmt->execute([$name, $role, $desc, $image_url, $is_board, $is_marketing])) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Błąd bazy danych"]);
    }
}
?>