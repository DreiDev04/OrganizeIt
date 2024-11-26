<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        if (!Schema::hasTable('project_user')) {
            Schema::rename('user_project', 'project_user');
        }
    }

    public function down()
    {
        if (Schema::hasTable('project_user') && !Schema::hasTable('user_project')) {
            Schema::rename('project_user', 'user_project');
        }
    }
};
