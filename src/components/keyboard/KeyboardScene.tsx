// Adapted from Naresh Khatri's 3d-portfolio (MIT, see LICENSE-3d-portfolio).
import { memo, useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ChibiScene, type ChibiSceneApi, type ScenePointerEvent, type RuntimeEvent } from "@chibi3d/runtime";
import { setSceneStatus } from "../../lib/scene-health";
import { usePreloader } from "../Preloader";
import { KEYBOARD_SKILLS } from "../../data/keyboardSkills";
import { createKeyboardScene, resolveKeyboardAsset, type KeyboardKey } from "./scene";
import { createKeyInput, isTypingTarget } from "./input";
import { createKeyboardMotion } from "./motion";
import { useKeyboardSounds } from "./use-keyboard-sounds";
import { useAdaptiveGraphics } from "./use-adaptive-graphics";

const SceneCanvas = memo(ChibiScene);
const SCENE_STYLE: CSSProperties = {
  position: "fixed",
  inset: 0,
  width: "100vw",
  height: "100dvh",
};

export default function KeyboardScene({ maxDpr }: { maxDpr: number }) {
  const { isLoading, bypassLoading } = usePreloader();
  const api = useRef<ChibiSceneApi>(null);
  const failed = useRef(false);
  const motion = useRef<ReturnType<typeof createKeyboardMotion> | null>(null);
  const [loadVersion, setLoadVersion] = useState(0);
  const ready = loadVersion > 0;
  const playSound = useKeyboardSounds();
  const scene = useMemo(() => createKeyboardScene(KEYBOARD_SKILLS, 6, "Skills"), []);
  const { settings: graphics, markActive } = useAdaptiveGraphics(ready && !isLoading);
  const { shadows, softShadows, ao, bloom, lighting } = graphics;
  const environment = useMemo(() => ({
    ...scene.document.environment,
    shadows, softShadows, ao, bloom,
    contactShadows: false,
    vignette: false,
    preset: lighting ? scene.document.environment.preset : null,
  }), [scene, shadows, softShadows, ao, bloom, lighting]);
  const dpr = useMemo<[number, number]>(() => [0.5, Math.min(graphics.dpr, maxDpr)], [maxDpr, graphics.dpr]);
  const visibleLabel = useRef<string | null>(null);
  const heldKeys = useRef<KeyboardKey[]>([]);
  const input = useMemo(() => createKeyInput(scene.keys, scene.columns), [scene]);

  useEffect(() => input.subscribe((key, pressed) => {
    markActive();
    api.current?.transitionNodeTo(key.nodeId, pressed ? key.pressedStateId : "base", { duration: 0.1, ease: "easeInOut" });
    api.current?.setMaterial(key.materialId, {
      emissive: scene.document.materials[key.materialId].color,
      emissiveIntensity: pressed ? 0.7 : 0,
    });
    heldKeys.current = heldKeys.current.filter((held) => held !== key);
    if (pressed) heldKeys.current.push(key);
    // latest still-held key wins; none held -> back to the default title
    const shown = heldKeys.current.at(-1) ?? null;
    const labelId = shown?.labelId ?? scene.defaultLabelId;
    if (labelId !== (visibleLabel.current ?? scene.defaultLabelId)) {
      api.current?.setNodeVisible(visibleLabel.current ?? scene.defaultLabelId, false);
      api.current?.setNodeVisible(labelId, labelId !== scene.defaultLabelId);
    }
    visibleLabel.current = shown?.labelId ?? null;
    playSound(pressed);
  }), [input, scene, playSound, markActive]);

  const onPointerEvent = useCallback((event: ScenePointerEvent) => {
    const pointer = `pointer:${event.pointerId}`;
    switch (event.type) {
      case "hoverEnter":
        if (event.pointerType === "mouse") input.press("hover", event.nodeId);
        break;
      case "hoverExit": input.release("hover", event.nodeId); break;
      case "pointerDown": input.press(pointer, event.nodeId); break;
      case "pointerUp":
      case "pointerCancel": input.release(pointer); break;
    }
  }, [input]);
  const onLoad = useCallback(() => {
    if (failed.current) return;
    setLoadVersion((version) => version + 1);
    setSceneStatus("ready");
    bypassLoading();
  }, [bypassLoading]);
  const onError = useCallback((error: Error) => {
    failed.current = true;
    console.warn("Keyboard scene unavailable", error);
    setSceneStatus("failed");
    bypassLoading();
  }, [bypassLoading]);
  const onEvent = useCallback((event: RuntimeEvent) => {
    if (event.type === "contextLost") onError(new Error("WebGL context lost"));
  }, [onError]);

  useEffect(() => {
    if (!ready || !api.current) return;
    const controller = createKeyboardMotion(api.current, scene, () => input.releaseAll(), markActive);
    motion.current = controller;
    return () => { controller.dispose(); motion.current = null; };
  }, [ready, loadVersion, scene, input, markActive]);
  useEffect(() => {
    if (ready && !isLoading) motion.current?.reveal();
  }, [ready, loadVersion, isLoading, scene, input]);

  useEffect(() => {
    if (!ready) return;
    const active = visibleLabel.current ?? scene.defaultLabelId;
    for (const id of [scene.defaultLabelId, ...scene.keys.map((key) => key.labelId)]) {
      api.current?.setNodeVisible(id, id === active && id !== scene.defaultLabelId);
    }
  }, [ready, loadVersion, scene]);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat || event.ctrlKey || event.metaKey || event.altKey || isTypingTarget(event.target)) return;
      const key = input.shortcuts.get(event.code);
      if (key) input.press(`key:${event.code}`, key.nodeId);
    };
    const up = (event: KeyboardEvent) => input.release(`key:${event.code}`);
    const release = () => input.releaseAll();
    const visibility = () => { if (document.hidden) release(); };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", release);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", release);
      document.removeEventListener("visibilitychange", visibility);
      release();
    };
  }, [input]);

  return (
    <SceneCanvas
      document={scene.document}
      environment={environment}
      resolveAsset={resolveKeyboardAsset}
      api={api}
      style={SCENE_STYLE}
      dpr={dpr}
      transparent
      orbit={false}
      orthographic
      pointerTargets={scene.pointerTargets}
      onPointerEvent={onPointerEvent}
      onLoad={onLoad}
      onError={onError}
      onEvent={onEvent}
    />
  );
}
