<?php
require_once 'db.php';
// Pobieramy ID, nazwę i rolę (bez haseł!)
$sql = "SELECT id, username, role, created_at FROM users ORDER BY created_at DESC";
$stmt = $conn->prepare($sql);
$stmt->execute();
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>