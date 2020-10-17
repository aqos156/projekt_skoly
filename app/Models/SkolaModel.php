<?php

namespace App\Models;

use CodeIgniter\Model;

class SkolaModel extends Model
{
  protected $table      = 'skola';
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

  public function getIdNamesPosition()
  {
    $data = $this->findAll();

    $builder = [];

    foreach ($data as $d) {
      $builder[] = [
        "nazev" => $d["nazev"],
        "id" => $d["id"],
        "lat" => $d["geo-lat"],
        "lng" => $d["geo-long"]
      ];
    }

    return $builder;
  }
}
