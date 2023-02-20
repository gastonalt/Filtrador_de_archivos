import { Divider, Grid, TextField, Typography } from "@mui/material";
import '../App.css';
import Button from "@mui/material/Button";
import { useEffect, useState } from 'react';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GitHubIcon from '@mui/icons-material/GitHub';
const { ipcRenderer } = window.require("electron");

function FormBody() {

    useEffect(() => {
        ipcRenderer.send('domLoaded');
    }, []);

    const [filesString, setfilesString] = useState('');

    const [sourceFolder, setSourceFolder] = useState('');

    const [targetFolder, setTargetFolder] = useState('');

    const [statusBar, setStatusBar] = useState('Para comenzar, Ingrese el listado de archivos');

    const setListaArchivos = (e: string)=>{
        setfilesString(e);
        ipcRenderer.send('setListaArchivos', e);
    }
    
    const setCaracterSeparador = (e: string)=>{
        if(e !== '' && e !== undefined && e !== null)
            ipcRenderer.send('setCaracterSeparador', e);
    }

    const setSourcePathManually = (e: string) =>{
        setSourceFolder(e);
        ipcRenderer.send('setSourcePathSelectedManually', e);
    }

    const setTargetPathManually = (e: string) =>{
        setTargetFolder(e);
        ipcRenderer.send('setTargetPathSelectedManually', e);
    }

    ipcRenderer.on('getStatusBar', (event: any, value: string)=>{
        setStatusBar(value);
    })

    ipcRenderer.on('targetPathSelected',(event: any, value: any)=>{
        setTargetFolder(value);
    })

    ipcRenderer.on('sourcePathSelected',(event: any, value: any)=>{
        setSourceFolder(value);
    })

  return (
    <>
      <Typography
        variant="subtitle1"
        component="div"
        sx={{ mt: 2, ml: "5%", mb: 1 }}
        className='form-label'
      >
        INGRESE LA LISTA DE ARCHIVOS A BUSCAR
      </Typography>
      <div className="align-center">
        <TextField
          value={filesString}
          className="form-input"
          id="filled-textarea"
          placeholder="Ejemplo: XXX_1234, YYY_5678, ZZZ_9101, etc."
          multiline
          sx={{ width: "90%" }}
          rows={4}
          onChange={(e) => setListaArchivos(e.target.value)}
          InputProps={{
            classes: {input:'form-input-placeholder'},
            endAdornment: filesString === '' ? (
                <div className="keyIconWrapper">
                    <span className="keyIcon">CRTL</span>
                    +
                    <span className="keyIcon">V</span>
                    <div>para pegar</div>
                </div>
            ): null,
          }}
        />
      </div>
      <Divider sx={{border: '1px solid #363849', width: '90%', margin: '24px auto'}}/>
      <div>
        <Grid container sx={{width: '90%', margin: '0 auto'}}>
            <Grid item xs={6.3} sx={{display:'flex', alignItems: 'center'}}>
                <Typography
                variant="subtitle1"
                component="div"
                className='form-label'
                >
                    ITEM DE SEPARACIÓN DE LOS ARCHIVOS
                </Typography>
            </Grid>
            <Grid item xs={5.7}>
                <TextField
                className="form-input"
                id="filled-textarea"
                placeholder="Ejemplo: / - ,"
                sx={{width: '100%'}}
                onChange={(e) => setCaracterSeparador(e.target.value)}
                InputProps={{ classes: {input:'form-input-placeholder'}}}
                />
            </Grid>
            <Divider sx={{border: '1px solid #363849', width: '100%', margin:'24px 0'}}/>
            <Grid item xs={3.5} sx={{display:'flex', alignItems: 'center'}}>
            <Typography
                variant="subtitle1"
                component="div"
                className='form-label'
                >
                    CARPETA DE ORIGEN
                </Typography>
            </Grid>
            <Grid item xs={5}>
                <TextField
                className="form-input"
                id="filled-textarea"
                placeholder="Carpeta://de/origen"
                sx={{width: '100%'}}
                InputProps={{ classes: {input:'form-input-placeholder'}}}
                onChange={(e)=> setSourcePathManually(e.target.value)}
                value={sourceFolder}
                />
            </Grid>
            <Grid item xs={2} sx={{ml: 2}}>
                <Button variant="outlined" startIcon={<DriveFolderUploadIcon />}
                className="button-outlined" onClick={() => ipcRenderer.send('changeSourceFolder')}>
                    SELECCIONAR
                </Button>
            </Grid>
            <Divider sx={{border: '1px solid #363849', width: '100%', margin:'24px 0'}}/>
            <Grid item xs={3.5} sx={{display:'flex', translate: '0 15px'}}>
            <Typography
                variant="subtitle1"
                component="div"
                className='form-label'
                >
                    CARPETA DE DESTINO
                </Typography>
            </Grid>
            <Grid item xs={5}>
                <TextField
                className="form-input"
                id="filled-textarea"
                placeholder="Carpeta://de/destino"
                sx={{width: '100%'}}
                InputProps={{ classes: {input:'form-input-placeholder'}}}
                onChange={(e)=> setTargetPathManually(e.target.value)}
                value={targetFolder}
                />
            </Grid>
            <Grid item xs={2} sx={{ml: 2, mb: '24px'}}>
                <Button variant="outlined" startIcon={<DriveFolderUploadIcon />}
                className="button-outlined" onClick={() => ipcRenderer.send('changeTargetFolder')}>
                    SELECCIONAR
                </Button>
            </Grid>
            <Grid item xs={8.8} sx={{display:'flex', alignItems: 'center'}}>
                <Typography
                variant="subtitle1"
                component="div"
                className='form-status-label'
                >
                    {statusBar}
                </Typography>
            </Grid>
            <Grid item xs={3.2} sx={{display:'flex', alignItems: 'center'}}>
                <Button variant="contained" endIcon={<ArrowForwardIosIcon />} classes={{ disabled: 'disabled-button' }}
                className="button-filled" onClick={()=> ipcRenderer.send('comenzarCopiado')} disabled={filesString === '' || targetFolder === '' || sourceFolder === ''}>
                    COMENZAR
                </Button>
            </Grid>
        </Grid>
        <div style={{textAlign: 'center', marginTop: '14px'}}>
            <Button startIcon={<GitHubIcon />}
            onClick={() => ipcRenderer.send('openGitHub')}
            className="button-link">
                APP CREADA POR GASTÓN ALTAMIRANO
            </Button>
        </div>
    </div>
    </>
  );
}

export default FormBody;
