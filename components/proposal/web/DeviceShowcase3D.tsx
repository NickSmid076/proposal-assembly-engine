"use client";
// A laptop and a phone showing a concept site, in three.js. Used in a proposal hero.
// - Screens are full-page screenshots loaded with TextureLoader (sRGB, max anisotropy). They scroll slowly
//   through the page once the devices are in place, so the visitor sees more than the first screen.
// - Entrance is one keyframe clip on an AnimationMixer: the laptop turns in and its lid opens, the phone
//   slides in after it. After that, the devices follow the pointer a little and float.
// - Reduced motion: the clip jumps to its last frame, no float or scrolling, and no frames are drawn
//   unless something changes. Off screen: no frames either.
// The parent shows a static image composition until `onReady`, and keeps it when WebGL is missing.
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

type Props = {
  desktop: string; mobile: string; still: boolean; visible: boolean;
  pointer: React.RefObject<{ x: number; y: number }>; onReady: () => void;
};

// Sizes in scene units. Screens match the screenshot viewports (1440×900 desktop, 390 wide phone).
const LID = { w: 3.4, h: 2.2, d: 0.06, bezel: 0.08, r: 0.1 };
const BASE = { w: 3.4, d: 2.3, h: 0.07, r: 0.12 };
const PHONE = { w: 0.98, h: 2.02, d: 0.09, bezel: 0.045, r: 0.15 };
const ENTER = 2.1; // seconds

function roundedRect(w: number, h: number, r: number, y0 = -h / 2) {
  const s = new THREE.Shape();
  const x0 = -w / 2;
  s.moveTo(x0 + r, y0);
  s.lineTo(x0 + w - r, y0); s.quadraticCurveTo(x0 + w, y0, x0 + w, y0 + r);
  s.lineTo(x0 + w, y0 + h - r); s.quadraticCurveTo(x0 + w, y0 + h, x0 + w - r, y0 + h);
  s.lineTo(x0 + r, y0 + h); s.quadraticCurveTo(x0, y0 + h, x0, y0 + h - r);
  s.lineTo(x0, y0 + r); s.quadraticCurveTo(x0, y0, x0 + r, y0);
  return s;
}

/** Flat rounded rectangle with UVs mapped 0..1 across its bounds (ShapeGeometry UVs are in shape units). */
function roundedPlane(w: number, h: number, r: number) {
  const g = new THREE.ShapeGeometry(roundedRect(w, h, r), 6);
  const pos = g.attributes.position, uv = g.attributes.uv;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) / w + 0.5, pos.getY(i) / h + 0.5);
  uv.needsUpdate = true;
  return g;
}

const extrude = (shape: THREE.Shape, depth: number) =>
  new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 3, curveSegments: 10 });

const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Eased keyframes between two values, sampled so the clip itself carries the easing. */
function eased(from: number[], to: number[], t0: number, t1: number, n = 14) {
  const times: number[] = [], values: number[] = [];
  for (let i = 0; i <= n; i++) {
    const k = easeOut(i / n);
    times.push(t0 + ((t1 - t0) * i) / n);
    from.forEach((f, j) => values.push(f + (to[j] - f) * k));
  }
  return { times, values };
}
function easedQuat(from: THREE.Euler, to: THREE.Euler, t0: number, t1: number, n = 14) {
  const a = new THREE.Quaternion().setFromEuler(from), b = new THREE.Quaternion().setFromEuler(to), q = new THREE.Quaternion();
  const times: number[] = [], values: number[] = [];
  for (let i = 0; i <= n; i++) {
    times.push(t0 + ((t1 - t0) * i) / n);
    q.slerpQuaternions(a, b, easeOut(i / n));
    values.push(q.x, q.y, q.z, q.w);
  }
  return { times, values };
}

function enterClip() {
  const lp = eased([-0.2, -1.4, -1.6], [-0.55, 0, 0], 0, 1.5);
  const lq = easedQuat(new THREE.Euler(0, 0.75, 0), new THREE.Euler(0, 0.2, 0), 0, 1.5);
  const lid = easedQuat(new THREE.Euler(Math.PI / 2 - 0.02, 0, 0), new THREE.Euler(-0.2, 0, 0), 0.45, 1.85);
  const pp = eased([3.8, 1.4, 1.8], [1.8, 1.06, 1.05], 0.4, ENTER);
  const pq = easedQuat(new THREE.Euler(0.1, -1.2, 0.18), new THREE.Euler(0, -0.34, 0), 0.4, ENTER);
  // Hold the lid shut until it starts to open.
  lid.times.unshift(0); lid.values.unshift(...lid.values.slice(0, 4));
  return new THREE.AnimationClip("enter", ENTER, [
    new THREE.VectorKeyframeTrack("laptop.position", lp.times, lp.values),
    new THREE.QuaternionKeyframeTrack("laptop.quaternion", lq.times, lq.values),
    new THREE.QuaternionKeyframeTrack("lid.quaternion", lid.times, lid.values),
    new THREE.VectorKeyframeTrack("phone.position", pp.times, pp.values),
    new THREE.QuaternionKeyframeTrack("phone.quaternion", pq.times, pq.values),
  ]);
}

/** Part of the tall screenshot visible on a screen of this size, and the texture set up to show its top. */
function fitScreen(tex: THREE.Texture, w: number, h: number) {
  const img = tex.image as { width: number; height: number };
  const frac = Math.min(1, (h / w) * (img.width / img.height));
  tex.repeat.set(1, frac);
  tex.offset.set(0, 1 - frac);
  return frac;
}

/** Scroll position 0..1 over time: rest at the top, glide down, rest, glide back. */
function scrollAt(t: number) {
  const cycle = 16, p = (t % cycle) / cycle;
  if (p < 0.2) return 0;
  if (p < 0.5) return easeInOut((p - 0.2) / 0.3);
  if (p < 0.7) return 1;
  return 1 - easeInOut((p - 0.7) / 0.3);
}

function Devices({ desktop, mobile, still, pointer, onReady }: Omit<Props, "visible">) {
  const { gl, scene, camera, size, invalidate } = useThree();
  const [deskTex, phoneTex] = useLoader(THREE.TextureLoader, [desktop, mobile]);
  const stage = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const clock = useRef(0);

  const deskScreen = { w: LID.w - LID.bezel * 2, h: LID.h - LID.bezel * 2 };
  const phoneScreen = { w: PHONE.w - PHONE.bezel * 2, h: PHONE.h - PHONE.bezel * 2 };

  const fracs = useMemo(() => {
    const max = gl.capabilities.getMaxAnisotropy();
    for (const t of [deskTex, phoneTex]) {
      t.colorSpace = THREE.SRGBColorSpace; // screenshots are sRGB colour images
      t.anisotropy = max; // the screens are seen at an angle
      t.needsUpdate = true;
    }
    return { desk: fitScreen(deskTex, deskScreen.w, deskScreen.h), phone: fitScreen(phoneTex, phoneScreen.w, phoneScreen.h) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deskTex, phoneTex, gl]);

  const geo = useMemo(() => {
    const lid = extrude(roundedRect(LID.w, LID.h, LID.r, 0), LID.d);
    const base = extrude(roundedRect(BASE.w, BASE.d, BASE.r), BASE.h);
    base.rotateX(-Math.PI / 2);
    const phone = extrude(roundedRect(PHONE.w, PHONE.h, PHONE.r), PHONE.d);
    phone.translate(0, 0, -PHONE.d / 2);
    return {
      lid, base, phone,
      deskScreen: roundedPlane(deskScreen.w, deskScreen.h, 0.02),
      phoneScreen: roundedPlane(phoneScreen.w, phoneScreen.h, 0.11),
      keys: roundedPlane(2.9, 1.0, 0.05),
      pad: roundedPlane(1.1, 0.62, 0.06),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => () => { Object.values(geo).forEach((g) => g.dispose()); }, [geo]);

  // Soft studio reflections on the metal bodies (generated, no file to load).
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const env = pmrem.fromScene(room, 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.55;
    room.dispose(); pmrem.dispose();
    return () => { scene.environment = null; env.dispose(); };
  }, [gl, scene]);

  // Entrance clip. Under reduced motion it is shown at its last frame.
  useLayoutEffect(() => {
    if (!stage.current) return;
    const m = new THREE.AnimationMixer(stage.current);
    const action = m.clipAction(enterClip());
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;
    action.play();
    if (still) m.setTime(ENTER);
    else m.update(0); // apply the first keyframe before the first frame is drawn
    mixer.current = m;
    onReady();
    invalidate();
    return () => { m.stopAllAction(); m.uncacheRoot(m.getRoot()); };
  }, [still, onReady, invalidate]);

  // Narrow canvases: step the camera back so both devices fit.
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const aspect = size.width / size.height;
    cam.position.set(0.25, 2.2, Math.max(8.4, (8.4 * 1.3) / aspect));
    cam.lookAt(0.45, 0.95, 0);
    cam.updateProjectionMatrix();
    invalidate();
  }, [camera, size, invalidate]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    clock.current += dt;
    if (!still) mixer.current?.update(dt);
    const t = clock.current;
    const g = tilt.current;
    if (g && !still) {
      // Procedural motion runs after the mixer, on a parent group the clip never touches.
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.current.x * 0.12, 3, dt);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pointer.current.y * 0.05, 3, dt);
      g.position.y = Math.sin(t * 0.8) * 0.035;
      if (t > ENTER + 0.4) {
        const s = scrollAt(t - ENTER - 0.4);
        deskTex.offset.y = (1 - fracs.desk) * (1 - s * 0.85);
        phoneTex.offset.y = (1 - fracs.phone) * (1 - s);
      }
    }
  });

  const body = <meshStandardMaterial color="#2b2e35" metalness={0.75} roughness={0.32} />;
  return (
    <group ref={tilt}>
      <group ref={stage}>
        <group name="laptop">
          <mesh geometry={geo.base}>{body}</mesh>
          <mesh geometry={geo.keys} rotation={[-Math.PI / 2, 0, 0]} position={[0, BASE.h + 0.013, -0.3]}><meshStandardMaterial color="#16181c" roughness={0.8} /></mesh>
          <mesh geometry={geo.pad} rotation={[-Math.PI / 2, 0, 0]} position={[0, BASE.h + 0.013, 0.65]}><meshStandardMaterial color="#3a3e46" metalness={0.5} roughness={0.4} /></mesh>
          <group name="lid" position={[0, BASE.h, -BASE.d / 2 + 0.04]}>
            <mesh geometry={geo.lid} position={[0, 0, -LID.d]}>{body}</mesh>
            <mesh position={[0, LID.h / 2, 0.016]}><planeGeometry args={[LID.w - 0.04, LID.h - 0.04]} /><meshBasicMaterial color="#07080a" /></mesh>
            <mesh geometry={geo.deskScreen} position={[0, LID.h / 2, 0.02]}><meshBasicMaterial map={deskTex} toneMapped={false} /></mesh>
          </group>
        </group>
        <group name="phone">
          <mesh geometry={geo.phone}><meshStandardMaterial color="#1c1f25" metalness={0.8} roughness={0.28} /></mesh>
          <mesh position={[0, 0, PHONE.d / 2 + 0.014]}><planeGeometry args={[PHONE.w - 0.03, PHONE.h - 0.03]} /><meshBasicMaterial color="#050506" /></mesh>
          <mesh geometry={geo.phoneScreen} position={[0, 0, PHONE.d / 2 + 0.018]}><meshBasicMaterial map={phoneTex} toneMapped={false} /></mesh>
          <mesh position={[0, PHONE.h / 2 - 0.12, PHONE.d / 2 + 0.02]}><planeGeometry args={[0.26, 0.07]} /><meshBasicMaterial color="#000" /></mesh>
        </group>
      </group>
    </group>
  );
}

export default function DeviceShowcase3D({ visible, still, ...rest }: Props) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={still || !visible ? "demand" : "always"}
      camera={{ fov: 30, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[-3, 6, 5]} intensity={1.6} />
      <directionalLight position={[5, 2, -4]} intensity={0.9} color="#9fb4ff" />
      <Suspense fallback={null}>
        <Devices still={still} {...rest} />
      </Suspense>
    </Canvas>
  );
}
