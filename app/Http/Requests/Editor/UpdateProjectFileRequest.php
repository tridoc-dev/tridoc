<?php

namespace App\Http\Requests\Editor;

use App\Models\Project;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectFileRequest extends FormRequest
{
    public Project $project;
    public string $filename;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        try {
            $this->project = Project::findOrFail($this->route('project'));
            $this->filename = $this->route('filename');

            if (str_contains($this->filename, '..')) {
                return false;
            }

            return $this->user()->can('update', $this->project);
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
