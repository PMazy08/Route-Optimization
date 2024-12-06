// // components/Map.js
// import { useState, useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import 'mapbox-gl/dist/mapbox-gl.css';


// // ตั้งค่า token ของ Mapbox
// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

// const Map = () => {
//     const [selectedStyle, setSelectedStyle] = useState("mapbox://styles/mapbox/streets-v11"); // ค่าเริ่มต้นเป็น Streets
//     const mapContainerRef = useRef(null); // ใช้สำหรับอ้างอิงการแสดงผลแผนที่
  
//     // รายการ styles ที่ผู้ใช้สามารถเลือกได้
//     const styles = [
//       { name: "Streets", value: "mapbox://styles/mapbox/streets-v11" },
//       { name: "Dark", value: "mapbox://styles/mapbox/dark-v10" },
//       { name: "Satellite Streets", value: "mapbox://styles/mapbox/satellite-streets-v11" },
//     ];
  

    
//     useEffect(() => {
//       const map = new mapboxgl.Map({
//         container: mapContainerRef.current,
//         style: selectedStyle, // ใช้ style จาก selectedStyle
//         center: [-118.2437, 34.0522], // พิกัดเริ่มต้นที่ลอสแอนเจลิส
//         zoom: 10,
//         attributionControl: false, 
//         dragPan: true, // ให้เลื่อนแผนที่ได้
//         scrollZoom: true, // ปิดการซูมด้วยการเลื่อนเมาส์
//         boxZoom: false, // ปิดการซูมด้วยการเลือกกล่อง
//         dragRotate: false, // ปิดการหมุนแผนที่
//       });
  
//       // Cleanup เมื่อ component ถูกลบ
//       return () => {
//         if (map) map.remove();
//       };
//     }, [selectedStyle]); // เมื่อ selectedStyle เปลี่ยนแปลง ให้รีเฟรชแผนที่
  
//     return (
//       <div>
//         <h1>Choose a Map Style</h1>
//         <select onChange={(e) => setSelectedStyle(e.target.value)} value={selectedStyle}>
//           {styles.map((style) => (
//             <option key={style.value} value={style.value}>
//               {style.name}
//             </option>
//           ))}
//         </select>
  
//         <div
//           ref={mapContainerRef}
//           style={{ height: "800px", width: "100%" }}
//         />
//       </div>
//     );
//   };

// export default Map;



import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

// ตั้งค่า token ของ Mapbox
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const [selectedStyle, setSelectedStyle] = useState("mapbox://styles/mapbox/streets-v11"); // ค่าเริ่มต้นเป็น Streets
  const [markers, setMarkers] = useState([]); // ใช้เก็บหมุดที่ถูกสร้างขึ้น
  const mapContainerRef = useRef(null); // ใช้สำหรับอ้างอิงการแสดงผลแผนที่
  const mapRef = useRef(null); // ใช้เก็บแผนที่ที่ถูกสร้างขึ้น

  // รายการ styles ที่ผู้ใช้สามารถเลือกได้
  const styles = [
    { name: "Streets", value: "mapbox://styles/mapbox/streets-v11" },
    { name: "Dark", value: "mapbox://styles/mapbox/dark-v10" },
    { name: "Satellite Streets", value: "mapbox://styles/mapbox/satellite-streets-v11" },
  ];

  // ฟังก์ชันที่ใช้ในการสร้างแผนที่
  useEffect(() => {
    // สร้างแผนที่เพียงครั้งแรกที่โหลด
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: selectedStyle, // ใช้ style จาก selectedStyle
      center: [-118.2437, 34.0522], // พิกัดเริ่มต้นที่ลอสแอนเจลิส
      zoom: 10,
      attributionControl: false,
      dragPan: true, // ให้เลื่อนแผนที่ได้
      scrollZoom: true, // ปิดการซูมด้วยการเลื่อนเมาส์
      boxZoom: false, // ปิดการซูมด้วยการเลือกกล่อง
      dragRotate: false, // ปิดการหมุนแผนที่
    });

    mapRef.current = map; // เก็บแผนที่ใน mapRef

    // ฟังก์ชันสำหรับปักหมุดเมื่อผู้ใช้คลิกบนแผนที่
    const onMapClick = (event) => {
      const { lngLat } = event; // ดึงพิกัดของตำแหน่งที่คลิก

      // สร้างหมุดใหม่
      new mapboxgl.Marker()
        .setLngLat([lngLat.lng, lngLat.lat]) // ตั้งค่าพิกัดของหมุด
        .addTo(map); // เพิ่มหมุดลงในแผนที่

      // เพิ่มหมุดลงใน state เพื่อเก็บข้อมูล
      setMarkers((prevMarkers) => [
        ...prevMarkers,
        { id: prevMarkers.length + 1, lngLat: [lngLat.lng, lngLat.lat] },
      ]);
    };

    // ฟังการคลิกบนแผนที่
    map.on('click', onMapClick);

    // Cleanup เมื่อ component ถูกลบ
    return () => {
      if (map) map.remove();
    };
  }, []); // useEffect นี้จะทำงานเพียงครั้งเดียวเมื่อ component ถูก mount

  // ฟังก์ชันที่ใช้ในการเปลี่ยนแผนที่เมื่อเลือก style ใหม่
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setStyle(selectedStyle); // เปลี่ยนแผนที่
    }
  }, [selectedStyle]); // เมื่อ selectedStyle เปลี่ยนแปลง ให้เปลี่ยนแผนที่

  return (
    <div>
      <h1>Choose a Map Style</h1>
      <select onChange={(e) => setSelectedStyle(e.target.value)} value={selectedStyle}>
        {styles.map((style) => (
          <option key={style.value} value={style.value}>
            {style.name}
          </option>
        ))}
      </select>

      <div
        ref={mapContainerRef}
        style={{ height: "800px", width: "100%" }}
      />
      
      {/* <div className="mt-4">
        <h2>Placed Markers:</h2>
        <ul>
          {markers.map((marker) => (
            <li key={marker.id}>Marker {marker.id}: {`Longitude: ${marker.lngLat[0]}, Latitude: ${marker.lngLat[1]}`}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default Map;
