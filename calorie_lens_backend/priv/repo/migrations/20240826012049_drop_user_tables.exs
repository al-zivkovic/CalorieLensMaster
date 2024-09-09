defmodule CalorieLensBackend.Repo.Migrations.DropUserTables do
  use Ecto.Migration

  def change do
    drop table(:users)
  end
end
