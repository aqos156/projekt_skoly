<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
  protected $table      = 'users';
  protected $primaryKey = 'id';

  protected $returnType     = 'array';
  protected $useSoftDeletes = false;
  protected $useTimestamps = false;
  protected $skipValidation     = false;

  protected $allowedFields = ['password', 'name'];

  protected $beforeInsert = ['hashPassword'];
  protected $beforeUpdate = ['hashPassword'];

  protected $validationMessages = [
    "name" => [
      "is_unique" => "Uživatel se stejným jménem již existuje",
      "required" => "Jméno je povinné",
    ],
    "password" => [
      "required" => "Heslo je povinné",
      "min_length" => "Heslo musí mít alespoň 8 znaků"
    ]
  ];

  protected $validationRules    = [
    'name'     => 'required|is_unique[users.name]',
    'password'     => 'required|min_length[8]',
  ];

  protected function hashPassword(array $data)
  {
    if (!isset($data['data']['password'])) {
      return $data;
    }

    $data['data']['password'] = password_hash($data['data']['password'], PASSWORD_DEFAULT);

    return $data;
  }

  public function getUserByLogin($name, $password)
  {
    $usr = $this->where("name", $name)->first();
    if (!$usr) {
      return null;
    }

    if (password_verify($password, $usr["password"])) {
      return $usr;
    } else {
      return null;
    }
  }
}
