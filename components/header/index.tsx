'use client'

import { motion } from 'framer-motion';
import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(to right, #5b2c6f, #6c3483)",
      }}
    >
      <Toolbar>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <Typography variant="h4" className="text-center font-bold">
            EV Analytics Dashboard
          </Typography>
        </motion.div>
      </Toolbar>
    </AppBar>
  );
}

