defmodule CalorieLensBackend.Accounts.UserInfo do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, except: [:__meta__, :user]} # Derive Jason Encoder, exclude meta and user association
  schema "user_info" do
    field :day, :integer
    field :month, :integer
    field :year, :integer
    field :gender, :string
    field :unit, :string
    field :height, :float
    field :weight, :float
    field :activity, :string
    field :goal, :string
    field :goal_weight, :float
    field :goal_speed, :float
    field :plan, :map
    belongs_to :user, CalorieLensBackend.Accounts.User # This will automatically generate user_id
    timestamps()
  end

  def changeset(user_info, attrs) do
    user_info
    |> cast(attrs, [:day, :month, :year, :gender, :unit, :height, :weight, :activity, :goal, :goal_weight, :goal_speed, :plan, :user_id])
    |> validate_required([:user_id])
  end
end
