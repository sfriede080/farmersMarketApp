const syncUser = async (user, getAccessTokenSilently) => {
  const token = await getAccessTokenSilently();

  const response = await fetch(`${BASE_URL}/users/sync`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      auth0_id: user.sub,
      email: user.email,
      name: user.name,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to sync user");
  }

  return response.json();
};

export { syncUser };
