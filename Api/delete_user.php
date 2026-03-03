<?php
require_once 'db.php';

// Obsługa CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if(isset($data->id)) {
    // Opcjonalne zabezpieczenie przed usunięciem głównego admina (ID 1)
    if($data->id == 1) {
        echo json_encode(["success" => false, "message" => "Nie można usunąć głównego administratora"]);
        exit;
    }

    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    if($stmt->execute([$data->id])) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Błąd podczas usuwania"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Brak ID użytkownika"]);
}
?>