<?php
require_once 'db.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $caption = $_POST['caption'] ?? '';
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $upload_dir = '../uploads/gallery/';
        if (!is_dir($upload_dir)) mkdir($upload_dir, 0777, true);
        
        $file_ext = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
        $new_name = uniqid() . '.' . $file_ext;
        
        if (move_uploaded_file($_FILES['image']['tmp_name'], $upload_dir . $new_name)) {
            $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
            $image_url = "$protocol://" . $_SERVER['HTTP_HOST'] . str_replace('\\', '/', dirname(dirname($_SERVER['SCRIPT_NAME']))) . "/uploads/gallery/$new_name";
            
            $stmt = $conn->prepare("INSERT INTO gallery (image_url, caption) VALUES (?, ?)");
            echo json_encode(["success" => $stmt->execute([$image_url, $caption])]);
        }
    }
}
?>