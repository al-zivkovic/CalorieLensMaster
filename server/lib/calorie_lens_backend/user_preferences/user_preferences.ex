defmodule CalorieLensBackend.UserPreferences do
  @moduledoc """
  The UserPreferences context handles operations related to user preferences.
  """

  import Ecto.Query, warn: false
  alias CalorieLensBackend.Repo
  alias CalorieLensBackend.UserPreferences.UserPreference

  @doc """
  Creates a user preference.
  """
  def create_user_preference(attrs \\ %{}) do
    %UserPreference{}
    |> UserPreference.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Retrieves a user's preferences by user_id.
  """
  def get_user_preference(user_id) do
    Repo.get_by(UserPreference, user_id: user_id)
  end

  @doc """
  Updates a user preference.
  """
  def update_user_preference(%UserPreference{} = user_preference, attrs) do
    user_preference
    |> UserPreference.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a user preference.
  """
  def delete_user_preference(%UserPreference{} = user_preference) do
    Repo.delete(user_preference)
  end
end
