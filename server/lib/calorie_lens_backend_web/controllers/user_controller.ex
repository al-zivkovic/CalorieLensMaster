defmodule CalorieLensBackendWeb.UserController do
  use CalorieLensBackendWeb, :controller

  alias CalorieLensBackend.Accounts

  def create(conn, %{"user" => user_params}) do
    user_plan_params = Map.get(user_params, "user_plan", %{})
    user_preference_params = Map.get(user_params, "user_preferences", %{})
    user_params = Map.drop(user_params, ["user_plan", "user_preferences"])

    case Accounts.create_user(user_params) do
      {:ok, user} ->
        # Convert bmr and tdee to integers after parsing as floats
        user_plan_params = Map.update!(user_plan_params, "bmr", &round(String.to_float(&1)))
        user_plan_params = Map.update!(user_plan_params, "tdee", &round(String.to_float(&1)))

        # Insert user_plan
        case Accounts.create_user_plan(user.id, user_plan_params) do
          {:ok, user_plan} ->
            # Convert goal_speed to a string
            user_preference_params = Map.update!(user_preference_params, "goal_speed", fn
              nil -> nil # Handle cases where goal_speed might be nil
              val -> to_string(val)
            end)

            # Insert user_preferences
            case Accounts.create_user_preference(user.id, user_plan.id, user_preference_params) do
              {:ok, _user_preference} ->
                conn
                |> put_status(:created)
                |> json(%{
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  clerk_id: user.clerk_id,
                  inserted_at: user.inserted_at,
                  updated_at: user.updated_at
                })

              {:error, changeset} ->
                IO.inspect(changeset.errors, label: "UserPreference Changeset Errors")
                conn
                |> put_status(:unprocessable_entity)
                |> json(%{errors: Ecto.Changeset.traverse_errors(changeset, &translate_error/1)})
            end

          {:error, changeset} ->
            IO.inspect(changeset.errors, label: "UserPlan Changeset Errors")
            conn
            |> put_status(:unprocessable_entity)
            |> json(%{errors: Ecto.Changeset.traverse_errors(changeset, &translate_error/1)})
        end

      {:error, changeset} ->
        IO.inspect(changeset.errors, label: "User Changeset Errors")
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: Ecto.Changeset.traverse_errors(changeset, &translate_error/1)})
    end
  end

  def get_user_by_clerk_id(conn, %{"clerk_id" => clerk_id}) do
    case Accounts.get_user_by_clerk_id(clerk_id) do
      nil ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "User not found"})

      user ->
        # Send back the user data as JSON
        conn
        |> put_status(:ok)
        |> json(%{
          id: user.id,
          name: user.name,
          email: user.email,
          clerk_id: user.clerk_id,  # Ensure this is in snake_case
          birthday: user.birthday,
          gender: user.gender,
          inserted_at: user.inserted_at,
          updated_at: user.updated_at
        })
    end
  end

  def get_user_preferences(conn, %{"user_id" => user_id}) do
    case Accounts.get_user_preferences(user_id) do
      nil ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "User preferences not found"})

      user_preferences ->
        conn
        |> put_status(:ok)
        |> json(%{user_preferences: user_preferences})
    end
  end

  defp translate_error({msg, opts}) do
    Enum.reduce(opts, msg, fn {key, value}, acc ->
      String.replace(acc, "%{#{key}}", to_string(value))
    end)
  end
end
