<?php

namespace App\Models;

use CodeIgniter\Model;

class SkolaModel extends Model
{
  protected $table      = 'skola';
  protected $primaryKey = 'id';

  protected $useSoftDeletes = false;

  protected $allowedFields = ['nazev', 'mesto', "geo-lat", "geo-long"];

  protected $validationMessages = [];
  protected $skipValidation     = false;

  protected $validationRules    = [
    'nazev'     => 'required',
    'mesto'     => 'required|numeric',
    'geo-lat'        => 'required|numeric',
    'geo-long'        => 'required|numeric'
  ];

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
