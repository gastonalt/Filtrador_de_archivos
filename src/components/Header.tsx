import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import './Header.css';
const { ipcRenderer } = window.require("electron");

export default function Header() {

  const minimizeWindow = () => {
    ipcRenderer.send('minimizeWindow');
  };
  const closeWindow = () => {
    ipcRenderer.send('closeWindow');
  };

  return (
    <div className='window-header-wrapper'>
      <h1 className='window-title'>FILTRADOR DE ARCHIVOS</h1>
      <div className='window-toolbar'>
        <IconButton
            size="large"
            edge="start"
            sx={{color: '#6F6F6F'}}
            aria-label="minimize"
            onClick={()=>minimizeWindow()}
        >
            <RemoveIcon />
        </IconButton>
        <IconButton
            size="large"
            edge="start"
            sx={{color: '#6F6F6F'}}
            aria-label="close"
            onClick={()=>closeWindow()}
        >
            <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
}