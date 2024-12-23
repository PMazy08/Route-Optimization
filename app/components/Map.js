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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../config";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const auth = getAuth(app);
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          // รอให้ getIdToken() คืนค่าและเก็บใน state
          const token = await user.getIdToken();
          setIdToken(token); // เก็บ token ใน state
        } catch (error) {
          console.error("Error getting ID token:", error);
        }
      } else {
        setUser(null); 
      }
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        if (idToken) {
          const response = await fetch('http://192.168.3.233:8080/api/students', {
            headers: {
              'Authorization': `Bearer ${idToken}`, // ส่ง token ใน headers
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            setMarkers(data); // เก็บข้อมูลที่ได้จาก API ใน state
          } else {
            console.error('Failed to fetch data from API:', response.status);
          }
        }
      } catch (error) {
        console.error("Error fetching marker data: ", error);
      }
    };

    fetchMarkers();
  }, [idToken]); // ใช้ idToken เป็น dependency เพื่อให้ดึงข้อมูลใหม่เมื่อ token เปลี่ยน



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
      markers.forEach(({ longitude, latitude }) => {
        const el = document.createElement('div');
        el.style.width = '10px'; // กำหนดขนาดจุด
        el.style.height = '10px';
        el.style.backgroundColor = '#58d68d'; // สีของจุด
        el.style.borderRadius = '50%'; // ทำให้เป็นวงกลม
        el.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)'; // เพิ่มเงาเล็กน้อย
        
        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([longitude, latitude])
          .addTo(mapRef.current);

        marker.getElement().addEventListener('click', () => {
          mapRef.current.flyTo({
            center: [longitude, latitude],
            zoom: 17,
            speed: 1.5,
            curve: 1.5,
            easing(t) { return t; },
          });
        });
      });
    }
  }, [markers, selectedStyle]);

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
    </div>
  );
};

export default Map;

