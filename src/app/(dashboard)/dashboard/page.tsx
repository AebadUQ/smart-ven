'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { getCharts } from '@/services/dashboard';
import { Summary } from '@/components/dashboard/analytics/summary';
import { AlertSummary } from '@/components/dashboard/overview/subscriptions';
import { TripSuccessRate } from '@/components/dashboard/TripChart';
import Grid from '@mui/system/Grid';

const containerStyle = {
  width: '100%',
  height: '300px',
};

const center = {
  lat: 24.8607,
  lng: 67.0011,
};

// Dummy van locations around Karachi
const vans = [
  { id: 1, lat: 24.8610, lng: 67.0015 },
  { id: 2, lat: 24.8620, lng: 67.0025 },
  { id: 3, lat: 24.8600, lng: 67.0000 },
  { id: 4, lat: 24.8590, lng: 67.0030 },
  { id: 5, lat: 24.8630, lng: 67.0040 },
];
const alertSummary = [
  { id: '1', title: 'Overdue Route', icon: '/icons/alerts.svg', status: 'new' },
  { id: '2', title: 'Driver Late', icon: '/icons/alerts.svg', status: 'in_progress' },
  { id: '3', title: 'Resolved Complaint', icon: '/icons/alerts.svg', status: 'resolved' },
  { id: '4', title: 'Missed Pickup', icon: '/icons/alerts.svg', status: 'new' },
  { id: '5', title: 'Unauthorized Stop', icon: '/icons/alerts.svg', status: 'in_progress' },
];

const tripData = [
  { name: 'Success', value: 75, color: '#4caf50' },
  { name: 'Failure', value: 15, color: '#f44336' },
  { name: 'Cancelled', value: 10, color: '#ff9800' },
];
export default function DashboardWithMap(): React.JSX.Element {
  const [data, setData] = useState<any>({});
  const [listGrowth, setListGrowth] = useState<{ name: string; value: number }[]>([]);
  const [audienceGrowth, setAudienceGrowth] = useState<
    { date: string; subscribed: number; unsubscribed: number }[]
  >([]);

  const fetchData = useCallback(async () => {
    try {
      const chartData = await getCharts();
      setData(chartData);

      const lg = chartData.listGrowth;
      const isListObj = lg && typeof lg === 'object' && Array.isArray(lg.columns) && Array.isArray(lg.data);
      setListGrowth(
        isListObj
          ? lg.columns.map((name: string, idx: number) => ({
              name,
              value: lg.data[idx] ?? 0,
            }))
          : []
      );

      const ag = chartData.audienceGrowth;
      const isAudObj =
        ag &&
        typeof ag === 'object' &&
        Array.isArray(ag.columns) &&
        Array.isArray(ag.total) &&
        Array.isArray(ag.unsubscribed);
      setAudienceGrowth(
        isAudObj
          ? ag.columns.map((date: string, idx: number) => ({
              date,
              subscribed: ag.total[idx] ?? 0,
              unsubscribed: ag.unsubscribed[idx] ?? 0,
            }))
          : []
      );
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  return (
    <Box sx={{ padding: '24px 24px 63px 24px' }}>
      <Summary />

      <Box mt={4}>
        <Card sx={{ height: 400 }}>
          <CardHeader title="Vans Currently on Route" />
          <CardContent>
            <LoadScript googleMapsApiKey={apiKey}>
              <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
                {vans.map((van) => (
                  <Marker
                    key={van.id}
                    position={{ lat: van.lat, lng: van.lng }}
                    label={`Van ${van.id}`}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
            <Typography variant="caption" color="text.secondary" mt={1}>
              Live map of active vans
            </Typography>
          </CardContent>
        </Card>
      </Box>
     <Box mt={4} display="flex" gap={2}>
  <Box width="50%">
    <Box height="100%" display="flex" flexDirection="column" sx={{ height: '100%' }}>
      <AlertSummary alerts={alertSummary} />
    </Box>
  </Box>
  <Box width="50%">
    <Box height="100%" display="flex" flexDirection="column" sx={{ height: '100%' }}>
      <TripSuccessRate data={tripData} />
    </Box>
  </Box>
</Box>

</Box>
  );
}
