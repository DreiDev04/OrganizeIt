<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use File;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $projects = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Project/Index", [
            "projects" => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Project/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        $imageFolder = 'project/' . Str::random();
        $placeholderName = "placeholder-3.png";
        if ($image) {
            $data['image_path'] = $image->store($imageFolder, 'public');
        } else {
            $placeholderPath = public_path("placeholder/{$placeholderName}");
            File::makeDirectory(storage_path("app/public/{$imageFolder}"), 0755, true, true);
            $destinationPath = storage_path("app/public/{$imageFolder}{$placeholderName}");
            File::copy($placeholderPath, $destinationPath);

            $data['image_path'] = "{$imageFolder}{$placeholderName}";
        }

        // Create the project
        $project = Project::create($data);

        // Automatically associate the creator (current user) as a member
        $project->users()->attach(auth()->id());

        return to_route('project.index')
            ->with('success', 'Project was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        // if (!$project->users->contains(auth()->id())) {
        //     return redirect()->route('dashboard')->with('error', 'You are not a member of this project');
        // }

        $isMember = $project->users->contains(auth()->id());
        $isCreator = $project->created_by === auth()->id();
        $query = $project->tasks();


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


        return inertia('Project/Show', [
            'project' => new ProjectResource($project),
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'isMember' => $isMember,
            'isCreator' => $isCreator
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        if (!$project->users->contains(auth()->id())) {
            return redirect()->route('dashboard')->with('error', 'You are not a member of this project');
        }

        return inertia('Project/Edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($image) {
            if ($project->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($project->image_path));
            }
            $data['image_path'] = $image->store('project/' . Str::random(), 'public');
        }
        $project->update($data);

        return to_route('project.index')
            ->with('success', "Project \"$project->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        if (!$project->users->contains(auth()->id())) {
            return redirect()->route('dashboard')->with('error', 'You are not a member of this project');
        }
        $name = $project->name;

        // Delete tasks associated with the project
        $project->tasks()->delete();

        // Delete the project
        $project->delete();

        // Delete the project's image directory if it exists
        if ($project->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($project->image_path));
        }

        return to_route('project.index')
            ->with('success', "Project \"$name\" was deleted along with its tasks");
    }

    public function join(Project $project)
    {
        // Check if the user is already a member
        if ($project->users->contains(auth()->id())) {
            return redirect()->route('project.show', $project->id)->with('info', 'You are already a member of this project.');
        }

        // Add the current user as a member
        $project->users()->attach(auth()->id());

        return redirect()->route('project.show', $project->id)->with('success', 'You have successfully joined the project.');
    }
}
