"use client";
// The valuation house in three.js (loaded lazily by BvaHouse.tsx, never server-rendered).
// - Buildings come from houseModel.ts: one house, a pair, a row of three, or an apartment block.
//   "Your" home is white with the green BVA roof; neighbours are concrete grey.
// - Motion is procedural and frame-rate independent: walls rise with THREE.MathUtils.damp (staggered per
//   building), the roof drops in on a light spring, windows warm up when the request is sent, and the camera
//   eases to frame each house type. The scene sways a little and follows the pointer while it is on screen.
// - Reduced motion: every value jumps to its target, no sway, and frames are only drawn when something changes.
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { DEPTH, FLOOR, LIT_FLAT, layout, roofHeight, roofOutline, type Unit } from "./houseModel";
import type { BuildStage, HouseType } from "./types";

type Props = { stage: BuildStage; type: HouseType; reduced: boolean; active: boolean; onReady: () => void };

const COL = {
  wall: "#fbfbf8", wallOff: "#d6d9d2", roof: "#63a70a", roofOff: "#a9b0a6", glass: "#26302b",
  glow: "#ffcf73", ground: "#f4f5f2", plinth: "#cdd1ca", door: "#101714", line: "#3a7310",
};
const ROOF_START = 2.6; // roof hangs this far above its place until stage 2

/** Extruded logo roof for a building of width w. */
function roofGeometry(w: number) {
  const outline = roofOutline();
  const maxY = Math.max(...outline.map((p) => p[1]));
  const rw = w + 0.12, rh = roofHeight(w);
  const shape = new THREE.Shape(outline.map(([x, y]) => new THREE.Vector2(x * rw, (y / maxY) * rh)));
  const depth = DEPTH + 0.12;
  const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false });
  g.translate(0, 0, -depth / 2);
  return g;
}

/** Dashed rectangle on the ground: the plot before anything is built. */
function footprintGeometry(w: number) {
  const hw = w / 2 - 0.02, hd = DEPTH / 2 - 0.02;
  const pts = [[-hw, -hd], [hw, -hd], [hw, hd], [-hw, hd], [-hw, -hd]].map(([x, z]) => new THREE.Vector3(x, 0.012, z));
  return new THREE.BufferGeometry().setFromPoints(pts);
}

function Building({ u, index, stage, type, reduced }: { u: Unit; index: number; stage: BuildStage; type: HouseType; reduced: boolean }) {
  const invalidate = useThree((s) => s.invalidate);
  const walls = useRef<THREE.Group>(null);
  const roof = useRef<THREE.Group>(null);
  const plot = useRef<THREE.Group>(null);
  const anim = useRef({ rise: 0, roofY: ROOF_START, roofV: 0, glow: 0, since: 0 });
  const height = u.floors * FLOOR;

  const geo = useMemo(() => ({
    walls: new THREE.BoxGeometry(u.w, height, DEPTH),
    roof: roofGeometry(u.w),
    footprint: footprintGeometry(u.w),
    window: new THREE.PlaneGeometry(1, 1),
    plot: new THREE.PlaneGeometry(u.w - 0.04, DEPTH - 0.04),
  }), [u.w, height]);

  const mat = useMemo(() => {
    const dashed = new THREE.LineDashedMaterial({ color: COL.line, dashSize: 0.09, gapSize: 0.07 });
    return {
      walls: new THREE.MeshStandardMaterial({ color: u.lit ? COL.wall : COL.wallOff, roughness: 0.85 }),
      roof: new THREE.MeshStandardMaterial({ color: u.lit ? COL.roof : COL.roofOff, roughness: 0.55 }),
      glass: new THREE.MeshStandardMaterial({ color: COL.glass, roughness: 0.2, metalness: 0.1 }),
      glow: new THREE.MeshStandardMaterial({ color: COL.glass, emissive: new THREE.Color(COL.glow), emissiveIntensity: 0, roughness: 0.2 }),
      door: new THREE.MeshStandardMaterial({ color: COL.door, roughness: 0.6 }),
      balcony: new THREE.MeshStandardMaterial({ color: COL.roof, roughness: 0.5 }),
      dashed,
      plot: new THREE.MeshBasicMaterial({ color: COL.roof, transparent: true, opacity: u.lit ? 0.28 : 0.1 }),
    };
  }, [u.lit]);

  useEffect(() => () => {
    Object.values(geo).forEach((g) => g.dispose());
    Object.values(mat).forEach((m) => m.dispose());
  }, [geo, mat]);

  // Dashes need line distances on the geometry.
  const line = useMemo(() => {
    const l = new THREE.Line(geo.footprint, mat.dashed);
    l.computeLineDistances();
    return l;
  }, [geo.footprint, mat.dashed]);

  // A new stage restarts this building's stagger clock.
  useEffect(() => { anim.current.since = performance.now(); invalidate(); }, [stage, invalidate]);

  useFrame((_, delta) => {
    const a = anim.current;
    const dt = Math.min(delta, 1 / 20);
    const wait = (performance.now() - a.since) / 1000 < index * 0.14;
    const riseTo = stage >= 1 ? 1 : 0;
    const roofTo = stage >= 2 ? 0 : ROOF_START;
    const glowTo = stage === 3 ? 1 : 0;
    if (reduced) {
      a.rise = riseTo; a.roofY = roofTo; a.roofV = 0; a.glow = glowTo;
    } else if (!wait) {
      a.rise = THREE.MathUtils.damp(a.rise, riseTo, 5, dt);
      // Light spring: the roof lands with a small bounce.
      a.roofV += (roofTo - a.roofY) * 70 * dt;
      a.roofV *= Math.exp(-9 * dt);
      a.roofY += a.roofV * dt;
      a.glow = THREE.MathUtils.damp(a.glow, glowTo, 3, dt);
    }
    if (walls.current) {
      walls.current.scale.y = Math.max(0.001, a.rise);
      walls.current.visible = a.rise > 0.002;
    }
    if (roof.current) {
      roof.current.position.y = height * a.rise + Math.max(0, a.roofY);
      roof.current.visible = a.roofY < ROOF_START - 0.05 && a.rise > 0.5;
    }
    if (plot.current) plot.current.visible = a.rise < 0.6;
    mat.glow.emissiveIntensity = a.glow * 1.8;
  });

  // Windows (and a door, and for the apartment block one green balcony marking "your" flat).
  const front = DEPTH / 2 + 0.004;
  const bayW = u.w / u.bays;
  const panes: React.ReactNode[] = [];
  for (let f = 0; f < u.floors; f++) {
    for (let b = 0; b < u.bays; b++) {
      const x = -u.w / 2 + bayW * (b + 0.5);
      const isFlat = type === "appartement" && f === LIT_FLAT.floor && b === LIT_FLAT.bay;
      const isDoor = type !== "appartement" && u.lit && f === 0 && b === u.bays - 1;
      const lit = type === "appartement" ? isFlat : u.lit;
      if (isDoor) {
        panes.push(<mesh key={`d${b}`} geometry={geo.window} material={mat.door} position={[x, FLOOR * 0.36, front]} scale={[bayW * 0.34, FLOOR * 0.72, 1]} />);
        continue;
      }
      panes.push(
        <mesh key={`${f}-${b}`} geometry={geo.window} material={lit ? mat.glow : mat.glass}
          position={[x, f * FLOOR + FLOOR * 0.52, front]} scale={[bayW * 0.46, FLOOR * 0.5, 1]} />,
      );
      if (isFlat) {
        panes.push(
          <mesh key="balcony" material={mat.balcony} position={[x, f * FLOOR + 0.06, front + 0.12]} castShadow>
            <boxGeometry args={[bayW * 0.8, 0.07, 0.26]} />
          </mesh>,
        );
      }
    }
  }

  return (
    <group position={[u.x, 0, 0]}>
      <group ref={plot}>
        <primitive object={line} />
        <mesh geometry={geo.plot} material={mat.plot} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.008, 0]} />
      </group>
      {/* Walls scale up from the ground: the group's origin is at y = 0. */}
      <group ref={walls}>
        <mesh geometry={geo.walls} material={mat.walls} position={[0, height / 2, 0]} castShadow receiveShadow />
        {panes}
      </group>
      <group ref={roof} visible={false}>
        <mesh geometry={geo.roof} material={mat.roof} castShadow />
      </group>
    </group>
  );
}

/** Camera framing per house type, eased so switching types feels like one continuous shot. */
function Rig({ type, stage: build, reduced, active }: { type: HouseType; stage: BuildStage; reduced: boolean; active: boolean }) {
  const { camera, size, invalidate } = useThree();
  const stage = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Vector3(0, 1, 0));
  const dir = useMemo(() => new THREE.Vector3(5.4, 3.9, 7.6).normalize(), []);
  const units = layout(type);

  const frame = useMemo(() => {
    const left = Math.min(...units.map((u) => u.x - u.w / 2)), right = Math.max(...units.map((u) => u.x + u.w / 2));
    const h = Math.max(...units.map((u) => u.floors * FLOOR + roofHeight(u.w)));
    const aspect = size.width / Math.max(1, size.height);
    const dist = Math.max(h * 3.2, ((right - left) * 2.5) / Math.min(aspect, 1.6), 10);
    return { y: h * 0.4, dist };
  }, [units, size.width, size.height]);

  useLayoutEffect(() => {
    target.current.set(0, frame.y, 0);
    camera.position.copy(dir).multiplyScalar(frame.dist).add(target.current);
    camera.lookAt(target.current);
    invalidate();
    // only once, on mount: later changes ease in useFrame
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { invalidate(); }, [type, invalidate]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 20);
    const k = reduced ? Infinity : 2.6;
    target.current.y = THREE.MathUtils.damp(target.current.y, frame.y, k, dt);
    const want = dir.clone().multiplyScalar(frame.dist).add(target.current);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, want.x, k, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, want.y, k, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, want.z, k, dt);
    camera.lookAt(target.current);
    const g = stage.current;
    if (g && !reduced && active) {
      const t = state.clock.elapsedTime;
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.22 + Math.sin(t * 0.35) * 0.07, 2.5, dt);
    }
  });

  return <group ref={stage}><Scene type={type} stage={build} reduced={reduced} /></group>;
}

/** Ground plate and buildings, inside Rig's swaying group. */
function Scene({ type, stage, reduced }: { type: HouseType; stage: BuildStage; reduced: boolean }) {
  const units = layout(type);
  return (
    <>
      <mesh position={[0, -0.06, 0]} receiveShadow>
        <boxGeometry args={[5.4, 0.12, 2.7]} />
        <meshStandardMaterial color={COL.ground} roughness={0.95} />
      </mesh>
      <mesh position={[0, -0.13, 0]}>
        <boxGeometry args={[5.48, 0.04, 2.78]} />
        <meshStandardMaterial color={COL.plinth} roughness={1} />
      </mesh>
      {units.map((u, i) => (
        <Building key={`${type}-${i}`} u={u} index={i} stage={stage} type={type} reduced={reduced} />
      ))}
    </>
  );
}

function Lights() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const env = pmrem.fromScene(room, 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.7;
    room.dispose(); pmrem.dispose();
    return () => { scene.environment = null; env.dispose(); };
  }, [gl, scene]);
  return (
    <directionalLight position={[4, 7, 5]} intensity={1.5} castShadow
      shadow-mapSize={[1024, 1024]} shadow-camera-left={-5} shadow-camera-right={5}
      shadow-camera-top={5} shadow-camera-bottom={-5} shadow-bias={-0.0005} />
  );
}

function Ready({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    const id = requestAnimationFrame(() => onReady());
    return () => cancelAnimationFrame(id);
  }, [onReady]);
  return null;
}

export default function BvaHouse3D({ stage, type, reduced, active, onReady }: Props) {
  return (
    <Canvas
      shadows="percentage"
      dpr={[1, 1.75]}
      frameloop={reduced || !active ? "demand" : "always"}
      camera={{ fov: 30, near: 0.1, far: 80 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden
    >
      <Lights />
      <Rig type={type} stage={stage} reduced={reduced} active={active} />
      <Ready onReady={onReady} />
    </Canvas>
  );
}
