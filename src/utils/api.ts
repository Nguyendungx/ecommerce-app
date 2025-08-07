// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role?: string;
  };
  token: string;
}

export type LoginResponse = ApiResponse<AuthResponse>;

class ApiClient {
  private baseUrl: string;

  constructor() {
    // Fix missing colon in localhost URL if environment variable is not set correctly
    let baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    if (baseUrl.startsWith('http://localhost') && !baseUrl.includes(':8000')) {
      baseUrl = 'http://localhost:8000';
    }
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    // Read token from cookie instead of localStorage
    const token = this.getTokenFromCookie();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const base = this.baseUrl || 'http://localhost:8000';

      const url = `${base.replace(/\/$/, '')}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

      console.log('Making request to:', url);

      const response = await fetch(url, config);
      console.log('Response status:', response.status);

      const data = await response.json();

      if (!response.ok) {
        console.error('API Error:', response.status, data);
        return {
          success: false,
          message: data.message || `HTTP ${response.status}`,
        };
      }

      console.log('API Success:', data);
      return data;
    } catch (error) {
      console.error('API request error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Có lỗi kết nối mạng',
      };
    }
  }

  private getTokenFromCookie(): string | null {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
    return match ? match[2] : null;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    return this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, name: string): Promise<LoginResponse> {
    return this.request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async logout(): Promise<ApiResponse> {
    return this.request('/api/auth/logout', {
      method: 'POST',
    });
  }

  async getProfile(): Promise<ApiResponse<AuthResponse['user']>> {
    return this.request<AuthResponse['user']>('/api/auth/me');
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'GET',
    });
  }

  async post<T, D = unknown>(endpoint: string, data: D): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T, D = unknown>(endpoint: string, data: D): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
