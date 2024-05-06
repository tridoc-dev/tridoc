<?php

namespace App\Http\Requests\Editor;

use App\Models\Project;
use Illuminate\Foundation\Http\FormRequest;

class ListProjectFileRequest extends FormRequest
{
    public Project $project;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        try {
            $this->project = Project::findOrFail($this->route('project'));

            return $this->user()->can('view', $this->project);
        } catch (\Throwable $th) {
            return false;
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
        ];
    }
}
