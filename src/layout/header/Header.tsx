import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

import './Header.scss';
// import MenuPopupState from './MenuPopupState';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PdfDialog from 'pages/resume/dialog/MakePdf';

export default function DenseAppBar() {
  const [open, setOpen] = useState(false);

  const elementRef = useRef([]);
  console.log('elementRef', elementRef);

  const handleClickOpen = async () => {
    // 이미지 생성
    const profileImage = document.getElementById('02458f34-9632-4ee9-9363-ec9b4dd9af2f')!;
    const canvas = await html2canvas(profileImage, { useCORS: true });
    console.log(canvas);
    // dialog open
    setOpen(true);
  };

  const getImage = (ref: any) => {
    console.log(ref);
    // const html = ref.length === 1 ? ref[0] : ref;

    // const { printBasicSet } = this;

    // const canvas = await html2canvas(html, { useCORS: true });

    // const imgData = canvas.toDataURL("image/jpeg", 1);
    // const imgWidth = printBasicSet.contentWidth;
    // const imgHeight = Math.floor((canvas.height * imgWidth) / canvas.width);

    // return { data: imgData, width: imgWidth, height: imgHeight };
  };

  const changeMode = () => {
    console.log('changeMode');
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <header className='header'>
      <IconButton aria-label='lightMode' onClick={changeMode}>
        <LightModeIcon />
      </IconButton>
      <IconButton aria-label='makePdf' onClick={handleClickOpen}>
        <PictureAsPdfIcon />
      </IconButton>
      <PdfDialog open={open} onClose={handleClose} />
    </header>
  );
}
