defmodule CalorieLensBackend.Repo.Migrations.CreateUserInfo do
  use Ecto.Migration

  def change do
    create table(:user_info) do
      add :day, :integer
      add :month, :integer
      add :year, :integer
      add :gender, :string
      add :unit, :string
      add :height, :float
      add :weight, :float
      add :activity, :string
      add :goal, :string
      add :goal_weight, :float
      add :goal_speed, :float
      add :plan, :map

      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps(type: :utc_datetime)
    end

    create index(:user_info, [:user_id])
  end
end
