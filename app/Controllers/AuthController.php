<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\API\ResponseTrait;

class AuthController extends BaseController
{
  use ResponseTrait;

  public function register()
  {
    $user = new UserModel();

    $data = json_decode($this->request->getBody());

    $data = $user->insert(["name" => $data->name, "password" => $data->password]);

    $errors = $user->errors();
    if ($errors) {
      return $this->respond(["errors" => $errors]);
    } else {
      return $this->respond(1);
    }
  }

  public function optionsReq()
  {
    return $this->respond();
  }

  public function login()
  {

    $user = new UserModel();

    $data = json_decode($this->request->getBody());

    $user = $user->getUserByLogin($data->name, $data->password);
    $session = \Config\Services::session();

    $session->set("user", $user);

    unset($user["password"]);

    return $this->respond(["user" => $user]);
  }

  public function getUser()
  {
    $session = \Config\Services::session();

    $user = $session->get("user");
    if ($user) {
      unset($user["password"]);
      return $this->respond(["user" => $user]);
    } else {
      return $this->respond(["user" => null]);
    }
  }

  public function logout()
  {
    $session = \Config\Services::session();

    $session->remove("user");

    return $this->respond(1);
  }
}
