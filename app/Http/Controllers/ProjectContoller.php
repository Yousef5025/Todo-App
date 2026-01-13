<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProjectContoller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();

        $sort_filed = request('sort_field') ? request('sort_field') :  "created_at";
        $sort_direction = request('sort_direction')  ? request('sort_direction') :  "desc";


        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('status') === 'all') {
            $query;
        } else if (request('status')) {
            $query->where('status', request('status'));
        }

        $projects = $query->orderBy($sort_filed, $sort_direction)->paginate(10)->onEachSide(1);

        // dd($sort_filed);

        return inertia('Project/Index', [
            'projects' => ProjectResource::collection($projects),
            'quaryParams' => request()->query(),
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        /** var $image \Illuminate\Http\UploadFile */
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if($image){
            $data['image_path'] = $image->store('project/' . Str::random() , 'public');
        }
        // dd($data);
        Project::create($data);
        return to_route('project.index')->with('success' , 'Project Was Created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks();

        $sort_filed = request('sort_field') ? request('sort_field') :  "created_at";
        $sort_direction = request('sort_direction')  ? request('sort_direction') :  "desc";


        if(request('name')){
            $query->where('name','like','%' . request('name') . '%');
        }

        if(request('status') === 'all'){
            $query;
        }else if(request('status')){
            $query->where('status',request('status'));
        }

        $tasks = $query->orderBy($sort_filed , $sort_direction)->paginate(10)->onEachSide(1);

        return inertia('Project/Show', [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Project/Edit' , [
            'project' => new ProjectResource($project)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
