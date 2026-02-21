import { Bot, BotFormData } from './types';

const API_BASE = '/api/bots';

// Get all bots
export async function getBots(): Promise<Bot[]> {
  try {
    const response = await fetch(API_BASE);
    if (!response.ok) {
      throw new Error('Failed to fetch bots');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching bots:', error);
    throw error;
  }
}

// Create new bot
export async function createBot(data: BotFormData): Promise<Bot> {
  try {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create bot');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating bot:', error);
    throw error;
  }
}

// Update bot
export async function updateBot(id: string, data: Partial<BotFormData>): Promise<Bot> {
  try {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update bot');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating bot:', error);
    throw error;
  }
}

// Delete bot
export async function deleteBot(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete bot');
    }
  } catch (error) {
    console.error('Error deleting bot:', error);
    throw error;
  }
}
