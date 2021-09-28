import React from "react";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
} from "@syncfusion/ej2-react-schedule";
function Dashboard(props) {
  return (
    <div style={{ marginLeft: "260px" }}>
      <div>
        <ScheduleComponent currentView="Month">
          <Inject services={[Day, Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </div>
    </div>
  );
}
export default Dashboard;
