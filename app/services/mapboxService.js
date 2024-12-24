import mapboxgl from "mapbox-gl";

// ฟังก์ชันที่ใช้เรียก Mapbox Directions API
const drawRoute = async (map, coordinates, routeId) => {
    try {
      // แปลง coordinates เป็น string ในรูปแบบ "lng,lat;lng,lat;..."
      const coordinateString = coordinates
        .map((coord) => `${coord.lng},${coord.lat}`)
        .join(";");
  
      // เรียก Directions API
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinateString}?geometries=geojson&access_token=${mapboxgl.accessToken}`
      );
  
      const data = await response.json();
  
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0].geometry;
        const distance = data.routes[0].distance; // ระยะทางในเมตร
        const duration = data.routes[0].duration; // เวลาที่ใช้ในการเดินทาง (หน่วยเป็นวินาที)
  
        // แสดงระยะทางและเวลาในคอนโซล
        console.log(`Route ${routeId}:`);
        console.log(`Distance: ${(distance / 1000).toFixed(2)} km`);
        console.log(`Duration: ${(duration / 60).toFixed(2)} minutes`);
  
        // เพิ่มเส้นทางลงใน Mapbox โดยใช้ routeId เพื่อแยกเส้นทาง
        if (map.getSource(`route-${routeId}`)) {
          map.getSource(`route-${routeId}`).setData({
            type: "Feature",
            geometry: route,
          });
        } else {
          map.addSource(`route-${routeId}`, {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: route,
            },
          });
  
          map.addLayer({
            id: `route-${routeId}`,
            type: "line",
            source: `route-${routeId}`,
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": getRandomHexColor(), // ใช้ฟังก์ชัน random color
              "line-width": 4,
            },
          });
        }
      } else {
        console.error("No route found");
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };
  

const fetchMarkers = async (idToken) => {
    try {
      const response = await fetch('http://192.168.3.246:8080/api/students', {
        headers: {
          'Authorization': `Bearer ${idToken}`, // ส่ง token ใน headers
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data; // ส่งข้อมูลกลับไป
      } else {
        throw new Error(`Failed to fetch data from API: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching marker data: ", error);
      throw error; // ขว้างข้อผิดพลาดออกไป
    }
  };





// ฟังก์ชันสำหรับสุ่มสีแบบ Hex
function getRandomHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) { // Loop ให้ครบ 6 หลัก
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

export { drawRoute, getRandomHexColor, fetchMarkers };
