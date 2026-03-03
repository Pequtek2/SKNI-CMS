<?php
require_once 'db.php';
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $name = $_POST['name'] ?? '';
    $role = $_POST['role'] ?? '';
    $desc = $_POST['description'] ?? '';
    $is_board = ($_POST['is_board'] === 'true') ? 1 : 0;
    $is_marketing = ($_POST['is_marketing'] === 'true') ? 1 : 0; // NOWE

    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $ext = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
        $new_name = uniqid() . '.' . $ext;
        if(move_uploaded_file($_FILES['image']['tmp_name'], '../uploads/' . $new_name)) {
            $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
            $base = str_replace('\\', '/', dirname(dirname($_SERVER['SCRIPT_NAME'])));
            if($base == '/' || $base == '.') $base = '';
            $image_url = "$protocol://" . $_SERVER['HTTP_HOST'] . "$base/uploads/$new_name";
            
            $stmt = $conn->prepare("UPDATE members SET name=?, role=?, description=?, is_board=?, is_marketing=?, image_url=? WHERE id=?");
            $stmt->execute([$name, $role, $desc, $is_board, $is_marketing, $image_url, $id]);
            echo json_encode(["success" => true]);
            exit;
        }
    }

    $stmt = $conn->prepare("UPDATE members SET name=?, role=?, description=?, is_board=?, is_marketing=? WHERE id=?");
    $stmt->execute([$name, $role, $desc, $is_board, $is_marketing, $id]);
    echo json_encode(["success" => true]);
}
?>