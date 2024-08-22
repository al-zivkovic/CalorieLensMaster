defmodule CalorieLensBackend.AccountsTest do
  use CalorieLensBackend.DataCase

  alias CalorieLensBackend.Accounts

  describe "users" do
    alias CalorieLensBackend.Accounts.User

    import CalorieLensBackend.AccountsFixtures

    @invalid_attrs %{unit: nil, month: nil, day: nil, year: nil, plan: nil, gender: nil, height: nil, weight: nil, activity: nil, goal: nil, goal_weight: nil, goal_speed: nil}

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert Accounts.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Accounts.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      valid_attrs = %{unit: "some unit", month: 42, day: 42, year: 42, plan: %{}, gender: "some gender", height: 120.5, weight: 120.5, activity: "some activity", goal: "some goal", goal_weight: 120.5, goal_speed: 120.5}

      assert {:ok, %User{} = user} = Accounts.create_user(valid_attrs)
      assert user.unit == "some unit"
      assert user.month == 42
      assert user.day == 42
      assert user.year == 42
      assert user.plan == %{}
      assert user.gender == "some gender"
      assert user.height == 120.5
      assert user.weight == 120.5
      assert user.activity == "some activity"
      assert user.goal == "some goal"
      assert user.goal_weight == 120.5
      assert user.goal_speed == 120.5
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounts.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      update_attrs = %{unit: "some updated unit", month: 43, day: 43, year: 43, plan: %{}, gender: "some updated gender", height: 456.7, weight: 456.7, activity: "some updated activity", goal: "some updated goal", goal_weight: 456.7, goal_speed: 456.7}

      assert {:ok, %User{} = user} = Accounts.update_user(user, update_attrs)
      assert user.unit == "some updated unit"
      assert user.month == 43
      assert user.day == 43
      assert user.year == 43
      assert user.plan == %{}
      assert user.gender == "some updated gender"
      assert user.height == 456.7
      assert user.weight == 456.7
      assert user.activity == "some updated activity"
      assert user.goal == "some updated goal"
      assert user.goal_weight == 456.7
      assert user.goal_speed == 456.7
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Accounts.update_user(user, @invalid_attrs)
      assert user == Accounts.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Accounts.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Accounts.change_user(user)
    end
  end

  describe "users" do
    alias CalorieLensBackend.Accounts.User

    import CalorieLensBackend.AccountsFixtures

    @invalid_attrs %{}

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert Accounts.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Accounts.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      valid_attrs = %{}

      assert {:ok, %User{} = user} = Accounts.create_user(valid_attrs)
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounts.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      update_attrs = %{}

      assert {:ok, %User{} = user} = Accounts.update_user(user, update_attrs)
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Accounts.update_user(user, @invalid_attrs)
      assert user == Accounts.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Accounts.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Accounts.change_user(user)
    end
  end
end
