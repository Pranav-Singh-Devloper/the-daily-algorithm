import { useEffect, useState } from "react";
import { VolumeX, Music } from "lucide-react";
import { getAudio, isOn, setOn, startAmbient, stopAmbient } from "@/utils/ambient";

export default function AmbientAudio() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = getAudio();
    const tryStart = () => {
      if (isOn() && a.paused) {
        startAmbient().then((ok) => setPlaying(ok));
      }
    };
    tryStart();
    window.addEventListener("pointerdown", tryStart);
    window.addEventListener("keydown", tryStart);
    window.addEventListener("wheel", tryStart, { passive: true });
    window.addEventListener("touchstart", tryStart, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", tryStart);
      window.removeEventListener("keydown", tryStart);
      window.removeEventListener("wheel", tryStart);
      window.removeEventListener("touchstart", tryStart);
    };
  }, []);

  const toggle = async () => {
    const a = getAudio();
    if (a.paused) {
      setOn(true);
      setPlaying(await startAmbient());
    } else {
      setOn(false);
      stopAmbient();
      setPlaying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      data-testid="ambient-sound-toggle"
      title="Ambient jazz — subtle, loops forever"
      className="flex items-center gap-1.5 font-mono-np text-[9px] uppercase tracking-widest border border-ink px-2 py-0.5 hover:bg-ink hover:text-paper transition-colors duration-200 cursor-pointer"
    >
      {playing ? (
        <span className="eq-bars" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      ) : (
        <VolumeX size={11} />
      )}
      <span className="flex items-center gap-1">
        <Music size={11} />
        Jazz
      </span>
    </button>
  );
}
