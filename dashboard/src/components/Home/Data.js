// data.js
import sltlimg from "../Home/images/SLTL.png"
import hmtstrallion from "../Home/images/HMTStrallion200.png"
import mono200 from "../Home/images/mono-200.jpg"
import mtcmem from "../Home/images/mtcmEdgeModule.png"
import digitalTwin from "./images/spindle_feeddrive.png"
import foundry from "./images/foundry.png"

export const machineData = [
    {
      id: 1,
      name: "SLTL 'BRAHMASTRA' Fiber Laser Cutting Machine",
      image: sltlimg,
      description: "Precision computer numerical control milling machine for complex metal fabrication and precise cutting operations.",
      detailLink: "/machines/cnc-mill",
      specs: {
        capacity: "5-axis machining",
        precision: "±0.01mm",
        maxSpeed: "8000 RPM",
        machineStatus: "ON"
      }
    },
    {
      id: 2,
      name: "Stallion-200 CNC Turning Machine",
      image: hmtstrallion,
      description: "A Stallion-200 CNC Turning Machine is primarily used to produce precise, cylindrical shaped parts by rotating a workpiece while a cutting tool removes material, allowing for the creation of complex features like threads, shoulders, and diameters with high accuracy, typically used in industries like automotive, aerospace, medical, and manufacturing in general where high precision components are needed",
      detailLink: "https://cmti-edge.online/dashboard/NewRealTimeDashboard/MainDashboard/index.html",
      specs: {
        payload: "25kg",
        reach: "1.8m",
        accuracy: "±0.05mm",
        machineStatus: "ON"
      }
    },
    {
      id: 3,
      name: "Machine Tool Condition Monitoring Edge Module",
      image: mtcmem,
      description: "It is a Technology developed by CMTI for 'Machine Tool Condition Monitoring' using Edge computing, essentially allowing for real-time monitoring and analysis of machine tool health data directly at the machine, without needing to send large amounts of data to a central server, thus enabling faster detection and response to potential issues and minimizing downtime in manufacturing processes.",
      detailLink: "https://cmti-smddc-dashboard.com/dashboard",
      specs: {
        buildVolume: "500x500x500mm",
        materials: ["PLA", "ABS", "PETG"],
        layerResolution: "0.1mm",
        machineStatus: "ON"
      }
    },
    {
      id: 4,
      name: "MONO 200 CNC Turning Center Machine",
      image: mono200,
      description: "A 'Mono 200 machine' refers to a CNC turning center manufactured by Macpower, primarily used for precision machining of metal parts on a relatively small scale, particularly in industries like automotive, aerospace, and manufacturing, where high accuracy and repeatability are required for turning components with a maximum turning diameter of around 200mm (the '200' in the name signifying the chuck size).",
      detailLink: "/machines/laser-cutter",
      specs: {
        laserPower: "500W",
        cutWidth: "0.2mm",
        materialCompatibility: ["Steel", "Aluminum", "Wood"],
        machineStatus: "ON"
      }
    },
    {
      id: 5,
      name: "Development of DigitalTwin for Test Rigs of Machine Tool Subsystems",
      image: digitalTwin,
      description: "Automated plastic injection molding machine for mass production of complex plastic components.",
      detailLink: "/machines/injection-molder",
      specs: {
        injectionForce: "250 tons",
        cycleTime: "30-60 seconds",
        mouldSize: "600x600mm",
        machineStatus: "ON"
      }
    },
    {
      id: 6,
      name: "Integrated Smart Foundry 4.0",
      image: foundry,
      description: "CMTI has developed a Integrated smart foundry system that can produce a small intricate metal components with better quality. The system comprises of 3D printer, Sand Mixing and Moulding machine,Automatic melting & pouring unit powered and controlled by IIOT enabled controller. The technology primarily address the need for rapid manufacture of small parts required in small quantities, which is not economical for conventional foundries",
      detailLink: "https://ifoundry.online",
      specs: {
        accuracy: "±0.005mm",
        scanningSpeed: "600 points/second",
        probeTypes: ["Touch", "Optical"],
        machineStatus: "ON"
      }
    },
    {
      id: 7,
      name: "Welding Robot",
      image: "/images/welding-robot.jpg",
      description: "Advanced automated welding system for consistent and high-quality industrial welding applications.",
      detailLink: "/machines/welding-robot",
      specs: {
        weldingType: "MIG/TIG",
        jointAccuracy: "±0.2mm",
        workEnvelope: "2.5m radius",
        machineStatus: "ON"
      }
    },
    {
      id: 8,
      name: "Industrial Furnace",
      image: "/images/industrial-furnace.jpg",
      description: "High-temperature thermal processing equipment for heat treatment and metallurgical processes.",
      detailLink: "/machines/industrial-furnace",
      specs: {
        maxTemperature: "1200°C",
        chamberSize: "1000x800x600mm",
        heatingUniformity: "±5°C",
        machineStatus: "ON"
      }
    },
    {
      id: 9,
      name: "Automated Conveyor System",
      image: "/images/conveyor-system.jpg",
      description: "Advanced material handling system for efficient product transportation and sorting in manufacturing environments.",
      detailLink: "/machines/conveyor-system",
      specs: {
        speed: "2m/second",
        capacity: "500kg/minute",
        trackLength: "50m",
        machineStatus: "ON"
      }
    },
    {
      id: 10,
      name: "Paint Spray Robot",
      image: "/images/paint-robot.jpg",
      description: "Precision robotic painting system for consistent, high-quality surface coating in automotive and industrial applications.",
      detailLink: "/machines/paint-robot",
      specs: {
        sprayPattern: "360-degree",
        coverageArea: "10m²/hour",
        paintTypes: ["Liquid", "Powder"],
        machineStatus: "ON"
      }
    }
  ];
  
  export const companyInfo = {
    name: "Central Manufacturing Technology Institute",
    address: "123 Innovation Drive, Tech City, TC 54321",
    socialMedia: {
      google: "https://google.com/techindustrial",
      youtube: "https://youtube.com/techindustrial",
      linkedin: "https://linkedin.com/company/techindustrial"
    },
    copyrightYear: 2024
  };