defmodule CalorieLensBackend.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
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

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user, attrs) do
    # Ensure we're merging correct keys from the front end into Ecto fields

    user
    |> cast(attrs, [
      :day,
      :month,
      :year,
      :gender,
      :unit,
      :height,
      :weight,
      :activity,
      :goal,
      :goal_weight,
      :goal_speed,
      :plan
    ])
    |> validate_required([
      :day,
      :month,
      :year,
      :gender,
      :unit,
      :height,
      :weight,
      :activity,
      :goal,
      :plan
    ])
  end
end
