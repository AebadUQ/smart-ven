import * as React from 'react';
import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { House as HouseIcon } from '@phosphor-icons/react/dist/ssr/House';
import Link from 'next/link';
import { PropertyItem } from '@/components/core/property-item';
import { PropertyList } from '@/components/core/property-list';

export default function ParentDetailPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Stack spacing={4}>
        {/* Back Button */}
        <Link href="/admin/parents" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeftIcon />
          <Typography variant="subtitle2">Back to Parents</Typography>
        </Link>

        {/* Header */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="flex-start">
          <Stack direction="row" spacing={2} alignItems="center" flex={1}>
            <Avatar src="/assets/avatar-2.png" sx={{ width: 64, height: 64 }}>PR</Avatar>
            <Box>
              <Typography variant="h4">Amina Rauf</Typography>
              <Typography color="text.secondary">amina.rauf@gmail.com</Typography>
            </Box>
          </Stack>
        </Stack>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader
                avatar={<Avatar><UserIcon /></Avatar>}
                title="Parent Information"
                action={<IconButton><PencilSimpleIcon /></IconButton>}
              />
              <CardContent>
                <PropertyList divider={<Divider />} orientation="vertical">
                  {[
                    { key: 'CNIC', value: '42101-9876543-0' },
                    { key: 'Phone', value: '0345-9876543' },
                    { key: 'Status', value: <Chip label="Active" color="success" size="small" /> },
                  ].map(item => (
                    <PropertyItem key={item.key} name={item.key} value={item.value} />
                  ))}
                </PropertyList>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader
                avatar={<Avatar><HouseIcon /></Avatar>}
                title="Linked Students"
              />
              <CardContent>
                <Stack spacing={2}>
                  {[{
                    name: 'Ahmed Shaikh',
                    schoolId: 'STU-0092',
                    class: 'Grade 6 - B',
                    van: 'Van #12',
                    route: 'Nazimabad Block A'
                  }].map((student, index) => (
                    <Box key={index} sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 2 }}>
                      <Typography variant="subtitle1">{student.name}</Typography>
                      <Typography variant="body2" color="text.secondary">School ID: {student.schoolId}</Typography>
                      <Typography variant="body2" color="text.secondary">Class: {student.class}</Typography>
                      <Typography variant="body2" color="text.secondary">Van: {student.van} | Route: {student.route}</Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
