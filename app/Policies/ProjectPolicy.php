<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;

class ProjectPolicy
{
    /**
     * Determine if the user can view the project.
     */
    public function view(User $user, Project $project)
    {
        // Allow if the user is a member of the project
        return $project->members->contains($user->id);
    }

    /**
     * Determine if the user can update the project.
     */
    public function update(User $user, Project $project)
    {
        // Allow only if the user is a member of the project
        return $project->members->contains($user->id);
    }

    /**
     * Determine if the user can delete the project.
     */
    public function delete(User $user, Project $project)
    {
        // Allow only if the user is a member of the project
        return $project->members->contains($user->id);
    }
}
