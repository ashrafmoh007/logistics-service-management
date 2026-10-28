import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const summaryCards = [
  { label: 'Orders', value: '1,284', icon: 'cube', color: '#2563eb' },
  { label: 'On Time', value: '93%', icon: 'checkmark-circle', color: '#16a34a' },
  { label: 'Fleet', value: '126', icon: 'truck', color: '#7c3aed' },
  { label: 'Revenue', value: '$2.4M', icon: 'cash', color: '#f59e0b' },
];

const shipmentData = [
  { id: 'LD-1001', route: 'Dubai → Abu Dhabi', status: 'In Transit', badge: '#DBEAFE', text: '#1D4ED8' },
  { id: 'LD-1002', route: 'Sharjah → Ajman', status: 'Delivered', badge: '#DCFCE7', text: '#166534' },
  { id: 'LD-1003', route: 'Jebel Ali → Ras Al Khaimah', status: 'Delayed', badge: '#FEF3C7', text: '#92400E' },
  { id: 'LD-1004', route: 'Al Ain → Dubai', status: 'Loading', badge: '#F3E8FF', text: '#7E22CE' },
];

const routes = [
  { id: '1', name: 'Route 21', driver: 'A. Khan', eta: '09:15 AM', status: 'On Time' },
  { id: '2', name: 'Route 34', driver: 'S. Ali', eta: '11:40 AM', status: 'Ahead' },
  { id: '3', name: 'Route 55', driver: 'N. Saeed', eta: '01:20 PM', status: 'Delayed' },
];

const inventory = [
  { id: '1', item: 'Cold Storage Packs', qty: '421 units', level: 'Healthy' },
  { id: '2', item: 'Packaging Boxes', qty: '872 units', level: 'Healthy' },
  { id: '3', item: 'Cable Kits', qty: '140 units', level: 'Low' },
];

const tabs = ['Overview', 'Shipments', 'Fleet', 'Inventory'];

export default function App() {
  const renderSummaryCard = ({ item }) => (
    <View key={item.label} style={[styles.card, { borderTopColor: item.color }]}> 
      <View style={styles.cardTop}>
        <Ionicons name={item.icon} size={18} color={item.color} />
        <Text style={styles.cardLabel}>{item.label}</Text>
      </View>
      <Text style={styles.cardValue}>{item.value}</Text>
    </View>
  );

  const renderShipment = ({ item }) => (
    <View style={styles.shipmentRow} key={item.id}>
      <View style={{ flex: 1 }}>
        <Text style={styles.shipmentId}>{item.id}</Text>
        <Text style={styles.shipmentRoute}>{item.route}</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: item.badge }]}>
        <Text style={[styles.statusText, { color: item.text }]}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F7FB" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.eyebrow}>Operations Dashboard</Text>
            <Text style={styles.title}>Logistics Command Center</Text>
          </View>
          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
            <Text style={styles.primaryButtonText}>+ New Shipment</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabRow}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, index === 0 && styles.tabActive]}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, index === 0 && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.summaryGrid}>
          {summaryCards.map((card) => renderSummaryCard({ item: card }))}
        </View>

        <View style={styles.panel}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Ionicons name="stats-chart" size={18} color="#64748B" />
          </View>

          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Total orders</Text>
              <Text style={styles.metricValue}>1,284</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Active vehicles</Text>
              <Text style={styles.metricValue}>84</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Warehouses</Text>
              <Text style={styles.metricValue}>5</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Efficiency</Text>
              <Text style={styles.metricValue}>96.2%</Text>
            </View>
          </View>
        </View>

        <View style={styles.panel}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Current Routes</Text>
            <Text style={styles.mutedBadge}>Live</Text>
          </View>

          {routes.map((route) => (
            <View key={route.id} style={styles.routeRow}>
              <View>
                <Text style={styles.routeName}>{route.name}</Text>
                <Text style={styles.routeMeta}>{route.driver}</Text>
              </View>
              <View style={styles.routeMetaBox}>
                <Text style={styles.routeEta}>{route.eta}</Text>
                <Text style={styles.routeStatus}>{route.status}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.panel}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shipment Activity</Text>
            <Text style={styles.mutedBadge}>4 active</Text>
          </View>
          <FlatList
            data={shipmentData}
            renderItem={renderShipment}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.panel}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Inventory</Text>
            <Text style={styles.mutedBadge}>Updated</Text>
          </View>

          {inventory.map((item) => (
            <View key={item.id} style={styles.inventoryRow}>
              <View>
                <Text style={styles.inventoryItem}>{item.item}</Text>
                <Text style={styles.inventoryQty}>{item.qty}</Text>
              </View>
              <View style={[styles.levelBadge, item.level === 'Low' ? styles.levelLow : styles.levelGood]}>
                <Text style={[styles.levelText, item.level === 'Low' ? styles.levelTextLow : styles.levelTextGood]}>{item.level}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },
  content: {
    padding: 20,
    gap: 18,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#64748B',
    marginBottom: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    maxWidth: width * 0.48,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#2563EB',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  tabRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  tab: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tabActive: {
    backgroundColor: '#EAF2FF',
    borderColor: '#BFDBFE',
  },
  tabText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#1D4ED8',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: (width - 56) / 2,
    borderRadius: 16,
    padding: 16,
    borderTopWidth: 4,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
  },
  panel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  mutedBadge: {
    fontSize: 11,
    color: '#64748B',
    backgroundColor: '#F1F5F9',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: 'hidden',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metricItem: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
  },
  metricLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
  },
  routeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  routeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  routeMeta: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 3,
  },
  routeMetaBox: {
    alignItems: 'flex-end',
  },
  routeEta: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
  routeStatus: {
    fontSize: 11,
    color: '#16A34A',
    marginTop: 4,
  },
  shipmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  shipmentId: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  shipmentRoute: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 3,
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  inventoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  inventoryItem: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  inventoryQty: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 3,
  },
  levelBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  levelGood: {
    backgroundColor: '#DCFCE7',
  },
  levelLow: {
    backgroundColor: '#FEE2E2',
  },
  levelText: {
    fontSize: 11,
    fontWeight: '700',
  },
  levelTextGood: {
    color: '#166534',
  },
  levelTextLow: {
    color: '#B91C1C',
  },
});
