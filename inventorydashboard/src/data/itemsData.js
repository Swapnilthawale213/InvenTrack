let initialItems = [];

try {
  const res = await fetch("http://localhost:5231/summary/rawmaterials");
  initialItems = await res.json();
} catch (error) {
  console.error("Failed to fetch initialItems:", error);
}

export { initialItems };