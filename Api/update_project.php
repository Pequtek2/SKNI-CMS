<?php
require_once 'db.php';
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $title = $_POST['title'] ?? '';
    $desc = $_POST['description'] ?? '';
    $tech = $_POST['technologies'] ?? '';
    $git = $_POST['github_url'] ?? '';
    $live = $_POST['live_url'] ?? '';

    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $ext = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
        $new_name = uniqid() . '_proj.' . $ext;
        if(move_uploaded_file($_FILES['image']['tmp_name'], '../uploads/' . $new_name)) {
            $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
            $base = str_replace('\\', '/', dirname(dirname($_SERVER['SCRIPT_NAME'])));
            if($base == '/' || $base == '.') $base = '';
            $image_url = "$protocol://" . $_SERVER['HTTP_HOST'] . "$base/uploads/$new_name";
            
            $stmt = $conn->prepare("UPDATE projects SET title=?, description=?, technologies=?, github_url=?, live_url=?, image_url=? WHERE id=?");
            $stmt->execute([$title, $desc, $tech, $git, $live, $image_url, $id]);
            echo json_encode(["success" => true]);
            exit;
        }
    }

    $stmt = $conn->prepare("UPDATE projects SET title=?, description=?, technologies=?, github_url=?, live_url=? WHERE id=?");
    $stmt->execute([$title, $desc, $tech, $git, $live, $id]);
    echo json_encode(["success" => true]);
}
?>