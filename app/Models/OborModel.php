<?php

namespace App\Models;

use CodeIgniter\Model;

class OborModel extends Model
{
  protected $table      = 'obor';
  protected $primaryKey = 'id';

  public function getIdNames()
  {
    $data = $this->findAll();

    $builder = [];

    foreach ($data as $d) {
      $builder[$d["id"]] = $d["nazev"];
    }

    return $builder;
  }
}
