"use client";

import { useCallback } from "react";
import { useSettings } from "@/contexts/settings-context";

export function useSound() {
  const { soundEnabled } = useSettings();

  const playSound = useCallback(
    (type: "click" | "hover" | "success" | "error" | "notification") => {
      if (!soundEnabled || typeof window === "undefined") return;

      // Create audio context for better performance
      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const audioContext = new AudioContextClass();

      const playTone = (
        frequency: number,
        duration: number,
        type: OscillatorType = "sine",
      ) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(
          frequency,
          audioContext.currentTime,
        );
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + duration,
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      };

      switch (type) {
        case "click":
          playTone(800, 0.1, "square");
          break;
        case "hover":
          playTone(600, 0.05, "sine");
          break;
        case "success":
          playTone(523, 0.2, "sine"); // C note
          setTimeout(() => playTone(659, 0.2, "sine"), 100); // E note
          break;
        case "error":
          playTone(300, 0.3, "sawtooth");
          break;
        case "notification":
          playTone(800, 0.1, "sine");
          setTimeout(() => playTone(1000, 0.1, "sine"), 150);
          break;
      }
    },
    [soundEnabled],
  );

  return { playSound };
}
