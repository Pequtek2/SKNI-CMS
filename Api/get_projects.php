<?php
require_once 'db.php';
$stmt = $conn->prepare("SELECT * FROM projects ORDER BY created_at DESC");
$stmt->execute();
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>