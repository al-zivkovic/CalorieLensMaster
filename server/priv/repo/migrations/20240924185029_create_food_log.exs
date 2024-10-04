defmodule CalorieLensBackend.Repo.Migrations.CreateFoodLogs do
  use Ecto.Migration

  def change do
    create table(:food_logs) do
      add :name, :string, null: false
      add :description, :string
      add :food_image, :binary
      add :calories, :integer, null: false
      add :fat, :integer, null: false
      add :protein, :integer, null: false
      add :carbs, :integer, null: false

      add :user_id, references(:user, on_delete: :delete_all), null: false

      timestamps(type: :utc_datetime)
    end

    create index(:food_logs, [:user_id])
  end
end
