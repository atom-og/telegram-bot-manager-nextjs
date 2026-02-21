'use client';

import { useState, useEffect } from 'react';
import { Bot, BotFormData } from '@/lib/types';
import { getBots, createBot, updateBot, deleteBot } from '@/lib/api';

export default function Home() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBot, setEditingBot] = useState<Bot | null>(null);
  const [formData, setFormData] = useState<BotFormData>({
    name: '',
    description: '',
    token: '',
    systemPrompt: '',
    active: true
  });
  const [showTokens, setShowTokens] = useState<Record<string, boolean>>({});
  const [showPrompts, setShowPrompts] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBots();
  }, []);

  const loadBots = async () => {
    try {
      setLoading(true);
      const data = await getBots();
      setBots(data);
      setError(null);
    } catch (err) {
      setError('Failed to load bots');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBot) {
        await updateBot(editingBot.id, formData);
      } else {
        await createBot(formData);
      }
      await loadBots();
      setShowForm(false);
      setEditingBot(null);
      setFormData({ name: '', description: '', token: '', systemPrompt: '', active: true });
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to save bot');
    }
  };

  const handleEdit = (bot: Bot) => {
    setEditingBot(bot);
    setFormData({
      name: bot.name,
      description: bot.description,
      token: bot.token,
      systemPrompt: bot.systemPrompt,
      active: bot.active
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this bot?')) return;
    try {
      await deleteBot(id);
      await loadBots();
      setError(null);
    } catch (err) {
      setError('Failed to delete bot');
    }
  };

  const toggleActive = async (bot: Bot) => {
    try {
      await updateBot(bot.id, { active: !bot.active });
      await loadBots();
      setError(null);
    } catch (err) {
      setError('Failed to update bot status');
    }
  };

  const maskToken = (token: string) => {
    if (token.length <= 10) return token;
    return `${token.slice(0, 6)}...${token.slice(-4)}`;
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingBot(null);
    setFormData({ name: '', description: '', token: '', systemPrompt: '', active: true });
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#f5f3ee] font-[Outfit]">
      {/* Header */}
      <header className="bg-[#0066ff] border-b-4 border-black py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl text-white tracking-tight" style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 800 }}>
            🤖 TELEGRAM BOT MANAGER
          </h1>
          <p className="text-[#f5f3ee] mt-2 text-lg font-semibold">Manage your Telegram bots with MongoDB persistence</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Error Banner */}
        {error && (
          <div className="mb-6 bg-[#ff3366] text-white p-4 border-4 border-black font-bold text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            {error}
          </div>
        )}

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-black">{bots.length}</span>
            <span className="text-lg text-gray-700">Bots Total</span>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#0066ff] text-white px-8 py-4 font-bold text-lg border-4 border-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150"
          >
            + ADD NEW BOT
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="text-3xl font-bold text-[#0066ff] animate-pulse">Loading...</div>
          </div>
        ) : bots.length === 0 ? (
          <div className="text-center py-20 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-6xl mb-4">🤖</div>
            <h2 className="text-3xl font-bold text-black mb-2">No bots yet</h2>
            <p className="text-lg text-gray-600 mb-6">Create your first bot to get started!</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#ff3366] text-white px-8 py-4 font-bold text-lg border-4 border-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150"
            >
              + CREATE FIRST BOT
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bots.map((bot) => (
              <div key={bot.id} className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-150">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-black" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {bot.name}
                    </h3>
                    <button
                      onClick={() => toggleActive(bot)}
                      className={`px-4 py-2 font-bold text-sm border-3 border-black ${
                        bot.active
                          ? 'bg-[#00ff88] text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                          : 'bg-[#ff3366] text-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                      } transition-all duration-150`}
                    >
                      {bot.active ? 'ON' : 'OFF'}
                    </button>
                  </div>

                  <p className="text-gray-700 mb-4 font-medium">{bot.description || 'No description'}</p>

                  <div className="bg-[#f5f3ee] border-3 border-black p-4 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-600">Token:</span>
                      <button
                        onClick={() => setShowTokens(prev => ({ ...prev, [bot.id]: !prev[bot.id] }))}
                        className="text-[#0066ff] font-bold text-sm hover:text-[#ff3366]"
                      >
                        {showTokens[bot.id] ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <div className="font-mono text-sm mt-2 break-all" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {showTokens[bot.id] ? bot.token : maskToken(bot.token)}
                    </div>
                  </div>

                  {bot.systemPrompt && (
                    <div className="bg-[#e8f4ff] border-3 border-black p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-gray-600">System Prompt:</span>
                        <button
                          onClick={() => setShowPrompts(prev => ({ ...prev, [bot.id]: !prev[bot.id] }))}
                          className="text-[#0066ff] font-bold text-sm hover:text-[#ff3366]"
                        >
                          {showPrompts[bot.id] ? 'Hide' : 'Show'}
                        </button>
                      </div>
                      <div className={`text-sm ${showPrompts[bot.id] ? '' : 'line-clamp-2'}`}>
                        {showPrompts[bot.id] ? bot.systemPrompt : bot.systemPrompt.slice(0, 150) + '...'}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(bot)}
                      className="flex-1 bg-[#0066ff] text-white px-4 py-3 font-bold border-3 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => handleDelete(bot.id)}
                      className="flex-1 bg-[#ff3366] text-white px-4 py-3 font-bold border-3 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150"
                    >
                      DELETE
                    </button>
                  </div>

                  <div className="mt-4 pt-4 border-t-3 border-black">
                    <div className="text-xs font-bold text-gray-500">
                      Updated: {new Date(bot.updatedAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full">
            <div className="bg-[#0066ff] text-white p-6 border-b-4 border-black">
              <h2 className="text-2xl font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {editingBot ? 'Edit Bot' : 'Add New Bot'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-6">
                <label className="block font-bold text-black mb-2">Bot Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-3 border-black focus:outline-none focus:border-[#0066ff] font-mono"
                  placeholder="Enter bot name"
                />
              </div>
              <div className="mb-6">
                <label className="block font-bold text-black mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border-3 border-black focus:outline-none focus:border-[#0066ff]"
                  rows={2}
                  placeholder="Enter bot description"
                />
              </div>
              <div className="mb-6">
                <label className="block font-bold text-black mb-2">Bot Token *</label>
                <input
                  type="text"
                  required
                  value={formData.token}
                  onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                  className="w-full px-4 py-3 border-3 border-black focus:outline-none focus:border-[#0066ff] font-mono"
                  placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                />
              </div>
              <div className="mb-6">
                <label className="block font-bold text-black mb-2">System Prompt</label>
                <textarea
                  value={formData.systemPrompt}
                  onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
                  className="w-full px-4 py-3 border-3 border-black focus:outline-none focus:border-[#0066ff] font-mono"
                  rows={5}
                  placeholder="Enter system prompt for the bot..."
                />
                <p className="text-xs text-gray-500 mt-2">Optional: Define the bot's behavior and instructions</p>
              </div>
              <div className="mb-6">
                <label className="flex items-center gap-3 font-bold text-black">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-5 h-5 border-3 border-black"
                  />
                  <span>Active Status</span>
                </label>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#0066ff] text-white px-6 py-4 font-bold text-lg border-3 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150"
                >
                  {editingBot ? 'UPDATE BOT' : 'CREATE BOT'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-[#ff3366] text-white px-6 py-4 font-bold text-lg border-3 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
