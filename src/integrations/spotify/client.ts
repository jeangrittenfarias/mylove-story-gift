const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = "http://127.0.0.1:8080/callback";

// Get access token from Spotify
export async function getSpotifyToken(): Promise<string | null> {
  const token = localStorage.getItem("spotify_token");
  const expiry = localStorage.getItem("spotify_token_expiry");

  if (token && expiry && new Date().getTime() < parseInt(expiry)) {
    return token;
  }

  // Check for code in URL (callback)
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  if (code) {
    return await exchangeCodeForToken(code);
  }

  return null;
}

// Exchange authorization code for access token
async function exchangeCodeForToken(code: string): Promise<string | null> {
  try {
    // Call backend to exchange code (or use client-side)
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
      }),
    });

    const data = await response.json();

    if (data.access_token) {
      localStorage.setItem("spotify_token", data.access_token);
      localStorage.setItem("spotify_token_expiry", (new Date().getTime() + data.expires_in * 1000).toString());
      return data.access_token;
    }
  } catch (error) {
    console.error("Error exchanging token:", error);
  }

  return null;
}

// Initiate Spotify login
export function loginWithSpotify() {
  const scopes = ["streaming", "user-read-private", "user-read-email"];
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: scopes.join(" "),
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params}`;
}

// Search for tracks on Spotify
export async function searchTracks(query: string, token: string): Promise<SpotifyTrack[]> {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    return data.tracks?.items?.map((track: any) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0]?.name || "Unknown",
      album: track.album?.name || "",
      image: track.album?.images?.[0]?.url || "",
      uri: track.uri,
      duration: track.duration_ms,
    })) || [];
  } catch (error) {
    console.error("Error searching tracks:", error);
    return [];
  }
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  image: string;
  uri: string;
  duration: number;
}
