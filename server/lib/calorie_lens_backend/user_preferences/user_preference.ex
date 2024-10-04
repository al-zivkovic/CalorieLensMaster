defmodule CalorieLensBackend.UserPreferences.UserPreference do
  use Ecto.Schema
  import Ecto.Changeset

  schema "user_preferences" do
    field :unit, :string
    field :height, :integer
    field :weight, :float
    field :activity, :string
    field :goal, :string
    field :goal_weight, :float
    field :goal_speed, :string

    belongs_to :user, CalorieLensBackend.Accounts.User, foreign_key: :user_id
    belongs_to :user_plan, CalorieLensBackend.UserPlans.UserPlan, foreign_key: :user_plan_id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user_preference, attrs) do
    user_preference
    |> cast(attrs, [
      :unit,
      :height,
      :weight,
      :activity,
      :goal,
      :goal_weight,
      :goal_speed,
      :user_id,
      :user_plan_id
    ])
    |> validate_required([:unit, :height, :weight, :activity, :goal, :user_id, :user_plan_id])
  end
end
