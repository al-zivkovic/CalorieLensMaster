defmodule CalorieLensBackend.UserPlans.UserPlan do
  use Ecto.Schema
  import Ecto.Changeset

  schema "user_plan" do
    field :bmr, :integer
    field :tdee, :integer
    field :caloric_intake, :integer
    field :fat, :integer
    field :protein, :integer
    field :carbs, :integer

    has_many :user_preferences, CalorieLensBackend.UserPreferences.UserPreference

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user_plan, attrs) do
    user_plan
    |> cast(attrs, [:bmr, :tdee, :caloric_intake, :fat, :protein, :carbs])
    |> validate_required([:bmr, :tdee, :caloric_intake, :fat, :protein, :carbs])
  end
end
