defmodule CalorieLensBackend.Repo.Migrations.CreateUserPreferences do
  use Ecto.Migration

  def change do
    create table(:user_preferences) do
      add :unit, :string
      add :height, :integer
      add :weight, :float
      add :activity, :string
      add :goal, :string
      add :goal_weight, :float
      add :goal_speed, :string
      add :user_id, references(:user, on_delete: :delete_all), null: false
      add :user_plan_id, references(:user_plan, on_delete: :delete_all), null: false

      timestamps(type: :utc_datetime)
    end

    create index(:user_preferences, [:user_id])
    create index(:user_preferences, [:user_plan_id])
  end
end
