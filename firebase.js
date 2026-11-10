// ========== FIREBASE CONFIG & INIT ==========
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, deleteDoc, updateDoc, query, where, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZojZWP2Xf6toSm93euf-_X2QlYRERnC8",
  authDomain: "daraz-5fc2a.firebaseapp.com",
  projectId: "daraz-5fc2a",
  storageBucket: "daraz-5fc2a.firebasestorage.app",
  messagingSenderId: "83175937504",
  appId: "1:83175937504:web:b7fadd162237beca0ec785",
  measurementId: "G-8HQ1EXDNT4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, collection, addDoc, getDocs, doc, setDoc, deleteDoc, updateDoc, query, where, orderBy, onSnapshot, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged };

// Auto-seed products if empty
async function seedProductsIfEmpty() {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);
    if (snapshot.empty) {
        const dummyProducts = [
            { title: "Smart Watch Series 8", price: 8999, originalPrice: 14999, discount: "-40%", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", category: "electronics", rating: 4.5, sold: "2k+ sold", badge: "11.11" },
            { title: "Running Shoes Pro", price: 3499, originalPrice: 5999, discount: "-42%", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", category: "men", rating: 4.4, sold: "5k+ sold", badge: "Hot" },
            { title: "Wireless Earbuds Pro", price: 4999, originalPrice: 8999, discount: "-44%", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", category: "electronics", rating: 4.6, sold: "8k+ sold", badge: "11.11" },
            { title: "Leather Wallet Men", price: 1299, originalPrice: 2499, discount: "-48%", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80", category: "men", rating: 4.3, sold: "3k+ sold", badge: "New" },
            { title: "Women Handbag Premium", price: 4999, originalPrice: 8999, discount: "-44%", image: "https://images.unsplash.com/photo-1548036328-9fa89d988305?w=400&q=80", category: "women", rating: 4.7, sold: "1k+ sold", badge: "Hot" },
            { title: "Gaming Laptop i7", price: 89999, originalPrice: 129999, discount: "-31%", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80", category: "electronics", rating: 4.5, sold: "500+ sold", badge: "11.11" },
            { title: "Cotton T-Shirt Pack 3", price: 1499, originalPrice: 2499, discount: "-40%", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80", category: "men", rating: 4.2, sold: "10k+ sold", badge: "Low Price" },
            { title: "Skincare Set 5 pcs", price: 2999, originalPrice: 4999, discount: "-40%", image: "https://images.unsplash.com/photo-1556228578-0d85b247ab26?w=400&q=80", category: "beauty", rating: 4.6, sold: "4k+ sold", badge: "New" },
            { title: "Bluetooth Speaker", price: 2499, originalPrice: 3999, discount: "-37%", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80", category: "electronics", rating: 4.4, sold: "6k+ sold", badge: "Hot" },
            { title: "Formal Shoes Men", price: 3999, originalPrice: 6999, discount: "-43%", image: "https://images.unsplash.com/photo-1596755094514-f87e34485f42?w=400&q=80", category: "men", rating: 4.3, sold: "2k+ sold", badge: "11.11" },
            { title: "Summer Dress Women", price: 2499, originalPrice: 4499, discount: "-44%", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80", category: "women", rating: 4.5, sold: "3k+ sold", badge: "New" },
            { title: "Power Bank 20000mAh", price: 1999, originalPrice: 3499, discount: "-43%", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80", category: "electronics", rating: 4.4, sold: "8k+ sold", badge: "Hot" },
            { title: "Yoga Mat Premium", price: 1299, originalPrice: 2199, discount: "-41%", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80", category: "health", rating: 4.3, sold: "5k+ sold", badge: "11.11" },
            { title: "Perfume Set 100ml", price: 3499, originalPrice: 5999, discount: "-42%", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80", category: "beauty", rating: 4.6, sold: "2k+ sold", badge: "New" },
            { title: "Smartphone 128GB", price: 44999, originalPrice: 59999, discount: "-25%", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80", category: "electronics", rating: 4.5, sold: "1k+ sold", badge: "11.11" },
            { title: "Denim Jacket Men", price: 4999, originalPrice: 8999, discount: "-44%", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80", category: "men", rating: 4.2, sold: "1k+ sold", badge: "Hot" },
            { title: "Makeup Kit 24 pcs", price: 1999, originalPrice: 3499, discount: "-43%", image: "https://images.unsplash.com/photo-1596462692248-09779609dd34?w=400&q=80", category: "beauty", rating: 4.7, sold: "4k+ sold", badge: "11.11" },
            { title: "Wireless Charger", price: 999, originalPrice: 1799, discount: "-44%", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80", category: "electronics", rating: 4.1, sold: "6k+ sold", badge: "Low Price" },
            { title: "Kids Sneakers", price: 1999, originalPrice: 3499, discount: "-43%", image: "https://images.unsplash.com/photo-1525297069238-9876741e4472?w=400&q=80", category: "men", rating: 4.4, sold: "3k+ sold", badge: "New" },
            { title: "Hair Dryer Ionic", price: 2999, originalPrice: 4999, discount: "-40%", image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=400&q=80", category: "beauty", rating: 4.5, sold: "2k+ sold", badge: "Hot" },
            { title: "Mechanical Keyboard", price: 5999, originalPrice: 9999, discount: "-40%", image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&q=80", category: "electronics", rating: 4.6, sold: "2k+ sold", badge: "11.11" },
            { title: "Fitness Band", price: 2499, originalPrice: 3999, discount: "-37%", image: "https://images.unsplash.com/photo-1575318189089-2b8b6b6e4d8e?w=400&q=80", category: "electronics", rating: 4.3, sold: "5k+ sold", badge: "New" },
            { title: "Backpack Travel", price: 2999, originalPrice: 4999, discount: "-40%", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80", category: "men", rating: 4.4, sold: "4k+ sold", badge: "Hot" },
            { title: "Sunglasses Polarized", price: 1999, originalPrice: 3499, discount: "-43%", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80", category: "fashion", rating: 4.2, sold: "5k+ sold", badge: "New" },
            { title: "Air Fryer 5L", price: 7999, originalPrice: 12999, discount: "-38%", image: "https://images.unsplash.com/photo-1580085495360-13a6c8c3a8e0?w=400&q=80", category: "home", rating: 4.5, sold: "2k+ sold", badge: "11.11" },
            { title: "Coffee Maker", price: 4999, originalPrice: 7999, discount: "-37%", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80", category: "home", rating: 4.4, sold: "3k+ sold", badge: "Hot" },
            { title: "Tablet 10 inch", price: 19999, originalPrice: 29999, discount: "-33%", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80", category: "electronics", rating: 4.5, sold: "800+ sold", badge: "11.11" },
            { title: "Winter Coat Women", price: 6999, originalPrice: 11999, discount: "-42%", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80", category: "women", rating: 4.6, sold: "1k+ sold", badge: "New" },
            { title: "Gaming Mouse RGB", price: 1999, originalPrice: 3499, discount: "-43%", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=80", category: "electronics", rating: 4.7, sold: "4k+ sold", badge: "Hot" },
            { title: "Water Bottle Smart", price: 1299, originalPrice: 2199, discount: "-41%", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80", category: "home", rating: 4.3, sold: "8k+ sold", badge: "Low Price" },
            { title: "Electric Kettle", price: 2499, originalPrice: 3999, discount: "-37%", image: "https://images.unsplash.com/photo-1571509951753-5e8e8b5e3b8a?w=400&q=80", category: "home", rating: 4.4, sold: "5k+ sold", badge: "New" },
            { title: "Headphones ANC", price: 12999, originalPrice: 19999, discount: "-35%", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", category: "electronics", rating: 4.6, sold: "2k+ sold", badge: "11.11" },
            { title: "Sports Watch GPS", price: 14999, originalPrice: 24999, discount: "-40%", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", category: "electronics", rating: 4.5, sold: "1k+ sold", badge: "Hot" },
            { title: "Casual Shirt Men", price: 1499, originalPrice: 2499, discount: "-40%", image: "https://images.unsplash.com/photo-1596755094514-f87e34485f42?w=400&q=80", category: "men", rating: 4.2, sold: "6k+ sold", badge: "New" },
            { title: "Lipstick Set 12", price: 1999, originalPrice: 3499, discount: "-43%", image: "https://images.unsplash.com/photo-1586490129373-c7a984fd3c3a?w=400&q=80", category: "beauty", rating: 4.7, sold: "3k+ sold", badge: "11.11" },
            { title: "Portable Fan", price: 999, originalPrice: 1699, discount: "-41%", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80", category: "home", rating: 4.1, sold: "5k+ sold", badge: "Low Price" },
            { title: "Smart Scale", price: 2999, originalPrice: 4999, discount: "-40%", image: "https://images.unsplash.com/photo-1516573441111-4b3c4e8a9b8c?w=400&q=80", category: "health", rating: 4.4, sold: "3k+ sold", badge: "Hot" },
            { title: "Laptop Stand", price: 1499, originalPrice: 2499, discount: "-40%", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80", category: "electronics", rating: 4.3, sold: "4k+ sold", badge: "New" },
            { title: "Desk Lamp LED", price: 1999, originalPrice: 3299, discount: "-39%", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80", category: "home", rating: 4.5, sold: "2k+ sold", badge: "11.11" },
            { title: "Bluetooth Keyboard", price: 2999, originalPrice: 4999, discount: "-40%", image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&q=80", category: "electronics", rating: 4.4, sold: "3k+ sold", badge: "Hot" },
            { title: "Phone Case Pack", price: 799, originalPrice: 1499, discount: "-47%", image: "https://images.unsplash.com/photo-1556656792-58570a1abe59?w=400&q=80", category: "electronics", rating: 4.2, sold: "10k+ sold", badge: "Low Price" },
            { title: "Travel Pillow", price: 1299, originalPrice: 2199, discount: "-41%", image: "https://images.unsplash.com/photo-1584030375442-ba17079a1c1a?w=400&q=80", category: "home", rating: 4.3, sold: "4k+ sold", badge: "New" },
            { title: "Resistance Bands", price: 999, originalPrice: 1699, discount: "-41%", image: "https://images.unsplash.com/photo-1571019613454-1db1f8f8b8b8?w=400&q=80", category: "health", rating: 4.4, sold: "6k+ sold", badge: "Hot" },
            { title: "Essential Oils Set", price: 2499, originalPrice: 3999, discount: "-37%", image: "https://images.unsplash.com/photo-1608571423902-6a99b7d4b5b8?w=400&q=80", category: "beauty", rating: 4.6, sold: "2k+ sold", badge: "11.11" },
            { title: "Digital Camera", price: 39999, originalPrice: 54999, discount: "-27%", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80", category: "electronics", rating: 4.5, sold: "300+ sold", badge: "New" },
            { title: "Watch Winder Box", price: 4999, originalPrice: 8999, discount: "-44%", image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&q=80", category: "fashion", rating: 4.3, sold: "500+ sold", badge: "Hot" },
            { title: "Robot Vacuum", price: 24999, originalPrice: 39999, discount: "-37%", image: "https://images.unsplash.com/photo-1558280421-6a0d8a9c6b5c?w=400&q=80", category: "home", rating: 4.4, sold: "800+ sold", badge: "11.11" },
            { title: "Electric Toothbrush", price: 3499, originalPrice: 5999, discount: "-42%", image: "https://images.unsplash.com/photo-1559591936-5b1b2e8b3b8c?w=400&q=80", category: "health", rating: 4.5, sold: "3k+ sold", badge: "Hot" },
            { title: "Projector 4K", price: 49999, originalPrice: 74999, discount: "-33%", image: "https://images.unsplash.com/photo-1478720568907-3c5e8b5e3b8c?w=400&q=80", category: "electronics", rating: 4.6, sold: "200+ sold", badge: "New" },
            { title: "Massage Gun", price: 5999, originalPrice: 9999, discount: "-40%", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80", category: "health", rating: 4.5, sold: "2k+ sold", badge: "11.11" },
            { title: "Wireless Earbuds Sport", price: 3999, originalPrice: 6999, discount: "-43%", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80", category: "electronics", rating: 4.4, sold: "4k+ sold", badge: "Hot" },
        ];

        for (const product of dummyProducts) {
            await addDoc(productsRef, product);
        }
        console.log("Seeded 50 dummy products");
    }
}

seedProductsIfEmpty();

export { seedProductsIfEmpty };