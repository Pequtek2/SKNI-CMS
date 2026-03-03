<?php
require_once 'db.php';
$data = json_decode(file_get_contents("php://input"));
if(isset($data->id)) {
    $stmt = $conn->prepare("SELECT image_url FROM projects WHERE id = ?");
    $stmt->execute([$data->id]);
    $p = $stmt->fetch(PDO::FETCH_ASSOC);
    if($p && !empty($p['image_url']) && strpos($p['image_url'], 'uploads/') !== false) {
        $parts = explode('uploads/', $p['image_url']);
        $path = '../uploads/' . end($parts);
        if(file_exists($path)) unlink($path);
    }
    $del = $conn->prepare("DELETE FROM projects WHERE id = ?");
    echo json_encode(["success" => $del->execute([$data->id])]);
}
?>