"use client";
// The valuation map in three.js (loaded lazily by DomMap.tsx, never server-rendered). 1 scene unit = 1 km.
// - Every CBS buurt of Utrecht is a low extruded tile. The 19 Domstad wijken are a shade lighter; the visitor's
//   wijk rises and turns Domstad red once a valid postcode is typed.
// - The Domtoren stands at the origin (its height exaggerated so it reads at city scale) and lights up when the
//   request is sent; a red line then draws itself from the tower to the visitor's home.
// - Motion is frame-rate independent (THREE.MathUtils.damp). The camera eases from the whole city to a shot that
//   holds both the Dom and the home. The map turns a little with the pointer while it is on screen.
// - Reduced motion: every value jumps to its target, no sway, and frames are only drawn when something changes.
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { BOUNDS, BUURTEN, litBuurten, type Place } from "./mapModel";
import type { MapStage } from "./types";

type Props = { stage: MapStage; place: Place | null; reduced: boolean; active: boolean; onReady: () => void };

const COL = { tile: "#2a3744", own: "#3d4c5a", rood: "#c40202", stone: "#d7dadd", glow: "#ffcf73", house: "#ffffff", ground: "#101a23" };
const KM = 1 / 1000;
const BASE = 0.05, OWN = 0.09, LIFT = 0.26; // tile heights in km
const FOV = 30;

/** Scene position of a map point (metres, y north) at height h. North is -z. */
const at = (x: number, y: number, h = 0) => new THREE.Vector3(x * KM, h, -y * KM);

/** Extruded tile for one buurt, shrunk a little around its centre so neighbouring tiles show a seam. */
function tileGeometry(i: number) {
  const shapes = BUURTEN[i].r.map((ring) => {
    const cx = ring.reduce((s, p) => s + p[0], 0) / ring.length, cy = ring.reduce((s, p) => s + p[1], 0) / ring.length;
    const size = Math.max(...ring.map((p) => Math.hypot(p[0] - cx, p[1] - cy)));
    const k = Math.max(0.85, 1 - 30 / size);
    return new THREE.Shape(ring.map(([x, y]) => new THREE.Vector2((cx + (x - cx) * k) * KM, (cy + (y - cy) * k) * KM)));
  });
  const g = new THREE.ExtrudeGeometry(shapes, { depth: 1, bevelEnabled: false });
  g.rotateX(-Math.PI / 2); // shape y (north) → -z, extrusion → +y
  return g;
}

function Tiles({ lit, reduced }: { lit: Set<number>; reduced: boolean }) {
  const invalidate = useThree((s) => s.invalidate);
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const heights = useRef<number[]>(BUURTEN.map((b) => (b.w >= 0 ? OWN : BASE)));
  const geos = useMemo(() => BUURTEN.map((_, i) => tileGeometry(i)), []);
  const mats = useMemo(() => ({
    tile: new THREE.MeshStandardMaterial({ color: COL.tile, roughness: 0.9 }),
    own: new THREE.MeshStandardMaterial({ color: COL.own, roughness: 0.85 }),
    lit: new THREE.MeshStandardMaterial({ color: COL.rood, roughness: 0.55, emissive: new THREE.Color(COL.rood), emissiveIntensity: 0.18 }),
  }), []);
  useEffect(() => () => { geos.forEach((g) => g.dispose()); Object.values(mats).forEach((m) => m.dispose()); }, [geos, mats]);
  useEffect(() => { invalidate(); }, [lit, invalidate]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 1 / 20);
    let moving = false;
    BUURTEN.forEach((b, i) => {
      const m = refs.current[i];
      if (!m) return;
      const to = lit.has(i) ? LIFT : b.w >= 0 ? OWN : BASE;
      const h = reduced ? to : THREE.MathUtils.damp(heights.current[i], to, 4.5, dt);
      if (Math.abs(h - to) > 0.001) moving = true;
      heights.current[i] = h;
      m.scale.y = h;
      m.material = lit.has(i) ? mats.lit : b.w >= 0 ? mats.own : mats.tile;
    });
    if (moving) invalidate();
  });

  return (
    <>
      {geos.map((g, i) => (
        <mesh key={i} ref={(m) => { refs.current[i] = m; }} geometry={g} material={mats.tile} castShadow receiveShadow />
      ))}
    </>
  );
}

/** The Domtoren, simplified: square shaft, narrower second tier, octagonal lantern and spire. */
function Dom({ glow, reduced }: { glow: boolean; reduced: boolean }) {
  const lamp = useRef(0);
  const mats = useMemo(() => ({
    stone: new THREE.MeshStandardMaterial({ color: COL.stone, roughness: 0.75 }),
    lantern: new THREE.MeshStandardMaterial({ color: COL.stone, roughness: 0.6, emissive: new THREE.Color(COL.glow), emissiveIntensity: 0 }),
  }), []);
  useEffect(() => () => Object.values(mats).forEach((m) => m.dispose()), [mats]);
  useFrame((_, delta) => {
    lamp.current = reduced ? (glow ? 1 : 0) : THREE.MathUtils.damp(lamp.current, glow ? 1 : 0, 2.5, Math.min(delta, 1 / 20));
    mats.lantern.emissiveIntensity = lamp.current * 1.6;
  });
  return (
    <group>
      <mesh material={mats.stone} position={[0, 0.3, 0]} castShadow><boxGeometry args={[0.2, 0.6, 0.2]} /></mesh>
      <mesh material={mats.stone} position={[0, 0.74, 0]} castShadow><boxGeometry args={[0.15, 0.28, 0.15]} /></mesh>
      <mesh material={mats.lantern} position={[0, 0.98, 0]} castShadow><cylinderGeometry args={[0.065, 0.075, 0.2, 8]} /></mesh>
      <mesh material={mats.stone} position={[0, 1.13, 0]} castShadow><coneGeometry args={[0.05, 0.1, 8]} /></mesh>
    </group>
  );
}

/** Ring on the ground at the home, then a small house on its wijk; at stage 3 the line from the Dom. */
function Home({ place, stage, reduced }: { place: Place; stage: MapStage; reduced: boolean }) {
  const invalidate = useThree((s) => s.invalidate);
  const house = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const a = useRef({ house: 0, line: 0 });
  const base = at(place.x, place.y, LIFT + 0.002);

  const curve = useMemo(() => {
    const from = new THREE.Vector3(0, 1.0, 0), to = at(place.x, place.y, LIFT + 0.16);
    const mid = from.clone().lerp(to, 0.5);
    mid.y += 0.6 + from.distanceTo(to) * 0.18;
    return new THREE.QuadraticBezierCurve3(from, mid, to);
  }, [place.x, place.y]);
  const tube = useMemo(() => new THREE.TubeGeometry(curve, 80, 0.016, 8, false), [curve]);
  const total = tube.index ? tube.index.count : 0;
  const mats = useMemo(() => ({
    line: new THREE.MeshStandardMaterial({ color: COL.rood, emissive: new THREE.Color(COL.rood), emissiveIntensity: 0.6 }),
    ring: new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.9, side: THREE.DoubleSide }),
    wall: new THREE.MeshStandardMaterial({ color: COL.house, roughness: 0.7 }),
    roof: new THREE.MeshStandardMaterial({ color: COL.rood, roughness: 0.5 }),
  }), []);
  useEffect(() => () => { tube.dispose(); Object.values(mats).forEach((m) => m.dispose()); }, [tube, mats]);
  useEffect(() => { invalidate(); }, [stage, invalidate]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 20);
    const v = a.current;
    const houseTo = stage >= 2 ? 1 : 0, lineTo = stage === 3 ? 1 : 0;
    v.house = reduced ? houseTo : THREE.MathUtils.damp(v.house, houseTo, 6, dt);
    v.line = reduced ? lineTo : lineTo === 0 ? 0 : THREE.MathUtils.damp(v.line, 1, 2.2, dt);
    if (house.current) { house.current.scale.setScalar(Math.max(0.001, v.house)); house.current.visible = v.house > 0.01; }
    tube.setDrawRange(0, Math.floor((total * v.line) / 3) * 3);
    if (ring.current && !reduced) {
      const p = (state.clock.elapsedTime * 0.8) % 1;
      ring.current.scale.setScalar(0.6 + p * 1.6);
      mats.ring.opacity = 0.9 * (1 - p);
    }
    if (!reduced && (Math.abs(v.house - houseTo) > 0.002 || (lineTo && v.line < 0.998))) invalidate();
  });

  return (
    <>
      <group position={base}>
        <mesh ref={ring} material={mats.ring} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.1, 0.13, 40]} /></mesh>
        <group ref={house} visible={false}>
          <mesh material={mats.wall} position={[0, 0.07, 0]} castShadow><boxGeometry args={[0.16, 0.14, 0.14]} /></mesh>
          <mesh material={mats.roof} position={[0, 0.17, 0]} rotation={[0, Math.PI / 4, 0]} castShadow><coneGeometry args={[0.135, 0.09, 4]} /></mesh>
        </group>
      </group>
      <mesh geometry={tube} material={mats.line} />
    </>
  );
}

/** Camera: the whole city, or a shot that frames the Dom and the home together. */
function Rig({ stage, place, reduced, active }: { stage: MapStage; place: Place | null; reduced: boolean; active: boolean }) {
  const { camera, size, invalidate } = useThree();
  const map = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Vector3());
  const dist = useRef(0);
  const dir = useMemo(() => new THREE.Vector3(0, 1.15, 1).normalize(), []);

  const shot = useMemo(() => {
    const aspect = size.width / Math.max(1, size.height);
    const fit = (w: number, d: number) => (Math.max(w / Math.min(aspect, 1.8), d * 0.75) / 2 / Math.tan((FOV * Math.PI) / 360)) * 1.08;
    if (!place || stage === 0) {
      const w = (BOUNDS.maxX - BOUNDS.minX) * KM, d = (BOUNDS.maxY - BOUNDS.minY) * KM;
      return { target: at((BOUNDS.minX + BOUNDS.maxX) / 2, (BOUNDS.minY + BOUNDS.maxY) / 2, 0), dist: fit(w, d) };
    }
    const home = at(place.x, place.y, 0);
    const span = Math.max(home.length(), 1.2);
    return { target: home.clone().multiplyScalar(0.5).setY(0.25), dist: Math.max(fit(span * 2.2, span * 2.2), 8) * (stage === 3 ? 1.08 : 1) };
  }, [place, stage, size.width, size.height]);

  useLayoutEffect(() => {
    target.current.copy(shot.target);
    dist.current = shot.dist;
    camera.position.copy(dir).multiplyScalar(shot.dist).add(shot.target);
    camera.lookAt(shot.target);
    invalidate();
    // only once, on mount: later changes ease in useFrame
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { invalidate(); }, [shot, invalidate]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 20);
    const k = reduced ? Infinity : 1.8;
    target.current.x = THREE.MathUtils.damp(target.current.x, shot.target.x, k, dt);
    target.current.y = THREE.MathUtils.damp(target.current.y, shot.target.y, k, dt);
    target.current.z = THREE.MathUtils.damp(target.current.z, shot.target.z, k, dt);
    dist.current = THREE.MathUtils.damp(dist.current, shot.dist, k, dt);
    camera.position.copy(dir).multiplyScalar(dist.current).add(target.current);
    camera.lookAt(target.current);
    const g = map.current;
    if (g && !reduced && active) {
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.12 + Math.sin(state.clock.elapsedTime * 0.25) * 0.03, 2, dt);
    }
    if (!reduced && (target.current.distanceTo(shot.target) > 0.002 || Math.abs(dist.current - shot.dist) > 0.002)) invalidate();
  });

  const lit = useMemo(() => litBuurten(stage >= 1 ? place : null), [place, stage]);
  return (
    <group ref={map}>
      <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[14, 64]} />
        <meshStandardMaterial color={COL.ground} roughness={1} />
      </mesh>
      <Tiles lit={lit} reduced={reduced} />
      <Dom glow={stage === 3} reduced={reduced} />
      {place && stage >= 1 && <Home key={`${place.x},${place.y}`} place={place} stage={stage} reduced={reduced} />}
    </group>
  );
}

function Lights() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const env = pmrem.fromScene(room, 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.45;
    room.dispose(); pmrem.dispose();
    return () => { scene.environment = null; env.dispose(); };
  }, [gl, scene]);
  return (
    <directionalLight position={[-6, 12, 7]} intensity={1.6} castShadow
      shadow-mapSize={[2048, 2048]} shadow-camera-left={-10} shadow-camera-right={10}
      shadow-camera-top={10} shadow-camera-bottom={-10} shadow-bias={-0.0004} />
  );
}

function Ready({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    const id = requestAnimationFrame(() => onReady());
    return () => cancelAnimationFrame(id);
  }, [onReady]);
  return null;
}

export default function DomMap3D({ stage, place, reduced, active, onReady }: Props) {
  return (
    <Canvas
      shadows="percentage"
      dpr={[1, 1.75]}
      frameloop={reduced || !active ? "demand" : "always"}
      camera={{ fov: FOV, near: 0.1, far: 120 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden
    >
      <Lights />
      <Rig stage={stage} place={place} reduced={reduced} active={active} />
      <Ready onReady={onReady} />
    </Canvas>
  );
}
