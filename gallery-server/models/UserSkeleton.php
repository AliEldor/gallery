<?php
class UserSkeleton{
    private $id;
    private $fullname;
    private $email;
    private $password;
    

//id
public function getId(){
    return $this->id;
}

public function setId($id){
     $this->id=$id;
}


//fullname

public function getFullname(){
    return $this->fullname;
}

public function setFullname($fullname){
     $this->fullname=$fullname;
}


//email
public function getEmail(){
    return $this->email;
}

public function setEmail($email){
     $this->email=$email;
}


//password
public function getPassword(){
    return $this->password;
}

public function setPassword($password){
     $this->password=$password;
}
}