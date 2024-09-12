defmodule CalorieLensBackend.Repo.Migrations.AddGoalWeightAndGoalSpeedToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :goal_weight, :float
      add :goal_speed, :float
    end
  end
end
