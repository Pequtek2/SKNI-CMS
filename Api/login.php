<?php
require_once 'db.php';

// Odczytujemy dane JSON wysłane z Reacta
$data = json_decode(file_get_contents("php://input"));

if(isset($data->username) && isset($data->password)) {
    $username = $data->username;
    $password = $data->password;

    // Szukamy użytkownika
    $sql = "SELECT * FROM users WHERE username = :username LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Weryfikacja hasła
    if($user && password_verify($password, $user['password_hash'])) {
        // Sukces! Zwracamy ID, nazwę i rolę (bez hasła!)
        echo json_encode([
            "success" => true,
            "user" => [
                "id" => $user['id'],
                "username" => $user['username'],
                "role" => $user['role']
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Błędny login lub hasło"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Brak danych"]);
}
?>