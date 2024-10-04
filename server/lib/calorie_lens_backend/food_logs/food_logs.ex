# lib/calorie_lens_backend/food_logs/food_logs.ex
defmodule CalorieLensBackend.FoodLogs do
  import Ecto.Query, warn: false
  alias CalorieLensBackend.Repo
  alias CalorieLensBackend.FoodLogs.FoodLog

  # List all food logs
  def list_food_logs do
    Repo.all(FoodLog)
  end

  # Get a food log by ID
  def get_food_log!(id), do: Repo.get!(FoodLog, id)

  # List all food logs for a specific user
  def list_food_logs_by_user_id(user_id) do
    Repo.all(from f in FoodLog, where: f.user_id == ^user_id)
  end

  # Create a food log entry
  def create_food_log(attrs \\ %{}) do
    %FoodLog{}
    |> FoodLog.changeset(attrs)
    |> Repo.insert()
  end

  # Update a food log entry
  def update_food_log(%FoodLog{} = food_log, attrs) do
    food_log
    |> FoodLog.changeset(attrs)
    |> Repo.update()
  end

  # Delete a food log entry
  def delete_food_log(%FoodLog{} = food_log) do
    Repo.delete(food_log)
  end
end
