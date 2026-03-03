<?php
require_once 'db.php';
header('Content-Type: application/json');

if (isset($_GET['id'])) {
    try {
        $stmt = $conn->prepare("SELECT * FROM projects WHERE id = ?");
        $stmt->execute([$_GET['id']]);
        $project = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($project) {
            echo json_encode($project);
        } else {
            echo json_encode(["error" => "Nie znaleziono projektu."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["error" => "Błąd bazy: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Brak ID projektu."]);
}
?>