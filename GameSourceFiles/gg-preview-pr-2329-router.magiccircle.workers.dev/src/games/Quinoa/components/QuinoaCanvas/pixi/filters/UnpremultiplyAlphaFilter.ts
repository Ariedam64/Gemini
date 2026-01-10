import { Filter, GlProgram, GpuProgram } from 'pixi.js';

/**
 * Fragment shader that converts premultiplied alpha to straight alpha.
 *
 * PixiJS renders with premultiplied alpha (RGB * A), but HTML5 Canvas expects
 * straight alpha. This shader reverses the premultiplication on the GPU,
 * which is much faster than doing it pixel-by-pixel on the CPU.
 */
const fragmentShader = `
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;

void main(void) {
    vec4 color = texture(uTexture, vTextureCoord);
    
    // Unpremultiply: if alpha > 0, divide RGB by alpha
    // Use a small epsilon to avoid division by zero
    if (color.a > 0.001) {
        color.rgb /= color.a;
    }
    
    finalColor = color;
}
`;

const vertexShader = `
in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition(void) {
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;
    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord(void) {
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void) {
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`;

// WebGPU shader (WGSL)
const wgslShader = `
struct GlobalFilterUniforms {
    uInputSize: vec4<f32>,
    uInputPixel: vec4<f32>,
    uInputClamp: vec4<f32>,
    uOutputFrame: vec4<f32>,
    uGlobalFrame: vec4<f32>,
    uOutputTexture: vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler: sampler;

@fragment
fn mainFragment(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
    var color = textureSample(uTexture, uSampler, uv);
    
    // Unpremultiply: if alpha > 0, divide RGB by alpha
    if (color.a > 0.001) {
        color = vec4<f32>(color.rgb / color.a, color.a);
    }
    
    return color;
}
`;

/**
 * A PixiJS filter that converts premultiplied alpha to straight alpha on the GPU.
 * Use this before extracting a texture to canvas to avoid darkening artifacts.
 */
export class UnpremultiplyAlphaFilter extends Filter {
  constructor() {
    const glProgram = GlProgram.from({
      vertex: vertexShader,
      fragment: fragmentShader,
    });

    const gpuProgram = GpuProgram.from({
      vertex: {
        source: wgslShader,
        entryPoint: 'mainVertex',
      },
      fragment: {
        source: wgslShader,
        entryPoint: 'mainFragment',
      },
    });

    super({
      glProgram,
      gpuProgram,
      resources: {},
    });
  }
}
