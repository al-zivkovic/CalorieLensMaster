defmodule CalorieLensBackend.Repo.Migrations.CreateNewUsersTable do
  use Ecto.Migration

  def change do
    # Drop the existing users table if it exists
    drop_if_exists table(:users)

    # Create the new users table
    create table(:users) do
      add :name, :string, null: false
      add :email, :string, null: false
      add :clerkId, :string, null: false

      timestamps(type: :utc_datetime)
    end

    create unique_index(:users, [:email])
  end
end
