<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ProjectResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "status" => $this->status,
            "image_path" => $this->image_path,
            "priority" => $this->priority,
            "due_date" => (new Carbon($this->due_date))->format('y-m-d'),
            "created_at" => (new Carbon($this->due_date))->format('y-m-d'),
            "updated_at" => (new Carbon($this->due_date))->format('y-m-d'),

            "project" => new ProjectResource($this->project),
            "assignedUser" => new UserResource($this->assignedUser),
            "createdBy" => new UserResource($this->createdBy),
            "updatedBy" => new UserResource($this->updatedBy),
        ];
    }
}
