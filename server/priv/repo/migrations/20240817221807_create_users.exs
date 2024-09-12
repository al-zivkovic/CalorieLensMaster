defmodule CalorieLensBackend.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
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

      timestamps(type: :utc_datetime)
    end
  end
end
