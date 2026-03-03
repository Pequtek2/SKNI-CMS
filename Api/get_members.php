<?php
require_once 'db.php';
$sql = "SELECT * FROM members ORDER BY is_board DESC, created_at ASC";
$stmt = $conn->prepare($sql);
$stmt->execute();
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>