defmodule CalorieLensBackend.Repo.Migrations.DropUnusedColumnsFromUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      remove :new_field
      remove :goalWeight
      remove :goalSpeed
    end
  end
end
