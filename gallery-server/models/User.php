<?php
include("UserSkeleton.php");

class User{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
        
    }
    
    public function register($fullname, $email, $password){

        $user = new UserSkeleton();
        $query= "SELECT id FROM users WHERE email=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            return [
                "success" => false,
                "message" => "Email already exists"
            ];
        }

        
        $user->setFullname($fullname);
        $user->setEmail($email);
        $user->setPassword(password_hash($password,PASSWORD_DEFAULT));

        $sql = "INSERT INTO users (full_name, email,password) VALUES (?,?,?)";

        $stmt = $this->conn->prepare($sql);

        $name = $user->getFullname();
        $userEmail = $user->getEmail();
        $userPassword = $user->getPassword();


         $name = $user->getFullname();
        $userEmail = $user->getEmail();
        $userPassword = $user->getPassword();

        $stmt->bind_param("sss", $name, $userEmail, $userPassword);

        if($stmt->execute()){
            return [
                "success" => true,
                "user_id" => $this->conn->insert_id,
                "message" => "User registered successfully"
            ];
        }
        else{
            return[
                "success"=>false,
                "message"=>"Error: " . $stmt->error
            ];
        }
}

public function read( $email){


    $sql = "Select * FROM users where email =?";
    $stmt=$this->conn->prepare($sql);

    if (!$stmt) {
        return ["success" => false, "message" => "SQL Error: " . $this->conn->error];
    }

    $stmt->bind_param("s",$email);
    $stmt->execute();
    $result= $stmt->get_result();
    return $result->fetch_assoc();

}

public function login($email,$password){
    $userData = $this->read($email);

    //check if user exists 
    if (!$userData) {
        return [
            "success" => false,
            "message" => "Email not found"
        ];
    }

    if (password_verify($password, $userData['password'])) {
        
        unset($userData['password']);
        
        return [
            "success" => true,
            "message" => "Login successful",
            "user" => $userData
        ];
    } else {
        return [
            "success" => false,
            "message" => "Invalid password"
        ];
    }
}





public function update($id,$fullname,$email,$password){
    $user = new UserSkeleton();
    $user->setId($id);
    $user->setFullname($fullname);
    $user->setEmail($email);
    $user->setPassword($password);

    $sql= "UPDATE users SET full_name=?, email=?, password=? WHERE id=?";

    $stmt=$this->conn->prepare($sql);

    if (!$stmt) {
        return ["success" => false, "message" => "SQL Error: " . $this->conn->error];
    }

    $stmt->bind_param("sssi",$user->getFullname() , $user->getEmail(),$user->getPassword(),$user->getId());

    if($stmt->execute()){
        return[
            "success"=>true,
            "message"=>"user updated"
        ];
    }
    else{
        return[
            "success"=>false,
            "message"=>"Update failed: " . $stmt->error
        ];
    }



}






}