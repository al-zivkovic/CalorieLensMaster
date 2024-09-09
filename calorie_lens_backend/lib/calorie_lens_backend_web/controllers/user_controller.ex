defmodule CalorieLensBackendWeb.UserController do
  use CalorieLensBackendWeb, :controller

  alias CalorieLensBackend.Accounts

  def create(conn, %{"user" => user_params}) do
    user_info_params = Map.get(user_params, "user_info", %{})
    user_params = Map.drop(user_params, ["user_info"])

    case Accounts.create_user(user_params) do
      {:ok, user} ->
        user_info_params = Map.put(user_info_params, "user_id", user.id)
        case Accounts.create_user_info(user_info_params) do
          {:ok, _user_info} ->
            conn
            |> put_status(:created)
            |> json(%{
              id: user.id,
              name: user.name,
              email: user.email,
              clerkId: user.clerkId,
              inserted_at: user.inserted_at,
              updated_at: user.updated_at,
            })
          {:error, changeset} ->
            IO.inspect changeset.errors, label: "UserInfo Changeset Errors"
            conn
            |> put_status(:unprocessable_entity)
            |> json(%{errors: Ecto.Changeset.traverse_errors(changeset, &translate_error/1)})
        end

      {:error, changeset} ->
        IO.inspect changeset.errors, label: "User Changeset Errors"
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: Ecto.Changeset.traverse_errors(changeset, &translate_error/1)})
    end
  end

  def get_user_by_clerk_id(conn, %{"clerkId" => clerk_id}) do
    case Accounts.get_user_by_clerk_id(clerk_id) do
      nil ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "User not found"})

      user ->
        conn
        |> put_status(:ok)
        |> json(%{id: user.id, name: user.name, email: user.email})
    end
  end

  def get_user_info(conn, %{"user_id" => user_id}) do
    case Accounts.get_user_info(user_id) do
      nil ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "User info not found"})

      user_info ->
        conn
        |> put_status(:ok)
        |> json(%{user_info: user_info})
    end
  end

  defp translate_error({msg, opts}) do
    Enum.reduce(opts, msg, fn {key, value}, acc ->
      String.replace(acc, "%{#{key}}", to_string(value))
    end)
  end
end
