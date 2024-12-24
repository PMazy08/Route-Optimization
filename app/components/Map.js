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

// ########################################################################ปักหมุดได้ v1 

// import { useState, useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import 'mapbox-gl/dist/mapbox-gl.css';

// // ตั้งค่า token ของ Mapbox
// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

// const Map = () => {
//   const [selectedStyle, setSelectedStyle] = useState("mapbox://styles/mapbox/streets-v11"); // ค่าเริ่มต้นเป็น Streets
//   const [markers, setMarkers] = useState([]); // ใช้เก็บหมุดที่ถูกสร้างขึ้น
//   const mapContainerRef = useRef(null); // ใช้สำหรับอ้างอิงการแสดงผลแผนที่
//   const mapRef = useRef(null); // ใช้เก็บแผนที่ที่ถูกสร้างขึ้น

//   // รายการ styles ที่ผู้ใช้สามารถเลือกได้
//   const styles = [
//     { name: "Streets", value: "mapbox://styles/mapbox/streets-v11" },
//     { name: "Dark", value: "mapbox://styles/mapbox/dark-v10" },
//     { name: "Satellite Streets", value: "mapbox://styles/mapbox/satellite-streets-v11" },
//   ];

//   // ฟังก์ชันที่ใช้ในการสร้างแผนที่
//   useEffect(() => {
//     // สร้างแผนที่เพียงครั้งแรกที่โหลด
//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: selectedStyle, // ใช้ style จาก selectedStyle
//       center: [-118.2437, 34.0522], // พิกัดเริ่มต้นที่ลอสแอนเจลิส
//       zoom: 10,
//       attributionControl: false,
//       dragPan: true, // ให้เลื่อนแผนที่ได้
//       scrollZoom: true, // ปิดการซูมด้วยการเลื่อนเมาส์
//       boxZoom: false, // ปิดการซูมด้วยการเลือกกล่อง
//       dragRotate: false, // ปิดการหมุนแผนที่
//     });

//     mapRef.current = map; // เก็บแผนที่ใน mapRef

//     // ฟังก์ชันสำหรับปักหมุดเมื่อผู้ใช้คลิกบนแผนที่
//     const onMapClick = (event) => {
//       const { lngLat } = event; // ดึงพิกัดของตำแหน่งที่คลิก

//       // สร้างหมุดใหม่
//       new mapboxgl.Marker()
//         .setLngLat([lngLat.lng, lngLat.lat]) // ตั้งค่าพิกัดของหมุด
//         .addTo(map); // เพิ่มหมุดลงในแผนที่

//       // เพิ่มหมุดลงใน state เพื่อเก็บข้อมูล
//       setMarkers((prevMarkers) => [
//         ...prevMarkers,
//         { id: prevMarkers.length + 1, lngLat: [lngLat.lng, lngLat.lat] },
//       ]);
//     };

//     // ฟังการคลิกบนแผนที่
//     map.on('click', onMapClick);

//     // Cleanup เมื่อ component ถูกลบ
//     return () => {
//       if (map) map.remove();
//     };
//   }, []); // useEffect นี้จะทำงานเพียงครั้งเดียวเมื่อ component ถูก mount

//   // ฟังก์ชันที่ใช้ในการเปลี่ยนแผนที่เมื่อเลือก style ใหม่
//   useEffect(() => {
//     if (mapRef.current) {
//       mapRef.current.setStyle(selectedStyle); // เปลี่ยนแผนที่
//     }
//   }, [selectedStyle]); // เมื่อ selectedStyle เปลี่ยนแปลง ให้เปลี่ยนแผนที่

//   return (
//     <div>
//       <h1>Choose a Map Style</h1>
//       <select onChange={(e) => setSelectedStyle(e.target.value)} value={selectedStyle}>
//         {styles.map((style) => (
//           <option key={style.value} value={style.value}>
//             {style.name}
//           </option>
//         ))}
//       </select>

//       <div
//         ref={mapContainerRef}
//         style={{ height: "800px", width: "100%" }}
//       />
      
//       {/* <div className="mt-4">
//         <h2>Placed Markers:</h2>
//         <ul>
//           {markers.map((marker) => (
//             <li key={marker.id}>Marker {marker.id}: {`Longitude: ${marker.lngLat[0]}, Latitude: ${marker.lngLat[1]}`}</li>
//           ))}
//         </ul>
//       </div> */}
//     </div>
//   );
// };

// export default Map;



// #############เลื่อนหมุดได้

// import { useState, useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import 'mapbox-gl/dist/mapbox-gl.css';

// // ตั้งค่า token ของ Mapbox
// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

// const Map = () => {
//   const [selectedStyle, setSelectedStyle] = useState("mapbox://styles/mapbox/light-v10"); // ค่าเริ่มต้นเป็น Streets
//   const [markers, setMarkers] = useState([]); // ใช้เก็บหมุดที่ถูกสร้างขึ้น
//   const mapContainerRef = useRef(null); // ใช้สำหรับอ้างอิงการแสดงผลแผนที่
//   const mapRef = useRef(null); // ใช้เก็บแผนที่ที่ถูกสร้างขึ้น

//   // รายการ styles ที่ผู้ใช้สามารถเลือกได้
//   const styles = [
//     { name: "Streets", value: "mapbox://styles/mapbox/streets-v11" },
//     { name: "Dark", value: "mapbox://styles/mapbox/dark-v10" },
//     { name: "Satellite Streets", value: "mapbox://styles/mapbox/satellite-streets-v11" },
//     { name: "Light", value: "mapbox://styles/mapbox/light-v10" }
//   ];

//   // ฟังก์ชันที่ใช้ในการสร้างแผนที่
//   useEffect(() => {
//     // สร้างแผนที่เพียงครั้งแรกที่โหลด
//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: selectedStyle, // ใช้ style จาก selectedStyle
//       // -37.78029297469943, 145.0361988357555    Alphington Grammar School
//       center: [145.0361988357555, -37.78029297469943], // พิกัดเริ่มต้นที่ลอสแอนเจลิส
//       zoom: 11,
//       attributionControl: false,
//       dragPan: true, // ให้เลื่อนแผนที่ได้
//       scrollZoom: true, // ปิดการซูมด้วยการเลื่อนเมาส์
//       boxZoom: false, // ปิดการซูมด้วยการเลือกกล่อง
//       dragRotate: false, // ปิดการหมุนแผนที่
//     });

//     mapRef.current = map;

//     // ฟังก์ชันสำหรับปักหมุดเมื่อผู้ใช้คลิกบนแผนที่
//     const onMapClick = (event) => {
//       const { lngLat } = event; // ดึงพิกัดของตำแหน่งที่คลิก

//       // สร้างหมุดใหม่
//       const newMarker = new mapboxgl.Marker({ draggable: true }) // ตั้งค่าให้หมุดสามารถลากได้
//         .setLngLat([lngLat.lng, lngLat.lat]) // ตั้งค่าพิกัดของหมุด
//         .addTo(map); // เพิ่มหมุดลงในแผนที่

//       // ฟังก์ชันที่จะอัปเดตตำแหน่งของหมุดใน state เมื่อหมุดถูกลาก
//       newMarker.on('dragend', () => {
//         const newLngLat = newMarker.getLngLat();
//         setMarkers((prevMarkers) => {
//           return prevMarkers.map((marker) =>
//             marker.id === newMarker.id
//               ? { ...marker, lngLat: [newLngLat.lng, newLngLat.lat] }
//               : marker
//           );
//         });
//       });

//       // เพิ่มหมุดลงใน state เพื่อเก็บข้อมูล
//       setMarkers((prevMarkers) => [
//         ...prevMarkers,
//         { id: prevMarkers.length + 1, marker: newMarker, lngLat: [lngLat.lng, lngLat.lat] },
//       ]);
//     };

//     // ฟังการคลิกบนแผนที่
//     map.on('click', onMapClick);

//     // Cleanup เมื่อ component ถูกลบ
//     return () => {
//       if (map) map.remove();
//     };
//   }, []); // useEffect นี้จะทำงานเพียงครั้งเดียวเมื่อ component ถูก mount

//   // ฟังก์ชันที่ใช้ในการเปลี่ยนแผนที่เมื่อเลือก style ใหม่
//   useEffect(() => {
//     if (mapRef.current) {
//       mapRef.current.setStyle(selectedStyle); // เปลี่ยนแผนที่
//     }
//   }, [selectedStyle]);

//   return (
//     <div>
//       <h1>Choose a Map Style</h1>
//       <select onChange={(e) => setSelectedStyle(e.target.value)} value={selectedStyle}>
//         {styles.map((style) => (
//           <option key={style.value} value={style.value}>
//             {style.name}
//           </option>
//         ))}
//       </select>

//       <div
//         ref={mapContainerRef}
//         style={{ height: "800px", width: "100%" }}
//       />

//       <div className="mt-4">
//         <h2>Placed Markers:</h2>
//         <ul>
//           {markers.map((marker) => (
//             <li key={marker.id}>
//               Marker {marker.id}:
//               {` Longitude: ${marker.lngLat[0]}, Latitude: ${marker.lngLat[1]}`}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Map;

// ######################### late find pin amd ,ockup

// import { useState, useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import 'mapbox-gl/dist/mapbox-gl.css';
// import markerData from './markerData.json'; // นำเข้าไฟล์ JSON

// // ตั้งค่า token ของ Mapbox
// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

// const Map = () => {
//   const [selectedStyle, setSelectedStyle] = useState("mapbox://styles/mapbox/light-v10"); // ค่าเริ่มต้นเป็น Streets
//   const [markers, setMarkers] = useState([]); // ใช้เก็บหมุดที่ถูกสร้างขึ้น
//   const mapContainerRef = useRef(null); // ใช้สำหรับอ้างอิงการแสดงผลแผนที่
//   const mapRef = useRef(null); // ใช้เก็บแผนที่ที่ถูกสร้างขึ้น

//   // รายการ styles ที่ผู้ใช้สามารถเลือกได้
//   const styles = [
//     { name: "Streets", value: "mapbox://styles/mapbox/streets-v11" },
//     { name: "Dark", value: "mapbox://styles/mapbox/dark-v10" },
//     { name: "Satellite Streets", value: "mapbox://styles/mapbox/satellite-streets-v11" },
//     {name: "Light", value: "mapbox://styles/mapbox/light-v10"}
//   ];

//   // ฟังก์ชันที่ใช้ในการสร้างแผนที่
//   useEffect(() => {
//     // สร้างแผนที่เพียงครั้งแรกที่โหลด
//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: selectedStyle, // ใช้ style จาก selectedStyle
//       center: [145.0361988357555, -37.78029297469943], // พิกัดเริ่มต้นที่ลอสแอนเจลิส
//       zoom: 11,
//       attributionControl: false,
//       dragPan: true, // ให้เลื่อนแผนที่ได้
//       scrollZoom: true, // ปิดการซูมด้วยการเลื่อนเมาส์
//       boxZoom: false, // ปิดการซูมด้วยการเลือกกล่อง
//       dragRotate: false, // ปิดการหมุนแผนที่
//     });

//     mapRef.current = map;

//     // ฟังก์ชันสำหรับปักหมุดเมื่อผู้ใช้คลิกบนแผนที่
//     const onMapClick = (event) => {
//       const { lngLat } = event; // ดึงพิกัดของตำแหน่งที่คลิก

//       // สร้างหมุดใหม่
//       const newMarker = new mapboxgl.Marker({ draggable: true }) // ตั้งค่าให้หมุดสามารถลากได้
//         .setLngLat([lngLat.lng, lngLat.lat]) // ตั้งค่าพิกัดของหมุด
//         .addTo(map); // เพิ่มหมุดลงในแผนที่

//       // ฟังก์ชันที่จะอัปเดตตำแหน่งของหมุดใน state เมื่อหมุดถูกลาก
//       newMarker.on('dragend', () => {
//         const newLngLat = newMarker.getLngLat();
//         setMarkers((prevMarkers) => {
//           return prevMarkers.map((marker) =>
//             marker.id === newMarker.id
//               ? { ...marker, lngLat: [newLngLat.lng, newLngLat.lat] }
//               : marker
//           );
//         });
//       });

//       // ฟังก์ชันที่จะลบหมุดเมื่อคลิกขวา
//       newMarker.getElement().addEventListener('contextmenu', (e) => {
//         e.preventDefault(); // ป้องกันเมนู context menu ที่เบราว์เซอร์แสดง
//         newMarker.remove(); // ลบหมุดจากแผนที่
//         setMarkers((prevMarkers) =>
//           prevMarkers.filter((marker) => marker.id !== newMarker.id)
//         ); // ลบหมุดจาก state
//       });

//       // เพิ่มหมุดลงใน state เพื่อเก็บข้อมูล
//       setMarkers((prevMarkers) => [
//         ...prevMarkers,
//         { id: prevMarkers.length + 1, marker: newMarker, lngLat: [lngLat.lng, lngLat.lat] },
//       ]);
//     };

//     // ฟังการคลิกบนแผนที่
//     map.on('click', onMapClick);

//     // Cleanup เมื่อ component ถูกลบ
//     return () => {
//       if (map) map.remove();
//     };
//   }, []); // useEffect นี้จะทำงานเพียงครั้งเดียวเมื่อ component ถูก mount

//   // ฟังก์ชันที่ใช้ในการเปลี่ยนแผนที่เมื่อเลือก style ใหม่
//   useEffect(() => {
//     if (mapRef.current) {
//       mapRef.current.setStyle(selectedStyle); // เปลี่ยนแผนที่
//     }
//   }, [selectedStyle]);


//     useEffect(() => {
//     if (mapRef.current) {
//       markerData.forEach(({ longitude, latitude }) => {
//         const el = document.createElement('div');
//         el.style.width = '10px'; // กำหนดขนาดจุด
//         el.style.height = '10px';
//         el.style.backgroundColor = '#58d68d'; // สีของจุด
//         el.style.borderRadius = '50%'; // ทำให้เป็นวงกลม
//         el.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)'; // เพิ่มเงาเล็กน้อย
        
//         const marker = new mapboxgl.Marker({ element: el })
//           .setLngLat([longitude, latitude])
//           .addTo(mapRef.current);

//         // เพิ่ม event listener เมื่อคลิกหมุด
//         marker.getElement().addEventListener('click', () => {
//           // ซูมเข้าหมายเลขหมุดที่คลิก
//           mapRef.current.flyTo({
//             center: [longitude, latitude],
//             zoom: 18, // กำหนดระดับการซูม
//             speed: 1.5, // ความเร็วในการซูม
//             curve: 1.5, // ความโค้งในการเคลื่อนที่
//             easing(t) { return t; }, // ประเภทของ easing
//           });
//         });
//       });
//     }
//   }, [selectedStyle]);

//   return (
//     <div>
//       <h1>Choose a Map Style</h1>
//       <select onChange={(e) => setSelectedStyle(e.target.value)} value={selectedStyle}>
//         {styles.map((style) => (
//           <option key={style.value} value={style.value}>
//             {style.name}
//           </option>
//         ))}
//       </select>

//       <div
//         ref={mapContainerRef}
//         style={{ height: "800px", width: "100%" }}
//       />

//       <div className="mt-4">
//         <h2>Placed Markers:</h2>
//         <ul>
//           {markers.map((marker) => (
//             <li key={marker.id}>
//               Marker {marker.id}:
//               {` Longitude: ${marker.lngLat[0]}, Latitude: ${marker.lngLat[1]}`}
//             </li>
//           ))}
//         </ul>
//       </div>


//     </div>
//   );
// };   

// export default Map;


// // 23/12/67

// import { useState, useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import 'mapbox-gl/dist/mapbox-gl.css';
// import markerData from './markerData.json'; // นำเข้าไฟล์ JSON

// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

// const Map = () => {
//   const [selectedStyle, setSelectedStyle] = useState("mapbox://styles/mapbox/light-v10");
//   const mapContainerRef = useRef(null);
//   const mapRef = useRef(null);

//   const styles = [
//     { name: "Streets", value: "mapbox://styles/mapbox/streets-v11" },
//     { name: "Dark", value: "mapbox://styles/mapbox/dark-v10" },
//     { name: "Satellite Streets", value: "mapbox://styles/mapbox/satellite-streets-v11" },
//     { name: "Light", value: "mapbox://styles/mapbox/light-v10" }
//   ];

//   useEffect(() => {
//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: selectedStyle,
//       center: [145.03619883, -37.78029297],
//       zoom: 11,
//       attributionControl: false,
//     });

//       // ปักหมุดที่จุดศูนย์กลาง
//     const centerMarker = new mapboxgl.Marker({ color: 'black' }) // กำหนดสีหมุด (เช่น สีแดง)
//     .setLngLat([145.0361988357555, -37.78029297469943]) // พิกัดของจุดศูนย์กลาง
//     .addTo(map); // เพิ่มหมุดลงในแผนที่


//     mapRef.current = map;

//     // Cleanup เมื่อ component ถูกลบ
//     return () => map.remove();
//   }, []);

//   useEffect(() => {
//     if (mapRef.current) {
//       mapRef.current.setStyle(selectedStyle);
//     }
//   }, [selectedStyle]);

//   useEffect(() => {
//     if (mapRef.current) {
//       // ปักหมุดแบบจุดกลมเล็กๆ
//       markerData.forEach(({ longitude, latitude }) => {
//         const el = document.createElement('div');
//         el.style.width = '8px'; // กำหนดขนาดจุด
//         el.style.height = '8px';
//         el.style.backgroundColor = '#58d68d'; // สีของจุด
//         el.style.borderRadius = '50%'; // ทำให้เป็นวงกลม
//         el.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)'; // เพิ่มเงาเล็กน้อย
  
//         new mapboxgl.Marker({ element: el })
//           .setLngLat([longitude, latitude])
//           .addTo(mapRef.current);
//       });
//     }
//   }, []);

  

//   return (
//     <div>
//       <h1>Choose a Map Style</h1>
//       <select onChange={(e) => setSelectedStyle(e.target.value)} value={selectedStyle}>
//         {styles.map((style) => (
//           <option key={style.value} value={style.value}>
//             {style.name}
//           </option>
//         ))}
//       </select>

//       <div
//         ref={mapContainerRef}
//         style={{ height: "800px", width: "100%" }}
//       />
//     </div>
//   );
// };

// export default Map;


// Mockup

// import { useState, useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import 'mapbox-gl/dist/mapbox-gl.css';
// import markerData from './markerData.json'; // นำเข้าไฟล์ JSON

// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

// const Map = () => {
//   const [selectedStyle, setSelectedStyle] = useState("mapbox://styles/mapbox/light-v10");
//   const mapContainerRef = useRef(null);
//   const mapRef = useRef(null);

//   const styles = [
//     { name: "Streets", value: "mapbox://styles/mapbox/streets-v11" },
//     { name: "Dark", value: "mapbox://styles/mapbox/dark-v10" },
//     { name: "Satellite Streets", value: "mapbox://styles/mapbox/satellite-streets-v11" },
//     { name: "Light", value: "mapbox://styles/mapbox/light-v10" }
//   ];

//   useEffect(() => {
//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: selectedStyle,
//       center: [145.03619883, -37.78029297],
//       zoom: 11,
//       attributionControl: false,
//     });

//     // ปักหมุดที่จุดศูนย์กลาง
//     const centerMarker = new mapboxgl.Marker({ color: 'black' })
//       .setLngLat([145.0361988357555, -37.78029297469943])
//       .addTo(map);

//     mapRef.current = map;

//     // Cleanup เมื่อ component ถูกลบ
//     return () => map.remove();
//   }, [selectedStyle]);

//   useEffect(() => {
//     if (mapRef.current) {
//       mapRef.current.setStyle(selectedStyle);
//     }
//   }, [selectedStyle]);

//   useEffect(() => {
//     if (mapRef.current) {
//       markerData.forEach(({ longitude, latitude }) => {
//         const el = document.createElement('div');
//         el.style.width = '10px'; // กำหนดขนาดจุด
//         el.style.height = '10px';
//         el.style.backgroundColor = '#58d68d'; // สีของจุด
//         el.style.borderRadius = '50%'; // ทำให้เป็นวงกลม
//         el.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)'; // เพิ่มเงาเล็กน้อย
        
//         const marker = new mapboxgl.Marker({ element: el })
//           .setLngLat([longitude, latitude])
//           .addTo(mapRef.current);

//         // เพิ่ม event listener เมื่อคลิกหมุด
//         marker.getElement().addEventListener('click', () => {
//           // ซูมเข้าหมายเลขหมุดที่คลิก
//           mapRef.current.flyTo({
//             center: [longitude, latitude],
//             zoom: 18, // กำหนดระดับการซูม
//             speed: 1.5, // ความเร็วในการซูม
//             curve: 1.5, // ความโค้งในการเคลื่อนที่
//             easing(t) { return t; }, // ประเภทของ easing
//           });
//         });
//       });
//     }
//   }, [selectedStyle]);

//   return (
//     <div>
//       <h1>Choose a Map Style</h1>
//       <select onChange={(e) => setSelectedStyle(e.target.value)} value={selectedStyle}>
//         {styles.map((style) => (
//           <option key={style.value} value={style.value}>
//             {style.name}
//           </option>
//         ))}
//       </select>

//       <div
//         ref={mapContainerRef}
//         style={{ height: "800px", width: "100%" }}
//       />
//     </div>
//   );
// };

// export default Map;



// api marker

import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

import { drawRoute } from "../services/mapboxService";
import { fetchMarkers } from "../services/mapboxService";
import { subscribeAuthState } from "../services/authService";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(""); // State สำหรับเก็บ token

  const [selectedStyle, setSelectedStyle] = useState("mapbox://styles/mapbox/light-v10");
  const [markers, setMarkers] = useState([]); // State สำหรับเก็บข้อมูลหมุดจาก API
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const styles = [
    { name: "Streets", value: "mapbox://styles/mapbox/streets-v11" },
    { name: "Dark", value: "mapbox://styles/mapbox/dark-v10" },
    { name: "Satellite Streets", value: "mapbox://styles/mapbox/satellite-streets-v11" },
    { name: "Light", value: "mapbox://styles/mapbox/light-v10" }
  ];

  useEffect(() => {
    const unsubscribe = subscribeAuthState(setUser, setIdToken); // เรียกใช้ service
    return () => unsubscribe(); // เมื่อ component ถูกลบออก, ยกเลิกการ subscribe
  }, []); // ใช้ [] เพื่อให้เพียงแค่ครั้งแรกที่ mount

  
  useEffect(() => {
    const fetchAndSetMarkers = async () => {
      try {
        if (idToken) {
          const data = await fetchMarkers(idToken); // เรียกใช้ service ดึงข้อมูล
          setMarkers(data); // เก็บข้อมูลที่ได้จาก API ใน state
        }
      } catch (error) {
        console.error("Error fetching marker data: ", error);
      }
    };
    fetchAndSetMarkers();
  }, [idToken]);


  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: selectedStyle,
      center: [145.03619883, -37.78029297],
      zoom: 12,
      attributionControl: false,
    });

    // ปักหมุดที่จุดศูนย์กลาง
    const centerMarker = new mapboxgl.Marker({ color: 'black' })
      .setLngLat([145.0361988357555, -37.78029297469943])
      .addTo(map);

    mapRef.current = map;

    return () => map.remove(); // Cleanup เมื่อ component ถูกลบ
  }, [selectedStyle]);

  useEffect(() => {
    if (mapRef.current && markers.length > 0) {
      // ลบหมุดเดิมก่อน เพื่อไม่ให้มีหมุดซ้ำ
      const existingMarkers = document.querySelectorAll('.custom-marker');
      existingMarkers.forEach((marker) => marker.remove());
      let currentPopup = null; 
  
      markers.forEach(({ latitude, longitude, first_name, last_name, age, gender, address, status }) => {
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.style.width = '10px'; // ขนาดจุด
        el.style.height = '10px';
        // el.style.backgroundColor = '#58d68d'; // สีของจุด
        el.style.backgroundColor = status === 0 ? '#FFECA1' : '#58d68d'; // เปลี่ยนสีเป็นเทาถ้า status เป็น 0
        el.style.borderRadius = '50%'; // ทำให้เป็นวงกลม
        el.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)'; // เพิ่มเงาเล็กน้อย
  
        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([parseFloat(longitude), parseFloat(latitude)]) // แปลง latitude และ longitude เป็นตัวเลข
          .addTo(mapRef.current);
  
        // สร้าง Popup
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        }).setHTML(
          `<div>
            <h3>${first_name} ${last_name}</h3>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Gender:</strong> ${gender}</p>
            <p><strong>Address:</strong> ${address}</p>
          </div>`
        );
  
        // Event แสดง Popup เมื่อ mouseenter
        el.addEventListener('mouseenter', () => {
          popup.setLngLat([parseFloat(longitude), parseFloat(latitude)]).addTo(mapRef.current);
        });
  
        // Event ซ่อน Popup เมื่อ mouseleave
        el.addEventListener('mouseleave', () => {
          popup.remove();
        });

        

        // // Event แสดง Popup เมื่อ click
        // el.addEventListener('click', () => {
        //   if (currentPopup) {
        //     currentPopup.remove();
        //   }
        //   popup.setLngLat([parseFloat(longitude), parseFloat(latitude)]).addTo(mapRef.current);
        //   currentPopup = popup;
        // });

  
        // Event คลิกเพื่อโฟกัสที่หมุด
        // el.addEventListener('click', () => {
        //   mapRef.current.flyTo({
        //     center: [parseFloat(longitude), parseFloat(latitude)],
        //     zoom: 17,
        //     speed: 1.5,
        //     curve: 1.5,
        //     easing(t) {
        //       return t;
        //     },
        //   });
        // });

      });
    }
  }, [markers, selectedStyle]);


  //วาดเองเมื่อเข้าเว็บ
  // useEffect(() => {
  //   if (mapRef.current) {
  //     // ตรวจสอบว่ามีข้อมูลของแผนที่อยู่แล้ว
  //     const start = { lng: 145.03619883, lat: -37.78029297 }; // จุดเริ่มต้น
  //     const end = { lng: 145.05715817, lat: -37.77380638 };   // จุดปลายทาง
  //     drawRoute(mapRef.current, start, end);
  //   }
  // }, [mapRef.current]);


  const points = [
    { lng: 145.03619883, lat: -37.78029297 }, // จุดเริ่มต้น
    { lng: 145.00570028, lat: -37.77455545 }
  ];
  const points2 = [
    { lng: 145.03619883, lat: -37.78029297 }, // จุดเริ่มต้น
    { lng: 145.02627122, lat: -37.75486496 }
  ];
  const points3 = [
    { lng: 145.03619883, lat: -37.78029297 }, // จุดเริ่มต้น
    { lng: 145.05951330, lat: -37.77714326 }
  ];
  const points4 = [
    { lng: 145.03619883, lat: -37.78029297 }, // จุดเริ่มต้น
    { lng: 145.04138367, lat: -37.76253585 }
  ];
  const points5 = [
    { lng: 145.03619883, lat: -37.78029297 }, // จุดเริ่มต้น
    { lng: 145.03326988, lat: -37.78597188 }
  ];

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
        style={{ height: "700px", width: "100%" }}
      />

    <button
      onClick={() => {
        drawRoute(mapRef.current, points, 1);
        drawRoute(mapRef.current, points2, 2);
        drawRoute(mapRef.current, points3, 3);
        drawRoute(mapRef.current, points4, 4);
        drawRoute(mapRef.current, points5, 5);
      }}
      style={{
        backgroundColor: "green",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        margin: "10px",
      }}
    >
      Draw Multi-Point Route
    </button>
    </div>
  );
};

export default Map;

