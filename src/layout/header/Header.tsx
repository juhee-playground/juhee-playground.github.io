import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

import './Header.scss';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PdfDialog from 'pages/resume/dialog/MakePdf';

interface CanvasImageInfo {
  data: string;
  width: number;
  height: number;
}

export default function DenseAppBar() {
  const [open, setOpen] = useState(false);
  const companyIds = [
    '02458f34-9632-4ee9-9363-ec9b4dd9af2f',
    'ac39715c-45de-4b35-9daa-30cf52a10664',
    'f194e7b4-3174-4fd2-8dfc-17ea186dd8ed',
  ];
  const printBasicSet = {
    contentWidth: 194,
    pageWidth: 210,
    pageHeight: 210 * 1.414 - 10,
    margin: 8,
  };
  const handleClickOpen = async () => {
    // 이미지 생성
    const imageDataArr = await Promise.all(companyIds.map((id) => makeImage(id)));
    // pdf 생성
    createPdf(imageDataArr);
    // dialog open
    setOpen(true);
  };

  const makeImage = async (id: string) => {
    const company = document.getElementById(id) as HTMLElement;
    const canvas = await html2canvas(company, { useCORS: true });

    // 이미지 다운로드
    saveImage(canvas);

    const imgData = canvas.toDataURL('image/jpeg', 1);
    const imgWidth = printBasicSet.contentWidth;
    const imgHeight = Math.floor((canvas.height * imgWidth) / canvas.width);

    return { data: imgData, width: imgWidth, height: imgHeight };
  };

  const createPdf = (arr: CanvasImageInfo[]) => {
    console.log('create', arr);
  };

  const saveImage = (canvas: HTMLCanvasElement) => {
    const imgData = canvas.toDataURL('image/jpeg', 1);
    const link = document.createElement('a');
    if (typeof link.download === 'string') {
      link.href = imgData;
      link.download = 'fileName.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.appendChild(link);
    } else {
      window.open(imgData);
    }
    // const html = ref.length === 1 ? ref[0] : ref;

    // const { printBasicSet } = this;

    // const canvas = await html2canvas(html, { useCORS: true });

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
