let initialZones = [];

try {
  const res = await fetch("http://localhost:5231/summary/zones");
  initialZones = await res.json(); 
} catch (error) {
  console.error("Failed to fetch initialZones:", error);
}

export { initialZones };
