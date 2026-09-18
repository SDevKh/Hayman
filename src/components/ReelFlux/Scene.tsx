import { Canvas } from "@react-three/fiber";
import Mesh from "./Mesh";

export default function Scene() {
    return (
        <Canvas
            flat
            camera={{ position: [0, 0, 5], fov: 48, near: 0.1, far: 100 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
        >
            <Mesh />
        </Canvas>
    );
}
