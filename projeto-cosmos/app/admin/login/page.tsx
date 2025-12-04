"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Salva token no localStorage
        localStorage.setItem('adminToken', data.token);
        router.push('/admin');
      } else {
        setError(data.error || 'Senha incorreta');
      }
    } catch {
      setError('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "Inter, system-ui, sans-serif",
      color: "#fff"
    }}>
      <div style={{
        maxWidth: 400,
        width: "100%",
        background: "#1e2746",
        padding: 40,
        borderRadius: 12,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ 
            fontSize: 36, 
            fontWeight: 900, 
            margin: 0,
            background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            🔐 Admin Login
          </h1>
          <p style={{ fontSize: 14, color: "#a0aec0", marginTop: 8 }}>
            Acesso exclusivo para administradores
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 24 }}>
            <label style={{ 
              display: "block", 
              fontSize: 14, 
              fontWeight: 600, 
              marginBottom: 8,
              color: "#cbd5e0"
            }}>
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Digite a senha de admin"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 8,
                border: "2px solid #2d3748",
                background: "#0f1420",
                color: "#fff",
                fontSize: 16,
                outline: "none",
                boxSizing: "border-box",
                opacity: loading ? 0.5 : 1,
                cursor: loading ? "not-allowed" : "text"
              }}
              onFocus={(e) => !loading && (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => e.target.style.borderColor = "#2d3748"}
            />
          </div>

          {error && (
            <div style={{ 
              padding: 12, 
              borderRadius: 8, 
              background: "#f5656544",
              color: "#f56565",
              fontSize: 14,
              marginBottom: 16,
              textAlign: "center"
            }}>
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 8,
              border: "none",
              background: (loading || !password) ? "#4a5568" : "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              fontSize: 16,
              fontWeight: 700,
              cursor: (loading || !password) ? "not-allowed" : "pointer",
              transition: "transform 0.2s, opacity 0.2s",
              opacity: (loading || !password) ? 0.6 : 1
            }}
            onMouseOver={(e) => !loading && password && (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div style={{ 
          marginTop: 24, 
          textAlign: "center",
          fontSize: 13,
          color: "#718096"
        }}>
          <Link 
            href="/" 
            style={{ 
              color: "#667eea", 
              textDecoration: "none",
              fontWeight: 600
            }}
            onMouseOver={(e) => e.currentTarget.style.textDecoration = "underline"}
            onMouseOut={(e) => e.currentTarget.style.textDecoration = "none"}
          >
            ← Voltar ao Ranking
          </Link>
        </div>

      </div>
    </div>
  );
}
