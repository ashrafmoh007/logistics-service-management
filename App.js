import React, { useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const stats = [
  { label: 'Shipments', value: '1,284', tone: '#2563eb' },
  { label: 'On-time', value: '93%', tone: '#16a34a' },
  { label: 'Fleet', value: '126', tone: '#7c3aed' },
  { label: 'Revenue', value: '$2.4M', tone: '#f59e0b' },
];

const shipments = [
  { id: 'LD-1001', route: 'Dubai → Abu Dhabi', status: 'In Transit', color: '#dbeafe' },
  { id: 'LD-1002', route: 'Sharjah → Ajman', status: 'Delivered', color: '#dcfce7' },
  { id: 'LD-1003', route: 'Jebel Ali → Ras Al Khaimah', status: 'Delayed', color: '#fef3c7' },
  { id: 'LD-1004', route: 'Al Ain → Dubai', status: 'Loading', color: '#f3e8ff' },
];

const routes = [
  { name: 'Route 21', driver: 'A. Khan', eta: '09:15 AM' },
  { name: 'Route 34', driver: 'S. Ali', eta: '11:40 AM' },
  { name: 'Route 55', driver: 'N. Saeed', eta: '01:20 PM' },
];

export default function App() {
  const summary = useMemo(
    () => ({
      totalOrders: '1,284',
      activeVehicles: '84',
      warehouses: '5',
      efficiency: '96.2%',
    }),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fb" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.eyebrow}>Operations Dashboard</Text>
            <Text style={styles.title}>Logistics Command Center</Text>
          </View>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>+ New Shipment</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          {stats.map((item) => (
            <View key={item.label} style={[styles.statCard, { borderTopColor: item.tone }]}>
              <Text style={styles.statLabel}>{item.label}</Text>
              <Text style={styles.statValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Overview</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total orders</Text>
              <Text style={styles.summaryValue}>{summary.totalOrders}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Active vehicles</Text>
              <Text style={styles.summaryValue}>{summary.activeVehicles}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Warehouses</Text>
              <Text style={styles.summaryValue}>{summary.warehouses}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Efficiency</Text>
              <Text style={styles.summaryValue}>{summary.efficiency}</Text>
            </View>
          </View>
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Current Routes</Text>
          {routes.map((route) => (
            <View key={route.name} style={styles.routeRow}>
              <View>
                <Text style={styles.routeName}>{route.name}</Text>
                <Text style={styles.routeMeta}>{route.driver}</Text>
              </View>
              <Text style={styles.routeEta}>{route.eta}</Text>
            </View>
          ))}
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Shipment Activity</Text>
          {shipments.map((item) => (
            <View key={item.id} style={styles.shipmentRow}>
              <View>
                <Text style={styles.shipmentId}>{item.id}</Text>
                <Text style={styles.shipmentRoute}>{item.route}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: item.color }]}>
                <Text style={styles.statusText}>{item.status}</Text>
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
    backgroundColor: '#f5f7fb',
  },
  content: {
    padding: 20,
    gap: 18,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eyebrow: {
    fontSize: 12,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flexBasis: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderTopWidth: 4,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  panel: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 14,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  summaryItem: {
    width: '48%',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 6,
  },
  routeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 12,
    marginBottom: 12,
  },
  routeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  routeMeta: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  routeEta: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563eb',
  },
  shipmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  shipmentId: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  shipmentRoute: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  statusBadge: {
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0f172a',
  },
});
