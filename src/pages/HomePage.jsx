import { useContext } from "react";
import { FocusContext } from "../context/FocusContext";
import Timer from "../components/dashboard/Timer";
import TimerControls from "../components/dashboard/TimerControls";
import ProjectTaskManager from "../components/dashboard/ProjectTaskManager";
import DailyLog from "../components/dashboard/DailyLog";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const { seconds } = useContext(FocusContext);

  return (
    <div className={styles.homeLayout}>
      <Timer seconds={seconds} />

      <ProjectTaskManager />

      <div className={styles.controlSection}>
        <TimerControls />
        <DailyLog />
      </div>
    </div>
  );
};

export default HomePage;
