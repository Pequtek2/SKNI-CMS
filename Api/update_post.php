<?php
require_once 'db.php';
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $id = $_POST['id'];
        $title = $_POST['title'];
        $content = $_POST['content'];
        $category = $_POST['category'] ?? 'Ogólne'; // NOWE
        $is_featured = $_POST['is_featured'] === 'true' ? 1 : 0;
        
        if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $upload_dir = '../uploads/';
            $file_ext = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
            $new_name = uniqid() . '.' . $file_ext;
            
            if(move_uploaded_file($_FILES['image']['tmp_name'], $upload_dir . $new_name)) {
                $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
                $base = str_replace('\\', '/', dirname(dirname($_SERVER['SCRIPT_NAME'])));
                if($base == '/' || $base == '.') $base = '';
                $image_url = "$protocol://" . $_SERVER['HTTP_HOST'] . "$base/uploads/$new_name";

                $sql = "UPDATE posts SET title=?, content=?, category=?, is_featured=?, image_url=? WHERE id=?";
                $stmt = $conn->prepare($sql);
                $stmt->execute([$title, $content, $category, $is_featured, $image_url, $id]);
            }
        } else {
            $sql = "UPDATE posts SET title=?, content=?, category=?, is_featured=? WHERE id=?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$title, $content, $category, $is_featured, $id]);
        }

        echo json_encode(["success" => true, "message" => "Zaktualizowano wpis!"]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Błąd: " . $e->getMessage()]);
}
?>