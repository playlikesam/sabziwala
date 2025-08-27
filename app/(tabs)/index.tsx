import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import products from '@/constants/products.json';
import { useCart } from '../../components/CartContext';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [quantities, setQuantities] = useState(
    products.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
  );
  const [showMenu, setShowMenu] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  const { addToCart } = useCart();

  const setQty = (id, qty) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, qty),
    }));
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.img}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}/kg</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQty(item.id, quantities[item.id] - 1)}
          >
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{quantities[item.id]} kg</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQty(item.id, quantities[item.id] + 1)}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() => addToCart(item, quantities[item.id])}
        >
          <Text style={styles.cartBtnTxt}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      {/* Header row with perfect padding */}
      <View style={styles.headerRow}>
        <Text style={styles.shopName}>sabziwala 🥦</Text>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setShowMenu(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.menuText}>≡</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.greetingCard}>
        <Text style={styles.slogan}>
          Fresh sabzi, faster delivery. Eat healthy, live happy! 
        </Text>
        <Text style={styles.tip}>
          Order farm-fresh vegetables for your family at unbeatable prices. No minimum, no drama.
        </Text>
      </View>

      {/* Product Grid */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Menu Modal */}
      <Modal visible={showMenu} transparent animationType="slide">
        <View style={styles.menuOverlay}>
          <View style={styles.menuSheet}>
            <Text style={styles.menuTitle}>Sabziwala Menu</Text>
            <Text style={styles.menuLine}>
              🎉 Special Offer: ₹20 off on your first order!
            </Text>
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => {
                setShowMenu(false);
                router.replace('/cart');
              }}
            >
              <Text style={styles.menuBtnText}>🛒 My Cart</Text>
            </TouchableOpacity>
            <Text style={styles.menuLine}>🍏 Freshness Guarantee</Text>
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => {
                setShowSupport(true);
              }}
            >
              <Text style={styles.menuBtnText}>📞 Help/Support</Text>
            </TouchableOpacity>
            <Text style={styles.menuLine}>
              😎 Ghar baithe sabzi, bina bhajiye ka jhanjhat!
            </Text>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowMenu(false)}
            >
              <Text
                style={{
                  color: '#FF9800',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Support Modal */}
      <Modal visible={showSupport} transparent animationType="fade">
        <View style={styles.menuOverlay}>
          <View style={styles.supportSheet}>
            <Text style={styles.menuTitle}>Support & Contact</Text>
            <Text style={styles.supportLine}>
              💬 WhatsApp: <Text style={{ color: '#FF9800' }}>+91-99999-12345</Text>
            </Text>
            <Text style={styles.supportLine}>
              📞 Phone: <Text style={{ color: '#FF9800' }}>+91-99999-12345</Text>
            </Text>
            <Text style={styles.supportLine}>
              ⏰ Timings: 7am - 9pm, All days open
            </Text>
            <Text style={styles.supportLine}>
              ✉️ Email: help@sabziwala.app
            </Text>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowSupport(false)}
            >
              <Text
                style={{
                  color: '#FF9800',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'android' ? 38 : 32,
    paddingHorizontal: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 17, // left/right padding for sabziwala + menu
    paddingTop: 0,
  },
  shopName: {
    fontSize: 22,
    fontFamily: 'Poppins_700Bold',
    color: '#FF9800',
    letterSpacing: 0.5,
  },
  menuButton: {
    backgroundColor: '#f3f3f3',
    borderRadius: 12,
    padding: 7,
    elevation: 3,
  },
  menuText: {
    fontSize: 22,
    color: '#FF9800',
    fontFamily: 'Poppins_700Bold',
  },
  greetingCard: {
    backgroundColor: '#FFFDF8',
    borderRadius: 20,
    padding: 18,
    marginBottom: 10,
    marginHorizontal: 10, // left/right card padding
    elevation: 2,
    shadowColor: '#FF9800',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  slogan: {
    fontSize: 15,
    fontFamily: 'Poppins_500Medium',
    color: '#222',
    marginBottom: 4,
  },
  tip: {
    fontSize: 12,
    color: '#555',
    fontFamily: 'Poppins_400Regular',
    marginBottom: 2,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    marginRight: 10,
    elevation: 1,
    shadowColor: '#222',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    maxWidth: '49%',
    minWidth: '49%',
  },
  img: {
    width: 54,
    height: 54,
    borderRadius: 12,
    marginBottom: 5,
    backgroundColor: '#E7E7E7',
  },
  productInfo: { width: '100%', alignItems: 'center' },
  productName: {
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
    color: '#222',
    marginBottom: 1,
    textAlign: 'center',
  },
  price: {
    fontSize: 11.5,
    color: '#FF9800',
    fontFamily: 'Poppins_500Medium',
    marginBottom: 5,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
    marginTop: 0,
  },
  qtyBtn: {
    backgroundColor: '#FFE0B2',
    paddingHorizontal: 9,
    paddingVertical: 2,
    borderRadius: 6,
  },
  qtyBtnText: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: 'bold',
    fontFamily: 'Poppins_700Bold',
  },
  qtyText: {
    fontSize: 12.5,
    fontFamily: 'Poppins_400Regular',
    color: '#333',
    marginHorizontal: 6,
  },
  cartBtn: {
    marginTop: 1,
    backgroundColor: '#FF9800',
    borderRadius: 7,
    paddingVertical: 7,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  cartBtnTxt: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    fontWeight: 'bold',
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(36,36,36,0.18)',
    justifyContent: 'flex-end',
  },
  menuSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 20,
    elevation: 6,
    alignItems: 'center',
  },
  supportSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 23,
    elevation: 8,
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    fontFamily: 'Poppins_700Bold',
    color: '#FF9800',
    marginBottom: 10,
  },
  menuLine: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins_500Medium',
    textAlign: 'left',
    marginBottom: 8,
  },
  menuBtn: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 7,
    marginVertical: 8,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  menuBtnText: {
    color: '#FFF',
    fontFamily: 'Poppins_700Bold',
    fontSize: 15,
  },
  closeBtn: {
    marginTop: 6,
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: '#FFFDF8',
  },
  supportLine: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins_500Medium',
    textAlign: 'left',
    marginBottom: 10,
  },
});
