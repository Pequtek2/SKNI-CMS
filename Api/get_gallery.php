<?php
require_once 'db.php';

$sql = "SELECT * FROM gallery ORDER BY created_at DESC";
$stmt = $conn->prepare($sql);
$stmt->execute();
$images = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($images);
?>