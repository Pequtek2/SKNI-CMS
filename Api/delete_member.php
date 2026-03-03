<?php
require_once 'db.php';
$data = json_decode(file_get_contents("php://input"));
if(isset($data->id)) {
    $stmt = $conn->prepare("SELECT image_url FROM members WHERE id = ?");
    $stmt->execute([$data->id]);
    $m = $stmt->fetch(PDO::FETCH_ASSOC);
    if($m && !empty($m['image_url']) && strpos($m['image_url'], 'uploads/') !== false) {
        $parts = explode('uploads/', $m['image_url']);
        $path = '../uploads/' . end($parts);
        if(file_exists($path)) unlink($path);
    }
    $del = $conn->prepare("DELETE FROM members WHERE id = ?");
    echo json_encode(["success" => $del->execute([$data->id])]);
}
?>