<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::insert([
            [
                'name' => 'Admin',
                'label' => 'admin that has access to everything'
            ],
            [
                'name' => 'User',
                'label' => 'user that has limited access'
            ]
        ]);
    }
}
