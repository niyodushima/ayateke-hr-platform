const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function loginUser(credentials) {
  try {
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const userData = await response.json(); // { token, user: { name, role } }
    return userData;
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
}
