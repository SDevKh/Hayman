export interface ImageData {
    id: number;
    title: string;
    src: string;
}

export const images: ImageData[] = [
    { id: 1, title: "Lay's Classic", src: "/pics/lay1.webp" },
    { id: 2, title: "Lay's Cream & Onion", src: "/pics/lay2.jpg" },
    { id: 3, title: "Lay's Spanish Tomato", src: "/pics/lay3.jpg" },
    { id: 4, title: "Lay's Magic Masala", src: "/pics/lay4.jpg" },
    { id: 5, title: "Lay's Chile Limón", src: "/pics/lay5.jpg" },
    { id: 6, title: "Lay's Sizzling Hot", src: "/pics/lay6.jpg" },
    { id: 7, title: "Lay's Golden Crunch", src: "/pics/lay1.webp" },
    { id: 8, title: "Lay's Tangy Tomato", src: "/pics/lay3.jpg" },
    { id: 9, title: "Lay's Masala Burst", src: "/pics/lay4.jpg" },
    { id: 10, title: "Lay's Herb & Onion", src: "/pics/lay2.jpg" },
    { id: 11, title: "Lay's Spicy Delight", src: "/pics/lay6.jpg" },
    { id: 12, title: "Lay's Zesty Limón", src: "/pics/lay5.jpg" },
];

export const imagePaths: string[] = images.map((img) => img.src);
