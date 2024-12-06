<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;


class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        try {
            $request->validate([
                'password' => ['required', 'current_password'],
            ]);

            $user = $request->user();

            if (!$user) {
                throw new \Exception("Authenticated user not found.");
            }

            // Delete related tasks where the user is the assigned user or creator
            Task::where('assigned_user_id', $user->id)->delete();
            Task::where('created_by', $user->id)->delete();
            Task::where('updated_by', $user->id)->delete();

            // Remove user from projects (pivot table entries)
            $user->projects()->detach();

            // Delete projects created by the user
            Project::where('created_by', $user->id)->delete();

            // Log out the user
            Auth::logout();

            // Delete the user
            $user->delete();

            // Invalidate session
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return Redirect::to('/');
        } catch (\Throwable $e) {
            Log::error("Error deleting user: " . $e->getMessage(), [
                'exception' => $e,
            ]);

            return Redirect::back()->withErrors([
                'error' => 'An error occurred while deleting your account. Please try again later.',
            ]);
        }
    }
}
