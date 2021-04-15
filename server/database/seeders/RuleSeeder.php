<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create([
            [
                'name' => 'ADMIN',
                'label' => 'admin that has access to everything'
            ],
            [
                'name' => 'USER',
                'label' => 'user that has limited access'
            ]
        ]);
    }
}
