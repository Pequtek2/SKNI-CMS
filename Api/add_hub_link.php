<?php
require_once 'db.php';
$data = json_decode(file_get_contents("php://input"));

if(isset($data->title) && isset($data->url)) {
    $sql = "INSERT INTO hub_links (title, description, url, icon_name) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    
    if($stmt->execute([$data->title, $data->description, $data->url, $data->icon_name])) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Błąd bazy danych"]);
    }
}
?>