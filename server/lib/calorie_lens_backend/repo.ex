defmodule CalorieLensBackend.Repo do
  use Ecto.Repo,
    otp_app: :calorie_lens_backend,
    adapter: Ecto.Adapters.Postgres
end
