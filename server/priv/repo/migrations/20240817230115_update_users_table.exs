defmodule CalorieLensBackend.Repo.Migrations.UpdateUsersTable do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :new_field, :string
      # You can also modify existing columns if needed
      # modify :goal_speed, :float, null: true
    end
  end
end
