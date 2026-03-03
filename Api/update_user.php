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

if(isset($data->id) && isset($data->username) && isset($data->role)) {
    
    // Sprawdzenie unikalności nazwy użytkownika (z wyłączeniem edytowanego ID)
    $check = $conn->prepare("SELECT id FROM users WHERE username = ? AND id != ?");
    $check->execute([$data->username, $data->id]);
    if($check->rowCount() > 0) {
        echo json_encode(["success" => false, "message" => "Ta nazwa użytkownika jest już zajęta!"]);
        exit;
    }

    if (!empty($data->password)) {
        // Zmiana danych wraz z nowym hasłem
        $hash = password_hash($data->password, PASSWORD_DEFAULT);
        $sql = "UPDATE users SET username = ?, role = ?, password_hash = ? WHERE id = ?";
        $params = [$data->username, $data->role, $hash, $data->id];
    } else {
        // Zmiana danych bez modyfikacji hasła
        $sql = "UPDATE users SET username = ?, role = ? WHERE id = ?";
        $params = [$data->username, $data->role, $data->id];
    }

    $stmt = $conn->prepare($sql);
    
    if($stmt->execute($params)) {
        echo json_encode(["success" => true, "message" => "Zaktualizowano użytkownika!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Błąd bazy danych"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Brak danych"]);
}
?>