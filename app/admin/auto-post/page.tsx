'use client';

/**
 * Auto-Post Admin Dashboard
 *
 * Simple admin interface to manually trigger article generation.
 * Protected by CRON_SECRET.
 */

import { useState } from 'react';

export default function AutoPostAdminPage() {
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [queueStatus, setQueueStatus] = useState<any>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`/api/auto-post?secret=${encodeURIComponent(secret)}`, {
        method: 'POST',
      });

      const data = await response.json();
      setResult(data);
    } catch (error: any) {
      setResult({
        status: 'error',
        error: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGetStatus = async () => {
    if (!secret) {
      alert('Please enter secret first');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/auto-post?secret=${encodeURIComponent(secret)}`);
      const data = await response.json();
      setQueueStatus(data);
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '40px auto',
      padding: '20px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
        🚀 Auto-Post Admin
      </h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Manual trigger for article generation
      </p>

      {/* Status Card */}
      {queueStatus && (
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '2rem',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{ marginTop: 0 }}>Queue Status</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#666' }}>Pending</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                {queueStatus.queue?.pending || 0}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#666' }}>Done</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#28a745' }}>
                {queueStatus.queue?.done || 0}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#666' }}>Total</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                {queueStatus.queue?.total || 0}
              </div>
            </div>
          </div>
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #dee2e6' }}>
            <div style={{ fontSize: '0.875rem' }}>
              <strong>Max per day:</strong> {queueStatus.config?.maxPerDay || 5}
            </div>
            <div style={{ fontSize: '0.875rem' }}>
              <strong>OpenAI:</strong> {queueStatus.config?.openaiConfigured ? '✅ Configured' : '❌ Not configured'}
            </div>
            <div style={{ fontSize: '0.875rem' }}>
              <strong>Leonardo:</strong> {queueStatus.config?.leonardoConfigured ? '✅ Configured' : '❌ Not configured'}
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleGenerate} style={{
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="secret" style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500'
          }}>
            Secret Key
          </label>
          <input
            id="secret"
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Enter CRON_SECRET"
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              flex: 1,
              padding: '12px 24px',
              background: loading ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s'
            }}
          >
            {loading ? '⏳ Generating...' : '✨ Generate 1 Article'}
          </button>

          <button
            type="button"
            onClick={handleGetStatus}
            disabled={loading}
            style={{
              padding: '12px 24px',
              background: loading ? '#6c757d' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            📊 Get Status
          </button>
        </div>
      </form>

      {/* Result */}
      {result && (
        <div style={{
          background: result.status === 'created' ? '#d4edda' :
            result.status === 'limit-reached' ? '#fff3cd' :
              result.status === 'empty' ? '#d1ecf1' :
                '#f8d7da',
          border: '1px solid ' + (
            result.status === 'created' ? '#c3e6cb' :
              result.status === 'limit-reached' ? '#ffeaa7' :
                result.status === 'empty' ? '#bee5eb' :
                  '#f5c6cb'
          ),
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>
            {result.status === 'created' && '✅ Article Created!'}
            {result.status === 'limit-reached' && '⚠️ Limit Reached'}
            {result.status === 'empty' && 'ℹ️ Queue Empty'}
            {result.status === 'error' && '❌ Error'}
          </h3>

          {result.status === 'created' && (
            <div>
              <p><strong>Title:</strong> {result.title}</p>
              <p><strong>Slug:</strong> <code>{result.slug}</code></p>
              <p><strong>Category:</strong> {result.category}</p>
              {result.duration && (
                <p style={{ fontSize: '0.875rem', color: '#666' }}>
                  Duration: {(result.duration / 1000).toFixed(1)}s
                </p>
              )}
            </div>
          )}

          {result.status === 'limit-reached' && (
            <div>
              <p>{result.message}</p>
              <p><strong>Current:</strong> {result.current} / {result.limit}</p>
            </div>
          )}

          {result.status === 'empty' && (
            <p>{result.message}</p>
          )}

          {result.status === 'error' && (
            <div>
              <p><strong>Error:</strong> {result.error}</p>
              {result.topic && <p><strong>Topic:</strong> {result.topic}</p>}
            </div>
          )}

          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontSize: '0.875rem' }}>
              View Raw JSON
            </summary>
            <pre style={{
              background: '#f8f9fa',
              padding: '10px',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '0.75rem'
            }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </details>
        </div>
      )}

      {/* Info */}
      <div style={{
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #dee2e6',
        fontSize: '0.875rem'
      }}>
        <h4 style={{ marginTop: 0 }}>ℹ️ Info</h4>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li>This generates 1 article from the auto-queue.json</li>
          <li>Uses OpenAI for content + Leonardo.ai for images</li>
          <li>Limited to MAX_AUTO_POSTS_PER_DAY (default: 5 per day)</li>
          <li>Vercel Cron auto-triggers every 2 hours</li>
        </ul>
      </div>
    </div>
  );
}
