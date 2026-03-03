<?php
require_once 'db.php';
// Sortujemy od najbliższego wydarzenia
$stmt = $conn->prepare("SELECT * FROM events ORDER BY event_date ASC");
$stmt->execute();
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>