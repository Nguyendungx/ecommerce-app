import { apiClient } from './api';

export async function testApiConnection() {
  try {
    // Test a simple GET request to backend root or health check endpoint
    const response = await apiClient.get('/api/healthcheck');
    if (response.success) {
      console.log('API connection successful:', response.data);
      return true;
    } else {
      console.error('API connection failed:', response.message);
      return false;
    }
  } catch (error) {
    console.error('API connection error:', error);
    return false;
  }
}
