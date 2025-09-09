import axios from "axios";

export class AuthService {
  // Implement authentication methods here

  constructor() {
    
  }

  getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  async login(email: string, password: string): Promise<boolean> {
    try {

      let data = {
        'grant_type': 'password',
        'client_id': 'bookmaster-public-client',
        'scope': 'email openid',
        'username': email,
        'password': password
      };

      let config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_AUTH_URL}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: new URLSearchParams(data).toString()
      };

      const response = await axios.request(config);

      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}
