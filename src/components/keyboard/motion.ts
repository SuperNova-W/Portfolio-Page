import gsap from "gsap";
import { Euler, Quaternion } from "three";
import type { ChibiSceneApi, Vec3 } from "@chibi3d/runtime";
import type { KeyboardScene } from "./scene";

// "aside" parks a small, slowly turning keyboard in the bottom-right margin
// while long reading sections are on screen (or tucks it away on narrow ones).
export type KeyboardSection = "hero" | "skills" | "projects" | "contact" | "aside";
// Sections opt in with data-keyboard="hero|skills|projects|contact"; the last
// one whose top has crossed the middle of the viewport decides the pose.
const THRESHOLD = 0.5;

type Vector = { x: number; y: number; z: number };
const vector = (v: Vec3): Vector => ({ x: v[0], y: v[1], z: v[2] });
const array = (v: Vector): Vec3 => [v.x, v.y, v.z];

// Animate the original Euler components before converting camera coordinates.
// Equivalent end rotations do not produce equivalent GSAP transition paths.
function sectionRotation(rotation: Vector, mobile: boolean): Vec3 {
  const skills = new Quaternion().setFromEuler(new Euler(0.119863065, 0.007200782, 0.119863065));
  const reference = new Quaternion().setFromEuler(new Euler(0, mobile ? -Math.PI / 6 : -Math.PI / 12, 0));
  const legacy = new Quaternion().setFromEuler(new Euler(rotation.x, rotation.y, rotation.z));
  const euler = new Euler().setFromQuaternion(skills.multiply(reference).multiply(legacy));
  return [euler.x, euler.y, euler.z];
}

/** GSAP animates host values; Chibi applies them through its public API.
 * Adapted from Naresh Khatri's 3d-portfolio (MIT, see LICENSE-3d-portfolio). */
export function createKeyboardMotion(
  api: ChibiSceneApi,
  scene: KeyboardScene,
  onSection: (section: KeyboardSection) => void,
  onActivity?: () => void,
) {
  const setTransform: ChibiSceneApi["setNodeTransform"] = (id, patch) => {
    onActivity?.();
    return api.setNodeTransform(id, patch);
  };
  let section: KeyboardSection = "hero";
  let disposed = false;
  let revealed = false;
  const position = vector([0, 0, 0]);
  const scale = vector([0.001, 0.001, 0.001]);
  const rotation = vector([0, 0, 0]);
  const revealScale = { value: 0.001 };
  const keyOffsets = scene.keys.map(() => ({ y: 0 }));
  const keyRevealOffsets = scene.keys.map(() => ({ y: 0 }));
  const applyKey = (index: number) => {
    setTransform(scene.keys[index].motionId, { position: [0, keyOffsets[index].y + keyRevealOffsets[index].y, 0] });
  };
  const catFrame = { value: 0 };
  const sectionTweens: gsap.core.Tween[] = [];
  const loops: gsap.core.Tween[] = [];
  const revealTweens: gsap.core.Tween[] = [];
  const pending: gsap.core.Tween[] = [];
  const keyTweens: gsap.core.Tween[] = [];
  const applyPose = () => {
    setTransform(scene.boardId, {
      position: array(position),
      scale: array(scale),
      rotation: sectionRotation(rotation, window.innerWidth < 768),
    });
  };
  const pose = () => {
    const mobile = window.innerWidth < 768;
    const fit = Math.min(1, window.innerWidth / window.innerHeight * 1.05);
    const [centerX, centerY, centerZ] = scene.document.camera.target;
    const roomy = window.innerWidth >= 1180;
    // Phones have no room beside the long intro, so the keyboard waits for Skills.
    const aside = section === "aside" || (mobile && section === "hero");
    const halfWidth = 5.125 * window.innerWidth / window.innerHeight;
    const size = aside ? (roomy ? 0.36 : 0.001) : fit * (section === "hero" ? 0.8 : section === "contact" ? 0.75 : section === "skills" ? (mobile ? 1.1 : 0.85) : 0.95);
    const right = aside ? halfWidth - 2.3 : !mobile && section === "hero" ? 2.5 : !mobile && section === "contact" ? 3.8 : 0;
    const up = aside ? -2.9 : mobile && section === "hero" ? -1.8 : section === "contact" ? -0.8 : section === "skills" ? -0.6 : 0;
    return {
      // The placement origin is the keyboard's geometry center, independent of its labels.
      position: {
        x: centerX + right / Math.sqrt(2) + up / Math.sqrt(6),
        y: centerY + up * Math.sqrt(2 / 3),
        z: centerZ + right / Math.sqrt(2) - up / Math.sqrt(6),
      },
      rotation: section === "projects" || (mobile && section === "contact")
        ? { x: Math.PI, y: Math.PI / 3, z: Math.PI }
        : { x: 0, y: section === "skills" ? (mobile ? Math.PI / 6 : Math.PI / 12) : 0, z: 0 },
      scale: { x: size, y: size, z: size },
    };
  };
  const kill = (tweens: gsap.core.Tween[]) => {
    tweens.splice(0).forEach((tween) => tween.kill());
  };
  const applySection = (next: KeyboardSection, immediate = false) => {
    if (disposed) return;
    section = next;
    onSection(next);
    kill(sectionTweens);
    kill(loops);
    kill(pending);
    const target = pose();
    for (const [value, destination] of [[position, target.position], [rotation, target.rotation], [scale, target.scale]] as const) {
      sectionTweens.push(gsap.to(value, { ...destination, duration: immediate ? 0 : 1, ease: "power1.out", overwrite: true, onUpdate: applyPose }));
    }
    api.setNodeVisible(scene.labelsId, next === "skills");
    if (next === "hero" || next === "aside") {
      // The legacy restart() skips the configured 2.5s delay. Keep the live
      // rotation so leaving a partially completed spin never snaps to zero.
      loops.push(gsap.to(rotation, { y: Math.PI * 2 + rotation.y, duration: 10,
        repeat: -1, yoyo: true, yoyoEase: true, ease: "back.inOut",
        onUpdate: applyPose,
      }));
    }
    // Legacy manageAnimations waits for the cat, then another 600ms for keys.
    const catDelay = next === "projects" ? 0.3 : 0.2;
    pending.push(gsap.delayedCall(catDelay, () => {
      if (disposed || section !== next) return;
      api.setNodeVisible(scene.catId, next === "projects");
      catFrame.value = 0;
      let displayedFrame = -1;
      const showFrame = () => {
        const frame = Math.floor(catFrame.value) % 2;
        if (frame === displayedFrame) return;
        displayedFrame = frame;
        scene.frameIds.forEach((id, index) => api.setNodeVisible(id, next === "projects" && index === frame));
      };
      showFrame();
      if (next === "projects") loops.push(gsap.to(catFrame, {
        value: 2, duration: 0.2, repeat: -1, ease: "none", onUpdate: showFrame,
      }));
    }));
    pending.push(gsap.delayedCall(catDelay + 0.6, () => {
      if (disposed || section !== next) return;
      kill(keyTweens);
      if (next === "contact") {
        // The normalized mesh is already upright; retain only the teardown yaw.
        sectionTweens[1]?.kill();
        loops.push(gsap.fromTo(rotation, { x: 0, y: 0, z: 0 }, {
          y: -Math.PI / 2, duration: 5, repeat: -1, yoyo: true,
          yoyoEase: true, ease: "power1.out", onUpdate: applyPose,
        }));
      }
      const keys = scene.keys.map((key, index) => ({ key, index, offset: keyOffsets[index] }));
      if (next === "contact") keys.sort(() => Math.random() - 0.5);
      keys.forEach(({ index: keyIndex, offset }, index) => {
        // Spline animates the skill group by 200–400 units; one cap is 296.7413.
        keyTweens.push(gsap.to(offset, next === "contact" ? {
          y: (200 + Math.random() * 200) / 296.741333,
          duration: 2 + Math.random() * 2, delay: index * 0.6,
          repeat: -1, yoyo: true, yoyoEase: "none", ease: "elastic.out(1,0.3)",
          onUpdate: () => { applyKey(keyIndex); },
        } : {
          y: 0, duration: 4, ease: "elastic.out(1,0.7)",
          onUpdate: () => { applyKey(keyIndex); },
        }));
      });
      onVisibility();
    }));
    onVisibility();
  };
  const onVisibility = () => {
    const hidden = document.hidden;
    api.setPaused(hidden);
    [...loops, ...sectionTweens, ...revealTweens, ...pending, ...keyTweens].forEach((t) => t.paused(hidden));
  };
  const syncSection = (): KeyboardSection => {
    let next: KeyboardSection = "hero";
    document.querySelectorAll<HTMLElement>("[data-keyboard]").forEach((element) => {
      if (element.getBoundingClientRect().top <= window.innerHeight * THRESHOLD) {
        next = element.dataset.keyboard as KeyboardSection;
      }
    });
    return next;
  };
  let scrollFrame = 0;
  const onScroll = () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      if (!revealed) return;
      const next = syncSection();
      if (next !== section) applySection(next);
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  const resize = () => { if (revealed) applySection(syncSection(), true); };
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", onVisibility);
  api.setNodeVisible(scene.boardId, false);
  return {
    reveal() {
      if (revealed || disposed) return;
      revealed = true;
      api.setNodeVisible(scene.boardId, true);
      applySection(syncSection(), true);
      revealScale.value = 0.001;
      setTransform(scene.revealId, { scale: [0.001, 0.001, 0.001] });
      revealTweens.push(gsap.to(revealScale, { value: 1, duration: 1.5, ease: "elastic.out(1,0.6)",
        onUpdate: () => { setTransform(scene.revealId, { scale: [revealScale.value, revealScale.value, revealScale.value] }); },
      }));
      if (section !== "contact") scene.keys.forEach((key, index) => {
        const offset = keyRevealOffsets[index];
        // Original reveal: 900ms wait, 70ms per key, then a 100ms hold before dropping.
        offset.y = (200 - 50) / 296.741333;
        api.setNodeVisible(key.motionId, false);
        applyKey(index);
        revealTweens.push(gsap.delayedCall(0.9 + index * 0.07, () => {
          api.setNodeVisible(key.motionId, true);
        }));
        revealTweens.push(gsap.to(offset, { y: 0, delay: 1 + index * 0.07,
          duration: 0.5, ease: "bounce.out", onUpdate: () => { applyKey(index); } }));
      });
      onVisibility();
    },
    dispose() {
      disposed = true;
      kill(loops); kill(sectionTweens); kill(revealTweens); kill(pending); kill(keyTweens);
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      [scene.boardId, scene.spinId, scene.revealId, ...scene.keys.map((key) => key.motionId), ...scene.frameIds, scene.labelsId].forEach((id) => api.clearNodeOverrides(id));
      api.setNodeVisible(scene.catId, false);
    },
  };
}
