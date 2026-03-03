<?php
require_once 'db.php';

// Obsługa CORS Preflight - rozwiązuje problem "Network Error" w React
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    http_response_code(200);
    exit();
}

// Odczyt danych JSON wysłanych przez Axios
$data = json_decode(file_get_contents("php://input"));

if(isset($data->username) && isset($data->password) && isset($data->role)) {
    // Sprawdzenie czy użytkownik już istnieje
    $check = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $check->execute([$data->username]);
    if($check->rowCount() > 0) {
        echo json_encode(["success" => false, "message" => "Taki użytkownik już istnieje!"]);
        exit;
    }

    $hash = password_hash($data->password, PASSWORD_DEFAULT);

    try {
        $sql = "INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        
        if($stmt->execute([$data->username, $hash, $data->role])) {
            echo json_encode(["success" => true, "message" => "Utworzono konto!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Błąd bazy danych"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Błąd bazy: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Brak wymaganych danych"]);
}
?>