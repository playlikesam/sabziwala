import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useCart } from '../../components/CartContext';
import { router } from 'expo-router';

export default function CartScreen() {
  const { cart, updateQty, removeFromCart, clearCart } = useCart();

  const getTotal = () =>
    cart.reduce((t, item) => t + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyText}>Your cart is empty.. bhukh ni lagi???</Text>
          <Text style={styles.emptySub}>
            Sabzi kha, chal order kar! Add fresh vegetables for home delivery. Healthy khana, suhana jeewan!
          </Text>
          <TouchableOpacity
            style={styles.emptyBtn}
            onPress={() => router.replace('/(tabs)')}
            activeOpacity={0.85}
          >
            <Text style={styles.emptyBtnText}>Back to Shop</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>Your Sabzi Cart 🛒</Text>
      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartCard}>
            <View style={styles.cardRow}>
              <Image
                source={{ uri: item.image }}
                style={styles.img}
                resizeMode="cover"
              />
              <View style={styles.infoMain}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>₹{item.price}/kg</Text>
                <View style={styles.qtyRow}>
                  <TouchableOpacity onPress={() => updateQty(item.id, item.quantity - 1)} style={styles.qtyBtn}>
                    <Text style={styles.qtyBtnText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity} kg</Text>
                  <TouchableOpacity onPress={() => updateQty(item.id, item.quantity + 1)} style={styles.qtyBtn}>
                    <Text style={styles.qtyBtnText}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeBtn}>
                    <Text style={styles.removeBtnText}>Remove</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemTotal}>Total: ₹{item.price * item.quantity}</Text>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
      <View style={styles.payCard}>
        <Text style={styles.payTitle}>Payment Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Grand Total</Text>
          <Text style={styles.summaryValue}>₹{getTotal()}</Text>
        </View>
        <TouchableOpacity
          style={styles.payBtn}
          onPress={() => {
            clearCart();
            router.replace('/commingsoon');
          }}
          activeOpacity={0.88}
        >
          <Text style={styles.payBtnText}>Pay Now & Order Sabzi!</Text>
        </TouchableOpacity>
        <Text style={styles.payNote}>Your order will be delivered in under 45 minutes! 🛵</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'android' ? 28 : 0,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 21,
    fontFamily: 'Poppins_700Bold',
    color: '#FF9800',
    marginBottom: 8,
    textAlign: 'center',
    marginTop: 2,
  },
  cartCard: {
    backgroundColor: '#FFFDF8',
    borderRadius: 17,
    padding: 13,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#FF9800',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 56,
    height: 56,
    borderRadius: 10,
    marginRight: 11,
    backgroundColor: '#E7E7E7',
  },
  infoMain: { flex: 1 },
  name: { fontSize: 15, fontFamily: 'Poppins_700Bold', color: '#222', marginBottom: 2 },
  price: { fontSize: 13, color: '#FF9800', fontFamily: 'Poppins_500Medium', marginBottom: 5 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 7, marginTop: 1 },
  qtyBtn: { backgroundColor: '#FFE0B2', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 2 },
  qtyBtnText: { fontSize: 16, color: '#FF9800', fontWeight: 'bold', fontFamily: 'Poppins_700Bold' },
  qtyText: { fontSize: 14, fontFamily: 'Poppins_400Regular', color: '#333', marginHorizontal: 7 },
  removeBtn: { marginLeft: 8, backgroundColor: '#FF9800', borderRadius: 5, paddingHorizontal: 10, paddingVertical: 4 },
  removeBtnText: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  itemTotal: { fontSize: 13, fontFamily: 'Poppins_500Medium', marginTop: 6, color: "#222" },
  payCard: {
    backgroundColor: "#FFFDF8",
    borderRadius: 17,
    padding: 17,
    elevation: 3,
    shadowColor: "#FF9800",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    marginBottom: 13,
    alignItems: "center",
  },
  payTitle: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: '#FF9800',
    marginBottom: 9,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "92%",
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
    color: "#222"
  },
  summaryValue: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: "#FF9800"
  },
  payBtn: {
    backgroundColor: '#FF9800',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 34,
    marginBottom: 9,
    marginTop: -4
  },
  payBtnText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
    letterSpacing: 0.5,
    textAlign: "center"
  },
  payNote: {
    fontSize: 13,
    color: "#222",
    marginTop: 2,
    fontFamily: 'Poppins_400Regular',
    textAlign: "center"
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyIcon: {
    fontSize: 44,
    marginBottom: 8
  },
  emptyText: {
    fontSize: 20,
    color: '#FF9800',
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
    marginBottom: 8
  },
  emptySub: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginBottom: 25
  },
  emptyBtn: {
    backgroundColor: '#FF9800',
    borderRadius: 7,
    paddingVertical: 12,
    paddingHorizontal: 29,
    alignSelf: "center"
  },
  emptyBtnText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
    textAlign: "center"
  }
});
