defmodule CalorieLensBackend.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :name, :email, :birthday, :gender, :clerk_id, :inserted_at, :updated_at]}
  schema "user" do
    field :name, :string
    field :email, :string
    field :birthday, :date
    field :gender, :string
    field :clerk_id, :string  # change from `:clerkId` to `:clerk_id`

    has_one :user_preference, CalorieLensBackend.UserPreferences.UserPreference
    has_many :food_logs, CalorieLensBackend.FoodLogs.FoodLog

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :birthday, :gender, :clerk_id])
    |> validate_required([:name, :email, :clerk_id])
    |> unique_constraint(:email)
  end
end
