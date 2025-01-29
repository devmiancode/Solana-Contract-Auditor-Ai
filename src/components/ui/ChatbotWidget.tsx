'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    VG_CONFIG: any;
  }
}

export function ChatbotWidget() {
  useEffect(() => {
    // Configurar el chat bot
    window.VG_CONFIG = {
      ID: "3qvfw286zq6hs6o3",
      region: 'eu',
      render: 'popup',
      stylesheets: [
        "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css",
      ],
    };

    // Crear y añadir el script
    const script = document.createElement("script");
    script.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="VG_OVERLAY_CONTAINER" style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999,
    }}>
      {/* Here is where TIXAE Agents renders the widget */}
    </div>
  );
} 