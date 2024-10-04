# lib/calorie_lens_backend/user_plans/user_plans.ex
defmodule CalorieLensBackend.UserPlans do
  import Ecto.Query, warn: false
  alias CalorieLensBackend.Repo
  alias CalorieLensBackend.UserPlans.UserPlan

  # List all user plans
  def list_user_plans do
    Repo.all(UserPlan)
  end

  # Get a user plan by ID
  def get_user_plan!(id), do: Repo.get!(UserPlan, id)

  # Create a user plan
  def create_user_plan(attrs \\ %{}) do
    %UserPlan{}
    |> UserPlan.changeset(attrs)
    |> Repo.insert()
  end

  # Update a user plan
  def update_user_plan(%UserPlan{} = user_plan, attrs) do
    user_plan
    |> UserPlan.changeset(attrs)
    |> Repo.update()
  end

  # Delete a user plan
  def delete_user_plan(%UserPlan{} = user_plan) do
    Repo.delete(user_plan)
  end
end
