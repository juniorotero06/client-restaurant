/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Assets
import * as Icons from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton } from "@mui/material";

const categories = [
  {
    id: "Jornada de almuerzo ¡gratis!",
    iconOption: <Icons.RestaurantMenu />,
    children: [
      {
        id: "Pedidos",
        active: true,
        link: "/pedidos",
      },
      {
        id: "Órdenes del Sistema",
        active: true,
        link: "/ordenes",
      },
      {
        id: "Recetas",
        active: true,
        link: "/recetas",
      },
      {
        id: "Inventario",
        active: true,
        link: "/inventario",
      },
      {
        id: "Historial de Compras",
        active: true,
        link: "/historial-compras",
      },
    ],
  },
];

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { ...other } = props;
  const [visibility, setvisibility] = useState({
    status: false,
    index: null,
  });
  const history = useHistory();

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{
            ...item,
            ...itemCategory,
            fontSize: 22,
            color: "#00B19C",
            flexFlow: "column",
          }}
        >
          <img
            src="https://cdn2.alegra.com/website/Logos_Alegra/Logotipo-Alegra.png"
            alt="torrens-lg"
            width="60%"
            height="50%"
            style={{ marginTop: 20 }}
          />
        </ListItem>
        <ListItem
          sx={{ ...item, ...itemCategory }}
          onClick={() => history.push("/")}
        >
          <ListItemIcon sx={{ color: "#00B19C" }}>
            <Icons.Home />
          </ListItemIcon>
          <ListItemText sx={{ color: "#00B19C" }}>Home</ListItemText>
        </ListItem>
        <ListItem
          sx={{ ...item, ...itemCategory }}
          onClick={() => history.push("/ai-integration")}
        >
          <ListItemIcon sx={{ color: "#00B19C" }}>
            <Icons.Psychology />
          </ListItemIcon>
          <ListItemText sx={{ color: "#00B19C" }}>Integración de IA</ListItemText>
        </ListItem>
        <ListItem
          sx={{ ...item, ...itemCategory }}
          onClick={() => history.push("/documentation")}
        >
          <ListItemIcon sx={{ color: "#00B19C" }}>
            <Icons.MenuBook />
          </ListItemIcon>
          <ListItemText sx={{ color: "#00B19C" }}>Documentación</ListItemText>
        </ListItem>
        {categories.map(({ id, children, iconOption }, index) => (
          <Box key={id} sx={{ bgcolor: "#ffffff" }}>
            <ListItemButton
              onClick={() =>
                setvisibility({
                  status: !visibility.status,
                  index,
                })
              }
            >
              <ListItem>
                <ListItemIcon sx={{ color: "#00B19C" }}>
                  {iconOption}
                </ListItemIcon>
                <ListItemText sx={{ color: "#00B19C" }}>{id}</ListItemText>
                <ListItemIcon sx={{ color: "#00B19C" }}>
                  <Icons.ArrowDropDown />
                </ListItemIcon>
              </ListItem>
            </ListItemButton>
            {visibility.status &&
              visibility.index === index &&
              children.map(({ id: childId, icon, active, link }) => (
                <ListItem disablePadding key={childId}>
                  <ListItemButton
                    selected={active}
                    sx={item}
                    onClick={() => history.push(link)}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{childId}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
