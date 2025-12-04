"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Player {
  id: number;
  game_name: string;
  tag_line: string;
  tier?: string;
  rank?: string;
  league_points?: number;
  wins?: number;
  losses?: number;
}

export default function AdminPanel() {
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [message, setMessage] = useState("");
  const [mockMode, setMockMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    // Valida token no servidor
    try {
      const res = await fetch('/api/admin/validate', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        // Token inválido ou expirado
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
        return;
      }

      setIsAuthenticated(true);
      setChecking(false);
      loadPlayers();
    } catch {
      localStorage.removeItem('adminToken');
      router.push('/admin/login');
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  function handleLogout() {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  }

  async function loadPlayers() {
    try {
      const res = await fetch('/api/players');
      const data = await res.json();
      setPlayers(data.players || []);
      setMockMode(data.mockMode);
    } catch {
      console.error('Erro ao carregar jogadores');
    }
  }

  async function addPlayer() {
    if (!gameName || !tagLine) {
      setMessage("❌ Preencha o nome e tag do jogador");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem('adminToken');
      
      const res = await fetch('/api/players', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          gameName, 
          tagLine: tagLine.replace("#", "") 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          setMessage("❌ Sessão expirada. Faça login novamente.");
          localStorage.removeItem('adminToken');
          router.push('/admin/login');
          return;
        }
        setMessage(`❌ ${data.error || 'Erro ao adicionar jogador'}`);
        setLoading(false);
        return;
      }

      setMessage("✅ Jogador adicionado com sucesso!");
      setGameName("");
      setTagLine("");
      
      await loadPlayers();
    } catch {
      setMessage("❌ Erro ao adicionar jogador");
    } finally {
      setLoading(false);
    }
  }

  async function removePlayer(id: number) {
    if (!confirm("Tem certeza que deseja remover este jogador?")) return;

    try {
      const token = localStorage.getItem('adminToken');
      
      const res = await fetch(`/api/players?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        if (res.status === 401) {
          setMessage("❌ Sessão expirada. Faça login novamente.");
          localStorage.removeItem('adminToken');
          router.push('/admin/login');
          return;
        }
        setMessage("❌ Erro ao remover jogador");
        return;
      }

      setMessage("🗑️ Jogador removido com sucesso!");
      await loadPlayers();
    } catch {
      setMessage("❌ Erro ao remover jogador");
    }
  }

  const sortedPlayers = [...players].sort((a, b) => (b.league_points || 0) - (a.league_points || 0));

  if (checking) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        background: "linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: 18
      }}>
        Verificando autenticação...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)",
      padding: "40px 20px",
      fontFamily: "Inter, system-ui, sans-serif",
      color: "#fff"
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        
        <header style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <Link href="/" style={{ 
              display: "inline-block",
              padding: "10px 16px",
              background: "#2d3748",
              borderRadius: 8,
              textDecoration: "none",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              transition: "transform 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              ← Voltar ao Ranking
            </Link>
            
            <button
              onClick={handleLogout}
              style={{
                padding: "10px 16px",
                background: "#742a2a",
                borderRadius: 8,
                border: "none",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "transform 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              🚪 Sair
            </button>
          </div>
          
          <h1 style={{ fontSize: 48, fontWeight: 900, margin: 0, background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            🔐 Painel Admin
          </h1>
          <p style={{ fontSize: 18, color: "#a0aec0", marginTop: 8 }}>
            Gerencie os jogadores do ranking
          </p>
        </header>

        {/* Formulário de Cadastro */}
        <section style={{ 
          background: "#1e2746", 
          padding: 24, 
          borderRadius: 12, 
          marginBottom: 32,
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
        }}>
          <h2 style={{ fontSize: 24, marginBottom: 16, fontWeight: 700 }}>
            ➕ Adicionar Jogador
          </h2>
          
          <div style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
            <input
              value={gameName}
              onChange={e => setGameName(e.target.value)}
              placeholder="Nome do jogador"
              disabled={loading}
              style={{
                flex: 1,
                minWidth: 200,
                padding: "12px 16px",
                borderRadius: 8,
                border: "2px solid #2d3748",
                background: "#0f1420",
                color: "#fff",
                fontSize: 16,
                outline: "none",
                opacity: loading ? 0.5 : 1,
                cursor: loading ? "not-allowed" : "text"
              }}
              onFocus={(e) => !loading && (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => e.target.style.borderColor = "#2d3748"}
            />
            <input
              value={tagLine}
              onChange={e => setTagLine(e.target.value)}
              placeholder="Tag (#BR1)"
              disabled={loading}
              style={{
                flex: 1,
                minWidth: 150,
                padding: "12px 16px",
                borderRadius: 8,
                border: "2px solid #2d3748",
                background: "#0f1420",
                color: "#fff",
                fontSize: 16,
                outline: "none",
                opacity: loading ? 0.5 : 1,
                cursor: loading ? "not-allowed" : "text"
              }}
              onFocus={(e) => !loading && (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => e.target.style.borderColor = "#2d3748"}
            />
            <button
              onClick={addPlayer}
              disabled={loading}
              style={{
                padding: "12px 32px",
                borderRadius: 8,
                border: "none",
                background: loading ? "#4a5568" : "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                color: "#fff",
                fontSize: 16,
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) => !loading && (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              {loading ? "Adicionando..." : "Adicionar"}
            </button>
          </div>

          {message && (
            <div style={{ 
              padding: 12, 
              borderRadius: 8, 
              background: message.includes("✅") ? "#10b98144" : "#f5656544",
              color: "#fff",
              fontSize: 14,
              marginTop: 12
            }}>
              {message}
            </div>
          )}

          {mockMode && (
            <div style={{ 
              marginTop: 12,
              padding: "12px 16px",
              background: "#2d3748",
              borderRadius: 8,
              fontSize: 13,
              color: "#fbbf24",
              borderLeft: "4px solid #fbbf24"
            }}>
              ℹ️ Modo Mock ativo: Jogadores serão cadastrados com dados padrão (UNRANKED, 0 LP). Quando configurar a API key da Riot, os dados serão atualizados automaticamente.
            </div>
          )}
        </section>

        {/* Lista de Jogadores */}
        <section style={{ 
          background: "#1e2746", 
          padding: 24, 
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
        }}>
          <h2 style={{ fontSize: 24, marginBottom: 20, fontWeight: 700 }}>
            👥 Jogadores Cadastrados ({players.length})
          </h2>

          {sortedPlayers.length === 0 ? (
            <p style={{ textAlign: "center", color: "#a0aec0", padding: 40 }}>
              Nenhum jogador cadastrado ainda
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {sortedPlayers.map((player, index) => (
                <div
                  key={player.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 16,
                    background: "#0f1420",
                    borderRadius: 8,
                    border: "1px solid #2d3748",
                    transition: "transform 0.2s, background 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateX(4px)";
                    e.currentTarget.style.background = "#1a202c";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.background = "#0f1420";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
                    <span style={{ 
                      fontSize: 20, 
                      fontWeight: 900, 
                      color: "#667eea",
                      minWidth: 40,
                      textAlign: "center"
                    }}>
                      {index + 1}
                    </span>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700 }}>
                        {player.game_name}#{player.tag_line}
                      </div>
                      <div style={{ fontSize: 14, color: "#a0aec0", marginTop: 4 }}>
                        {player.tier} {player.rank} • {player.league_points} LP • {player.wins}V {player.losses}D
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removePlayer(player.id)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 6,
                      border: "none",
                      background: "#742a2a",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: 14,
                      fontWeight: 600,
                      transition: "background 0.2s"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = "#991b1b"}
                    onMouseOut={(e) => e.currentTarget.style.background = "#742a2a"}
                  >
                    🗑️ Remover
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
