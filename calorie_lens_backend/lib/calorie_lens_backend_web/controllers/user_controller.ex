defmodule CalorieLensBackendWeb.UserController do
  use CalorieLensBackendWeb, :controller

  alias CalorieLensBackend.Accounts

  def create(conn, %{"user" => user_params}) do
    case Accounts.create_user(user_params) do
      {:ok, user} ->
        conn
        |> put_status(:created)
        |> json(%{
            id: user.id,
            day: user.day,
            month: user.month,
            year: user.year,
            gender: user.gender,
            unit: user.unit,
            height: user.height,
            weight: user.weight,
            activity: user.activity,
            goal: user.goal,
            goal_weight: user.goal_weight,
            goal_speed: user.goal_speed,
            plan: user.plan,
            inserted_at: user.inserted_at,
            updated_at: user.updated_at
          })

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: Ecto.Changeset.traverse_errors(changeset, &translate_error/1)})
    end
  end

  defp translate_error({msg, opts}) do
    Enum.reduce(opts, msg, fn {key, value}, acc ->
      String.replace(acc, "%{#{key}}", to_string(value))
    end)
  end
end
