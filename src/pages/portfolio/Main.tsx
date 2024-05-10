import { useState } from 'react';

import PROJECT_DATA from '@/data/DB_project.json';
import LiveSection from '@/components/LiveSection';

export default function MainPage() {
  const [loading, setLoading] = useState(true);
  const DB_PROJECT_DATAS = PROJECT_DATA as ProjectProperties[];

  return (
    <>
      <h1>Projects</h1>
      <h2>지금까지 참여한 프로젝트 리스트</h2>
      { loading ? <LiveSection message='Please wait. Loading..' /> : null }
    </>
  );
}
