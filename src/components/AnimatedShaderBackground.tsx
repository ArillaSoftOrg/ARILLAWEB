"use client";

import { useEffect, useRef } from "react";

const vertexShader = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;

  mat2 rotate2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  float wave(vec2 uv, float speed, float scale, float offset) {
    return sin((uv.x * scale + uv.y * (scale * 0.7)) + u_time * speed + offset);
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    vec2 p = uv;
    p *= rotate2d(0.28 + sin(u_time * 0.08) * 0.15);

    float a = wave(p, 0.55, 3.2, 0.0);
    float b = wave(p.yx + a * 0.18, -0.38, 4.7, 1.9);
    float c = wave(p + vec2(b * 0.12, a * 0.08), 0.24, 7.0, 3.1);
    float field = a * 0.42 + b * 0.34 + c * 0.24;

    float glow = smoothstep(0.88, 0.05, length(uv - vec2(0.1, -0.08)));
    float ribbons = smoothstep(0.18, 0.92, field * 0.5 + 0.5);

    vec3 navy = vec3(0.020, 0.035, 0.075);
    vec3 teal = vec3(0.000, 0.430, 0.430);
    vec3 violet = vec3(0.420, 0.160, 0.930);
    vec3 cyan = vec3(0.050, 0.720, 0.860);

    vec3 color = navy;
    color = mix(color, teal, ribbons * 0.52);
    color = mix(color, violet, smoothstep(0.38, 1.0, field) * 0.46);
    color += cyan * glow * 0.18;
    color += violet * pow(max(0.0, 1.0 - length(uv + vec2(0.55, -0.55))), 3.0) * 0.22;

    float vignette = smoothstep(1.25, 0.35, length(uv));
    color *= 0.62 + vignette * 0.58;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export default function AnimatedShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { antialias: false, alpha: false });
    if (!canvas || !gl) return;
    const targetCanvas = canvas;
    const targetGl = gl;

    const vert = createShader(targetGl, targetGl.VERTEX_SHADER, vertexShader);
    const frag = createShader(targetGl, targetGl.FRAGMENT_SHADER, fragmentShader);
    const program = targetGl.createProgram();
    if (!vert || !frag || !program) return;

    targetGl.attachShader(program, vert);
    targetGl.attachShader(program, frag);
    targetGl.linkProgram(program);
    if (!targetGl.getProgramParameter(program, targetGl.LINK_STATUS)) return;

    const buffer = targetGl.createBuffer();
    targetGl.bindBuffer(targetGl.ARRAY_BUFFER, buffer);
    targetGl.bufferData(
      targetGl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      targetGl.STATIC_DRAW
    );

    const position = targetGl.getAttribLocation(program, "position");
    const resolution = targetGl.getUniformLocation(program, "u_resolution");
    const time = targetGl.getUniformLocation(program, "u_time");
    let raf = 0;
    const startedAt = performance.now();

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(targetCanvas.clientWidth * dpr);
      const height = Math.floor(targetCanvas.clientHeight * dpr);
      if (targetCanvas.width !== width || targetCanvas.height !== height) {
        targetCanvas.width = width;
        targetCanvas.height = height;
        targetGl.viewport(0, 0, width, height);
      }
    }

    function render(now: number) {
      resize();
      targetGl.useProgram(program);
      targetGl.enableVertexAttribArray(position);
      targetGl.vertexAttribPointer(position, 2, targetGl.FLOAT, false, 0, 0);
      targetGl.uniform2f(resolution, targetCanvas.width, targetCanvas.height);
      targetGl.uniform1f(time, (now - startedAt) * 0.001);
      targetGl.drawArrays(targetGl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    }

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      targetGl.deleteProgram(program);
      targetGl.deleteShader(vert);
      targetGl.deleteShader(frag);
      targetGl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
