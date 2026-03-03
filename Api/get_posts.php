<?php
require_once 'db.php';

// Sprawdzamy, czy React prosi tylko o wyróżnione wpisy (na stronę główną)
$featured_only = isset($_GET['featured']) && $_GET['featured'] == 'true';

if ($featured_only) {
    // Zapytanie dla Strony Głównej: Tylko wyróżnione, max 3 sztuki
    $sql = "SELECT users.username, posts.* FROM posts 
            JOIN users ON posts.author_id = users.id 
            WHERE is_featured = 1 
            ORDER BY created_at DESC 
            LIMIT 3";
} else {
    // Zapytanie dla Bloga: Wszystkie wpisy
    $sql = "SELECT users.username, posts.* FROM posts 
            JOIN users ON posts.author_id = users.id 
            ORDER BY created_at DESC";
}

$stmt = $conn->prepare($sql);
$stmt->execute();
$posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Zwracamy dane w formacie JSON
echo json_encode($posts);
?>