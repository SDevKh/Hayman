import * as THREE from "three";

export const uniforms = {
    uVelocity: { value: 0 },
    uWaveFreq: { value: 1.15 },
    uAmpY: { value: 0.48 },
    uAmpZ: { value: 0.80 },
    uTwistZ: { value: 0.35 },
};

const MAX_VELOCITY = 0.35;

export function updateVelocityUniform(velocity: number, alpha = 0.10): void {
    const target = THREE.MathUtils.clamp(velocity * 0.003, -MAX_VELOCITY, MAX_VELOCITY);
    uniforms.uVelocity.value = THREE.MathUtils.lerp(uniforms.uVelocity.value, target, alpha);
}

export function updateWaveDimensions(stride: number, planeHeight: number): void {
    const wavelength = stride * 2.2;
    uniforms.uWaveFreq.value = (Math.PI * 2) / wavelength;
    // Gentle amplitudes to maintain crisp, undistorted packaging proportions
    uniforms.uAmpY.value = planeHeight * 0.10;
    uniforms.uAmpZ.value = planeHeight * 0.15;
    uniforms.uTwistZ.value = planeHeight * 0.03;
}

const vertexShader = /* glsl */ `
uniform float uVelocity;
uniform float uWaveFreq;
uniform float uAmpY;
uniform float uAmpZ;
uniform float uTwistZ;

varying vec2 vUv;
varying float vCosW;

void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    float worldX = worldPos.x;
    float localY = position.y;

    float wavePhase = worldX * uWaveFreq;
    float sinW = sin(wavePhase);
    float cosW = cos(wavePhase);
    vCosW = cosW;

    float dynY = sinW * uVelocity * uAmpY;
    float dynZ = cosW * uVelocity * uAmpZ;
    float twistZ = localY * sinW * uVelocity * uTwistZ;
    float dispX = sinW * cosW * uVelocity * -0.05;

    vec3 displaced = position + vec3(dispX, dynY, dynZ + twistZ);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform sampler2D uTexture;
uniform vec2 uScale;
uniform float uVelocity;

varying vec2 vUv;
varying float vCosW;

void main() {
    vec2 coverUv = (vUv - 0.5) * uScale + 0.5;
    vec4 baseColor = texture2D(uTexture, coverUv);

    float luma = dot(baseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
    vec3 gray = vec3(luma);

    // Enhance vibrancy for colorful snack packaging
    float sat = 1.10;
    vec3 satColor = mix(gray, baseColor.rgb, sat);

    float lift = 0.01;
    float gain = 1.05;
    vec3 tonedRgb = satColor * gain + lift;

    float curveHighlight = clamp(vCosW * uVelocity * 0.06, 0.0, 0.08);
    vec3 finalRgb = tonedRgb + curveHighlight;

    gl_FragColor = vec4(finalRgb, baseColor.a);
}
`;

export function createSliderMaterial(tex: THREE.Texture, planeAspect: number): THREE.ShaderMaterial {
    const img = tex.image as { width?: number; height?: number } | undefined;
    const imageAspect = (img && img.width && img.height) ? img.width / img.height : planeAspect;

    const scale =
        imageAspect > planeAspect
            ? new THREE.Vector2(planeAspect / imageAspect, 1)
            : new THREE.Vector2(1, imageAspect / planeAspect);

    return new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            uTexture: { value: tex },
            uScale: { value: scale },
            uVelocity: uniforms.uVelocity,
            uWaveFreq: uniforms.uWaveFreq,
            uAmpY: uniforms.uAmpY,
            uAmpZ: uniforms.uAmpZ,
            uTwistZ: uniforms.uTwistZ,
        },
        side: THREE.DoubleSide,
        transparent: true,
    });
}
