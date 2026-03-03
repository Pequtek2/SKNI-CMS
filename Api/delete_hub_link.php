<?php
require_once 'db.php';
$data = json_decode(file_get_contents("php://input"));
if(isset($data->id)) {
    $stmt = $conn->prepare("DELETE FROM hub_links WHERE id = ?");
    echo json_encode(["success" => $stmt->execute([$data->id])]);
}
?>