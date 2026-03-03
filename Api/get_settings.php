<?php
require_once 'db.php';
header('Content-Type: application/json');

try {
    $stmt = $conn->prepare("SELECT setting_key, setting_value FROM settings");
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $settings = [];
    // Formatuje dane do wygodnego obiektu JSON
    foreach($results as $row) {
        $settings[$row['setting_key']] = $row['setting_value'];
    }
    echo json_encode($settings);
} catch (PDOException $e) {
    echo json_encode(["error" => "Błąd: " . $e->getMessage()]);
}
?>