<?php

namespace App\Http\Resources;

use App\Http\Resources\UserResource;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = false;
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "status" => $this->status,
            "image_path" => $this->image_path ? Storage::url($this->image_path) : "",
            "due_date" => (new Carbon($this->due_date))->format('yyyy-MM-dd'),
            "created_at" => (new Carbon($this->due_date))->format('yyyy-MM-dd'),
            "updated_at" => (new Carbon($this->due_date))->format('yyyy-MM-dd'),
            "createdBy" => new UserResource($this->createdBy),
            "updatedBy" => new UserResource($this->updatedBy),
        ];
    }
}
