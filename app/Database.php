<?php
namespace app;

use PDO;

class Database 
{
    private $login;
    private $password;
    private $dbname;
    private $host;
    private $port;

    function __construct($login, $password,
     $dbname, $host = 'localhost', $port = '3306')
    {
        $this->login = $login;
        $this->password = $password;
        $this->dbname = $dbname;
        $this->host = $host;
        $this->port = $port;
    }

    public function conect()
    {
            
        try {
            return new PDO(
                "mysql:host={$this->host};port={$this->port};dbname={$this->dbname}", $this->login,$this->password);
        } catch (PDOEexeption $e) {
            echo $e->getMessage();
        }
        
    }

    
}