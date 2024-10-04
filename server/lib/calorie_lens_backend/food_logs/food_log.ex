defmodule CalorieLensBackend.FoodLogs.FoodLog do
  use Ecto.Schema
  import Ecto.Changeset

  schema "food_logs" do
    field :name, :string
    field :description, :string
    field :food_image, :binary
    field :calories, :integer
    field :fat, :integer
    field :protein, :integer
    field :carbs, :integer

    belongs_to :user, CalorieLensBackend.Accounts.User

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(food_log, attrs) do
    food_log
    |> cast(attrs, [:name, :description, :food_image, :calories, :fat, :protein, :carbs, :user_id])
    |> validate_required([:name, :calories, :fat, :protein, :carbs, :user_id])
  end
end
