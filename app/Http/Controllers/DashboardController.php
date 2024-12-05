<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // Get task counts by status for the user
        $taskCounts = Task::query()
            ->selectRaw('
                SUM(status = "pending") as totalPending,
                SUM(status = "in_progress" AND assigned_user_id = ?) as totalInProgress,
                SUM(status = "completed") as totalCompleted,
                SUM(status = "pending" AND assigned_user_id = ?) as myPending,
                SUM(status = "in_progress" AND assigned_user_id = ?) as myInProgress,
                SUM(status = "completed" AND assigned_user_id = ?) as myCompleted
            ', [$user->id, $user->id, $user->id, $user->id])
            ->first();

        // Get active tasks for the user (pending or in-progress)
        $activeTasks = Task::query()
            ->whereIn('status', ['pending', 'in_progress'])
            ->where('assigned_user_id', $user->id)
            ->limit(10)
            ->get();

        $activeTasks = TaskResource::collection($activeTasks);

        return inertia('Dashboard', [
            'totalPendingTasks' => $taskCounts->totalPending,
            'myPendingTasks' => $taskCounts->myPending,
            'totalProgressTasks' => $taskCounts->totalInProgress, // Only tasks assigned to the user
            'myProgressTasks' => $taskCounts->myInProgress, // Tasks assigned to the user
            'totalCompletedTasks' => $taskCounts->totalCompleted,
            'myCompletedTasks' => $taskCounts->myCompleted,
            'activeTasks' => $activeTasks,
        ]);
    }
}
