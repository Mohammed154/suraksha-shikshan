import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import BottomNav from './components/BottomNav.jsx';
import Landing from './screens/Landing.jsx';
import Home from './screens/Home.jsx';
import LessonList from './screens/LessonList.jsx';
import Lesson from './screens/Lesson.jsx';
import LinkCheck from './screens/LinkCheck.jsx';
import Report from './screens/Report.jsx';
import ScamDatabase from './screens/ScamDatabase.jsx';
import Emergency from './screens/Emergency.jsx';

function AppLayout() {
  return (
    <div className="min-h-screen bg-cream flex flex-col max-w-lg mx-auto relative">
      {/* Main content area — bottom nav takes 72px */}
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Full-width primary portal landing page */}
        <Route path="/" element={<Landing />} />

        {/* Mobile-oriented dashboard and lesson app routes */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard"       element={<Home />} />
          <Route path="/lessons"         element={<LessonList />} />
          <Route path="/lessons/:id"     element={<Lesson />} />
          <Route path="/link-check"      element={<LinkCheck />} />
          <Route path="/report"          element={<Report />} />
          <Route path="/report/database" element={<ScamDatabase />} />
          <Route path="/emergency"       element={<Emergency />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
