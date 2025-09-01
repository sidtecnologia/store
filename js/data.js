const productData = [
    {
        id: "prod-1",
        name: "Vestido Floral de Verano",
        description: "Un vestido ligero con un patrón de flores vibrante, perfecto para el verano.",
        price: 60.000,
        image: [
            "img/ropa/mujer/vestido-floral-frente.webp",
            "img/ropa/mujer/vestido-floral-atras.webp",
            "img/ropa/mujer/vestido-floral-cerca.webp",
        ],
        category: "ropa",
        gender: "mujer",
        isOffer: true,
        featured: true,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Negro"],
        stock: {
            "Negro_S": 3, "Negro_M": 5, "Negro_L": 0, "Negro_XL": 2,
        }
    },
    {
        id: "prod-2",
        name: "Chaqueta de Cuero Clásica",
        description: "Chaqueta de cuero genuino, estilo atemporal que nunca pasa de moda.",
        price: 120.000,
        image: [
            "img/ropa/hombre/chaqueta-cuero-frente.jpg",
            "img/ropa/hombre/chaqueta-cuero-atras.jpg",
            "img/ropa/hombre/chaqueta-cuero-cerca.jpg",
        ],
        category: "ropa",
        gender: "hombre",
        isOffer: false,
        featured: true,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Negro", "Marrón"],
        stock: {
            "Negro_S": 3, "Negro_M": 5, "Negro_L": 0, "Negro_XL": 2,
            "Marrón_S": 1, "Marrón_M": 3, "Marrón_L": 4, "Marrón_XL": 0
        }
    },
    {
        id: "prod-3",
        name: "Pantalones Deportivos Flex",
        description: "Pantalones cómodos y flexibles, ideales para cualquier actividad física.",
        price: 88.000,
        image: [
            "img/ropa/hombre/pants-deportivos-frente.jpg",
            "img/ropa/hombre/pants-deportivos-atras.jpg",
            "img/ropa/hombre/pants-deportivos-cerca.jpg",
        ],
        category: "ropa",
        style: "deportivo",
        gender: "hombre",
        isOffer: true,
        featured: false,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Gris", "Negro"],
        stock: {
            "Gris_S": 8, "Gris_M": 12, "Gris_L": 10, "Gris_XL": 5,
            "Negro_S": 6, "Negro_M": 9, "Negro_L": 7, "Negro_XL": 4
        }
    },
    {
        id: "prod-4",
        name: "Tenis Urbanos Blancos",
        description: "Calzado casual para el día a día con un diseño moderno y minimalista.",
        price: 99.000,
        image: [
            "img/zapatos/mujer/tenis-urbanos.jpg",
            "img/zapatos/mujer/tenis-urbanos-1.jpg",
            "img/zapatos/mujer/tenis-urbanos-2.jpg",
        ],
        category: "Zapatos",
        gender: "mujer",
        isOffer: false,
        featured: false,
        sizes: ["37", "38", "39", "40", "41", "42", "43"],
        colors: ["Blanco", "Azúl"],
        stock: {
            "Blanco_37": 2, "Blanco_38": 5, "Blanco_39": 8, "Blanco_40": 10, "Blanco_41": 7, "Blanco_42": 3, "Blanco_43": 1,
            "Azul_37": 1, "Azul_38": 3, "Azul_39": 0
        }
    },
    {
        id: "prod-5",
        name: "Bolso de Piel Genuina",
        description: "Bolso elegante y espacioso, perfecto para complementar tu atuendo diario.",
        price: 150.00,
        image: [
            "img/accesorios/bolso-piel.webp",
            "img/accesorios/bolso-piel-1.webp",
            "img/accesorios/bolso-piel-2.jpg",
        ],
        category: "Accesorios",
        gender: "mujer",
        isOffer: false,
        featured: true,
        sizes: ["Única"],
        colors: ["Camel", "Negro"],
        stock: {
            "Camel_Única": 5,
            "Negro_Única": 2
        }
    },
    {
        id: "prod-6",
        name: "Gorra Clásica de Béisbol",
        description: "Gorra de béisbol de estilo atemporal, ideal para cualquier look casual.",
        price: 35.000,
        image: [
            "img/accesorios/gorra-clasica.webp",
            "img/accesorios/gorra-clasica-1.webp",
            "img/accesorios/gorra-clasica-2.webp",
        ],
        category: "Accesorios",
        gender: "unisex",
        isOffer: true,
        featured: false,
        sizes: ["Ajustable"],
        colors: ["Negro", "Beige", "Blanco"],
        stock: {
            "Negro_Ajustable": 3,
            "Beige_Ajustable": 5,
            "Blanco_Ajustable": 0
        }
    },
    {
        id: "prod-7",
        name: "Sudadera con Capucha",
        description: "Sudadera cómoda y suave, ideal para un estilo casual y relajado.",
        price: 60.000,
        image: [
            "img/ropa/unisex/sudadera.webp",
            "img/ropa/unisex/sudadera-1.webp",
            "img/ropa/unisex/sudadera-2.webp",
        ],
        category: "ropa",
        gender: "unisex",
        isOffer: false,
        featured: false,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Blanco"],
        stock: {
            "Blanco_S": 7, "Blanco_M": 10, "Blanco_L": 8, "Blanco_XL": 6,
        }
    },
    {
        id: "prod-8",
        name: "Camisa de Lino Elegante",
        description: "Camisa de lino ligera, perfecta para eventos formales o casuales en climas cálidos.",
        price: 75.00,
        image: [
            "img/camisa-lino.jpg",
        ],
        category: "ropa",
        gender: "hombre",
        isOffer: false,
        featured: false,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Blanco", "Beige"],
        stock: {
            "Blanco_S": 4, "Blanco_M": 6, "Blanco_L": 5, "Blanco_XL": 3,
            "Beige_S": 2, "Beige_M": 4, "Beige_L": 3, "Beige_XL": 1
        }
    },
    {
        id: "prod-9",
        name: "Zapatos de Tacón Clásicos",
        description: "Zapatos de tacón de diseño atemporal, perfectos para cualquier ocasión.",
        price: 95.00,
        image: [
            "img/zapatos-tacon.jpg",
        ],
        category: "Zapatos",
        gender: "mujer",
        isOffer: false,
        featured: false,
        sizes: ["36", "37", "38", "39", "40"],
        colors: ["Negro", "Rojo"],
        stock: {
            "Negro_36": 2, "Negro_37": 5, "Negro_38": 8, "Negro_39": 6, "Negro_40": 4,
            "Rojo_36": 1, "Rojo_37": 3, "Rojo_38": 6, "Rojo_39": 4, "Rojo_40": 2
        }
    },
    {
        id: "prod-10",
        name: "Jeans Ajustados",
        description: "Jeans de corte ajustado y tela elástica para máxima comodidad y estilo.",
        price: 80.00,
        image: [
            "img/ropa/mujer/jeans-ajustados.webp",
            "img/ropa/mujer/jeans-ajustados-1.webp",
            "img/ropa/mujer/jeans-ajustados-2.webp",
        ],
        category: "ropa",
        gender: "mujer",
        isOffer: true,
        featured: false,
        sizes: ["28", "30", "32", "34", "36"],
        colors: ["Azul"],
        stock: {
            "Azul_28": 3, "Azul_30": 8, "Azul_32": 10, "Azul_34": 7, "Azul_36": 4,
        }
    }
];