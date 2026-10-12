import React, { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AmbientAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Soft pink noise / warm evening terrace breeze generator
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.05;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      whiteNoise.start();

      // Gentle warm acoustic chime / cutting glass clink simulation
      const playChime = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const chimeCtx = audioCtxRef.current;
        const freqs = [587.33, 659.25, 783.99, 880.0, 1046.5];
        const freq = freqs[Math.floor(Math.random() * freqs.length)];

        const osc = chimeCtx.createOscillator();
        const noteGain = chimeCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, chimeCtx.currentTime);

        noteGain.gain.setValueAtTime(0.001, chimeCtx.currentTime);
        noteGain.gain.exponentialRampToValueAtTime(0.04, chimeCtx.currentTime + 0.05);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, chimeCtx.currentTime + 2.5);

        osc.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start();
        osc.stop(chimeCtx.currentTime + 2.6);
      };

      intervalRef.current = window.setInterval(playChime, 4500);
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggle = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border ${
        isPlaying
          ? 'bg-[#D99445] text-[#100C0A] border-[#D99445] shadow-sm'
          : 'bg-[#201510]/80 hover:bg-[#201510] text-[#FFF0DC]/75 border-white/10 hover:border-[#D99445]/40'
      }`}
      title={isPlaying ? 'Mute evening café ambiance' : 'Play peaceful outdoor evening ambiance'}
      aria-label={isPlaying ? 'Mute evening café ambiance' : 'Play peaceful outdoor evening ambiance'}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#100C0A]" />
          <span className="hidden sm:inline">Ambience On</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-[#D99445]" />
          <span className="hidden sm:inline">Evening Ambience</span>
        </>
      )}
    </button>
  );
};
