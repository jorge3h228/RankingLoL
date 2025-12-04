"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { Orbitron, Space_Mono } from "next/font/google";

const orbitron = Orbitron({ 
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-orbitron"
});

const spaceMono = Space_Mono({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono"
});

interface Player {
  id: number;
  game_name: string;
  tag_line: string;
  tier?: string;
  rank?: string;
  league_points?: number;
  wins?: number;
  losses?: number;
  kda?: {
    kills: number;
    deaths: number;
    assists: number;
  };
  cs?: number;
  visionScore?: number;
  topChampions?: Array<{
    championId: string;
    championName: string;
    championIcon: string;
    games: number;
    winRate: number;
  }>;
  totalLPGained?: number;
}

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [mockMode, setMockMode] = useState(false);

  const loadPlayers = useCallback(async () => {
    try {
      const res = await fetch('/api/players');
      const data = await res.json();
      setPlayers(data.players || []);
      setMockMode(data.mockMode);
    } catch (error) {
      console.error('Erro ao carregar jogadores:', error);
    }
  }, []);

  useEffect(() => {
    loadPlayers();
  }, [loadPlayers]);

  // Gera posições das estrelas uma vez
  const stars = useMemo(() => {
    // Gera valores aleatórios fora do render
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 60; i++) {
        starArray.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          animation: Math.floor(Math.random() * 3),
          animationDuration: 2 + Math.random() * 3,
          animationDelay: Math.random() * 5
        });
      }
      return starArray;
    };
    return generateStars();
  }, []);

  const sortedPlayers = [...players].sort((a, b) => (b.league_points || 0) - (a.league_points || 0));

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #0a0015 0%, #1a0033 25%, #2d1b4e 50%, #1a0033 75%, #0a0015 100%)",
      backgroundSize: "400% 400%",
      animation: "gradientShift 15s ease infinite",
      padding: "40px 20px",
      fontFamily: "Inter, system-ui, sans-serif",
      color: "#fff",
      position: "relative",
      overflow: "hidden"
    }}>
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes twinkle2 {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.2; }
        }
        @keyframes twinkle3 {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.3; }
        }
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 2px rgba(255, 255, 255, 0.8);
        }
      `}</style>

      {/* Estrelas de fundo */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden", zIndex: 0 }}>
        {stars.map((star) => {
          const animations = ['twinkle', 'twinkle2', 'twinkle3'];
          return (
            <div
              key={star.id}
              className="star"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                animation: `${animations[star.animation]} ${star.animationDuration}s infinite`,
                animationDelay: `${star.animationDelay}s`
              }}
            />
          );
        })}
      </div>
      
      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
        
        <header style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            gap: 16,
            marginBottom: 16,
            animation: "float 3s ease-in-out infinite"
          }}>
            <img 
              src="/assets/images/cosmos-icone.png" 
              alt="Logo Cosmos" 
              style={{ 
                width: 160, 
                height: 160,
                filter: "drop-shadow(0 0 20px rgba(138, 43, 226, 0.6))",
                borderRadius: "50%"
              }}
            />
          </div>
          <h1 style={{ 
            fontSize: 56, 
            fontWeight: 900, 
            margin: 0,
            color: "#49058aff",
            letterSpacing: "4px",
            textShadow: "0 0 30px rgba(54, 2, 78, 0.5), 0 0 60px rgba(168, 85, 247, 0.3)",
            fontFamily: orbitron.style.fontFamily,
            textTransform: "uppercase",
            fontVariantNumeric: "tabular-nums"
          }}>
            PROJETO COSMOS
          </h1>
          <p style={{ 
            fontSize: 18, 
            color: "#c4b5fd", 
            marginTop: 12,
            fontWeight: 300,
            letterSpacing: "1px",
            fontFamily: spaceMono.style.fontFamily
          }}>
            ✨ Ranking Interestelar do LoL • Comunidade Discord Cosmos ✨
          </p>
          <div style={{ marginTop: 16 }}>
            {mockMode && (
              <div style={{ 
                padding: "10px 18px", 
                background: "rgba(139, 92, 246, 0.2)", 
                border: "1px solid rgba(168, 85, 247, 0.4)",
                borderRadius: 10, 
                display: "inline-block",
                fontSize: 13,
                color: "#e9d5ff",
                marginRight: 12,
                backdropFilter: "blur(10px)"
              }}>
                🔧 Modo Mock ativo
              </div>
            )}
            <Link href="/admin/login" style={{ 
              display: "inline-block",
              padding: "12px 24px",
              background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
              borderRadius: 10,
              textDecoration: "none",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              transition: "all 0.3s",
              boxShadow: "0 4px 15px rgba(139, 92, 246, 0.4)",
              border: "1px solid rgba(168, 85, 247, 0.3)"
            }} 
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 25px rgba(139, 92, 246, 0.6)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(139, 92, 246, 0.4)";
            }}
            >
              🔐 Painel Admin
            </Link>
          </div>
        </header>

        <section style={{ 
          background: "rgba(26, 0, 51, 0.6)", 
          padding: 28, 
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(139, 92, 246, 0.2)",
          border: "1px solid rgba(168, 85, 247, 0.2)",
          backdropFilter: "blur(10px)"
        }}>
          <h2 style={{ 
            fontSize: 28, 
            marginBottom: 24, 
            fontWeight: 700,
            background: "linear-gradient(90deg, #a855f7 0%, #ec4899 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: orbitron.style.fontFamily,
            letterSpacing: "2px",
            textTransform: "uppercase"
          }}>
            🏆 Ranking Interestelar
          </h2>

          {sortedPlayers.length === 0 ? (
            <p style={{ textAlign: "center", color: "#c4b5fd", padding: 50, fontSize: 16 }}>
              ✨ Nenhum jogador cadastrado ainda ✨
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {sortedPlayers.map((player, index) => (
                <div
                  key={player.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 18,
                    background: index === 0 
                      ? "linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)" 
                      : "rgba(10, 0, 21, 0.4)",
                    borderRadius: 12,
                    border: index === 0 
                      ? "2px solid rgba(168, 85, 247, 0.6)" 
                      : "1px solid rgba(168, 85, 247, 0.2)",
                    transition: "all 0.3s",
                    boxShadow: index === 0 
                      ? "0 4px 20px rgba(168, 85, 247, 0.3)" 
                      : "none",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(168, 85, 247, 0.4)";
                    e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.6)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = index === 0 ? "0 4px 20px rgba(168, 85, 247, 0.3)" : "none";
                    e.currentTarget.style.borderColor = index === 0 ? "rgba(168, 85, 247, 0.6)" : "rgba(168, 85, 247, 0.2)";
                  }}
                >
                  {/* Linha 1: Posição, Nome, Tier/Rank, LP */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 16,
                    paddingBottom: 16,
                    borderBottom: "1px solid rgba(168, 85, 247, 0.2)"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
                      <span style={{ 
                        fontSize: 26, 
                        fontWeight: 900, 
                        color: index === 0 ? "#a855f7" : "#9333ea",
                        minWidth: 45,
                        textShadow: index === 0 ? "0 0 10px rgba(168, 85, 247, 0.5)" : "none"
                      }}>
                        #{index + 1}
                      </span>
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 700, color: "#f3e8ff", fontFamily: spaceMono.style.fontFamily }}>
                          {player.game_name}#{player.tag_line}
                        </div>
                        <div style={{ fontSize: 12, color: "#c4b5fd", marginTop: 2 }}>
                          {player.tier} {player.rank}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 20, fontWeight: 900, color: index === 0 ? "#a855f7" : "#9333ea" }}>
                        {player.league_points} LP
                      </div>
                      <div style={{ fontSize: 12, color: "#ec4899", marginTop: 4, fontWeight: 600 }}>
                        {player.totalLPGained ? (
                          <>
                            {player.totalLPGained > 0 ? "+" : ""}{player.totalLPGained} PDL
                          </>
                        ) : (
                          "—"
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Linha 2: Top 3 Campeões */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 16,
                    paddingBottom: 16,
                    borderBottom: "1px solid rgba(168, 85, 247, 0.2)"
                  }}>
                    <span style={{ fontSize: 12, color: "#a855f7", fontWeight: 700, minWidth: 80 }}>
                      TOP CAMPEÕES
                    </span>
                    <div style={{ display: "flex", gap: 10, flex: 1 }}>
                      {player.topChampions && player.topChampions.length > 0 ? (
                        player.topChampions.slice(0, 3).map((champ, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: 4
                            }}
                          >
                            {/* Placeholder para ícone do campeão */}
                            <div
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 8,
                                background: champ.championIcon || "linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%)",
                                border: "2px solid rgba(168, 85, 247, 0.4)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 24,
                                overflow: "hidden"
                              }}
                            >
                              {champ.championIcon ? (
                                <img
                                  src={champ.championIcon}
                                  alt={champ.championName}
                                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                              ) : (
                                "?"
                              )}
                            </div>
                            <div style={{ fontSize: 11, color: "#c4b5fd", textAlign: "center", fontWeight: 600 }}>
                              {champ.winRate}%
                            </div>
                            <div style={{ fontSize: 10, color: "#9333ea" }}>
                              {champ.games}J
                            </div>
                          </div>
                        ))
                      ) : (
                        <div style={{ color: "#9333ea", fontSize: 12 }}>
                          Sem dados
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Linha 3: Estatísticas (KDA, CS, Vision Score, Vitórias/Derrotas) */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: 12
                  }}>
                    {/* KDA */}
                    <div style={{
                      background: "rgba(139, 92, 246, 0.1)",
                      padding: 12,
                      borderRadius: 8,
                      border: "1px solid rgba(168, 85, 247, 0.2)",
                      textAlign: "center"
                    }}>
                      <div style={{ fontSize: 11, color: "#a855f7", fontWeight: 700, marginBottom: 6 }}>
                        KDA
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#f3e8ff" }}>
                        {player.kda ? `${player.kda.kills}/${player.kda.deaths}/${player.kda.assists}` : "—"}
                      </div>
                      <div style={{ fontSize: 10, color: "#9333ea", marginTop: 4 }}>
                        {player.kda ? ((player.kda.kills + player.kda.assists) / Math.max(player.kda.deaths, 1)).toFixed(2) : "0.00"} KDA
                      </div>
                    </div>

                    {/* CS */}
                    <div style={{
                      background: "rgba(236, 72, 153, 0.1)",
                      padding: 12,
                      borderRadius: 8,
                      border: "1px solid rgba(236, 72, 153, 0.2)",
                      textAlign: "center"
                    }}>
                      <div style={{ fontSize: 11, color: "#ec4899", fontWeight: 700, marginBottom: 6 }}>
                        CS
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#f3e8ff" }}>
                        {player.cs || "—"}
                      </div>
                      <div style={{ fontSize: 10, color: "#9333ea", marginTop: 4 }}>
                        Minions abatidos
                      </div>
                    </div>

                    {/* Vision Score */}
                    <div style={{
                      background: "rgba(139, 92, 246, 0.1)",
                      padding: 12,
                      borderRadius: 8,
                      border: "1px solid rgba(168, 85, 247, 0.2)",
                      textAlign: "center"
                    }}>
                      <div style={{ fontSize: 11, color: "#a855f7", fontWeight: 700, marginBottom: 6 }}>
                        VISÃO
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#f3e8ff" }}>
                        {player.visionScore || "—"}
                      </div>
                      <div style={{ fontSize: 10, color: "#9333ea", marginTop: 4 }}>
                        Vision Score
                      </div>
                    </div>

                    {/* Vitórias/Derrotas */}
                    <div style={{
                      background: "rgba(139, 92, 246, 0.1)",
                      padding: 12,
                      borderRadius: 8,
                      border: "1px solid rgba(168, 85, 247, 0.2)",
                      textAlign: "center"
                    }}>
                      <div style={{ fontSize: 11, color: "#a855f7", fontWeight: 700, marginBottom: 6 }}>
                        TAXA
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-around", gap: 4 }}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#86efac" }}>
                            {player.wins}
                          </div>
                          <div style={{ fontSize: 10, color: "#86efac" }}>V</div>
                        </div>
                        <div style={{ color: "#9333ea" }}>|</div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#fca5a5" }}>
                            {player.losses}
                          </div>
                          <div style={{ fontSize: 10, color: "#fca5a5" }}>D</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
