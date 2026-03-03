<?php
require_once 'db.php';
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

// Odbieramy obiekt JSON z Reacta
$data = json_decode(file_get_contents("php://input"), true); 

if($data && is_array($data)) {
    try {
        $stmt = $conn->prepare("UPDATE settings SET setting_value = ? WHERE setting_key = ?");
        // Przechodzimy po wszystkich otrzymanych ustawieniach i aktualizujemy je
        foreach($data as $key => $value) {
            $stmt->execute([$value, $key]);
        }
        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Błąd bazy: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Brak danych"]);
}
?>