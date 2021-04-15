<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Permission::insert([
            [
                'name' => 'Visit:Page',
                'label' => 'visiting the page'
            ],
            [
                'name' => 'Update:Page',
                'label' => 'updating the page'
            ]
        ]);
    }
}
