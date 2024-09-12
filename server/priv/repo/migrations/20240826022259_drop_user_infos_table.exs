defmodule CalorieLensBackend.Repo.Migrations.DropUserInfosTable do
  use Ecto.Migration

  def change do
    drop table(:user_infos)
  end
end
