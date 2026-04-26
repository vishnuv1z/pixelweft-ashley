import Aurora from "./Aurora";

const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <Aurora
      colorStops={["#003cffff", "#00f7ffff", "#8400ffff"]}
      amplitude={1}
      blend={0.5}
    />
  </div>
);

export default AnimatedBackground;
