// "use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";
import { Avatar, ListItemIcon } from "@mui/material";
import { Logout } from "@mui/icons-material";
import AuthButton from "@/components/AuthButton";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function PrimarySearchAppBar() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="h-24 bg-slate-700">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              LOGO
            </Typography>

            <div className=" mx-3">
              <Link href="/" className=" hover:text-slate-300">
                หน้าแรก
              </Link>
            </div>
            <div className=" mx-3">
              <Link
                href="/protected/activities"
                className=" hover:text-slate-300"
              >
                กิจกรรม
              </Link>
            </div>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ flexGrow: 1 }} />
            {!user && (
              <div>
                <Link href="/login" className=" hover:text-slate-300">
                  Login
                </Link>
              </div>
            )}

            {user && (
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Link href="/protected/user">
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </Link>
              </Box>
            )}

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
