defmodule CalorieLensBackendWeb.UserPreferencesController do
  use CalorieLensBackendWeb, :controller

  alias CalorieLensBackend.Accounts

  def index(conn, %{"user_id" => user_id}) do
    case Accounts.get_user_preference_by_user_id(user_id) do
      nil ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "User preferences not found"})

      user_preference ->
        conn
        |> put_status(:ok)
        |> json(%{
          id: user_preference.id,
          unit: user_preference.unit,
          height: user_preference.height,
          weight: user_preference.weight,
          activity: user_preference.activity,
          goal: user_preference.goal,
          goal_weight: user_preference.goal_weight,
          goal_speed: user_preference.goal_speed,
          plan_id: user_preference.user_plan_id
        })
    end
  end
end
