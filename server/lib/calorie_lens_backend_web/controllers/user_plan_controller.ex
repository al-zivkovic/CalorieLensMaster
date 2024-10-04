defmodule CalorieLensBackendWeb.UserPlanController do
  use CalorieLensBackendWeb, :controller

  alias CalorieLensBackend.Accounts

  def show(conn, %{"id" => plan_id}) do
    case Accounts.get_user_plan(plan_id) do
      nil ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "User plan not found"})

      user_plan ->
        conn
        |> put_status(:ok)
        |> json(%{
          id: user_plan.id,
          bmr: user_plan.bmr,
          tdee: user_plan.tdee,
          caloric_intake: user_plan.caloric_intake,
          protein: user_plan.protein,
          fat: user_plan.fat,
          carbs: user_plan.carbs
        })
    end
  end
end
