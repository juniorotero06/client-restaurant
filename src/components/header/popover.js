import * as React from "react";

// Assets
import IconButton from "@mui/material/IconButton";
import PopupState, { bindTrigger } from "material-ui-popup-state";

const PopoverHeader = () => {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <IconButton
            color="inherit"
            sx={{ p: 0.5 }}
            {...bindTrigger(popupState)}
          ></IconButton>
        </div>
      )}
    </PopupState>
  );
};

export default PopoverHeader;
