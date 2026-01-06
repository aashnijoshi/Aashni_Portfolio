"use client"

const fragmentShader = `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    
    vec3 color1 = vec3(0.5, 0.15, 0.2);         // deep maroon
    vec3 color2 = vec3(0.7, 0.25, 0.3);         // burgundy
    vec3 color3 = vec3(0.6, 0.3, 0.25);         // rust maroon
    vec3 color4 = vec3(0.8, 0.35, 0.4);         // rose maroon
    vec3 color5 = vec3(0.45, 0.12, 0.18);       // dark wine
    
    float noise1 = sin(st.x * 5.0 + u_time * 0.5) * cos(st.y * 4.0 + u_time * 0.4);
    float noise2 = sin(st.x * 3.5 - u_time * 0.45) * sin(st.y * 4.5 + u_time * 0.35);
    float noise3 = cos(st.x * 6.0 + u_time * 0.4) * sin(st.y * 3.5 - u_time * 0.5);
    float noise4 = sin(st.x * 4.5 + u_time * 0.55) * cos(st.y * 5.0 - u_time * 0.3);
    
    vec3 color = mix(color1, color2, noise1 * 0.4 + 0.5);
    color = mix(color, color3, noise2 * 0.35 + 0.5);
    color = mix(color, color4, noise3 * 0.3 + 0.5);
    color = mix(color, color5, noise4 * 0.25 + 0.5);
    
    float vignette = 1.0 - length(st - 0.5) * 0.8;
    color *= vignette;
    
    gl_FragColor = vec4(color * 0.18, 1.0);
}
`
