defmodule CalorieLensBackend.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      CalorieLensBackendWeb.Telemetry,
      CalorieLensBackend.Repo,
      {DNSCluster, query: Application.get_env(:calorie_lens_backend, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: CalorieLensBackend.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: CalorieLensBackend.Finch},
      # Start a worker by calling: CalorieLensBackend.Worker.start_link(arg)
      # {CalorieLensBackend.Worker, arg},
      # Start to serve requests, typically the last entry
      CalorieLensBackendWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: CalorieLensBackend.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    CalorieLensBackendWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
