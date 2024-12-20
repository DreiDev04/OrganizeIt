<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;


class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Project/Show", [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Project $project)
    {
        $users_in_project = $project->users()->orderBy('name', 'asc')->get();
        // $project_id = $project->id;
        // dd($project_id);

        return inertia("Task/Create", [
            'project' => new ProjectResource($project),
            'users' => UserResource::collection($users_in_project),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $project_id = $data['project_id'];

        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if ($image) {
            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        }

        Task::create($data);
        return to_route('project.show', $project_id)
            ->with('success', 'Task was created');
    }



    public function show(Project $project, Task $task)
    {
        return inertia('Task/Show', [
            'project' => new ProjectResource($project),
            'task' => new TaskResource($task),
        ]);
    }

    public function edit(Project $project, Task $task)
    {
        // $users = User::query()->orderBy('name', 'asc')->get();
        $users_in_project = $project->users()->orderBy('name', 'asc')->get();

        return inertia("Task/Edit", [
            'task' => new TaskResource($task),
            'project' => new ProjectResource($project),
            'users' => UserResource::collection($users_in_project),
        ]);
    }
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $project_id = $data['project_id'];
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($image) {
            if ($task->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        }
        $task->update($data);

        return to_route('project.show', $project_id)
            ->with('success', 'Task was edited');
    }

    public function destroy(Request $request, Task $task)
    {
        $project_id = $request->get('project_id');
        $task->delete();
        if ($task->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }
        return to_route('project.show', $project_id)
            ->with('success', 'Task was successfully deleted.');
    }

    public function myTasks()
    {
        $user = auth()->user();
        $query = Task::query()->where('assigned_user_id', $user->id);

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }
}
