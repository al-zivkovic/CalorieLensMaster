defmodule CalorieLensBackend.AccountsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `CalorieLensBackend.Accounts` context.
  """

  @doc """
  Generate a user.
  """
  def user_fixture(attrs \\ %{}) do
    {:ok, user} =
      attrs
      |> Enum.into(%{
        activity: "some activity",
        day: 42,
        gender: "some gender",
        goal: "some goal",
        goal_speed: 120.5,
        goal_weight: 120.5,
        height: 120.5,
        month: 42,
        plan: %{},
        unit: "some unit",
        weight: 120.5,
        year: 42
      })
      |> CalorieLensBackend.Accounts.create_user()

    user
  end

  @doc """
  Generate a user.
  """
  def user_fixture(attrs \\ %{}) do
    {:ok, user} =
      attrs
      |> Enum.into(%{

      })
      |> CalorieLensBackend.Accounts.create_user()

    user
  end
end
