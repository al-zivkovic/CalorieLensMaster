defmodule CalorieLensBackend.Repo.Migrations.CreateUserPlans do
  use Ecto.Migration

  def change do
    create table(:user_plan) do
      add :bmr, :integer, null: false
      add :tdee, :integer, null: false
      add :caloric_intake, :integer, null: false
      add :fat, :integer, null: false
      add :protein, :integer, null: false
      add :carbs, :integer, null: false

      timestamps(type: :utc_datetime)
    end
  end
end
