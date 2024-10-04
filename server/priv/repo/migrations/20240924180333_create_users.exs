defmodule CalorieLensBackend.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:user) do
      add :name, :string, null: false
      add :email, :string, null: false
      add :birthday, :date
      add :gender, :string
      add :clerk_id, :string, null: false # Typically, we use snake_case for field names in the database

      timestamps(type: :utc_datetime)
    end

    create unique_index(:user, [:email]) # Ensures that email is unique
    create unique_index(:user, [:clerk_id]) # Ensure clerk_id is unique
  end
end
