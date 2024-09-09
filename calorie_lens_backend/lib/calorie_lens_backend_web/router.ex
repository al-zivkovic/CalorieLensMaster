defmodule CalorieLensBackendWeb.Router do
  use CalorieLensBackendWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", CalorieLensBackendWeb do
    pipe_through :api

    post "/users", UserController, :create

    get "/users/:clerkId", UserController, :get_user_by_clerk_id

    get "/users/:user_id/user_info", UserController, :get_user_info
  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:calorie_lens_backend, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through [:fetch_session, :protect_from_forgery]

      live_dashboard "/dashboard", metrics: CalorieLensBackendWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
