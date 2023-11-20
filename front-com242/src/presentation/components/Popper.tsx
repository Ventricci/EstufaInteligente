import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function SimplePopper() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const data = JSON.parse(localStorage.getItem("apiData")!);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <div className="flex flex-row">
      <p className="text-[20px] mr-4">{data.name}</p>
      <button aria-describedby={id} type="button" onClick={handleClick}>
        <ArrowDropDownIcon />
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
          <div className="flex flex-col">
            <p className="pb-4 cursor-pointer border-b-2 border-black">
              Logar no sistema
            </p>
            <p className="cursor-pointer pt-4">Deslogar</p>
          </div>
        </Box>
      </Popper>
    </div>
  );
}
