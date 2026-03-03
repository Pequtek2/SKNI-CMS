<?php
require_once 'db.php';

$sql = "SELECT * FROM hub_links ORDER BY created_at DESC";
$stmt = $conn->prepare($sql);
$stmt->execute();
$links = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($links);
?>