defmodule CalorieLensBackend.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :name, :string
    field :email, :string
    field :clerkId, :string

    has_one :user_info, CalorieLensBackend.Accounts.UserInfo

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :clerkId])
    |> validate_required([:name, :email, :clerkId])
    |> unique_constraint(:email)
  end
end
