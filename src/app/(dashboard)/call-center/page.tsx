'use client';

import React, { useContext, useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  List,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { getRecentCallsByDashboard } from '@/services/form.api';
import { dayjs } from '@/lib/dayjs';
import { CallContext } from '@/contexts/call-context';
import RefreshIcon from '@mui/icons-material/Refresh';


// Unified call record type, with optional live-call fields
interface CallRecord {
  id: string;
  User: { email: string; mobile: string };
  admin?: { firstName: string; lastName: string };
  callStartTime?: string;
  callEndTime?: string;
  status: string;
  // Live-call properties
  userSocketId?: string;
  room?: string;
}

interface CallStats {
  totalCalls: number;
  totalReceivedCalls: number;
  totalAbandonedCalls: number;
  inQueue: number;
}

export default function Dashboard(): JSX.Element {
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [stats, setStats] = useState<CallStats>({ totalCalls: 0, totalReceivedCalls: 0, totalAbandonedCalls: 0, inQueue: 0 });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState<CallRecord | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [menuRecord, setMenuRecord] = useState<CallRecord | null>(null);

  const { callData, setSelectedCall } = useContext(CallContext); // live calls via sockets


  const handleRefresh = () => {
    
  };
  

  useEffect(() => {
    getRecentCallsByDashboard().then(res => {
      setCalls(res.data.data || []);
      setStats({
        totalCalls: res.data.callStats.totalCalls,
        totalReceivedCalls: res.data.callStats.totalReceivedCalls,
        totalAbandonedCalls: callData?.length || 0,
        inQueue: res.data.callStats.totalAbandonedCalls,
      });
    });
  }, []);

  const handleSelect = (record: CallRecord) => {
    setSelected(record);
  };

  const handleChangePage = (_: React.MouseEvent | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>, record: CallRecord) => {
    setAnchorEl(e.currentTarget);
    setMenuRecord(record);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRecord(null);
  };

  const handleJoin = (rec: CallRecord) => {

   
    setSelectedCall(rec)
    handleMenuClose();
    // TODO: call join API / socket logic
  };

  

  // Prepare live calls as CallRecord[]
  const liveCalls: CallRecord[] = (callData || []).map(item => ({
    id: item.room,
    User: { email: item.email, mobile: '' },
    status: item.status,
    userSocketId: item.userSocketId,
    room: item.room,
  }));

  // Merge: live calls on top, then historic calls
  const mergedCalls = [...liveCalls, ...calls.map(c => ({
    id: c.id.toString(),
    User: c.User,
    admin: c.admin,
    callStartTime: c.callStartTime,
    callEndTime: c.callEndTime,
    status: c.status,
  }))];

  const statsCards = [
    { label: 'Total Calls', value: stats.totalCalls, bg: '#E6F7F1', color: '#31BB88' },
    { label: 'Answered', value: stats.totalReceivedCalls, bg: '#E8F2FC', color: '#6396C9' },
    { label: 'Waiting', value: callData?.length || stats?.totalAbandonedCalls, bg: '#FFF2E8', color: '#E19670' },
    { label: 'Missed Calls', value: stats.inQueue, bg: '#F8F8F8', color: undefined },
  ];

  const renderDetail = () => {
    if (!selected) return <Typography>Select a call.</Typography>;
    const start = selected.callStartTime
      ? dayjs(selected.callStartTime).format('MMM D, YYYY h:mm A')
      : '-';
    const end = selected.callEndTime
      ? dayjs(selected.callEndTime).format('MMM D, YYYY h:mm A')
      : 'Ongoing';
    const duration = selected.callEndTime
      ? Math.round((new Date(selected.callEndTime).getTime() - new Date(selected.callStartTime!).getTime()) / 60000) + 'm'
      : selected.userSocketId
        ? 'Live'
        : 'N/A';
    const agent = selected.admin
      ? `${selected.admin.firstName} ${selected.admin.lastName}`
      : '-';

    return (
      <TableContainer>
        <Table>
          <TableBody>
            {[
              ['Email', selected.User.email],
              ['Phone', selected.User.mobile],
              ['Start Time', start],
              ['End Time', end],
              ['Duration', duration],
              ['Agent', agent],
            ].map(([key, val]) => (
              <TableRow key={key}>
                <TableCell><strong>{key}</strong></TableCell>
                <TableCell>{val}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h5">Call Center Dashboard</Typography>
          
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={2}>
          {statsCards.map(card => (
            <Grid item xs={12} sm={6} md={3} key={card.label}>
              <Card sx={{ bgcolor: card.bg }}>
                <CardContent>
                  <Typography variant="h4" sx={{ color: card.color }}>{card.value}</Typography>
                  <Typography>{card.label}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Recent Calls" action={
    <IconButton onClick={handleRefresh}>
      <RefreshIcon />
    </IconButton>
  } />
              <Divider />
              <List>
                {mergedCalls.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(rec => {
                  const time = rec.userSocketId
                    ? dayjs().format('h:mm A')
                    : dayjs(rec.callStartTime!).format('h:mm A');
                  return (
                    <Box
                      
                      sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center', 
                          paddingX: '15px', 
                          paddingY: '10px',
                          marginBottom: '15px', 
                          width: '100%',
                          borderBottom: '1px solid #ccc'
                      }}
                      key={rec.id}
                      onClick={() => handleSelect(rec)}
                    >
                      <div>
                        <Typography>{ rec.User?.firstName? (rec.User?.firstName + " "+ rec.User?.lastName) : rec.User.email.split('@')[0]}</Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <Box
                            component="span"
                            sx={{
                              width: '16px',
                              height: '16px',
                              display: 'block',
                              backgroundColor: '#FFF1E7',
                              borderRadius: '0',
                              fontSize: '12px',
                              textAlign: 'center',
                            }}
                          >
                            {rec.status
                              ? rec.status.charAt(0).toUpperCase()
                              : ''
                            }
                          </Box>

                          

                          {` ${rec.status}`}
                        </Box>
                      </div>

                      <div className='flex'>
                        {`${time}`}
                        { rec?.userSocketId && <IconButton edge="end" onClick={e => handleMenuOpen(e, rec)}>
                          <DotsThreeIcon style={{ transform: 'rotate(90deg)' }} />
                        </IconButton>}
                      </div>

                    </Box>
                  );
                })}
              </List>
              <Divider />
              <TablePagination
                component="div"
                count={mergedCalls.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader title={selected ? selected.User.email.split('@')[0] : 'Details'} />
              <Divider />
              <Box sx={{ p: 2 }}>{renderDetail()}</Box>
            </Card>
          </Grid>
        </Grid>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          {menuRecord?.userSocketId && (
            <MenuItem onClick={() => handleJoin(menuRecord)}>Join</MenuItem>
          )}
        </Menu>
      </Box>
    </Box>
  );
}
