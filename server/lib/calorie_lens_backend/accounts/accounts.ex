defmodule CalorieLensBackend.Accounts do
  @moduledoc """
  The Accounts context handles operations related to users.
  """

  import Ecto.Query, warn: false
  alias CalorieLensBackend.Repo
  alias CalorieLensBackend.Accounts.User
  alias CalorieLensBackend.UserPlans.UserPlan
  alias CalorieLensBackend.UserPreferences.UserPreference


  @doc """
  Returns the list of users.
  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user by ID.
  """
  def get_user!(id), do: Repo.get!(User, id)

  @doc """
  Creates a user.
  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  def create_user_plan(user_id, attrs \\ %{}) do
    %UserPlan{}
    |> UserPlan.changeset(Map.put(attrs, "user_id", user_id))
    |> Repo.insert()
  end

  def create_user_preference(user_id, user_plan_id, attrs \\ %{}) do
    %UserPreference{}
    |> UserPreference.changeset(Map.merge(attrs, %{"user_id" => user_id, "user_plan_id" => user_plan_id}))
    |> Repo.insert()
  end
  @doc """
  Gets a single user by Clerk ID.
  """
  def get_user_by_clerk_id(clerk_id) do
    Repo.get_by(User, clerk_id: clerk_id)
  end

  def get_user_preference_by_user_id(user_id) do
    Repo.get_by(UserPreference, user_id: user_id)
  end

  def get_user_plan(plan_id) do
    Repo.get(UserPlan, plan_id)
  end

  @doc """
  Updates a user.
  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a user.
  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.
  """
  def change_user(%User{} = user, attrs \\ %{}) do
    User.changeset(user, attrs)
  end

end
