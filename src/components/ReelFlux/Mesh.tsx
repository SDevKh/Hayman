import { Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { images, imagePaths } from "@/lib/reel-flux/data";
import { scrollState } from "@/hooks/useScroll";
import { updateVelocityUniform, updateWaveDimensions, createSliderMaterial } from "@/lib/reel-flux/Shader";

useTexture.preload(imagePaths);

// Upright portrait aspect ratio matching Lay's bags
const PLANE_ASPECT = 0.72;
const GAP_RATIO = 0.18;

function Meshes() {
    const textures = useTexture(imagePaths) as THREE.Texture[];
    const viewport = useThree((s) => s.viewport);
    const isPortrait = viewport.aspect < 1.1;
    const nominalHeight = viewport.height * (isPortrait ? 0.48 : 0.56);
    const nominalWidth = nominalHeight * PLANE_ASPECT;
    const planeWidth = Math.min(nominalWidth, viewport.width * (isPortrait ? 0.70 : 0.45));
    const planeHeight = planeWidth / PLANE_ASPECT;
    const stride = planeWidth * (1 + GAP_RATIO);
    const total = textures.length;
    const totalWidth = total * stride;
    const half = totalWidth / 2;

    useEffect(() => {
        updateWaveDimensions(stride, planeHeight);
    }, [stride, planeHeight]);

    const geometry = useMemo(
        () => new THREE.PlaneGeometry(planeWidth, planeHeight, 64, 16),
        [planeWidth, planeHeight]
    );
    useEffect(() => () => geometry.dispose(), [geometry]);

    const materials = useMemo(() => {
        textures.forEach((t) => {
            t.colorSpace = THREE.SRGBColorSpace;
            t.needsUpdate = true;
        });
        return textures.map((t) => createSliderMaterial(t, PLANE_ASPECT));
    }, [textures]);
    useEffect(() => () => materials.forEach((m) => m.dispose()), [materials]);

    const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

    useFrame(() => {
        updateVelocityUniform(scrollState.velocity);

        const scrollX = scrollState.progress * totalWidth;

        for (let i = 0; i < total; i++) {
            const mesh = meshRefs.current[i];
            if (!mesh) continue;
            const offset = (i - total / 2) * stride - scrollX;
            mesh.position.x = ((((offset + half) % totalWidth) + totalWidth) % totalWidth) - half;
        }
    });

    return (
        <group>
            {materials.map((material, i) => (
                <mesh
                    key={images[i]?.id ?? i}
                    ref={(el) => { meshRefs.current[i] = el; }}
                    geometry={geometry}
                    material={material}
                />
            ))}
        </group>
    );
}

export default function Mesh() {
    return (
        <Suspense fallback={null}>
            <Meshes />
        </Suspense>
    );
}
